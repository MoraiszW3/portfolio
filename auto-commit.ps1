# Commit automatico: vigia o projeto e commita sozinho quando voce desenvolve.
# Uso: powershell -ExecutionPolicy Bypass -File .\auto-commit.ps1
# (o retomar.ps1 ja liga sozinho; feche esta janela para parar)
$projeto = "E:\codes zed\Default Project"
$log = Join-Path $projeto "auto-commit.log"
Set-Location $projeto
$dirtySince = $null
"[$(Get-Date -Format 'yyyy-MM-dd HH:mm')] vigia ligado" | Add-Content -LiteralPath $log
while ($true) {
  Start-Sleep -Seconds 60
  try { $changes = git status --porcelain } catch { continue }
  if ($changes) {
    if (-not $dirtySince) { $dirtySince = Get-Date }
    elseif (((Get-Date) - $dirtySince).TotalSeconds -ge 90) {
      git add -A | Out-Null
      if (git status --porcelain) {
        $quando = Get-Date -Format "yyyy-MM-dd HH:mm"
        git commit -m "auto: $quando" | Out-Null
        git push origin master 2>&1 | Out-Null
        "[$quando] commit + push automaticos" | Add-Content -LiteralPath $log
      }
      $dirtySince = $null
    }
  } else { $dirtySince = $null }
}
