// ==== Retro Resume JS (Old Games vibe) ====
const screens = [...document.querySelectorAll('.screen')];
const tabs = [...document.querySelectorAll('.hud .tab')];
const startBtn = document.getElementById('btn-start');
const levels = document.getElementById('levels');
const yearEl = document.getElementById('year');
const sfxCoin = document.getElementById('sfx-coin');
const sfxMove = document.getElementById('sfx-move');

yearEl.textContent = new Date().getFullYear();

let current = 'screen-start';
let muted = false;

function show(id){
  screens.forEach(s => s.classList.toggle('active', s.id === id));
  tabs.forEach(t => t.classList.toggle('active', t.dataset.target === id));
  current = id;
  if(!muted && (id !== 'screen-start')) { try { sfxMove.currentTime = 0; sfxMove.play(); } catch(e){} }
  levels?.focus();
}

function goNext(){
  const order = ['about','experience','education','skills','projects','contact'];
  const idx = order.indexOf(current);
  if(idx === -1) return show('about');
  const next = order[(idx+1) % order.length];
  show(next);
}

function goPrev(){
  const order = ['about','experience','education','skills','projects','contact'];
  const idx = order.indexOf(current);
  const prev = order[(idx - 1 + order.length) % order.length];
  show(prev);
}

// Start / nav
startBtn?.addEventListener('click', () => {
  if(!muted){ try { sfxCoin.currentTime = 0; sfxCoin.play(); } catch(e){} }
  show('about');
});
document.querySelectorAll('[data-target]').forEach(btn => {
  btn.addEventListener('click', () => show(btn.dataset.target));
});

// Keyboard controls
window.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  if(k === 'arrowright') goNext();
  if(k === 'arrowleft') goPrev();
  if(k === 'm'){ muted = !muted; }
  if(k === '?'){ alert('Controls:\n← → switch level\nM mute\nKonami Code unlocks Bonus Stage'); }
});

// Secret Feature unlock
const konami = ['arrowup','arrowdown','arrowleft','arrowright'];
let buffer = [];
window.addEventListener('keydown', (e) => {
  buffer.push(e.key.toLowerCase());
  if(buffer.length > konami.length) buffer.shift();
  if(konami.every((k,i)=>buffer[i]===k)){
    alert('Secret Feature Unlocked!');
    show('secret');
  }
});

// Improve focus ring for tabs
tabs.forEach(t => t.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter' || e.key === ' '){
    e.preventDefault();
    show(t.dataset.target);
  }
}));
