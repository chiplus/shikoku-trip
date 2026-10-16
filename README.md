# 四國家族旅行 2026（10/22–10/27）

公開網址：https://chiplus.github.io/shikoku-trip/

純靜態網站（HTML + CSS + JavaScript 模組），不需要安裝任何套件，GitHub Pages 直接就能跑。

## 資料夾結構

```
shikoku-trip/
├─ index.html            頁面骨架（標題列、日期選單）
├─ css/style.css         所有樣式與每天的配色
├─ js/
│  ├─ main.js            入口：建立頁面、切換日期、時鐘倒數
│  ├─ utils.js           共用小工具（地圖連結、時間計算）
│  ├─ data/              ← 改行程主要改這裡
│  │  ├─ days.js         每天的時間表、路線圖、提醒
│  │  ├─ places.js       地點（名稱、地圖搜尋字、地址、官網）
│  │  ├─ food.js         餐廳（營業時間、低消、菜色、訂位連結）
│  │  ├─ checklist.js    待確認清單
│  │  ├─ ferry.js        渡輪船票
│  │  └─ geo.js          路線圖底圖（自動產生，勿手改）
│  └─ ui/                畫面元件（通常不用動）
├─ apple-touch-icon.png  iPhone「加入主畫面」的圖示
└─ publish.ps1           一鍵上架到 GitHub
```

## 常見修改

- **改某個時段**：`js/data/days.js` 找到那天的 `items`，每一筆是 `{s:'開始', e:'結束', ti:'標題', p:'地點代號', n:'備註'}`。
- **新增地點**：先在 `js/data/places.js` 加一筆 `代號:{n:'顯示名稱', q:'Google 地圖搜尋字'}`，再到 `days.js` 用 `p:'代號'` 引用。
- **改餐廳菜色／價格**：`js/data/food.js`，`dishes` 每一筆是 `['日文品名','中文名稱','內容說明','價格']`。
- **待確認清單**：`js/data/checklist.js`，`d` 是排序用日期，`due` 是顯示文字。

## 在 VS Code 預覽

這個網站用 JavaScript 模組，**直接雙擊 index.html 會是空白**，要用本機伺服器開：

1. 安裝 VS Code 擴充功能「Live Server」（開資料夾時右下角會提示推薦）。
2. 在 `index.html` 上按右鍵 →「Open with Live Server」。

## 上架／更新

在 VS Code 終端機（PowerShell）、這個資料夾裡執行：

```powershell
powershell -ExecutionPolicy Bypass -File .\publish.ps1
```

第一次會建立公開 repo 並開啟 GitHub Pages；之後每次改完再跑一次就會更新。
GitHub Pages 有約 10 分鐘快取，手機若還看到舊版，關掉分頁重開即可。

## 穩定性設計（避免閃退、重複整理）

- 不嵌入 Google 地圖、不載入外部套件與圖片，路線圖是靜態 SVG。
- 沒有 Service Worker、沒有自動重新整理；畫面只建立一次，切換日期只顯示／隱藏。
- 時鐘每秒只更新那幾個數字；手機切到背景就暫停。
