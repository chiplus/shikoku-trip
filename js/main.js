/* 入口：建立頁面、切換日期、時鐘與倒數。只建一次畫面，切換時只顯示／隱藏，不會重新整理。 */
import { DAYS } from './data/days.js';
import { dayHtml } from './ui/day-page.js';
import { overviewHtml } from './ui/overview.js';
import { ARR, DEP, DEVTZ, LEAVE, RET, esc, jstNow, pad, store, toMin } from './utils.js';

/* ================= 組裝與切換（只建一次 DOM，切換只改 hidden） ================= */
var app=document.getElementById('app'), nav=document.getElementById('nav');
var views={}, navBtns=[], THEME_META={ov:'#22395c',d1:'#6f5fc4',d2:'#f08a4b',d3:'#1a3259',d4:'#a3271f',d5:'#4b6a21',d6:'#7a5843'};

var DCOL={d1:'#6a52b3',d2:'#d9572a',d3:'#24467a',d4:'#b5302a',d5:'#56762a',d6:'#8f6248'};
function build(){
  var navH='<button class="stop home" data-go="ov" data-view="ov" style="--dc:#22395c"><span class="st-d">總覽</span><i></i><span class="st-l">全部行程</span></button>';
  DAYS.forEach(function(d){navH+='<button class="stop" data-go="'+d.id+'" data-view="'+d.id+'" style="--dc:'+DCOL[d.id]+'"><span class="st-d">'+d.md+'<em class="wd'+((d.wd==='六'||d.wd==='日')?' we':'')+'">('+d.wd+')</em></span><i></i><span class="st-l">'+esc(d.short)+'</span></button>';});
  nav.innerHTML=navH;
  navBtns=[].slice.call(nav.querySelectorAll('button'));

  var frag=document.createDocumentFragment();
  var ov=document.createElement('section'); ov.id='view-ov'; ov.innerHTML=overviewHtml(); ov.hidden=true; frag.appendChild(ov); views.ov=ov;
  DAYS.forEach(function(d,i){
    var el=document.createElement('section'); el.id='view-'+d.id; el.innerHTML=dayHtml(d,i); el.hidden=true; frag.appendChild(el); views[d.id]=el;
  });
  app.innerHTML=''; app.appendChild(frag);
}

var current=null;
function show(id){
  if(!views[id]) id='ov';
  if(id===current) return;
  current=id;
  for(var k in views){ if(Object.prototype.hasOwnProperty.call(views,k)) views[k].hidden=(k!==id); }
  document.body.setAttribute('data-theme',id);
  navBtns.forEach(function(b){ if(b.getAttribute('data-view')===id) b.setAttribute('aria-current','page'); else b.removeAttribute('aria-current'); });
  var meta=document.querySelector('meta[name="theme-color"]'); if(meta) meta.setAttribute('content',THEME_META[id]||'#22395c');
  try{ if(location.hash!=='#'+id) history.replaceState(null,'','#'+id); }catch(e){}
  window.scrollTo(0,0);
  var act=nav.querySelector('[aria-current="page"]');
  if(act){ nav.scrollLeft=Math.max(0,act.offsetLeft-nav.clientWidth/2+act.offsetWidth/2); }
  markNow();
}

/* 旅行當天：標示「現在」與已過行程（只在切換／回到頁面時計算，不用計時器） */
function markNow(){
  var now=jstNow();
  DAYS.forEach(function(d){
    var el=views[d.id]; if(!el) return;
    var evs=el.querySelectorAll('.ev');
    for(var i=0;i<evs.length;i++){
      var e=evs[i]; e.classList.remove('now','past');
      if(d.date!==now.date) continue;
      var s=toMin(e.getAttribute('data-s')), en=toMin(e.getAttribute('data-e'));
      if(s==null) continue;
      if(en==null) en=s+30;
      if(now.min>=en) e.classList.add('past');
      else if(now.min>=s) e.classList.add('now');
    }
  });
}

document.addEventListener('click',function(ev){
  var t=ev.target.closest?ev.target.closest('[data-go]'):null;
  if(t){ ev.preventDefault(); show(t.getAttribute('data-go')); }
});
document.addEventListener('change',function(ev){
  var t=ev.target;
  if(t&&t.getAttribute&&t.getAttribute('data-check')){
    var key=t.getAttribute('data-store')||'shikoku2026-checks';
    var saved=store.get(key)||{};
    saved[t.getAttribute('data-check')]=t.checked;
    store.set(key,saved);
    if(key==='shikoku2026-todo'){
      var el=document.getElementById('todo-left'), n=0;
      document.querySelectorAll('input[data-store="shikoku2026-todo"]').forEach(function(x){ if(!x.checked) n++; });
      if(el) el.textContent=n?('還剩 '+n+' 項'):'全部完成 🎉';
    }
  }
});
window.addEventListener('hashchange',function(){ show((location.hash||'').slice(1)); });
function tick(){
  var t=Date.now(), j=new Date(t+9*3600e3), w=new Date(t+8*3600e3);
  var c=document.getElementById('clock');
  if(c){
    var inJp=(DEVTZ==='Asia/Tokyo')||(t>=ARR&&t<LEAVE), z=inJp?j:w;
    var ch='<span class="cl1">'+(inJp?'日本時間':'台灣時間')+'　'+z.getUTCFullYear()+'/'+pad(z.getUTCMonth()+1)+'/'+pad(z.getUTCDate())+'（'+'日一二三四五六'.charAt(z.getUTCDay())+'）</span><span class="tiles"><b>'+pad(z.getUTCHours())+'</b><em>:</em><b>'+pad(z.getUTCMinutes())+'</b><em>:</em><b>'+pad(z.getUTCSeconds())+'</b></span>';
    if(c.innerHTML!==ch) c.innerHTML=ch;
  }
  var cd=document.getElementById('cd');
  if(cd){
    var h='';
    if(t<DEP){
      var ms=DEP-t, d=Math.floor(ms/864e5), hr=Math.floor(ms%864e5/36e5), mi=Math.floor(ms%36e5/6e4), se=Math.floor(ms%6e4/1e3);
      h='<div class="cd-l">距離出發・10/22（四）台灣 14:30 起飛</div><div class="cd-n"><span><b>'+d+'</b><small>天</small></span><span><b>'+pad(hr)+'</b><small>時</small></span><span><b>'+pad(mi)+'</b><small>分</small></span><span><b>'+pad(se)+'</b><small>秒</small></span></div>';
    } else if(t<RET){
      var now=jstNow(), day=null, idx=0;
      DAYS.forEach(function(x,i){if(x.date===now.date){day=x;idx=i;}});
      var nx=null;
      if(day) day.items.forEach(function(it){var m=toMin(it.s); if(!nx && it.k!=='move' && m!=null && m>=now.min) nx=it;});
      h='<div class="cd-next">'+(day?'旅行第 '+(idx+1)+' 天・'+day.md:'旅行中')+(nx?'<b>下一站 '+esc(nx.s)+'　'+esc(nx.ti)+'</b>':'<b>今天行程都走完了，好好休息 🌙</b>')+'</div>';
    } else {
      h='<div class="cd-next"><b>旅程結束，歡迎回家 🏠</b></div>';
    }
    if(cd.innerHTML!==h) cd.innerHTML=h;
  }
}
var tickTimer=null;
function startTick(){ tick(); if(!tickTimer) tickTimer=setInterval(tick,1000); }
function stopTick(){ if(tickTimer){ clearInterval(tickTimer); tickTimer=null; } }
/* iOS 從背景或上一頁回來時（不重新載入）重新啟動時鐘 */
window.addEventListener('pageshow',function(){ markNow(); startTick(); });
document.addEventListener('visibilitychange',function(){ if(document.hidden){ stopTick(); } else { markNow(); startTick(); } });

build();
startTick();
var initial=(location.hash||'').slice(1);
if(!views[initial]){
  var today=jstNow().date; initial='ov';
  DAYS.forEach(function(d){ if(d.date===today) initial=d.id; });
}
show(initial);
