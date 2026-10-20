/* 出發前要辦的事：d 是期限（排序用），due 是顯示文字，link 是可選的連結 [網址, 按鈕文字]。新增一筆就照格式加在下面。 */
export var TODO = [
  {id:'esim', d:'2026-10-20', due:'10/20（二）前', tx:'買日本 eSIM（10/22–10/27 共 6 天，每支手機一張）。出發前先在 iPhone「設定 > 行動服務 > 加入 eSIM」安裝，落地後再打開數據漫遊。'},
  {id:'vjw', d:'2026-10-21', due:'10/21（三）前', tx:'Visit Japan Web：建立帳號、登錄護照，填「入境審查」和「海關申報」，取得 QR Code 後截圖。日本聯絡地址填第一晚：APA Hotel 高松空港，〒761-1402 香川県高松市香南町由佐2425-2，電話 087-879-1111。',
   link:['https://services.digital.go.jp/visit-japan-web/','Visit Japan Web 官方說明']},
  {id:'vjw-qr', d:'2026-10-21', due:'10/21（三）前', tx:'每個人把 Visit Japan Web 的 QR Code 截圖傳給 Kiwi；Kiwi 放進專案的 vjw 資料夾（Allen.png、Lica.png、Lapeark.png、Kiwi.png）再執行上架，大家打開網站看到的就一樣。相簿的截圖也自己留一份。'},
  {id:'cancel', d:'2026-10-21', due:'10/21（三）', tx:'APA 和道後やや免費取消到 10/21（道後やや到日本時間 23:59）；行程確定不改就不用做任何事。'},
  {id:'budget-ci', d:'2026-10-21', due:'10/21（三）前', tx:'Budget 租車「オンラインチェックイン」（事前報到＋付款），取車會比較快；不做也可以，就是到櫃台現場付款。在 Budget 預約 App 的預約畫面按「オンラインチェックイン」。'},
  {id:'ci-out', d:'2026-10-22', due:'10/20 14:30 起～10/22 出發前', tx:'華航 CI178 網路報到（起飛前 48 小時開放、1 小時前關閉），4 人同一筆訂位可一起報到。',
   link:['https://apps.apple.com/tw/app/%E4%B8%AD%E8%8F%AF%E8%88%AA%E7%A9%BA-app/id1093021450','中華航空 App']},
  {id:'card-cash', d:'2026-10-21', due:'出發前', tx:'交通卡（10/25 琴平）：SHIKOKU ICOCA × 2＋IruCa × 3，共約 10,000 円，車站窗口要付現金，先把日圓準備好。'},
  {id:'docs-save', d:'2026-10-21', due:'出發前', tx:'把訂房憑證、船票 PDF 存進 iPhone「檔案」App（離線也能看）。'},
  {id:'ci-back', d:'2026-10-27', due:'10/25 18:55 起（日本時間）', tx:'華航 CI179 回程網路報到（起飛前 48 小時開放）。'}
];
