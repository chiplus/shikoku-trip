/* 船票卡片的畫面。 */
import { FERRY } from '../data/ferry.js?v=202610191735';
import { ext, mapUrl } from '../utils.js?v=202610191735';
import { docLink } from './docs-card.js?v=202610191735';

/* ================= 船票卡 ================= */
export function ferryCard(){
  var h='<section class="ticket"><div class="tk-head"><b>⛴️ 小豆島渡輪・已預約</b><span>四國フェリー</span></div>';
  FERRY.legs.forEach(function(l){
    h+='<div class="tk-leg"><div class="tk-line">'+
       '<div class="tk-port"><b>'+l.dep+'</b><span>'+l.from+'港</span></div>'+
       '<div class="tk-mid"><b>'+l.dir+'</b>10/26（一）<br>'+l.bin+'・1 小時</div>'+
       '<div class="tk-port r"><b>'+l.arr+'</b><span>'+l.to+'港</span></div></div>'+
       '<div class="tk-meta"><span class="tag warn">最晚 '+l.check+' 報到</span><span class="tag">預約號碼末四碼 '+l.no+'</span><span class="tag">5m 未滿租車＋大人 4 名</span><span class="tag">約 8,430 円</span></div></div>';
  });
  h+='<div class="tk-foot"><b>當天要做的事</b><ul>'+
     '<li>出港前 30 分鐘到乘船港售票窗口；<b>沒有事先付款</b>，當天在窗口付。</li>'+
     '<li><b>一定要帶車検証</b>（租車的車檢證），買車輛船票時要出示。</li>'+
     '<li>每程概算：車 6,330＋人 2,100＝8,430 円，來回 16,860 円；來回票等折扣可能更便宜，可問窗口。</li>'+
     '<li>完整預約號碼在船票確認信 PDF 裡（下方按鈕）；建議先存到 iPhone「檔案」離線看。</li>'+
     '</ul><p class="small" style="margin:10px 0 0"><b>取消費：</b>10/19 起 30%・10/23 起 50%・當天 100%（<b>10/18 前改／取消不收費</b>）。航班時刻可能變更，出發前重查。</p>'+
     '<div class="row-btns">'+docLink('ferry','📄 打開船票確認信')+ext('tel:+81878224383','☎️ 高松營業所')+ext('tel:+81879620875','☎️ 土庄營業所')+ext(mapUrl('takport'),'📍 高松港乘船處')+'</div>'+
     '<p class="small muted" style="margin:8px 0 0">營業所 7:00–20:00（年中無休）</p></div></section>';
  return h;
}
