# Ouve comandos do CELULAR e anota em inbox-celular.md (a IA le de la e executa).
# Com nuvem: le a tabela commands (vira "recebido" na hora).
# Sem nuvem: le o topico ntfy -cmd (o app manda pra la sozinho).
# Uso: powershell -ExecutionPolicy Bypass -File .\ouvir-celular.ps1   (Ctrl+C para parar)
#      powershell -ExecutionPolicy Bypass -File .\ouvir-celular.ps1 -Once
param([int]$IntervalSec = 10, [switch]$Once)
$ErrorActionPreference = "Stop"
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Split-Path -Parent $dir
$inbox = Join-Path $root "inbox-celular.md"
if (-not (Test-Path -LiteralPath $inbox)) {
  "# Inbox do celular`r`n`r`nComandos enviados pelo app. A IA le este arquivo e executa.`r`n" |
    Set-Content -LiteralPath $inbox -Encoding utf8
}
function Inbox-Add([string]$id, [string]$texto) {
  $hora = Get-Date -Format "yyyy-MM-dd HH:mm"
  "`r`n## [$hora] ($id)`r`n$texto`r`n" | Add-Content -LiteralPath $inbox -Encoding utf8
  Write-Output "Novo comando ($id): $texto"
}
$cfgPath = Join-Path $root "meu-app-config.txt"
$url = ""; $key = ""
if (Test-Path -LiteralPath $cfgPath) {
  foreach ($l in (Get-Content -LiteralPath $cfgPath)) {
    if ($l -match '^\s*SUPABASE_URL\s*=\s*(.+)') { $url = $Matches[1].Trim() }
    if ($l -match '^\s*SUPABASE_ANON_KEY\s*=\s*(.+)') { $key = $Matches[1].Trim() }
  }
}
if ($url -and $key) {
  Write-Output "Ouvindo commands via Supabase (toda ${IntervalSec}s)..."
  $h = @{ apikey = $key; Authorization = "Bearer $key" }
  do {
    try {
      $rows = Invoke-RestMethod -Uri "$url/rest/v1/commands?status=eq.pendente&select=id,texto" -Headers $h -TimeoutSec 15
      foreach ($r in @($rows)) {
        Inbox-Add $r.id $r.texto
        $b = @{ status = "recebido" } | ConvertTo-Json
        Invoke-RestMethod -Method Patch -Uri "$url/rest/v1/commands?id=eq.$($r.id)" -Headers (@{ apikey = $key; Authorization = "Bearer $key"; "Content-Type" = "application/json" }) -Body ([Text.Encoding]::UTF8.GetBytes($b)) | Out-Null
      }
    } catch { }
    if ($Once) { break }
    Start-Sleep -Seconds $IntervalSec
  } while ($true)
  exit 0
}
$topicFile = Join-Path $root "ntfy-topic.txt"
$topic = "w3-gabriel-a8f3k9p2x7q4m"
if (Test-Path -LiteralPath $topicFile) { $topic = ((Get-Content -LiteralPath $topicFile -Raw).Trim().Split("`n")[0].Trim()) }
$topic = "$topic-cmd"
$sinceFile = Join-Path ([IO.Path]::GetTempPath()) "mz4-cmd-since.txt"
$since = ""
if (Test-Path -LiteralPath $sinceFile) { $since = (Get-Content -LiteralPath $sinceFile -Raw).Trim() }
Write-Output "Ouvindo comandos via ntfy ($topic, toda ${IntervalSec}s)..."
do {
  try {
    $u = "https://ntfy.sh/$topic/json?poll=1"
    if ($since) { $u = "https://ntfy.sh/$topic/json?since=$since&poll=1" }
    $resp = Invoke-WebRequest -Uri $u -TimeoutSec 20 -UseBasicParsing
    $raw = [System.Text.Encoding]::UTF8.GetString($resp.Content)
    foreach ($line in ($raw -split "`n")) {
      if (-not $line.Trim()) { continue }
      $m = $line | ConvertFrom-Json
      if ($m.id) { $since = $m.id; $since | Set-Content -LiteralPath $sinceFile -NoNewline }
      $txt = "$($m.message)"
      if ($txt.StartsWith("CMD:")) { Inbox-Add $m.id $txt.Substring(4).Trim() }
    }
  } catch { }
  if ($Once) { break }
  Start-Sleep -Seconds $IntervalSec
} while ($true)
