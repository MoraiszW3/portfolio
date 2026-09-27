# Pede autorizacao no celular via ntfy com botoes SIM / NAO.
# A notificacao chega com prioridade maxima; o usuario toca em SIM ou NAO
# (ou abre "Responder" e digita). O script aguarda a resposta e retorna:
#   exit 0 = APROVADO, exit 2 = NEGADO, exit 3 = TIMEOUT
# Uso: .\pedir-aprovacao.ps1 -Pergunta "Cadastrar as 4 bolsas?" -Detalhe "..." -TimeoutSec 150
param(
  [string]$Pergunta = "Autoriza continuar?",
  [string]$Detalhe = "",
  [string]$Projeto = "W3Optica",
  [int]$TimeoutSec = 150,
  [string]$Topico = "",
  [string]$TopicoResp = ""
)

$ErrorActionPreference = "Stop"
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Split-Path -Parent $dir
$topicFile = Join-Path $root "ntfy-topic.txt"
$defaultTopic = "w3-gabriel-a8f3k9p2x7q4m"

if ([string]::IsNullOrWhiteSpace($Topico)) {
  if (Test-Path -LiteralPath $topicFile) { $Topico = (Get-Content -LiteralPath $topicFile -Raw).Trim().Split("`n")[0].Trim() }
  else { $Topico = $defaultTopic }
}
if ([string]::IsNullOrWhiteSpace($TopicoResp)) { $TopicoResp = "$Topico-resp" }

$id = -join ((48..57) + (97..102) | Get-Random -Count 6 | ForEach-Object { [char]$_ })
$simToken = "SIM-$id"
$naoToken = "NAO-$id"

# base: ultima msg do canal de respostas (para ignorar respostas antigas)
$since = ""
try {
  $last = Invoke-RestMethod -Uri "https://ntfy.sh/$TopicoResp/json?poll=1" -TimeoutSec 15
  if ($last -and $last.id) { $since = $last.id }
} catch { }

$hora = Get-Date -Format "HH:mm"
$corpo = "[$hora] [$Projeto] Preciso da sua autorizacao:`n$Pergunta"
if (-not [string]::IsNullOrWhiteSpace($Detalhe)) { $corpo += "`n$Detalhe" }
$corpo += "`nToque em SIM ou NAO abaixo (id $id)."

$actions = "http, SIM, https://ntfy.sh/$TopicoResp, method=POST, body=$simToken; " +
           "http, NAO, https://ntfy.sh/$TopicoResp, method=POST, body=$naoToken; " +
           "view, Responder manual, https://ntfy.sh/$TopicoResp, clear=true"

Invoke-RestMethod -Method Post -Uri "https://ntfy.sh/$Topico" `
  -Headers @{ Title = "AUTORIZACAO NECESSARIA"; Tags = "lock"; Priority = "urgent"; Actions = $actions } `
  -Body ([System.Text.Encoding]::UTF8.GetBytes($corpo)) | Out-Null
Write-Output "Pedido enviado (id $id). Aguardando SIM/NAO por ${TimeoutSec}s..."

$deadline = (Get-Date).AddSeconds($TimeoutSec)
while ((Get-Date) -lt $deadline) {
  Start-Sleep -Seconds 5
  try {
    $url = "https://ntfy.sh/$TopicoResp/json?poll=1"
    if ($since) { $url = "https://ntfy.sh/$TopicoResp/json?since=$since&poll=1" }
    $msgs = Invoke-RestMethod -Uri $url -TimeoutSec 15
    foreach ($m in @($msgs)) {
      if (-not $m -or -not $m.message) { continue }
      $txt = "$($m.message)".Trim()
      if ($txt -eq $simToken) { Write-Output "APROVADO (SIM id $id)"; exit 0 }
      if ($txt -eq $naoToken) { Write-Output "NEGADO (NAO id $id)"; exit 2 }
    }
  } catch { }
}
Write-Output "TIMEOUT sem resposta (id $id)"
exit 3
