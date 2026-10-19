/* 每日行程：路線圖節點、交通時間、時間表、當日提醒。改行程主要改這個檔。 */
/* ================= 每日資料 ================= */
export var DAYS = [
{
  id:'d1', date:'2026-10-22', md:'10/22', wd:'四', short:'抵達',
  title:'抵達高松、取車', mood:'夜航降落讚岐，先吃飯、取車，再買第一串晴王葡萄。',
  stay:'apa', stayLabel:'APA Hotel 高松空港',
  gmaps:['tak','budget','kyoei','apa'],
  route:{
    nodes:[
      {id:'tpe',px:[30,100],label:'桃園 TPE',lp:'n',ghost:true},
      {id:'tak',ll:[134.0156,34.2142],dx:-40,dy:15,label:'高松機場',sub:'晚餐',lp:'s'},
      {id:'budget',ll:[134.026,34.2085],dx:18,dy:25,label:'Budget 取車',lp:'e'},
      {id:'kyoei',ll:[134.041,34.2385],dx:36,dy:-13,label:'キョーエイ',sub:'晴王葡萄',lp:'e'},
      {id:'apa',ll:[134.0235,34.2200],dx:-21,dy:-35,label:'APA 飯店',lp:'n'}
    ],
    labels:[[134.03,34.382,'瀨 戶 內 海'],[134.046,34.318,'高松市區'],[133.86,34.10,'香川縣']],
    zoom:{ll:[134.026,34.222],r:68,label:'機場周邊・放大示意'},
    legs:[
      {a:'tpe',b:'tak',m:'flight',t:'2h35m',tl:'CI178 飛行約 2 小時 35 分'},
      {a:'tak',b:'budget',m:'shuttle',t:'5分',tl:'Budget 接駁車約 5 分',bend:-.5},
      {a:'budget',b:'kyoei',m:'drive',t:'15分',min:15},
      {a:'kyoei',b:'apa',m:'drive',t:'15分',min:15}
    ]
  },
  items:[
    {s:'15:30',e:'18:05',k:'flight',ti:'CI178 桃園 TPE → 高松 TAK',p:'tak',n:'台灣 14:30 起飛；日本 18:05 抵達（台灣時間 17:05）。'},
    {s:'18:45',e:'19:20',k:'food',ti:'晚餐：エリエール 高松空港店',p:'eliel',w:1,n:'在機場內，取車前先吃晚餐。'},
    {s:'19:30',e:'19:45',k:'car',ti:'Budget 高松機場取車',p:'budget',hl:1,n:'櫃台 20:00 關閉，勿拖太晚。取車時請一併問：① 這台 VOXY 可否開上渡輪去小豆島；② 車検証（車檢證）放在車上哪裡——10/26 買船票必須出示。'},
    {s:'19:45',e:'20:30',k:'grape',ti:'買晴王葡萄（シャインマスカット）',p:'kyoei',n:'庫存未確認，當晚食用。',alt:[['donki','備案']]},
    {s:'20:30',e:'',k:'stay',ti:'前往 APA 飯店入住',p:'apa',doc:'apa',n:'2 間雙床房。入住要出示訂房人護照；住宿稅現場另付。'}
  ],
  tips:['取車時間 19:30；日曆註記 Budget 櫃台 20:00 關閉。','葡萄庫存未確認；備案 Don Quijote パウ高松店。']
},
{
  id:'d2', date:'2026-10-23', md:'10/23', wd:'五', short:'今治道後',
  title:'今治、下灘、道後溫泉', mood:'從毛巾之城一路往西，到海邊小車站看海，晚上泡道後。',
  stay:'yaya', stayLabel:'道後 YAYA 飯店（住兩晚）',
  gmaps:['apa','towel','shigematsu','shimonada','yaya'],
  route:{
    nodes:[
      {id:'apa',px:[327,96],label:'APA',sub:'往高松 →',lp:'s'},
      {id:'towel',ll:[132.930,33.987],label:'今治毛巾美術館',lp:'s'},
      {id:'shigematsu',ll:[132.996,34.058],dx:-1,dy:2,label:'重松飯店',sub:'今治・午餐',lp:'n'},
      {id:'shimonada',ll:[132.584,33.714],dx:15,dy:20,label:'下灘車站',lp:'e'},
      {id:'dogo',ll:[132.7865,33.852],label:'道後',sub:'飯店・本館・晚餐・葡萄',lp:'e'}
    ],
    labels:[[133.30,34.08,'燧　灘'],[133.20,33.74,'愛媛縣'],[132.56,33.95,'伊予灘']],
    legs:[
      {a:'apa',b:'towel',m:'drive',t:'1h50m',min:110,bend:.12},
      {a:'towel',b:'shigematsu',m:'drive',t:'20分',min:20,bend:-1.3},
      {a:'shigematsu',b:'shimonada',m:'drive',t:'1h20m',min:80,bend:.38},
      {a:'shimonada',b:'dogo',m:'drive',t:'50分',min:50,bend:-.15}
    ]
  },
  items:[
    {s:'07:00',e:'08:00',k:'food',ti:'早餐：APA 飯店',n:'訂房方案沒有寫含早餐；網路資料有說 6:30～9:30 提供免費麵包咖啡，入住時問櫃台。'},
    {s:'08:30',e:'11:25',k:'sight',ti:'飯店出發 → 今治毛巾美術館',p:'towel',n:'含車程約 1 小時 50 分＋參觀。'},
    {s:'11:45',e:'13:00',k:'food',ti:'午餐：重松飯店（今治焼豚玉子飯）',p:'shigematsu',n:'11:45 開門，尖峰排隊約 20 分鐘；週五只有中午營業。'},
    {s:'13:00',e:'16:30',k:'sight',ti:'下灘車站',p:'shimonada',n:'含車程約 1 小時 20 分；海邊小車站，停留拍照。'},
    {s:'16:30',e:'18:00',k:'stay',ti:'前往道後 YAYA 飯店、入住',p:'yaya',doc:'yaya',n:'車程約 50 分。住兩晚（含早餐），10/25 11:00 退房。到店付款，入住時要付清房費。'},
    {s:'18:00',e:'19:30',k:'food',ti:'晚餐：秋嘉 道後店（松山鯛魚飯）',p:'akiyoshi',w:1,n:'這趟的鯛魚飯就是這一餐。常客滿、傍晚可能賣完，建議 18:00 前到。',alt:[['otora','備案（宇和島式）']]},
    {s:'19:30',e:'21:00',k:'onsen',ti:'道後溫泉本館泡湯',p:'honkan',w:1},
    {s:'21:15',e:'21:45',k:'grape',ti:'買晴王葡萄',p:'fujidogo',w:1}
  ],
  tips:['以上時段包含移動與停留，結束時間為估計。','重松飯店週一公休、週五只有中午 11:45～13:45；店前 11 個車位。','秋嘉週三公休、晚餐 17:00～20:30，傍晚可能賣完；備案是附近的おとら（宇和島式，可 AutoReserve 代訂）。','若 17:30 前就到道後，可先逛商店街的寺子屋本舗（18:00 關門），否則排在 10/24 早上。']
},
{
  id:'d3', date:'2026-10-24', md:'10/24', wd:'六', short:'松山購物',
  title:'松山購物與燒肉百名店', mood:'仙貝、丹寧、蕎麥麵、球鞋、登山用品，晚上吃燒肉百名店。',
  stay:'yaya', stayLabel:'道後 YAYA 飯店（續住）',
  gmaps:['yaya','jeans','iyookina','depo','montbell','emifull','enyaki','yaya'],
  route:{
    nodes:[
      {id:'dogo',ll:[132.7865,33.852],label:'道後',sub:'寺子屋・飯店',lp:'e'},
      {id:'jeans',ll:[132.760,33.893],label:'JEANS FACTORY',lp:'e'},
      {id:'iyookina',ll:[132.722,33.792],dx:25,dy:0,label:'いよ翁',sub:'午餐',lp:'e'},
      {id:'depo',ll:[132.727,33.812],dx:-25,dy:8,label:'On・HOKA',lp:'w'},
      {id:'montbell',ll:[132.740,33.830],dx:40,dy:-15,label:'mont-bell',lp:'s'},
      {id:'emifull',ll:[132.709,33.785],dx:-16,label:'エミフル・焼肉苑',sub:'購物・晚餐',lp:'s'}
    ],
    labels:[[132.675,33.88,'伊予灘'],[132.78,33.775,'松山市']],
    legs:[
      {a:'dogo',b:'jeans',m:'drive',t:'25分',min:25,bend:.2},
      {a:'jeans',b:'iyookina',m:'drive',t:'40分',min:40,bend:0.3,pp:0.25},
      {a:'iyookina',b:'depo',m:'drive',t:'10分',min:10,bend:-0.5,pp:0.5},
      {a:'depo',b:'montbell',m:'drive',t:'10分',min:10,bend:0.5},
      {a:'montbell',b:'emifull',m:'drive',t:'20分',min:20,bend:0.5,pp:0.65},
      {a:'emifull',b:'dogo',m:'drive',t:'35分',min:35,bend:-0.4,pp:0.7}
    ],
    extra:[{m:'drive',tx:'エミフル → 焼肉苑',tl:'開車 約 5 分',min:5}]
  },
  items:[
    {s:'08:00',e:'09:30',k:'food',ti:'飯店早餐',n:'道後やや早餐 6:20～10:30（最後入場 10:00），招牌是現做法式吐司。'},
    {s:'10:00',e:'10:20',k:'shop',ti:'寺子屋本舗 道後店（仙貝）',p:'terakoya',w:1,n:'10:00 開門；現烤仙貝、濕仙貝，店內有免費茶。從飯店走路過去。'},
    {s:'10:25',e:'10:50',k:'move',ti:'開車往 JEANS FACTORY（約 25 分）'},
    {s:'10:50',e:'11:35',k:'shop',ti:'JEANS FACTORY 松山店',p:'jeans',n:'停留 45 分鐘。'},
    {s:'11:35',e:'12:15',k:'move',ti:'開車到 いよ翁（約 40 分）'},
    {s:'12:15',e:'13:10',k:'food',ti:'午餐：手打ち蕎麦 いよ翁',p:'iyookina',n:'蕎麥麵百名店，週六中午可能要排隊。'},
    {s:'13:20',e:'14:05',k:'shop',ti:'スポーツデポ松山余戸店（On・HOKA）',p:'depo',hl:1,n:'跑鞋區有 On 和 HOKA 的品牌專區，媽媽可以試穿。營業 10:00～21:00。'},
    {s:'14:15',e:'14:55',k:'shop',ti:'mont-bell 松山店',p:'montbell',n:'營業時間官網查不到，出發前確認。'},
    {s:'14:55',e:'15:15',k:'move',ti:'開車到 エミフルMASAKI（約 20 分）'},
    {s:'15:15',e:'18:45',k:'shop',ti:'逛 エミフルMASAKI（約 3.5 小時）',p:'emifull',n:'2 樓 ABC-MART GRAND STAGE 也有 HOKA。午餐在外面吃過，這段全部是逛街時間。'},
    {s:'19:00',e:'20:30',k:'food',ti:'晚餐：焼肉苑（燒肉百名店）',p:'enyaki',n:'離エミフル約 5 分鐘。可線上訂位，建議先訂 19:00、4 位。'},
    {s:'20:30',e:'21:05',k:'move',ti:'開車回道後 YAYA 飯店（約 35 分）'},
    {s:'21:10',e:'21:40',k:'grape',ti:'買晴王葡萄',p:'fujidogo',w:1,n:'營業時間未確認，太晚就改隔天。'}
  ],
  tips:['店與店之間的車程是依地圖距離估計，週六可能塞車；エミフル的時間可以彈性調整。','On／HOKA 尺寸與顏色庫存未確認；エミフル的 ABC-MART 也有 HOKA，可以比較後再買。','焼肉苑週二、三公休，人均約 8,000～10,000円；建議先線上訂位。','いよ翁週二公休、中午 11:00～15:00，蕎麥麵賣完就提早收。']
},
{
  id:'d4', date:'2026-10-25', md:'10/25', wd:'日', short:'琴平高松',
  title:'金刀比羅宮、前往高松', mood:'參道烏龍麵、石階參拜，傍晚換到高松住。',
  stay:'fav', stayLabel:'FAV HOTEL TAKAMATSU（住兩晚）',
  gmaps:['yaya','kpark','fav'],
  route:{
    nodes:[
      {id:'dogo',ll:[132.7865,33.852],label:'道後',lp:'s'},
      {id:'koto',ll:[133.8215,34.1915],label:'琴平',sub:'停車・烏龍麵',lp:'s'},
      {id:'shrine',ll:[133.809,34.184],dx:-28,dy:4,label:'金刀比羅宮',lp:'w'},
      {id:'fav',ll:[134.056,34.339],dx:-4,dy:16,label:'FAV 飯店',sub:'拉麵・葡萄 來回 20 分',lp:'n'}
    ],
    labels:[[133.25,34.20,'燧　灘'],[133.10,33.86,'愛媛縣'],[134.05,34.20,'香川縣'],[134.25,34.44,'瀨戶內海']],
    legs:[
      {a:'dogo',b:'koto',m:'drive',t:'1h45m',min:105,bend:.15},
      {a:'koto',b:'shrine',m:'walk',np:1,t:'步行',tl:'步行＋石階（依體力調整）',bend:.25},
      {a:'koto',b:'fav',m:'drive',t:'1h',min:60,bend:-.25}
    ],
    extra:[{m:'drive',tx:'FAV ↔ 讃岐ロック・マルナカ',tl:'晚餐＋葡萄 來回約 20 分',min:20}
    ]
  },
  items:[
    {s:'08:00',e:'09:00',k:'food',ti:'道後 YAYA 飯店早餐'},
    {s:'09:15',e:'11:00',k:'move',ti:'開車：道後 → 琴平（約 1 小時 45 分）'},
    {s:'11:00',e:'11:15',k:'car',ti:'停車：町営駅前停車場',p:'kpark'},
    {s:'11:15',e:'12:30',k:'food',ti:'午餐：こんぴらうどん 参道店',p:'kudon',w:1,n:'營業情況待確認。'},
    {s:'12:30',e:'14:00',k:'shrine',ti:'金刀比羅宮參拜',p:'shrine',w:1,hl:1,n:'依長輩體力調整，不上奧社。車輛接近參拜處的安排尚未確認，勿視為已有接送。'},
    {s:'14:15',e:'15:15',k:'stay',ti:'開車：琴平 → 高松，入住 FAV',p:'fav',doc:'fav',n:'15:00 起入住；停車位已預約。入住要出示訂房人護照（可能也要付款信用卡），住宿稅現場另付。'},
    {s:'15:15',e:'17:30',k:'rest',ti:'休息／自由時間'},
    {s:'18:00',e:'19:15',k:'food',ti:'晚餐：支那そば 讃岐ロック（香川拉麵）',p:'sanukirock',n:'晚上 18:00 開。週日營業時間沒有特別寫，出發前再確認。',alt:[['suzumushi','備案（附近）']]},
    {s:'19:45',e:'20:30',k:'grape',ti:'買晴王葡萄',p:'marunaka'}
  ],
  tips:['金刀比羅宮依長輩體力調整，不上奧社；車輛接近參拜處的安排尚未確認。','雨天備案：不去琴平，改逛 ゆめタウン高松。','午餐營業情況待確認（官網寫不定期營業）。','晚餐讃岐ロック週三公休、晚上 18:00～21:00；備案是附近的らぁ麺すずむし（週二休）。'],
  tipLinks:[['youme','雨天備案：ゆめタウン高松']]
},
{
  id:'d5', date:'2026-10-26', md:'10/26', wd:'一', short:'小豆島',
  title:'小豆島一日遊', mood:'連車搭渡輪上島：紅葉纜車、手延素麵、醬油藏、橄欖與天使之路。',
  stay:'fav', stayLabel:'FAV HOTEL TAKAMATSU（續住）',
  gmaps:['tonosho','kounkei','nakabu','yamaroku','olive','angel','tonosho'],
  ferry:true,
  route:{
    nodes:[
      {id:'tkp',px:[79,216],label:'高松港',sub:'↙ 往高松・FAV',lp:'e'},
      {id:'tonosho',ll:[134.182,34.4862],dx:2,dy:2,label:'土庄港',lp:'w'},
      {id:'kounkei',ll:[134.286,34.498],dy:-12,label:'寒霞溪纜車',lp:'n'},
      {id:'nakabu',ll:[134.315,34.4835],dx:9,dy:26,label:'なかぶ庵',sub:'午餐',lp:'s'},
      {id:'yamaroku',ll:[134.336,34.486],dx:2,dy:-14,label:'ヤマロク',sub:'醬油',lp:'n'},
      {id:'olive',ll:[134.2735,34.466],dx:-5,dy:-11,label:'橄欖公園',lp:'s'},
      {id:'angel',ll:[134.189,34.481],dx:31,dy:-4,label:'天使之路',lp:'n'}
    ],
    labels:[[134.20,34.395,'瀨 戶 內 海'],[134.24,34.525,'小 豆 島']],
    legs:[
      {a:'tkp',b:'tonosho',m:'ferry',t:'去 09:00',tl:'渡輪 第4便 09:00 → 10:00（1 小時）',bend:.28},
      {a:'tonosho',b:'kounkei',m:'drive',t:'40分',min:40,bend:.32},
      {a:'kounkei',b:'nakabu',m:'drive',t:'30分',min:30,bend:-.35},
      {a:'nakabu',b:'yamaroku',m:'drive',t:'10分',min:10,bend:1.1},
      {a:'yamaroku',b:'olive',m:'drive',t:'20分',min:20,bend:-.25},
      {a:'olive',b:'angel',m:'drive',t:'30分',min:30,bend:-0.7,pp:0.6},
      {a:'angel',b:'tonosho',m:'drive',t:'10分',min:10,bend:-1.6},
      {a:'tonosho',b:'tkp',m:'ferry',t:'回 17:30',tl:'渡輪 第12便 17:30 → 18:30（1 小時）',bend:.28}
    ]
  },
  items:[
    {s:'08:00',e:'08:15',k:'food',ti:'早餐（快速用餐或外帶）',n:'飯店早餐供應未確認。'},
    {s:'08:15',e:'08:25',k:'move',ti:'FAV 飯店 → 高松港（約 10 分）'},
    {s:'08:25',e:'08:30',k:'ferry',ti:'高松港報到（最晚 08:30）',p:'takport',hl:1,n:'到售票窗口：出示車検証、現場付款（約 8,430 円）、說出預約號碼。'},
    {s:'09:00',e:'10:00',k:'ferry',ti:'渡輪：高松港 → 土庄港',tk:'第4便・已預約'},
    {s:'10:45',e:'11:45',k:'sight',ti:'寒霞溪纜車、展望',p:'kounkei',n:'從紅雲亭站搭；強風可能停駛。'},
    {s:'12:15',e:'13:00',k:'food',ti:'午餐：なかぶ庵 素麵',p:'nakabu',n:'尚未預約，需前一天前預約；週三、四公休，10/26（一）有營業。',alt:[['olivaz','備案']]},
    {s:'13:10',e:'13:40',k:'sight',ti:'ヤマロク醬油',p:'yamaroku',n:'參觀前勿吃納豆；最後巷路較窄，開車慢行。'},
    {s:'14:00',e:'15:00',k:'sight',ti:'小豆島橄欖公園',p:'olive'},
    {s:'15:30',e:'16:20',k:'sight',ti:'天使之路',p:'angel',n:'依現場潮位、天候與安全調整，不保證可通行。'},
    {s:'16:40',e:'17:00',k:'ferry',ti:'土庄港報到（最晚 17:00）',p:'tonosho',hl:1,n:'現場付回程船資（約 8,430 円）。'},
    {s:'17:30',e:'18:30',k:'ferry',ti:'渡輪：土庄港 → 高松港',tk:'第12便・已預約'},
    {s:'18:45',e:'20:00',k:'food',ti:'晚餐：骨付鳥 一鶴 高松店',p:'ikkaku',n:'下船後直接過去，現場排隊；週一有營業（週二才公休）。',alt:[['takosan','備案（排太久時）']]},
    {s:'20:00',e:'20:45',k:'grape',ti:'買晴王葡萄',p:'marunaka'}
  ],
  tips:['船票已預約（見上方船票卡），但 VOXY 連車上船、租車公司是否允許跨海仍待確認；出發前重查船班。','FAV 早餐要訂含早方案才有，時間入住時問。なかぶ庵需前一天前預約；備案 OLIVAZ。','晚餐一鶴現場排隊；排太久可改附近的たこ讃（可用 AutoReserve 代訂）。','寒霞溪遇強風可能停駛；天使之路依潮位、天候與安全調整。','ヤマロク參觀前勿吃納豆；最後巷路較窄，開車慢行。']
},
{
  id:'d6', date:'2026-10-27', md:'10/27', wd:'二', short:'返台',
  title:'購物、還車、返台', mood:'買毛巾、逛 AEON，15:55 前到機場（起飛前 3 小時）。',
  stay:null, stayLabel:'返台',
  gmaps:['fav','skillet','aeonmall','budget'],
  route:{
    nodes:[
      {id:'fav',ll:[134.056,34.339],label:'FAV 飯店',lp:'e'},
      {id:'skillet',ll:[134.058,34.293],dx:6,dy:12,label:'SKILLET',sub:'育てるタオル',lp:'e'},
      {id:'aeon',ll:[133.9998,34.3265],dx:-30,dy:6,label:'AEON 高松',sub:'午餐・購物',lp:'s'},
      {id:'budget',ll:[134.026,34.2085],dx:20,dy:10,label:'Budget 還車',lp:'e'},
      {id:'tak',ll:[134.0156,34.2142],dx:-16,dy:-4,label:'高松機場',lp:'s'},
      {id:'tpe',px:[26,200],label:'桃園',lp:'n',ghost:true}
    ],
    labels:[[133.995,34.338,'瀨 戶 內 海'],[133.97,34.24,'香川縣']],
    legs:[
      {a:'fav',b:'skillet',m:'drive',t:'20分',min:20,bend:.15},
      {a:'skillet',b:'aeon',m:'drive',t:'20分',min:20,bend:.15},
      {a:'aeon',b:'budget',m:'drive',t:'30分',min:30,bend:.12},
      {a:'budget',b:'tak',m:'shuttle',t:'5分',tl:'Budget 接駁車約 5 分',bend:.9},
      {a:'tak',b:'tpe',m:'flight',t:'3h10m',tl:'CI179 飛行約 3 小時 10 分',bend:.25}
    ]
  },
  items:[
    {s:'10:00',e:'',k:'stay',ti:'FAV HOTEL 退房',p:'fav',n:'退房時間 10:00。'},
    {s:'10:20',e:'11:00',k:'shop',ti:'SKILLET 高松店（育てるタオル）',p:'skillet',n:'10:00 開門。有沒有賣育てるタオル查不到，建議先打電話 087-869-0151 問。'},
    {s:'11:20',e:'12:00',k:'shop',ti:'逛 AEON MALL 高松',p:'aeonmall',n:'專門店 10:00～21:00、餐廳街 11:00 起。'},
    {s:'12:00',e:'13:00',k:'food',ti:'午餐：鎌倉パスタ（AEON 高松）',p:'aeon'},
    {s:'13:00',e:'14:35',k:'shop',ti:'繼續逛 AEON',p:'aeonmall',n:'14:35 一定要離開。'},
    {s:'14:35',e:'14:50',k:'car',ti:'加滿油',n:'還車要加滿油，在機場附近的加油站加。'},
    {s:'15:15',e:'15:35',k:'car',ti:'還車：Budget 高松機場店',p:'budget',hl:1,n:'開到 Budget 約 30 分。還車後搭接駁車到機場。'},
    {s:'15:45',e:'15:55',k:'flight',ti:'抵達高松機場、辦理報到',p:'tak',hl:1,n:'目標 15:55 前到（起飛前 3 小時）。'},
    {s:'18:55',e:'22:05',k:'flight',ti:'CI179 高松 TAK → 桃園 TPE',p:'tak',n:'日本 18:55 起飛；台灣 21:05 抵達（接機看這個時間）。'}
  ],
  tips:['15:55 要到機場：AEON 最晚 14:35 離開，加油後 15:15 前到 Budget。','如果 10/24 沒買到 On，備案是スポーツデポ 高松伏石店（On 官方經銷店），可插在 SKILLET 和 AEON 之間。','這份行程未另確認航班是否變更；出發前重查。']
}
];
