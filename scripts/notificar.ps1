# Notifica seu celular via ntfy.sh (push instantaneo, gratis, sem conta).
# Uso manual: .\notificar.ps1 -Titulo "W3Optica pronto" -Mensagem "Hero refeito" -Tipo "dev-pronto" -Projeto "W3Optica"
# Uso pelas IAs (pipeline futuro):
#   1. IA criadora termina -> -Tipo "dev-pronto" -Mensagem "o que mudou + arquivos"
#   2. Entra em revisao    -> -Tipo "em-revisao" -Mensagem "enviado p/ revisora"
#   3. IA revisora termina -> -Tipo "revisado-ok" ou "revisado-ajustes" -Mensagem "veredito + ajustes"
#   4. Deploy feito/falha  -> -Tipo "deploy-ok" ou "deploy-falha" -Mensagem "link + status"
param(
  [string]$Titulo = "Codigo pronto",
  [string]$Mensagem = "",
  [string]$Tipo = "dev-pronto",
  [string]$Projeto = "W3Optica",
  [string]$Topico = ""
)

$ErrorActionPreference = "Stop"
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Split-Path -Parent $dir
$topicFile = Join-Path $root "ntfy-topic.txt"
$defaultTopic = "w3-gabriel-a8f3k9p2x7q4m"

if ([string]::IsNullOrWhiteSpace($Topico)) {
  if (Test-Path -LiteralPath $topicFile) {
    $Topico = (Get-Content -LiteralPath $topicFile -Raw).Trim()
  } else {
    $Topico = $defaultTopic
  }
}

$map = @{
  "dev-pronto"       = @{ tag = "white_check_mark"; prio = "high"; label = "DEV PRONTO" }
  "em-revisao"       = @{ tag = "eyes";             prio = "high"; label = "EM REVISAO" }
  "revisado-ok"      = @{ tag = "mag";              prio = "high"; label = "REVISADO OK" }
  "revisado-ajustes" = @{ tag = "warning";          prio = "high";    label = "REVISADO C/ AJUSTES" }
  "deploy-ok"        = @{ tag = "rocket";           prio = "high";    label = "DEPLOY OK" }
  "deploy-falha"     = @{ tag = "x";                prio = "urgent";  label = "DEPLOY FALHOU" }
  "urgente"          = @{ tag = "rotating_light";   prio = "urgent";  label = "URGENTE" }
  "info"             = @{ tag = "bulb";             prio = "default"; label = "INFO" }
}
if (-not $map.ContainsKey($Tipo)) { $Tipo = "dev-pronto" }
$cfg = $map[$Tipo]
$hora = Get-Date -Format "HH:mm"

$corpo = "[$hora] [$Projeto] [$($cfg.label)]"
if (-not [string]::IsNullOrWhiteSpace($Mensagem)) { $corpo += "`n$Mensagem" }

try {
  Invoke-RestMethod -Method Post -Uri "https://ntfy.sh/$Topico" `
    -Headers @{ Title = $Titulo; Tags = $cfg.tag; Priority = $cfg.prio } `
    -Body ([System.Text.Encoding]::UTF8.GetBytes($corpo)) | Out-Null
  "$hora | $Projeto | $Tipo | $Titulo | OK" | Out-File -FilePath (Join-Path $root "notify-log.txt") -Append -Encoding utf8
  Write-Output "Notificado: $Titulo [$Tipo]"
} catch {
  Write-Output "Falha ao notificar: $($_.Exception.Message)"
  exit 1
}
