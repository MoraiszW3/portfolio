# Retoma o trabalho de onde parou. Duplo-clique para usar.
$projeto = "E:\codes zed\Default Project"
Start-Process "E:\AI and Terminais\Zed\Zed.exe" -ArgumentList "`"$projeto`""
Set-Location $projeto
Write-Output "=== Últimos checkpoints ==="
git log --oneline -3
Write-Output ""
Write-Output "=== Arquivos modificados desde o último checkpoint ==="
git status --short
Write-Output ""
Write-Output "=== PROGRESSO ==="
Get-Content "$projeto\PROGRESS.md" | Select-Object -First 25
Write-Output ""
Write-Output "Zed abrindo no projeto. Lá dentro, aperte F9 para abrir o opencode"
Write-Output "e diga a ele: leia o PROGRESS.md e continue de onde parou."
Write-Output ""
$vigia = Get-CimInstance Win32_Process -Filter "Name='powershell.exe'" -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like '*auto-commit.ps1*' }
if (-not $vigia) {
    Start-Process powershell -ArgumentList "-ExecutionPolicy Bypass -WindowStyle Hidden -File `"$projeto\auto-commit.ps1`""
    Write-Output "Vigia de commit automatico ligado."
} else {
    Write-Output "Vigia de commit automatico ja estava ligado."
}
