/* 共用小工具：跳脫字元、Google 地圖連結、時間計算、本機儲存。 */
import { P } from './data/places.js?v=202610202206';

/* ================= 工具 ================= */
export var enc = encodeURIComponent;
export function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
export function mapUrl(k){return 'https://www.google.com/maps/search/?api=1&query='+enc(P[k].q);}
export function navUrl(k,walk){return 'https://www.google.com/maps/dir/?api=1&destination='+enc(P[k].q)+'&travelmode='+(walk?'walking':'driving');}
export function routeUrl(keys){
  var q=keys.map(function(k){return P[k].q;});
  var u='https://www.google.com/maps/dir/?api=1&origin='+enc(q[0])+'&destination='+enc(q[q.length-1])+'&travelmode=driving';
  var w=q.slice(1,-1);
  if(w.length) u+='&waypoints='+w.map(enc).join('%7C');
  return u;
}
export function ext(href,label,cls){return '<a class="btn '+(cls||'')+'" href="'+href+'" target="_blank" rel="noopener">'+label+'</a>';}
export function textW(s,fs){var w=0;for(var i=0;i<s.length;i++){w+=(s.charCodeAt(i)<256?0.58:1)*fs;}return w;}
export function fmtMin(m){var h=Math.floor(m/60),r=m%60;return h?(h+' 小時'+(r?' '+r+' 分':'')):(r+' 分');}
export function jstNow(){var d=new Date(Date.now()+9*3600e3);return {date:d.toISOString().slice(0,10),min:d.getUTCHours()*60+d.getUTCMinutes()};}
export function toMin(t){var m=/^~?(\d{1,2}):(\d{2})$/.exec(t||'');return m?(+m[1])*60+(+m[2]):null;}
export var store={
  get:function(k){try{return JSON.parse(window.localStorage.getItem(k)||'null');}catch(e){return null;}},
  set:function(k,v){try{window.localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
};
export var ICON={flight:'✈️',food:'🍽️',car:'🚗',move:'🚗',sight:'📍',shop:'🛍️',stay:'🏨',onsen:'♨️',ferry:'⛴️',grape:'🍇',rest:'☕',shrine:'⛩️'};
export var MODE_IC={drive:'🚗',walk:'🚶',ferry:'⛴️',flight:'✈️',shuttle:'🚐'};
export var MODE_TX={drive:'開車',walk:'步行',ferry:'渡輪',flight:'航班',shuttle:'接駁'};
export var DEP=Date.UTC(2026,9,22,6,30), RET=Date.UTC(2026,9,27,13,5), ARR=Date.UTC(2026,9,22,9,5), LEAVE=Date.UTC(2026,9,27,9,55);
export var DEVTZ='';try{DEVTZ=Intl.DateTimeFormat().resolvedOptions().timeZone||'';}catch(e){}
export function pad(n){return (n<10?'0':'')+n;}
