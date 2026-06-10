

  // Scroll reveal animation
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

// ==========================================

// ── 1. CURSOR GLOW ────────────────────────────────────────────────────────
const glow = document.getElementById('cursor-glow');
let glowX = 0, glowY = 0, curX = 0, curY = 0;
document.addEventListener('mousemove', e => { curX = e.clientX; curY = e.clientY; });
(function animGlow() {
  glowX += (curX - glowX) * 0.08;
  glowY += (curY - glowY) * 0.08;
  glow.style.left = glowX + 'px';
  glow.style.top  = glowY + 'px';
  requestAnimationFrame(animGlow);
})();

// ── 2. TYPEWRITER EFFECT ──────────────────────────────────────────────────
const roles = ['AI Builder.', 'Prompt Engineer.', 'Vibe Coder.', 'SaaS Builder.', 'Product Thinker.'];
let ri = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');
function typeLoop() {
  const word = roles[ri];
  if (!deleting) {
    tw.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
    setTimeout(typeLoop, 80);
  } else {
    tw.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; setTimeout(typeLoop, 300); return; }
    setTimeout(typeLoop, 45);
  }
}
typeLoop();

// ── 3. TERMINAL TYPING ────────────────────────────────────────────────────
const termEl = document.getElementById('terminal-typing');
const termLines = ['git status', 'npm run deploy', 'status: all systems ✅'];
let tli = 0, tci = 0;
function termLoop() {
  if (!termEl) return;
  const line = termLines[tli];
  if (tci < line.length) {
    termEl.textContent = line.slice(0, ++tci);
    setTimeout(termLoop, tli === 2 ? 55 : 90);
  } else {
    setTimeout(() => {
      tci = 0; tli = (tli + 1) % termLines.length;
      termEl.textContent = '';
      termLoop();
    }, tli === 2 ? 3000 : 700);
  }
}
setTimeout(termLoop, 1200);

// ── 4. ACTIVE NAV ON SCROLL ───────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const onScroll = () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
};
window.addEventListener('scroll', onScroll, { passive: true });

// ── 5. STAGGERED REVEAL ───────────────────────────────────────────────────
const staggerObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = entry.target.parentElement.querySelectorAll('.stagger-child');
    siblings.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 100);
    });
    staggerObs.unobserve(entry.target);
  });
}, { threshold: 0.1 });
document.querySelectorAll('.stagger-child').forEach(el => staggerObs.observe(el));

// ── 6. MOBILE MENU ────────────────────────────────────────────────────────
function toggleMobile() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
  document.body.style.overflow = document.getElementById('mobileMenu').classList.contains('open') ? 'hidden' : '';
}
function closeMobile() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow = '';
}

// ==========================================

// ── Page Loader ───────────────────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1600);
});

// ── Custom Cursor ─────────────────────────────────────────────────────────
const dot  = document.getElementById('cur-dot');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function cursorLoop() {
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  dot.style.left  = mx + 'px'; dot.style.top  = my + 'px';
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(cursorLoop);
})();

// ── Scroll Progress Bar ───────────────────────────────────────────────────
const bar = document.getElementById('scroll-bar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  bar.style.width = Math.min(pct, 100) + '%';
}, { passive: true });

// ── 3D Tilt on Project Cards ──────────────────────────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(700px) rotateX(${(-y * 10).toFixed(1)}deg) rotateY(${(x * 10).toFixed(1)}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Prevent link click event bubbling on cards
document.querySelectorAll('.project-card a').forEach(link => {
  link.addEventListener('click', e => {
    e.stopPropagation();
  });
});

// ── Project Modal ─────────────────────────────────────────────────────────
const PROJECTS = [
  {
    "id": "repochat",
    "title": "RepoChat AI",
    "badge": "🔗 Live Product",
    "desc": "A full-stack SaaS that lets you chat with any GitHub repository using AI. Built with React/Vite frontend and Node.js backend. Features Google & GitHub OAuth, multi-LLM support (OpenAI, Anthropic, Gemini), and fully deployed on Vercel + Render. The flagship project that proves real AI product delivery.",
    "tags": ["React", "Vite", "Node.js", "OAuth", "OpenAI", "Anthropic", "Gemini", "Vercel", "Render"],
    "image": "assets/images/repochat_screenshot.png",
    "live": "https://repochat-ai.vercel.app",
    "github": "https://github.com/pramodhadapad"
  },
  {
    "id": "placement",
    "title": "Placement Cell Management",
    "badge": "🏢 Full Stack",
    "desc": "A comprehensive web system to streamline college placement processes. Handles student registration, job postings, interview scheduling, and placement records — all through a clean, responsive UI backed by a database.",
    "tags": ["HTML/CSS", "JavaScript", "Database", "Full Stack", "UI/UX"],
    "image": "assets/images/placement_cell_screenshot.png",
    "live": "",
    "github": "https://github.com/pramodhadapad"
  },
  {
    "id": "racing",
    "title": "3D Car Racing Game",
    "badge": "🏎️ Game Dev",
    "desc": "A fully interactive 3D racing game built using C and OpenGL. Features real-time game logic, 3D rendering, collision detection, sound toggle, and a complete game menu — implemented at a low level without a game engine.",
    "tags": ["C", "OpenGL", "3D Graphics", "Game Logic", "Low-level"],
    "image": "assets/images/3d_car_racing_screenshot.png",
    "live": "",
    "github": "https://github.com/pramodhadapad"
  },
  {
    "id": "student",
    "title": "Student Assignment System",
    "badge": "📚 Education Tech",
    "desc": "A full-stack application for managing academic assignments. Supports full CRUD operations — professors post assignments, students submit, and the system tracks deadlines, grades, and submission status through a clean dashboard.",
    "tags": ["Java", "HTML/CSS", "Full Stack", "CRUD", "Education"],
    "image": "assets/images/student_assignment_screenshot.png",
    "live": "",
    "github": "https://github.com/pramodhadapad"
  },
  {
    "id": "cafe",
    "title": "Lassi-n-Cafe",
    "badge": "☕ Café Management",
    "desc": "A digital operations system for café management — handling orders, inventory, and daily operations through a clean interface. Built as an early project demonstrating full product thinking from problem to solution.",
    "tags": ["HTML", "CSS", "JavaScript", "UI/UX", "Management"],
    "image": "",
    "live": "",
    "github": "https://github.com/pramodhadapad/Lassi-n-Cafe"
  }
];

function openModal(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  const modalImg = document.getElementById('modal-img');
  if (p.image) {
    modalImg.src = p.image;
    modalImg.style.display = 'block';
  } else {
    modalImg.style.display = 'none';
  }
  document.getElementById('modal-badge').textContent = p.badge;
  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-desc').textContent  = p.desc;
  document.getElementById('modal-tags').innerHTML =
    p.tags.map(t => `<span class="modal-tag">${t}</span>`).join('');
  const links = [];
  if (p.live)   links.push(`<a href="${p.live}"   target="_blank" class="primary">🔗 Live Demo</a>`);
  if (p.github) links.push(`<a href="${p.github}" target="_blank" class="secondary">⌥ GitHub</a>`);
  document.getElementById('modal-links').innerHTML = links.join('');
  document.getElementById('modalBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e.target === document.getElementById('modalBackdrop')) {
    document.getElementById('modalBackdrop').classList.remove('open');
    document.body.style.overflow = '';
  }
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.getElementById('modalBackdrop').classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ── Toast Notification Helper ──────────────────────────────────────────────
function showToast(text) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = text;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ── Copy Email + Toast ────────────────────────────────────────────────────
function copyEmail(e) {
  e.preventDefault();
  navigator.clipboard.writeText('pramodhadapad.mca@gmail.com').then(() => {
    showToast('✅ Email copied to clipboard!');
  });
}

// ── Contact Form Submission Handler ──────────────────────────────────────
function handleContactSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('contact-submit-btn');
  if (!btn) return;
  
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = 'Sending...';
  
  setTimeout(() => {
    // Reset form fields
    const nameEl = document.getElementById('contact-name');
    const emailEl = document.getElementById('contact-email');
    const subjectEl = document.getElementById('contact-subject');
    const messageEl = document.getElementById('contact-message');
    
    if (nameEl) nameEl.value = '';
    if (emailEl) emailEl.value = '';
    if (subjectEl) subjectEl.value = '';
    if (messageEl) messageEl.value = '';
    
    // Change button to success state
    btn.innerHTML = 'Message Sent! ✓';
    btn.classList.add('success');
    showToast('✉️ Message sent successfully!');
    
    setTimeout(() => {
      // Revert button to original state
      btn.disabled = false;
      btn.innerHTML = originalText;
      btn.classList.remove('success');
    }, 3000);
  }, 1200);
}