//  oo rr hi ,,,

let activeMemo = null;
let offsetX, offsetY;

document.querySelectorAll('.memo').forEach(memo => {
  memo.addEventListener('mousedown', e => {
    if (e.target.isContentEditable) return; // Nie przesuwaj jeśli edytujesz
    activeMemo = memo;
    offsetX = e.clientX - memo.offsetLeft;
    offsetY = e.clientY - memo.offsetTop;
    memo.style.zIndex = 1000;
  });
});

document.addEventListener('mousemove', e => {
  if (activeMemo) {
    activeMemo.style.left = `${e.clientX - offsetX}px`;
    activeMemo.style.top = `${e.clientY - offsetY}px`;
  }
});

document.addEventListener('mouseup', () => {
  if (activeMemo) {
    activeMemo.style.zIndex = '';
    activeMemo = null;
  }
});

document.getElementById('saveBtn').addEventListener('click', () => {
  const memosData = {};
  document.querySelectorAll('.memo').forEach(memo => {
    memosData[memo.id] = {
      left: memo.style.left,
      top: memo.style.top,
      title: memo.querySelector('.memo-title').innerText,
      body: memo.querySelector('.memo-body').innerText
    };
  });
  localStorage.setItem('memoData', JSON.stringify(memosData));
  alert('Zapisano pozycje i treść!');
});

document.getElementById('resetBtn').addEventListener('click', () => {
  localStorage.removeItem('memoData');
  location.reload();
});

window.addEventListener('load', () => {
  const saved = localStorage.getItem('memoData');
  if (saved) {
    const memosData = JSON.parse(saved);
    for (const id in memosData) {
      const memo = document.getElementById(id);
      if (memo) {
        const data = memosData[id];
        memo.style.left = data.left;
        memo.style.top = data.top;
        memo.querySelector('.memo-title').innerText = data.title;
        memo.querySelector('.memo-body').innerText = data.body;
      }
    }
  }
});

// rrr  taaaa...

// 