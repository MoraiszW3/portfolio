# Atualiza o MeuPainel + registra pipeline/tokens + avisa no celular.
# Uso:
#   .\atualizar-painel.ps1 -JobNome "Hero TikTok" -Status gerando -EstimativaMin 15
#   .\atualizar-painel.ps1 -JobNome "Hero TikTok" -Status pronto -Mensagem "Hero refeito, 3 cenas" -Tokens 42000 -Ia "opencode-muse"
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
$pj = Join-Path $dir "MeuPainel\data.json"
$d = Get-Content -LiteralPath $pj -Raw | ConvertFrom-Json
$d.atualizadoEm = Get-Date -Format "yyyy-MM-dd HH:mm"
if ($JobNome) {
  if (-not $d.pipeline) { $d.pipeline = @{ jobAtual = @{}; historico = @() } }
  if ($Status -eq "gerando") {
    $d.pipeline.jobAtual = @{ nome = $JobNome; inicio = (Get-Date).ToString("o"); estimativaMin = $EstimativaMin; status = "gerando" }
  } elseif ($Status -eq "pronto") {
    $d.pipeline.jobAtual = @{ nome = $JobNome; inicio = ""; estimativaMin = $EstimativaMin; status = "pronto" }
    $d.pipeline.historico += @(@{ nome = $JobNome; fim = (Get-Date -Format "yyyy-MM-dd HH:mm"); ia = $Ia; tokens = $Tokens })
    if ($Tokens -gt 0) { $d.tokens += @(@{ ia = $Ia; qtd = $Tokens }) }
    if ($Mensagem) { & (Join-Path $dir "notificar.ps1") -Titulo "$JobNome pronto" -Mensagem $Mensagem -Tipo "dev-pronto" }
  }
}
$d | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $pj -Encoding utf8
Write-Output "Painel atualizado: $($d.atualizadoEm)"
