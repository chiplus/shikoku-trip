/* 票券與憑證卡片：點按鈕在 iPhone 內建預覽直接開啟 PDF。 */
import { DOCS } from '../data/docs.js?v=202610192120';
import { esc } from '../utils.js?v=202610192120';

export function docLink(id, label){
  var d=DOCS.find(function(x){return x.id===id;}); if(!d) return '';
  return '<a class="btn doc-btn" href="'+d.file+'" target="_blank" rel="noopener">'+(label||'📄 打開'+esc(d.title))+'</a>';
}

export function docsCard(){
  var h='<section class="card docs"><h2>🎫 票券與訂房憑證<span class="sub">點開直接看</span></h2>';
  DOCS.forEach(function(d){
    h+='<a class="doc" href="'+d.file+'" target="_blank" rel="noopener"><span class="doc-ic">'+d.icon+'</span>'+
       '<span class="doc-tx"><b>'+esc(d.title)+'</b><small>'+esc(d.sub)+'</small><em>'+esc(d.when)+'</em></span><span class="doc-go">打開</span></a>'+
       '<p class="doc-note">'+esc(d.note)+'</p>';
  });
  h+='<details class="howto"><summary>📥 怎麼存到 iPhone 離線看？</summary><ol>'+
     '<li>點上面的憑證打開。</li>'+
     '<li>按下方「分享」<b>⬆︎</b> →「儲存到檔案」→ 選「<b>我的 iPhone</b>」（不要選 iCloud，才保證沒網路也打得開）。</li>'+
     '<li>之後打開「檔案」App 就能直接看；也可以在檔案上長按 →「標記」加到常用。</li></ol>'+
     '</details>';
  return h+'</section>';
}
