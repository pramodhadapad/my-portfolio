// ── SCROLL REVEAL OBSERVER ─────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
reveals.forEach(el => observer.observe(el));

// ── ACTIVE NAVIGATION ON SCROLL ───────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const onScroll = () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
};
window.addEventListener('scroll', onScroll, { passive: true });

// ── MOBILE MENU ───────────────────────────────────────────────────
function toggleMobile() {
  const hb = document.getElementById('hamburger');
  const mm = document.getElementById('mobileMenu');
  if (hb) hb.classList.toggle('open');
  if (mm) mm.classList.toggle('open');
  document.body.style.overflow = mm && mm.classList.contains('open') ? 'hidden' : '';
}

function closeMobile() {
  const hb = document.getElementById('hamburger');
  const mm = document.getElementById('mobileMenu');
  if (hb) hb.classList.remove('open');
  if (mm) mm.classList.remove('open');
  document.body.style.overflow = '';
}

// ── INTERACTIVE PIPELINE INSPECTOR ─────────────────────────────────
// Showcases Sales Analytics workflow: Python data cleaning -> Oracle SQL -> Power BI summary
const PIPELINE_DATA = {
  raw: {
    badge: '01: DATA INGESTION & CLEANING (PYTHON / PANDAS)',
    type: 'Python Data Pipeline',
    status: 'Removed duplicate rows · Handled missing values · Standardized ISO date formats',
    content: `# Sales Dataset Cleaning Script (clean_sales.py)
import pandas as pd

# Load raw sales data
df = pd.read_csv("raw_sales_records.csv")

# 1. Deduplicate records based on transaction ID
df.drop_duplicates(subset=["order_id"], keep="first", inplace=True)

# 2. Impute missing discount values with median
df["discount"].fillna(0.0, inplace=True)

# 3. Standardize date strings to datetime format
df["order_date"] = pd.to_datetime(df["order_date"], errors="coerce")

# Export clean dataset for database staging & Power BI ingestion
df.to_csv("clean_sales_2026.csv", index=False)
print(f"Cleaned {len(df)} transactions ready for analysis.")`
  },
  sql: {
    badge: '02: ORACLE SQL AGGREGATION & REPORTING',
    type: 'Oracle SQL Query',
    status: 'Executed on Oracle Database · Aggregates monthly revenue & regional metrics',
    content: `-- Monthly Revenue & Category Performance Analysis
SELECT 
    TO_CHAR(order_date, 'YYYY-MM') AS sales_month,
    product_category,
    region,
    COUNT(order_id) AS total_orders,
    ROUND(SUM(unit_price * quantity * (1 - discount)), 2) AS net_revenue,
    ROUND(AVG(unit_price * quantity), 2) AS avg_order_value
FROM sales_transactions
WHERE order_status = 'COMPLETED'
GROUP BY TO_CHAR(order_date, 'YYYY-MM'), product_category, region
ORDER BY sales_month DESC, net_revenue DESC;`
  },
  analytics: {
    badge: '03: POWER BI DASHBOARD METRICS',
    type: 'Power BI Executive Model',
    status: 'DAX Measures computed · KPI cards & dynamic filters refreshed',
    content: `// Key DAX Measures Configured in Power BI Model
Total_Revenue = SUMX(Sales, Sales[Quantity] * Sales[UnitPrice] * (1 - Sales[Discount]))

MoM_Growth = 
VAR CurrentMonth = [Total_Revenue]
VAR PriorMonth = CALCULATE([Total_Revenue], DATEADD('Calendar'[Date], -1, MONTH))
RETURN DIVIDE(CurrentMonth - PriorMonth, PriorMonth, 0)

Top_Performing_Region = TOPN(1, VALUES(Sales[Region]), [Total_Revenue], DESC)

// Status: Visualized in Power BI with KPI cards, regional slicers, and monthly trends`
  }
};

function switchPipelineTab(tabKey) {
  const data = PIPELINE_DATA[tabKey];
  if (!data) return;

  document.querySelectorAll('.pipe-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === tabKey);
  });

  const badgeEl = document.getElementById('pipe-badge');
  const typeEl = document.getElementById('pipe-type');
  const statusEl = document.getElementById('pipe-status');
  const codeEl = document.getElementById('pipe-code');

  if (badgeEl) badgeEl.textContent = data.badge;
  if (typeEl) typeEl.textContent = data.type;
  if (statusEl) statusEl.textContent = data.status;
  if (codeEl) codeEl.textContent = data.content;
}

// ── PROJECT MODAL SYSTEM (Direct from Pramod_DR.pdf) ───────────────
const PROJECTS = [
  {
    "id": "sales",
    "title": "Sales Analytics Dashboard",
    "badge": "Python · Pandas · Power BI",
    "desc": "An end-to-end data analytics project. Cleaned and analyzed historical sales transactions using Python and pandas—removing duplicates, handling missing values, and formatting dates. Developed an interactive Power BI dashboard featuring executive KPI cards, dynamic slicers, and visualizations showcasing revenue distribution by region, product category, and month.",
    "problem": "Raw transactional sales records contained missing fields, irregular date formats, and duplicates, making executive performance reporting impossible.",
    "solution": "Built a clean Python preprocessing script with pandas, then structured a star-schema model in Power BI with dynamic DAX calculations for revenue tracking.",
    "tags": ["Python", "Pandas", "Power BI", "Data Cleaning", "DAX Measures", "KPI Reporting", "Excel"],
    "image": "",
    "live": "",
    "github": "https://github.com/pramodhadapad"
  },
  {
    "id": "repochat",
    "title": "RepoChat — AI-Powered Repository Chat SaaS",
    "badge": "Final Semester MCA Project",
    "desc": "Independently designed, developed, and deployed a full-stack RAG SaaS platform that lets developers chat with any GitHub repository through multiple LLM providers (Groq/LLaMA3). Features a VS Code-inspired UI (FileExplorer, CodeEditor, ChatWindow panels), MongoDB Atlas database, and automated UptimeRobot health checks to eliminate free-tier cold starts.",
    "problem": "Navigating and understanding unfamiliar open-source GitHub codebases is time-consuming and cognitively heavy.",
    "solution": "Built a retrieval pipeline connecting GitHub repositories with Groq LLaMA3, using LangChain.js and MongoDB Atlas for contextual technical responses.",
    "tags": ["React", "Node.js", "Express", "MongoDB Atlas", "Groq / LLaMA3", "LangChain.js", "RAG Pipelines", "Vercel"],
    "image": "assets/images/repochat_screenshot.png",
    "live": "https://repochat-ai.vercel.app",
    "github": "https://github.com/pramodhadapad"
  },
  {
    "id": "tyt",
    "title": "Take Your Time (TYT) — Tutoring Marketplace SaaS",
    "badge": "Full Stack Marketplace",
    "desc": "Designed and built a two-sided tutoring marketplace where students discover and book verified tutors. Includes end-to-end Razorpay payment integration, Google OAuth authentication, Resend email notifications, Twilio SMS alerts, and Google Calendar synchronization for tutor availability.",
    "problem": "Students and tutors struggled with manual scheduling, unreliable availability tracking, and unorganized session fee collections.",
    "solution": "Engineered a centralized booking marketplace with calendar availability sync, automated notifications, and secure Razorpay payment processing.",
    "tags": ["React 19", "Vite", "Tailwind CSS", "Node.js", "Express", "MongoDB Atlas", "Razorpay", "Google OAuth"],
    "image": "",
    "live": "",
    "github": "https://github.com/pramodhadapad"
  },
  {
    "id": "smartlock",
    "title": "AI Smart Lock — IoT & Computer Vision",
    "badge": "Python · OpenCV · IoT",
    "desc": "An IoT-enabled access-control system combining an ESP32-CAM and a PIR motion sensor with Python and OpenCV facial recognition. Automatically verifies authorized personnel, actuates a solenoid door lock upon recognition, and dispatches real-time security alerts with capture snapshots via Telegram API.",
    "problem": "Physical key systems lack audit logging and can be compromised without notification.",
    "solution": "Integrated embedded hardware with Python face recognition algorithms and instant Telegram alert notifications.",
    "tags": ["Python", "OpenCV", "ESP32-CAM", "PIR Sensor", "Computer Vision", "Telegram API", "IoT"],
    "image": "",
    "live": "",
    "github": "https://github.com/pramodhadapad"
  },
  {
    "id": "placement",
    "title": "Placement Cell Management System",
    "badge": "Oracle SQL · Database System",
    "desc": "A role-based web database system (Admin, Student, Placement Staff) engineered to streamline college placement operations, job postings, resume uploads, and student eligibility approval workflows backed by relational database tables.",
    "problem": "Tracking college placement eligibility and recruiter records across hundreds of students in spreadsheets caused human errors and missed deadlines.",
    "solution": "Designed a normalized relational database schema with role-based access control, automated candidate eligibility filtering, and application status workflows.",
    "tags": ["Oracle SQL", "DBMS", "Schema Design", "Relational Database", "Role-Based Access", "Data Management"],
    "image": "assets/images/placement_cell_screenshot.png",
    "live": "",
    "github": "https://github.com/pramodhadapad"
  }
];

function openModal(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;

  const modalImg = document.getElementById('modal-img');
  if (modalImg) {
    if (p.image) {
      modalImg.src = p.image;
      modalImg.style.display = 'block';
    } else {
      modalImg.style.display = 'none';
    }
  }

  const badgeEl = document.getElementById('modal-badge');
  const titleEl = document.getElementById('modal-title');
  const descEl = document.getElementById('modal-desc');
  const tagsEl = document.getElementById('modal-tags');
  const linksEl = document.getElementById('modal-links');

  if (badgeEl) badgeEl.textContent = p.badge;
  if (titleEl) titleEl.textContent = p.title;
  if (descEl) {
    let html = `<p>${p.desc}</p>`;
    if (p.problem && p.solution) {
      html += `<div style="margin-top:16px; padding:14px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:6px; font-size:13.5px; line-height:1.6;">
        <p style="margin-bottom:8px;"><strong style="color:#38BDF8;">Problem:</strong> ${p.problem}</p>
        <p><strong style="color:#10B981;">Solution:</strong> ${p.solution}</p>
      </div>`;
    }
    descEl.innerHTML = html;
  }

  if (tagsEl) {
    tagsEl.innerHTML = p.tags.map(t => `<span class="modal-tag">${t}</span>`).join('');
  }

  if (linksEl) {
    const links = [];
    if (p.live) links.push(`<a href="${p.live}" target="_blank" class="primary">Live Product ↗</a>`);
    if (p.github) links.push(`<a href="${p.github}" target="_blank" class="secondary">GitHub Repository ↗</a>`);
    linksEl.innerHTML = links.join('');
  }

  const backdrop = document.getElementById('modalBackdrop');
  if (backdrop) {
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(e) {
  const backdrop = document.getElementById('modalBackdrop');
  if (e.target === backdrop) {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const backdrop = document.getElementById('modalBackdrop');
    if (backdrop) {
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
});

// ── TOAST HELPER ──────────────────────────────────────────────────
function showToast(text) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = text;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2600);
}

// ── COPY EMAIL ────────────────────────────────────────────────────
function copyEmail(e) {
  if (e) e.preventDefault();
  navigator.clipboard.writeText('Pramodhadapad.pramod@gmail.com').then(() => {
    showToast('Copied Pramodhadapad.pramod@gmail.com');
  }).catch(() => {
    showToast('Pramodhadapad.pramod@gmail.com');
  });
}

// ── CONTACT SUBMISSION (Web3Forms — real email delivery) ──────────
function handleContactSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('contact-submit-btn');
  if (!btn) return;

  const nameEl = document.getElementById('contact-name');
  const emailEl = document.getElementById('contact-email');
  const subjectEl = document.getElementById('contact-subject');
  const messageEl = document.getElementById('contact-message');

  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = 'Sending message...';

  const formData = {
    access_key: '15643657-d033-446b-b80d-c2676fb2295c',
    name: nameEl ? nameEl.value : '',
    email: emailEl ? emailEl.value : '',
    subject: subjectEl ? subjectEl.value : 'Portfolio Contact Form',
    message: messageEl ? messageEl.value : '',
    from_name: 'Portfolio Contact Form',
    replyto: emailEl ? emailEl.value : ''
  };

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      if (nameEl) nameEl.value = '';
      if (emailEl) emailEl.value = '';
      if (subjectEl) subjectEl.value = '';
      if (messageEl) messageEl.value = '';

      btn.innerHTML = 'Message Sent ✓';
      btn.classList.add('success');
      showToast('Message delivered! I will reply to your email shortly.');
    } else {
      btn.innerHTML = 'Failed — Try Again';
      showToast('Something went wrong. Please email me directly.');
    }
  })
  .catch(() => {
    btn.innerHTML = 'Failed — Try Again';
    showToast('Network error. Please email Pramodhadapad.pramod@gmail.com directly.');
  })
  .finally(() => {
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalText;
      btn.classList.remove('success');
    }, 3200);
  });
}
