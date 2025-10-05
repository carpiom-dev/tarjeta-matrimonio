// script.js - Reveal, autoplay attempt, countdown
(function(){
  const preloader = document.getElementById('preloader');
  const heroBg = document.querySelector('.hero-bg');
  const names = document.querySelector('.nombres');
  const frase = document.querySelector('.frase');
  const actions = document.querySelector('.hero-actions');
  const btnToggle = document.getElementById('btnToggleMusic');
  const audio = document.getElementById('bgAudio');

  window.addEventListener('load', async () => {
    setTimeout(()=> names && names.classList.add('revealed'), 450);
    setTimeout(()=> frase && frase.classList.add('revealed'), 800);
    setTimeout(()=> actions && actions.classList.add('revealed'), 1150);
    try { await audio.play(); } catch(e) { console.warn('Autoplay blocked', e); }
    setTimeout(()=>{ if(preloader) preloader.style.opacity = '0'; setTimeout(()=> preloader && preloader.remove(), 600); }, 900);
    if(heroBg) heroBg.style.transform = 'scale(1.06)';
  });

  if(btnToggle){
    btnToggle.addEventListener('click', async ()=>{
      if(audio.paused){
        try{ await audio.play(); btnToggle.textContent = '⏸️ Pausar'; } catch(e){ console.warn(e); }
      } else {
        audio.pause();
        btnToggle.textContent = '▶️ Reproducir';
      }
    });
  }

  const target = new Date("Jan 14, 2026 16:00:00").getTime();
  function updateCountdown(){
    const now = Date.now();
    const diff = target - now;
    const days = Math.max(0, Math.floor(diff / (1000*60*60*24)));
    const hours = Math.max(0, Math.floor((diff % (1000*60*60*24)) / (1000*60*60)));
    const mins = Math.max(0, Math.floor((diff % (1000*60*60)) / (1000*60)));
    const secs = Math.max(0, Math.floor((diff % (1000*60)) / 1000));
    const elDays = document.getElementById('days'); if(elDays) elDays.innerText = days;
    const elHours = document.getElementById('hours'); if(elHours) elHours.innerText = hours;
    const elMins = document.getElementById('minutes'); if(elMins) elMins.innerText = mins;
    const elSecs = document.getElementById('seconds'); if(elSecs) elSecs.innerText = secs;
    if(diff < 0){
      clearInterval(interval);
      const c = document.getElementById('countGrid');
      if(c) c.innerHTML = '<div style="padding:20px;font-weight:700">¡Llegó el gran día!</div>';
    }
  }
  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);

  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.documentElement.style.scrollBehavior = 'auto';
  }
})();