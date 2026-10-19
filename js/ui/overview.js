/* 總覽頁：倒數、六天卡片、航班住宿、待確認清單。 */
import { CHECKS } from '../data/checklist.js?v=202610191732';
import { TODO } from '../data/todo.js?v=202610191732';
import { docsCard } from './docs-card.js?v=202610191732';
import { DAYS } from '../data/days.js?v=202610191732';
import { ART } from './art.js?v=202610191732';
import { ferryCard } from './ferry-card.js?v=202610191732';
import { esc, jstNow, mapUrl, store } from '../utils.js?v=202610191732';

/* ================= 總覽頁 ================= */
export function overviewHtml(){
  var now=jstNow();
  var start=Date.UTC(2026,9,22), today=Date.parse(now.date+'T00:00:00Z');
  var diff=Math.round((start-today)/864e5);
  var h='<div class="hero">'+ART.ov+'<div class="kicker">SHIKOKU FAMILY TRIP</div><h1>四國家族旅行</h1>'+
        '<p class="mood">2026.10.22（四）– 10.27（二）<br>高松・今治・道後・松山・琴平・小豆島</p>'+
        '<div class="cd" id="cd"></div>'+
        '<div class="chips"><span class="chip">🚗 Budget 租車 VOXY</span><span class="chip">👨‍👩‍👧 4 人</span></div></div>';
  h+='<div class="grid" style="margin-top:14px">';
  DAYS.forEach(function(d,i){
    h+='<button class="dcard dc-'+d.id+'" data-go="'+d.id+'"><div><small>DAY '+(i+1)+' · '+d.md+'（'+d.wd+'）</small><b>'+esc(d.title)+'</b></div><span>🏨 '+esc(d.stayLabel)+'</span></button>';
  });
  h+='</div>';
  var done=store.get('shikoku2026-todo')||{};
  var left=TODO.filter(function(t){return !done[t.id];}).length;
  h+='<div class="ogrid"><div>';
  h+='<section class="card todo"><h2>📝 出發前要辦的事<span class="sub" id="todo-left">還剩 '+left+' 項</span></h2><ol class="checks">';
  TODO.slice().sort(function(a,b){return a.d<b.d?-1:a.d>b.d?1:0;}).forEach(function(c){
    var st=c.d<now.date?'over':(c.d===now.date?'today':'');
    h+='<li class="'+st+'"><label><input type="checkbox" data-store="shikoku2026-todo" data-check="'+c.id+'"'+(done[c.id]?' checked':'')+'><span class="ck-tx"><span class="due">'+esc(c.due)+'</span>'+esc(c.tx)+'</span></label>'+
       (c.link?'<a class="todo-link" href="'+c.link[0]+'" target="_blank" rel="noopener">🔗 '+esc(c.link[1])+'</a>':'')+'</li>';
  });
  h+='</ol></section></div><div>'+docsCard()+'</div></div>';
  h+='<div class="ogrid"><div>';
  h+='<section class="card"><h2>✈️ 航班<span class="sub">接送看台灣時間</span></h2><dl class="kv">'+
     '<dt>去程 10/22</dt><dd><b>CI178</b> 桃園 → 高松<br>台灣 14:30 起飛・日本 18:05 抵達</dd>'+
     '<dt>回程 10/27</dt><dd><b>CI179</b> 高松 → 桃園<br>日本 18:55 起飛・<b>台灣 21:05 抵達</b></dd></dl></section>';
  h+='<section class="card"><h2>🏨 住宿</h2><dl class="kv">'+
     '<dt>10/22</dt><dd><a href="'+mapUrl('apa')+'" target="_blank" rel="noopener">APA Hotel 高松空港</a></dd>'+
     '<dt>10/23–24</dt><dd><a href="'+mapUrl('yaya')+'" target="_blank" rel="noopener">道後 YAYA 飯店</a>（10/25 退房）</dd>'+
     '<dt>10/25–26</dt><dd><a href="'+mapUrl('fav')+'" target="_blank" rel="noopener">FAV HOTEL TAKAMATSU</a>（15:00 入住・停車位已預約・10/27 退房）</dd></dl></section>';
  h+='</div><div>'+ferryCard()+'</div></div>';
  var saved=store.get('shikoku2026-checks')||{};
  h+='<section class="card"><h2>✅ 待確認清單<span class="sub">依時間排序・勾選存在這支手機</span></h2><ol class="checks">';
  CHECKS.slice().sort(function(a,b){return a.d<b.d?-1:a.d>b.d?1:0;}).forEach(function(c){
    var st=c.d<now.date?'over':(c.d===now.date?'today':'');
    h+='<li class="'+st+'" data-d="'+c.d+'"><label><input type="checkbox" data-check="'+c.id+'"'+(saved[c.id]?' checked':'')+'><span class="ck-tx"><span class="due">'+esc(c.due)+'</span>'+esc(c.tx)+'</span></label></li>';
  });
  h+='</ol></section>';
  h+='<div class="tips"><h3>📌 閱讀提醒</h3><ul>'+
     '<li>時間一律為日本時間（比台灣快 1 小時）；航班另列台灣時間。</li>'+
     '<li>這是規劃行程，不代表所有餐廳都已訂妥；交通、停留時間多為估計，依路況、天候與家人體力調整。</li>'+
     '<li>路線圖底圖為真實海岸線與縣界，相鄰地點略為錯開以免重疊，車程為一般路況預估；實際以 Google 地圖導航為準。</li>'+
     '</ul></div>';
  h+='<p class="foot">依 10/15 日曆內容與 10/15 四国フェリー確認信整理；之後若有變動，以最新行程為準。</p>';
  return h;
}
