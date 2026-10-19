/* Visit Japan Web QR Code：圖片放在專案的 vjw 資料夾，publish.ps1 會自動產生清單；大家打開網站看到的都一樣。 */
import { VJW } from '../data/vjw.js?v=202610192130';
export var PEOPLE = ['Allen', 'Lica', 'Lapeark', 'Kiwi'];

export function vjwCard() {
  var h = '<section class="card vjw"><h2>🛂 Visit Japan Web QR Code<span class="sub">全家共用</span></h2><div class="vjw-grid">';
  PEOPLE.forEach(function (p) {
    var src = VJW[p];
    h += '<div class="vjw-p' + (src ? ' has' : '') + '"><div class="vjw-name">' + p + '</div>' +
      (src
        ? '<button class="vjw-thumb" data-vjw-show="' + p + '" aria-label="放大 ' + p + ' 的 QR Code"><img src="' + src + '" alt="' + p + ' 的 QR Code" loading="lazy" decoding="async"></button><div class="vjw-hint">點圖片放大</div>'
        : '<div class="vjw-thumb vjw-none"><span class="vjw-empty">還沒放上來<br>截圖傳給 Kiwi</span></div>') +
      '</div>';
  });
  h += '</div><ul class="vjw-tips"><li>入境時點自己的圖片放大，<b>把螢幕亮度調到最亮</b>再給機器掃。</li>' +
    '<li>要新增或更換：把截圖傳給 Kiwi，Kiwi 放進專案的 <code>vjw</code> 資料夾（檔名用名字，例如 <code>Lica.png</code>）後執行上架，大家的手機就會一起更新。</li>' +
    '<li>網路不穩時可能載不出來，<b>相簿裡的截圖請自己也留一份</b>。</li></ul></section>';
  return h;
}

var viewer = null, inited = false;
export function initVjw() {
  if (inited) return; inited = true;
  document.addEventListener('click', function (ev) {
    var el = ev.target.closest ? ev.target.closest('[data-vjw-show],[data-vjw-close],.vjw-viewer') : null;
    if (!el) return;
    if (el.hasAttribute('data-vjw-show')) {
      var p = el.getAttribute('data-vjw-show');
      if (!VJW[p]) return;
      if (!viewer) {
        viewer = document.createElement('div');
        viewer.className = 'vjw-viewer';
        viewer.innerHTML = '<div class="vjw-vbar"><b></b><button class="btn" data-vjw-close>✕ 關閉</button></div><img alt="QR Code">';
        document.body.appendChild(viewer);
      }
      viewer.querySelector('b').textContent = p + ' 的 QR Code';
      viewer.querySelector('img').src = VJW[p];
      viewer.hidden = false;
      return;
    }
    if (viewer) viewer.hidden = true;
  });
}
