// 
// Dragging logic
let activeMemo = null;
let offsetX, offsetY;

document.querySelectorAll('.memo').forEach(memo => {
  memo.addEventListener('mousedown', e => {
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

// Save positions to localStorage
document.getElementById('saveBtn').addEventListener('click', () => {
  const positions = {};
  document.querySelectorAll('.memo').forEach(memo => {
    positions[memo.id] = {
      left: memo.style.left,
      top: memo.style.top
    };
  });
  localStorage.setItem('memoPositions', JSON.stringify(positions));
  alert('Pozycje zapisane!');
});

// Load saved positions
window.addEventListener('load', () => {
  const saved = localStorage.getItem('memoPositions');
  if (saved) {
    const positions = JSON.parse(saved);
    for (const id in positions) {
      const memo = document.getElementById(id);
      if (memo) {
        memo.style.left = positions[id].left;
        memo.style.top = positions[id].top;
      }
    }
  }
});

// Reset positions
document.getElementById('resetBtn').addEventListener('click', () => {
  localStorage.removeItem('memoPositions');
  location.reload();
});


//   xx
