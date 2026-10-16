# 四國家族旅行 2026 一鍵上架到 GitHub Pages（公開網站）
# 用法（VS Code 終端機 PowerShell，在這個資料夾裡）：
#   powershell -ExecutionPolicy Bypass -File .\publish.ps1
$ErrorActionPreference = "Continue"
$repo = "chiplus/shikoku-trip"
Set-Location $PSScriptRoot
if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw "找不到 git，請先安裝 Git for Windows" }
$hasGh = [bool](Get-Command gh -ErrorAction SilentlyContinue)
if (-not (Test-Path ".git")) { git init -b main | Out-Null }
git add -A
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) { git commit -m ("更新行程網站 " + (Get-Date -Format "yyyy-MM-dd HH:mm")) | Out-Null }
git branch -M main
$remotes = @(git remote)
if ($remotes -notcontains "origin") {
  if ($hasGh) {
    gh repo view $repo *> $null
    if ($LASTEXITCODE -ne 0) { gh repo create $repo --public --source . --remote origin | Out-Null }
    else { git remote add origin "https://github.com/$repo.git" }
  } else {
    Write-Host "沒有 gh 指令：請先到 https://github.com/new 建立公開 repo「shikoku-trip」（不要勾 README），再重跑一次。" -ForegroundColor Yellow
    git remote add origin "https://github.com/$repo.git"
  }
}
git push -u origin main
if ($LASTEXITCODE -ne 0) {
  Write-Host "推送失敗：GitHub 上可能已有舊版本。若確定要用這個資料夾覆蓋線上版本，請執行：git push -u origin main --force" -ForegroundColor Yellow
  exit 1
}
if ($hasGh) {
  gh repo edit $repo --visibility public --accept-visibility-change-consequences *> $null
  gh api "repos/$repo/pages" *> $null
  if ($LASTEXITCODE -ne 0) { gh api -X POST "repos/$repo/pages" -f "source[branch]=main" -f "source[path]=/" | Out-Null }
} else {
  Write-Host "請到 repo 的 Settings > Pages，Source 選 main / (root) 後按 Save。" -ForegroundColor Yellow
}
Write-Host ""
Write-Host "完成！約 1～2 分鐘後可開啟：https://chiplus.github.io/shikoku-trip/" -ForegroundColor Green
