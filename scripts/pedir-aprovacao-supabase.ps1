# Pede autorizacao no CELULAR via Supabase Realtime (app atualiza na hora, sem F5).
# Sem nuvem configurada: cai de volta para o pedir-aprovacao.ps1 (ntfy).
# Retorno: exit 0 = APROVADO, exit 2 = NEGADO, exit 3 = TIMEOUT
# Uso: .\pedir-aprovacao-supabase.ps1 -Pergunta "Cadastrar as 4 bolsas?" -Detalhe "..." -TimeoutSec 150
param(
  [string]$Pergunta = "Autoriza continuar?",
  [string]$Detalhe = "",
  [string]$Projeto = "W3Optica",
  [int]$TimeoutSec = 150
)
$ErrorActionPreference = "Stop"
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Split-Path -Parent $dir
$cfgPath = Join-Path $root "meu-app-config.txt"
$url = ""; $key = ""
if (Test-Path -LiteralPath $cfgPath) {
  foreach ($l in (Get-Content -LiteralPath $cfgPath)) {
    if ($l -match '^\s*SUPABASE_URL\s*=\s*(.+)') { $url = $Matches[1].Trim() }
    if ($l -match '^\s*SUPABASE_ANON_KEY\s*=\s*(.+)') { $key = $Matches[1].Trim() }
  }
}
if (-not $url -or -not $key) {
  & (Join-Path $dir "pedir-aprovacao.ps1") -Pergunta $Pergunta -Detalhe $Detalhe -Projeto $Projeto -TimeoutSec $TimeoutSec
  exit $LASTEXITCODE
}
$h = @{ apikey = $key; Authorization = "Bearer $key"; "Content-Type" = "application/json"; Prefer = "return=representation" }
$body = @{ pergunta = $Pergunta; detalhe = $Detalhe; projeto = $Projeto; status = "pendente" } | ConvertTo-Json
$created = Invoke-RestMethod -Method Post -Uri "$url/rest/v1/approvals" -Headers $h -Body ([Text.Encoding]::UTF8.GetBytes($body))
$id = $created[0].id
Write-Output "Pedido no app (id $id). Aguardando SIM/NAO por ${TimeoutSec}s... (aba Aprovar 🔐)"
$deadline = (Get-Date).AddSeconds($TimeoutSec)
while ((Get-Date) -lt $deadline) {
  Start-Sleep -Seconds 4
  try {
    $row = Invoke-RestMethod -Uri "$url/rest/v1/approvals?id=eq.$id&select=status" -Headers @{ apikey = $key; Authorization = "Bearer $key" } -TimeoutSec 15
    $st = $row[0].status
    if ($st -eq "aprovado") { Write-Output "APROVADO (SIM id $id)"; exit 0 }
    if ($st -eq "negado") { Write-Output "NEGADO (NAO id $id)"; exit 2 }
  } catch { }
}
Write-Output "TIMEOUT sem resposta (id $id)"
exit 3
