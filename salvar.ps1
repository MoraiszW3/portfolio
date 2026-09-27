# Salva um checkpoint do progresso no git. Duplo-clique para usar.
Set-Location "E:\codes zed\Default Project"
git add -A
if (git status --porcelain) {
    $quando = Get-Date -Format "yyyy-MM-dd HH:mm"
    git commit -m "checkpoint $quando"
    Write-Output ""
    Write-Output "Checkpoint salvo!"
} else {
    Write-Output "Nada novo para salvar."
}
Write-Output ""
git log --oneline -3
