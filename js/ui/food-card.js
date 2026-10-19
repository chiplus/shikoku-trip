/* 餐廳卡片的畫面。 */
import { FOOD } from '../data/food.js?v=202610192233';
import { esc } from '../utils.js?v=202610192233';

export function foodHtml(k){
  var f=FOOD[k]; if(!f) return '';
  var h='<div class="food">';
  h+='<div class="food-hd"><span class="food-tag">'+esc(f.tag)+'</span><span class="food-em">'+(f.emoji||'🍽️')+'</span></div>';
  h+='<div class="finfo"><div><i>🕘 營業</i>'+esc(f.hours)+'</div><div><i>💴 低消</i>'+esc(f.min)+'</div></div>';
  h+='<ul class="dishes">';
  f.dishes.forEach(function(d,i){
    var pr=/\d/.test(d[3])?'<b>'+esc(d[3])+'</b>':'<b class="na">價格見店內</b>';
    h+='<li><div class="d1">'+(i===0?'<em>推薦</em>':'')+'<span class="jp">'+esc(d[0])+'</span>'+pr+'</div><div class="d2"><strong>'+esc(d[1])+'</strong>｜'+esc(d[2])+'</div></li>';
  });
  h+='</ul><p class="taste">'+esc(f.taste)+'</p>';
  if(f.meta.length||f.rate){h+='<div class="fmeta">'+(f.rate?'<span class="frate">⭐ Tabelog '+esc(f.rate)+'</span>':'');f.meta.forEach(function(m){h+='<span>'+esc(m)+'</span>';});h+='</div>';}
  if(f.tip) h+='<p class="ftip">💡 '+esc(f.tip)+'</p>';
  var rb='';
  if(f.rsv) rb+='<a class="frsv" href="'+f.rsv[0]+'" target="_blank" rel="noopener">📅 '+esc(f.rsv[1])+'</a>';
  if(f.tel) rb+='<a class="ftel" href="tel:'+f.tel+'">📞 打電話</a>';
  if(!f.rsv) rb+='<span class="fnorsv">不接受線上訂位</span>';
  h+='<div class="frow">'+rb+'</div>';
  h+='<div class="flinks"><a class="fphoto" href="'+f.photo+'" target="_blank" rel="noopener">📷 看店家餐點照片（'+esc(f.photoBy)+'）</a>'+(f.src!==f.photo?'<a class="fsrc" href="'+f.src+'" target="_blank" rel="noopener">資料來源</a>':'')+'</div>';
  return h+'</div>';
}
