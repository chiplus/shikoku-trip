/* 每日頁面：時間軸與當日提醒。 */
import { DAYS } from '../data/days.js?v=202610202206';
import { FOOD } from '../data/food.js?v=202610202206';
import { P } from '../data/places.js?v=202610202206';
import { ART } from './art.js?v=202610202206';
import { ferryCard } from './ferry-card.js?v=202610202206';
import { foodHtml } from './food-card.js?v=202610202206';
import { docLink } from './docs-card.js?v=202610202206';
import { routeCard } from './route-map.js?v=202610202206';
import { ICON, esc, ext, mapUrl, navUrl } from '../utils.js?v=202610202206';

/* ================= 每日頁 ================= */
export function eventHtml(it){
  if(it.k==='move'){
    return '<li class="ev move" data-s="'+esc(it.s)+'" data-e="'+esc(it.e)+'"><div class="ev-time">'+esc(it.s)+'</div><div class="ev-dot">🚗</div><div class="ev-body"><div class="ev-title">'+esc(it.ti)+'</div></div></li>';
  }
  var h='<li class="ev'+(it.hl?' hl':'')+'" data-s="'+esc(it.s)+'" data-e="'+esc(it.e)+'">';
  h+='<div class="ev-time">'+esc(it.s)+(it.e?'<span>'+esc(it.e)+'</span>':'')+'</div>';
  h+='<div class="ev-dot">'+(ICON[it.k]||'•')+'</div><div class="ev-body">';
  h+='<div class="ev-title">'+esc(it.ti)+(it.tk?'<span class="badge">'+esc(it.tk)+'</span>':'')+'</div>';
  if(it.p){
    var p=P[it.p], meta=[p.n];
    if(p.jp) meta.push(p.jp);
    if(p.a) meta.push(p.a);
    h+='<div class="ev-place">'+esc(meta.join('・'))+'</div>';
  }
  if(it.n) h+='<p class="ev-note">'+esc(it.n)+'</p>';
  if(it.p && FOOD[it.p]) h+=foodHtml(it.p);
  if(it.p) h+='<div class="ev-btns">'+ext(mapUrl(it.p),'📍 地圖')+ext(navUrl(it.p,it.w),it.w?'🚶 步行導航':'🧭 開車導航')+(P[it.p].web?ext(P[it.p].web,esc(P[it.p].webl)):'')+(it.doc?docLink(it.doc,'📄 訂房憑證'):'')+'</div>';
  if(it.alt){
    it.alt.forEach(function(a){
      if(FOOD[a[0]]){
        h+='<details class="alt"><summary>'+esc(a[1])+'：<b>'+esc(P[a[0]].n)+'</b><span>看菜色 ▾</span></summary>'+foodHtml(a[0])+
           '<div class="ev-btns">'+ext(mapUrl(a[0]),'📍 地圖')+ext(navUrl(a[0],it.w),it.w?'🚶 步行導航':'🧭 開車導航')+'</div></details>';
      } else {
        h+='<div class="ev-alt">'+esc(a[1])+'：<a href="'+mapUrl(a[0])+'" target="_blank" rel="noopener">'+esc(P[a[0]].n)+'</a></div>';
      }
    });
  }
  return h+'</div></li>';
}

export function dayHtml(day,idx){
  var h='<div class="hero">'+ART[day.id]+
        '<div class="kicker">DAY '+(idx+1)+' · '+day.md+'（'+day.wd+'）</div>'+
        '<h1>'+esc(day.title)+'</h1><p class="mood">'+esc(day.mood)+'</p>'+
        '<div class="chips"><span class="chip">🏨 '+esc(day.stayLabel)+'</span>'+(day.stay?'<a class="chip" href="'+mapUrl(day.stay)+'" target="_blank" rel="noopener">📍 住宿地圖</a>':'')+'</div></div>';
  h+='<div class="dgrid"><div class="col-a">'+routeCard(day)+'</div><div class="col-b">';
  if(day.ferry) h+=ferryCard();
  h+='<section class="card"><h2>🕘 行程表<span class="sub">日本時間</span></h2><ol class="tl">';
  day.items.forEach(function(it){h+=eventHtml(it);});
  h+='</ol></section>';
  h+='<div class="tips"><h3>⚠️ 當日提醒</h3><ul>';
  day.tips.forEach(function(t){h+='<li>'+esc(t)+'</li>';});
  h+='</ul>';
  if(day.tipLinks){h+='<div class="row-btns">';day.tipLinks.forEach(function(t){h+=ext(mapUrl(t[0]),'📍 '+esc(t[1]))+(P[t[0]].web?ext(P[t[0]].web,esc(P[t[0]].webl)):'');});h+='</div>';}
  h+='</div></div></div>';
  var prev=DAYS[idx-1], next=DAYS[idx+1];
  h+='<div class="pager">'+(prev?'<button class="btn" data-go="'+prev.id+'">← '+prev.md+' '+esc(prev.short)+'</button>':'<button class="btn" data-go="ov">← 總覽</button>')+
     (next?'<button class="btn pri" data-go="'+next.id+'">'+next.md+' '+esc(next.short)+' →</button>':'<button class="btn pri" data-go="ov">回總覽</button>')+'</div>';
  return h;
}
