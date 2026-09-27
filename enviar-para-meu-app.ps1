# Canal PRÓPRIO (sem ntfy). O PC grava o job na SUA nuvem (Supabase).
# Sem nuvem configurada: atualiza o data.json local + aviso local.
# Uso:
#   .\enviar-para-meu-app.ps1 -JobNome "Hero TikTok" -Status gerando -EstimativaMin 15
#   .\enviar-para-meu-app.ps1 -JobNome "Hero TikTok" -Status pronto -Mensagem "3 cenas OK" -Tokens 42000 -Ia "opencode-muse"
param(
  [string]$JobNome = "",
  [string]$Status = "",
  [int]$EstimativaMin = 10,
  [string]$Mensagem = "",
  [int]$Tokens = 0,
  [string]$Ia = "opencode"
)
$ErrorActionPreference = "Stop"
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
$cfgPath = Join-Path $dir "meu-app-config.txt"
$url = ""; $key = ""
if (Test-Path -LiteralPath $cfgPath) {
  foreach ($l in (Get-Content -LiteralPath $cfgPath)) {
    if ($l -match '^\s*SUPABASE_URL\s*=\s*(.+)') { $url = $Matches[1].Trim() }
    if ($l -match '^\s*SUPABASE_ANON_KEY\s*=\s*(.+)') { $key = $Matches[1].Trim() }
  }
}
function Local-Update {
  & (Join-Path $dir "atualizar-painel.ps1") -JobNome $JobNome -Status $Status -EstimativaMin $EstimativaMin -Mensagem $Mensagem -Tokens $Tokens -Ia $Ia
}
if (-not $url -or -not $key) { Local-Update; Write-Output "Sem nuvem: painel local atualizado. Cole as chaves em meu-app-config.txt p/ ativar nuvem."; exit 0 }
$h = @{ apikey = $key; Authorization = "Bearer $key"; "Content-Type" = "application/json" }
if ($Status -eq "gerando") {
  $body = @{ nome = $JobNome; status = "gerando"; estimativa_min = $EstimativaMin; mensagem = $Mensagem; ia = $Ia } | ConvertTo-Json
  Invoke-RestMethod -Method Post -Uri "$url/rest/v1/jobs" -Headers $h -Body ([Text.Encoding]::UTF8.GetBytes($body)) | Out-Null
  Write-Output "Job registrado na sua nuvem: $JobNome"
} elseif ($Status -eq "pronto") {
  $body = @{ nome = $JobNome; status = "pronto"; estimativa_min = $EstimativaMin; mensagem = $Mensagem; ia = $Ia; tokens = $Tokens } | ConvertTo-Json
  Invoke-RestMethod -Method Post -Uri "$url/rest/v1/jobs" -Headers $h -Body ([Text.Encoding]::UTF8.GetBytes($body)) | Out-Null
  Write-Output "Pronto na sua nuvem: $JobNome ($Tokens tokens). O app avisa sozinho."
} else { Write-Output "Informe -Status gerando|pronto" }
