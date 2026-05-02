/* ============================================
   NULHAQFADH PORTFOLIO — main.js
   ============================================ */

// ─── CUSTOM CURSOR ───────────────────────────
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';

  setTimeout(() => {
    trail.style.left = mouseX + 'px';
    trail.style.top = mouseY + 'px';
  }, 80);
});

// Cursor scale on hover
document.querySelectorAll('a, button, .project-card, .service-card, .skill-tag').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    trail.style.width = '44px';
    trail.style.height = '44px';
    trail.style.opacity = '0.3';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    trail.style.width = '28px';
    trail.style.height = '28px';
    trail.style.opacity = '0.5';
  });
});

// Hide default cursor
document.body.style.cursor = 'none';


// ─── NAV SCROLL EFFECT ───────────────────────
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});


// ─── HAMBURGER MENU ──────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});


// ─── TYPEWRITER EFFECT ───────────────────────
const roles = [
  'freelance developer',
  'web builder',
  'ui enthusiast',
  'mahasiswa yang ngoding',
  'open for projects',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEl = document.getElementById('typewriter');

function typeLoop() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typeEl.textContent = currentRole.slice(0, charIndex - 1);
    charIndex--;
  } else {
    typeEl.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentRole.length) {
    speed = 1800; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(typeLoop, speed);
}

typeLoop();


// ─── SCROLL REVEAL ───────────────────────────
const revealEls = document.querySelectorAll(
  '.service-card, .project-card, .about-grid, .contact-content, .skills-box, .about-text'
);

revealEls.forEach(el => el.classList.add('scroll-reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));


// ─── SMOOTH NAV LINKS ────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ─── CONTACT FORM ────────────────────────────
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    const original = btn.textContent;
    btn.textContent = '// pesan terkirim!';
    btn.style.background = '#00cc6a';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}


// ─── ACTIVE NAV LINK ─────────────────────────
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--green)';
    }
  });
});


// ─── CONSOLE EASTER EGG ──────────────────────
console.log(`
%c NULHAQFADH %c
%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  freelance developer & mahasiswa
  open for projects!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`,
  'background:#00ff88;color:#0a0a0a;font-weight:bold;padding:4px 8px;',
  '',
  'color:#00ff88;'
);
