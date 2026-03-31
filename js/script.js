  // =====================================================
// CONFIGURATION CONSTANTS
// =====================================================
const CONFIG = {
  CURSOR_MULTIPLIER: 0.12,
  CURSOR_SCALE_HOVER: 1.8,
  CURSOR_SCALE_NORMAL: 1,
  CURSOR_BORDER_COLOR_HOVER: 'rgba(201,168,76,0.8)',
  CURSOR_BORDER_COLOR_NORMAL: 'rgba(201,168,76,0.5)',
  STAR_COUNT: 220,
  STAR_BASE_FREQUENCY: 0.9,
  STAR_MAX_RADIUS: 1.2,
  STAR_MIN_RADIUS: 0.2,
  STAR_MAX_OPACITY: 0.7,
  STAR_MIN_OPACITY: 0.1,
  STAR_MAX_SPEED: 0.008,
  STAR_MIN_SPEED: 0.002,
  PARTICLE_COUNT: 8,
  PARTICLE_MIN_DISTANCE: 30,
  PARTICLE_MAX_DISTANCE: 40,
  PARTICLE_LIFETIME: 1500,
  SCROLL_THRESHOLD: 60,
  REVEAL_THRESHOLD: 0.12,
};

document.addEventListener('DOMContentLoaded', () => {
  // ===== CURSOR ANIMATION =====
  const cursorEl = document.querySelector('.cursor');
  if (!cursorEl) {
    console.warn('Cursor element not found. Cursor animation disabled.');
    return;
  }

  const dot = cursorEl.querySelector('.cursor-dot');
  const ring = cursorEl.querySelector('.cursor-ring');
  
  if (!dot || !ring) {
    console.warn('Cursor dot or ring not found. Cursor animation disabled.');
    return;
  }

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
  
  (function animCursor() {
    rx += (mx - rx) * CONFIG.CURSOR_MULTIPLIER;
    ry += (my - ry) * CONFIG.CURSOR_MULTIPLIER;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animCursor);
  })();
  // Cursor hover effects on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .service-card');
  if (interactiveElements.length > 0) {
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.transform = `translate(-50%,-50%) scale(${CONFIG.CURSOR_SCALE_HOVER})`;
        ring.style.borderColor = CONFIG.CURSOR_BORDER_COLOR_HOVER;
      });
      el.addEventListener('mouseleave', () => {
        ring.style.transform = `translate(-50%,-50%) scale(${CONFIG.CURSOR_SCALE_NORMAL})`;
        ring.style.borderColor = CONFIG.CURSOR_BORDER_COLOR_NORMAL;
      });
    });
  }

  // ===== CLICK PARTICLES =====
  document.addEventListener('click', e => {
    for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const angle = (i / CONFIG.PARTICLE_COUNT) * Math.PI * 2;
      const dist = CONFIG.PARTICLE_MIN_DISTANCE + Math.random() * (CONFIG.PARTICLE_MAX_DISTANCE - CONFIG.PARTICLE_MIN_DISTANCE);
      p.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;--dx:${Math.cos(angle)*dist}px;--dy:${Math.sin(angle)*dist}px;`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), CONFIG.PARTICLE_LIFETIME);
    }
  });

  // ===== STARS BACKGROUND =====
  const canvas = document.getElementById('stars');
  if (!canvas) {
    console.warn('Canvas element not found. Star animation disabled.');
  } else {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get 2D context from canvas.');
    } else {
      let stars = [];
      function initStars() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        stars = Array.from({ length: CONFIG.STAR_COUNT }, () => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * (CONFIG.STAR_MAX_RADIUS - CONFIG.STAR_MIN_RADIUS) + CONFIG.STAR_MIN_RADIUS,
          o: Math.random() * (CONFIG.STAR_MAX_OPACITY - CONFIG.STAR_MIN_OPACITY) + CONFIG.STAR_MIN_OPACITY,
          s: Math.random() * (CONFIG.STAR_MAX_SPEED - CONFIG.STAR_MIN_SPEED) + CONFIG.STAR_MIN_SPEED,
          p: Math.random() * Math.PI * 2
        }));
      }
      function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
          s.p += s.s;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201,168,76,${s.o * (0.5 + 0.5 * Math.sin(s.p))})`;
          ctx.fill();
        });
        requestAnimationFrame(drawStars);
      }
      window.addEventListener('resize', initStars);
      initStars();
      drawStars();
    }
  }

  // ===== NAVIGATION SCROLL EFFECT =====
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > CONFIG.SCROLL_THRESHOLD);
    });
  } else {
    console.warn('Navigation element not found.');
  }

  // ===== SCROLL REVEAL ANIMATIONS =====
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: CONFIG.REVEAL_THRESHOLD });
    
    revealElements.forEach(el => observer.observe(el));
  } else {
    console.warn('No elements with .reveal class found.');
  }


});