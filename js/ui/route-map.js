/* 路線圖與交通時間卡片的畫面。 */
import { GEO } from '../data/geo.js?v=202610192129';
import { MODE_IC, MODE_TX, esc, ext, fmtMin, mapUrl, routeUrl, textW } from '../utils.js?v=202610192129';

/* ================= 路線圖 ================= */
export function routeSVG(day){
  var r=day.route, N={}, s='', pills='', nodes='', i;
  var G=GEO[day.id];
  r.nodes.forEach(function(n){
    if(!n._p){
      if(n.px) n._p=n.px;
      else{var t=G.t;n._p=[(n.ll[0]-t[0])*t[2]*t[3]+(n.dx||0),(t[1]-n.ll[1])*t[3]+(n.dy||0)];}
      n.x=Math.round(n._p[0]*10)/10; n.y=Math.round(n._p[1]*10)/10;
    }
    N[n.id]=n;
  });
  s+='<svg class="route-svg" viewBox="0 0 360 230" role="img" aria-label="'+esc(day.title)+' 路線圖">';
  s+='<rect class="sea" width="360" height="230"/><path class="land" d="'+G.p+'"/>';
  if(G.r) s+='<path class="road" d="'+G.r+'"/>';
  if(G.l) s+='<path class="rail-b" d="'+G.l+'"/><path class="rail" d="'+G.l+'"/>';
  if(G.h) s+='<path class="hw-b" d="'+G.h+'"/><path class="hw" d="'+G.h+'"/>';
  if(r.zoom){var zt=G.t,zx=((r.zoom.ll[0]-zt[0])*zt[2]*zt[3]).toFixed(1),zy=((zt[1]-r.zoom.ll[1])*zt[3]).toFixed(1);
    s+='<circle class="zoom" cx="'+zx+'" cy="'+zy+'" r="'+r.zoom.r+'"/><text class="geo-lbl" x="'+zx+'" y="'+(+zy+r.zoom.r+12).toFixed(1)+'">'+esc(r.zoom.label)+'</text>';}
  (r.labels||[]).forEach(function(l){var t=G.t;s+='<text class="geo-lbl" x="'+((l[0]-t[0])*t[2]*t[3]).toFixed(1)+'" y="'+((t[1]-l[1])*t[3]).toFixed(1)+'">'+esc(l[2])+'</text>';});
  s+='<text class="compass" x="16" y="18">N ↑</text>';
  r.legs.forEach(function(l){
    var a=N[l.a], b=N[l.b];
    var dx=b.x-a.x, dy=b.y-a.y, len=Math.sqrt(dx*dx+dy*dy)||1;
    var bend=(l.bend==null?.18:l.bend)*len;
    var cx=(a.x+b.x)/2-dy/len*bend, cy=(a.y+b.y)/2+dx/len*bend;
    s+='<path class="leg m-'+l.m+'" d="M'+a.x+' '+a.y+'Q'+cx.toFixed(1)+' '+cy.toFixed(1)+' '+b.x+' '+b.y+'"/>';
    var tt=(l.pp==null?.5:l.pp), u=1-tt, px=u*u*a.x+2*tt*u*cx+tt*tt*b.x, py=u*u*a.y+2*tt*u*cy+tt*tt*b.y;
    var w=textW(l.t,10.5)+12;
    if(!l.np) pills+='<rect class="pill p-'+l.m+'" x="'+(px-w/2).toFixed(1)+'" y="'+(py-9).toFixed(1)+'" width="'+w.toFixed(1)+'" height="18" rx="9"/>'+
           '<text class="pt p-'+l.m+'" x="'+px.toFixed(1)+'" y="'+(py+3.8).toFixed(1)+'">'+esc(l.t)+'</text>';
  });
  var num=0;
  r.nodes.forEach(function(n){
    var lab=n.ghost?'':(++num);
    nodes+='<circle data-id="'+n.id+'" class="node'+(n.ghost?' ghost':'')+'" cx="'+n.x+'" cy="'+n.y+'" r="9"/>';
    nodes+=n.ghost?'<text class="num ghost-num" x="'+n.x+'" y="'+(n.y+3.5)+'">✈</text>':'<text class="num" x="'+n.x+'" y="'+(n.y+3.5)+'">'+lab+'</text>';
    var lx=n.x, ly, anc='middle', sy;
    if(n.lp==='n'){ly=n.sub?n.y-27:n.y-15;sy=n.y-15;}
    else if(n.lp==='e'){lx=n.x+13;anc='start';ly=n.sub?n.y-1:n.y+4;sy=n.y+11;}
    else if(n.lp==='w'){lx=n.x-13;anc='end';ly=n.sub?n.y-1:n.y+4;sy=n.y+11;}
    else {ly=n.y+23;sy=n.y+35;}
    nodes+='<text class="lbl" x="'+lx+'" y="'+ly+'" text-anchor="'+anc+'">'+esc(n.label)+'</text>';
    if(n.sub) nodes+='<text class="lbl-sub" x="'+lx+'" y="'+sy+'" text-anchor="'+anc+'">'+esc(n.sub)+'</text>';
  });
  s+=pills+nodes+'</svg>';
  return s;
}

export function routeCard(day){
  var r=day.route, N={}, drive=0, legsHtml='', modes={};
  r.nodes.forEach(function(n){N[n.id]=n;});
  r.legs.forEach(function(l){
    modes[l.m]=1;
    if(l.m==='drive'&&l.min) drive+=l.min;
    var tx=esc(N[l.a].label)+' → '+esc(N[l.b].label);
    if(l.a==='koto'&&l.b==='shrine') tx='琴平停車場 ↔ 金刀比羅宮';
    legsHtml+='<li><span class="li-ic">'+MODE_IC[l.m]+'</span><span class="li-tx">'+tx+'</span><span class="lt'+(l.m==='ferry'?' ferry':'')+'">'+esc(l.tl||(MODE_TX[l.m]+' 約 '+l.t))+'</span></li>';
  });
  (r.extra||[]).forEach(function(l){
    modes[l.m]=1; if(l.m==='drive'&&l.min) drive+=l.min;
    legsHtml+='<li><span class="li-ic">'+MODE_IC[l.m]+'</span><span class="li-tx">'+esc(l.tx)+'</span><span class="lt">'+esc(l.tl)+'</span></li>';
  });
  var legend='';
  ['drive','walk','ferry','shuttle','flight'].forEach(function(m){if(modes[m]) legend+='<span><i class="'+m+'"></i>'+MODE_TX[m]+'</span>';});
  var stops=day.items.filter(function(it){return it.p&&it.k!=='move';}).length;
  var first=day.items[0];
  var h='<section class="card"><h2>🗺️ 今日路線與交通時間<span class="sub">預估・依路況調整</span></h2>';
  h+=routeSVG(day);
  h+='<div class="legend">'+legend+'</div>';
  h+='<div class="stats"><div class="stat"><b>'+(drive?fmtMin(drive):'—')+'</b><span>開車合計（預估）</span></div>'+
     '<div class="stat"><b>'+stops+' 站</b><span>今日地點</span></div>'+
     '<div class="stat"><b>'+esc(first.s)+'</b><span>第一個行程</span></div></div>';
  h+='<ul class="legs">'+legsHtml+'</ul>';
  h+='<div class="row-btns">'+ext(routeUrl(day.gmaps),'🧭 在 Google 地圖開整天路線','pri');
  if(day.stay) h+=ext(mapUrl(day.stay),'🏨 今晚住宿');
  h+='</div>';
  if(day.id==='d5') h+='<p class="small muted" style="margin:8px 0 0">整天路線只含島上開車段；渡輪段請看下方船票。</p>';
  h+='</section>';
  return h;
}
