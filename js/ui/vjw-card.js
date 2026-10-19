/* Visit Japan Web QR Code：每個人上傳自己的截圖。圖片只存在這支手機（IndexedDB），不會上傳到網路。 */
export var PEOPLE = ['Allen', 'Lica', 'Lapeark', 'Kiwi'];
var DBN = 'shikoku2026', ST = 'vjw', dbp = null, urls = {}, mem = {};

function db() {
  if (dbp) return dbp;
  dbp = new Promise(function (res, rej) {
    try {
      var r = indexedDB.open(DBN, 1);
      r.onupgradeneeded = function () { r.result.createObjectStore(ST); };
      r.onsuccess = function () { res(r.result); };
      r.onerror = function () { rej(r.error); };
    } catch (e) { rej(e); }
  });
  return dbp;
}
function op(mode, fn) {
  return db().then(function (d) {
    return new Promise(function (res) {
      try {
        var req = fn(d.transaction(ST, mode).objectStore(ST));
        req.onsuccess = function () { res(req.result || null); };
        req.onerror = function () { res(null); };
      } catch (e) { res(null); }
    });
  }).catch(function () { return null; });
}
function getImg(n) { return op('readonly', function (s) { return s.get(n); }).then(function (b) { return b || mem[n] || null; }); }
function putImg(n, b) { mem[n] = b; return op('readwrite', function (s) { return s.put(b, n); }); }
function delImg(n) { delete mem[n]; return op('readwrite', function (s) { return s.delete(n); }); }

export function vjwCard() {
  var h = '<section class="card vjw"><h2>🛂 Visit Japan Web QR Code<span class="sub">只存在這支手機</span></h2><div class="vjw-grid">';
  PEOPLE.forEach(function (p) {
    h += '<div class="vjw-p" data-person="' + p + '"><div class="vjw-name">' + p + '</div>' +
      '<button class="vjw-thumb" data-vjw-show="' + p + '" aria-label="放大 ' + p + ' 的 QR Code"><img alt="" hidden><span class="vjw-empty">還沒上傳</span></button>' +
      '<div class="vjw-act"><label class="btn vjw-up">📷 <span>上傳</span><input type="file" accept="image/*" data-vjw-up="' + p + '" hidden></label>' +
      '<button class="btn vjw-del" data-vjw-del="' + p + '" hidden>刪除</button></div></div>';
  });
  h += '</div><ul class="vjw-tips"><li>在 Visit Japan Web 拿到 QR Code 後截圖，再到這裡選自己的名字上傳。</li>' +
    '<li>入境時點圖片放大，<b>把螢幕亮度調到最亮</b>再給機器掃。</li>' +
    '<li>圖片只存在這支手機，不會傳到網路，也不會同步到別人手機；一支手機可以幫全家 4 個人都存。</li>' +
    '<li>iPhone 很久沒打開這個網站可能會清掉資料，<b>相簿裡的截圖請留著當備份</b>。從 Safari 存的，在「加入主畫面」的 App 裡看不到（兩邊分開存）。</li></ul></section>';
  return h;
}

function render(p) {
  var box = document.querySelector('.vjw-p[data-person="' + p + '"]');
  if (!box) return;
  getImg(p).then(function (b) {
    var img = box.querySelector('img'), empty = box.querySelector('.vjw-empty'), del = box.querySelector('.vjw-del'), up = box.querySelector('.vjw-up span');
    if (urls[p]) { URL.revokeObjectURL(urls[p]); urls[p] = null; }
    if (b) {
      urls[p] = URL.createObjectURL(b);
      img.src = urls[p]; img.hidden = false; empty.hidden = true; del.hidden = false; up.textContent = '更換'; box.classList.add('has');
    } else {
      img.removeAttribute('src'); img.hidden = true; empty.hidden = false; del.hidden = true; up.textContent = '上傳'; box.classList.remove('has');
    }
  });
}

var viewer = null;
function showViewer(p) {
  if (!urls[p]) return;
  if (!viewer) {
    viewer = document.createElement('div');
    viewer.className = 'vjw-viewer';
    viewer.innerHTML = '<div class="vjw-vbar"><b></b><button class="btn" data-vjw-close>✕ 關閉</button></div><img alt="QR Code">';
    document.body.appendChild(viewer);
  }
  viewer.querySelector('b').textContent = p + ' 的 QR Code';
  viewer.querySelector('img').src = urls[p];
  viewer.hidden = false;
}

var inited = false;
export function initVjw() {
  if (inited) return; inited = true;
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}
  PEOPLE.forEach(render);
  document.addEventListener('change', function (ev) {
    var t = ev.target, p = t && t.getAttribute && t.getAttribute('data-vjw-up');
    if (!p || !t.files || !t.files[0]) return;
    var f = t.files[0];
    if (!/^image\//.test(f.type) || f.size > 20e6) { alert('請選擇 20MB 以內的圖片'); t.value = ''; return; }
    putImg(p, f).then(function () { render(p); t.value = ''; });
  });
  document.addEventListener('click', function (ev) {
    var el = ev.target.closest ? ev.target.closest('[data-vjw-show],[data-vjw-del],[data-vjw-close],.vjw-viewer') : null;
    if (!el) return;
    if (el.hasAttribute('data-vjw-show')) { showViewer(el.getAttribute('data-vjw-show')); return; }
    if (el.hasAttribute('data-vjw-del')) {
      var p = el.getAttribute('data-vjw-del');
      if (confirm('刪除 ' + p + ' 的 QR Code？')) delImg(p).then(function () { render(p); });
      return;
    }
    if (viewer && (el.hasAttribute('data-vjw-close') || el === viewer)) viewer.hidden = true;
  });
}
