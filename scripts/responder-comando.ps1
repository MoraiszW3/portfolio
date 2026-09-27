# Devolve a RESPOSTA de um comando para o celular (a IA usa apos executar).
# Com nuvem: atualiza a linha em commands (o app mostra na hora, sem F5).
# Sem nuvem: anota no inbox + manda notificacao de "pronto".
# Uso: powershell -ExecutionPolicy Bypass -File .\responder-comando.ps1 -Id "<uuid>" -Resposta "Preco alterado OK"
param([string]$Id = "", [string]$Resposta = "Pronto OK")
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
if ($url -and $key -and $Id) {
  $b = @{ status = "pronto"; resposta = $Resposta } | ConvertTo-Json
  Invoke-RestMethod -Method Patch -Uri "$url/rest/v1/commands?id=eq.$Id" -Headers (@{ apikey = $key; Authorization = "Bearer $key"; "Content-Type" = "application/json" }) -Body ([Text.Encoding]::UTF8.GetBytes($b)) | Out-Null
  Write-Output "Resposta enviada ao app: $Resposta"
  exit 0
}
"## resposta [$Id]: $Resposta" | Add-Content -LiteralPath (Join-Path $root "inbox-celular.md") -Encoding utf8
& (Join-Path $dir "notificar.ps1") -Titulo "Comando pronto" -Mensagem $Resposta -Tipo "dev-pronto"
Write-Output "Sem nuvem: resposta anotada no inbox + notificacao enviada."
