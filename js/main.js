/* ════════════════════════════════════
   SALONG GLOBAL STYLE — main.js
   ════════════════════════════════════ */

// ── Page Loader ──
document.body.style.overflow = 'hidden';
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('gone');
    document.body.style.overflow = '';
  }, 1900);
});

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

// ── Mobile hamburger ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// ── Scroll-reveal (IntersectionObserver) ──
const revealTargets = document.querySelectorAll(
  '.service-card, .about-inner, .gallery-item, .location-inner, .stat, .section-header'
);
revealTargets.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => observer.observe(el));

// ── Google Reviews (Salong Global Style) ──
const reviews = [
  { name: 'Erik J.',         initials: 'EJ', rating: 5, text: 'Grym klippning varje gång! Kom utan bokning och de tog emot mig direkt. Barberaren lyssnade noga och resultatet var perfekt.' },
  { name: 'Ahmed H.',        initials: 'AH', rating: 5, text: 'Alltid nöjd när jag lämnar Global Style. Bra service, trevlig personal och priset är helt okej. Bästa barbershopen på Hisingen!' },
  { name: 'Omar A.',         initials: 'OA', rating: 5, text: 'Bästa stället i hela Göteborg utan tvekan. Har testat många ställen men ingen kommer i närheten. Skärpan på faden är oslagbar!' },
  { name: 'Christoffer B.',  initials: 'CB', rating: 5, text: 'Tog med min brorson hit — han var helt nöjd och ville inte gå hem. Jättetrevlig personal, snabbt och prisvärt. Kommer tillbaka!' },
  { name: 'Yusuf M.',        initials: 'YM', rating: 5, text: 'Fantastisk fade och skäggklippning. Personalen är vänlig och verkliga proffs. Hittat min stambarberare i Göteborg!' },
  { name: 'Daniel K.',       initials: 'DK', rating: 5, text: 'Professionell service från start till slut. Mycket noggrann klippning och avslappnad stämning. Rekommenderas varmt.' },
  { name: 'Marcus L.',       initials: 'ML', rating: 5, text: 'Jag har klippt mig här i flera år nu. Konsekvent kvalitet och bra priser. Drop-in fungerar utmärkt.' },
  { name: 'Sebastian R.',    initials: 'SR', rating: 5, text: 'Helt klart en av de bästa barberarna i Göteborg. Tar sin tid och gör jobbet ordentligt.' },
  { name: 'Adam S.',         initials: 'AS', rating: 5, text: 'Bra bemötande och kunniga barberare. Lyckas alltid leverera den stil jag är ute efter.' },
  { name: 'Filip N.',        initials: 'FN', rating: 4, text: 'Bra klippning till ett bra pris. Snabb service, kom in på drop-in utan att behöva vänta länge.' },
  { name: 'Johan W.',        initials: 'JW', rating: 5, text: 'Trevlig personal som verkligen kan sitt yrke. Tog hand om både hår och skägg på ett toppenresultat.' },
  { name: 'Kevin T.',        initials: 'KT', rating: 5, text: 'Alltid nöjd, alltid snyggt. Inget krångel — bara bra klippningar.' },
];

const GOOGLE_LOGO_SVG = `<svg width="14" height="14" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
  <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.59.102-1.167.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z"/>
</svg>`;

function buildCard(r) {
  const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
  return `<article class="review-card">
    <div class="review-header">
      <div class="review-avatar">${r.initials}</div>
      <div class="review-author">
        <strong>${r.name}</strong>
      </div>
    </div>
    <div class="review-stars">${stars}</div>
    <p class="review-text">"${r.text}"</p>
    <div class="review-source">${GOOGLE_LOGO_SVG} Google recension</div>
  </article>`;
}

function renderMarquee() {
  const row1 = document.getElementById('marqueeRow1');
  if (!row1) return;
  // Duplicera för sömlös loop
  row1.innerHTML = [...reviews, ...reviews].map(buildCard).join('');
}

renderMarquee();

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--gold)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── Flytande Ring/Boka-knapp (FAB) ──
const fabBtn    = document.getElementById('fabBtn');
const fabPopup  = document.getElementById('fabPopup');

if (fabBtn && fabPopup) {
  fabBtn.addEventListener('click', () => {
    const isOpen = fabPopup.classList.toggle('open');
    fabBtn.classList.toggle('open', isOpen);
    fabPopup.setAttribute('aria-hidden', String(!isOpen));
  });

  // Stäng popup vid klick utanför
  document.addEventListener('click', (e) => {
    if (!fabBtn.contains(e.target) && !fabPopup.contains(e.target)) {
      fabPopup.classList.remove('open');
      fabBtn.classList.remove('open');
      fabPopup.setAttribute('aria-hidden', 'true');
    }
  });

  // Stäng popup vid scroll (valfritt — bra UX på mobil)
  window.addEventListener('scroll', () => {
    fabPopup.classList.remove('open');
    fabBtn.classList.remove('open');
    fabPopup.setAttribute('aria-hidden', 'true');
  }, { passive: true });
}

// ── Gallery swipe dots ──
const galleryGrid = document.querySelector('.gallery-grid');
const galleryDots = document.querySelectorAll('.gallery-dot');
if (galleryGrid && galleryDots.length) {
  galleryGrid.addEventListener('scroll', () => {
    const center = galleryGrid.scrollLeft + galleryGrid.offsetWidth / 2;
    let closest = 0, minDist = Infinity;
    galleryGrid.querySelectorAll('.gallery-item').forEach((item, i) => {
      const dist = Math.abs((item.offsetLeft + item.offsetWidth / 2) - center);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    galleryDots.forEach((d, i) => d.classList.toggle('active', i === closest));
  }, { passive: true });
}

// ── Karta — cookie consent + lazy load ──
function loadGoogleMap() {
  const mapEl = document.getElementById('locationMap');
  if (!mapEl) return;
  const iframe = document.createElement('iframe');
  iframe.title = 'Karta till Salong Global Style';
  iframe.src = 'https://maps.google.com/maps?q=Wieselgrensgatan+7,+417+17+G%C3%B6teborg,+Sweden&output=embed&hl=sv&z=16';
  iframe.loading = 'lazy';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'no-referrer-when-downgrade';
  mapEl.innerHTML = '';
  mapEl.appendChild(iframe);
}

const mapAllowBtn = document.getElementById('mapAllow');
if (mapAllowBtn) {
  if (localStorage.getItem('mapConsent') === 'true') {
    loadGoogleMap();
  } else {
    mapAllowBtn.addEventListener('click', () => {
      localStorage.setItem('mapConsent', 'true');
      loadGoogleMap();
    });
  }
}

// ── Öppet/Stängt-pill + today-row (Stockholm-tidszon) ──
function updateHoursUI() {
  // Hämta dag och tid i Stockholm-tidszon, oavsett besökarens lokala tidszon
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Stockholm',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });
  const parts = Object.fromEntries(fmt.formatToParts(new Date()).map(p => [p.type, p.value]));
  const weekdayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const day = weekdayMap[parts.weekday];
  const time = parseInt(parts.hour, 10) * 60 + parseInt(parts.minute, 10);

  // Mån–Lör 10–19, Sön 11–16
  let isOpen = false;
  if (day >= 1 && day <= 6) isOpen = time >= 600 && time < 1140;
  if (day === 0)            isOpen = time >= 660 && time < 960;

  const pill = document.getElementById('statusPill');
  const txt  = document.getElementById('statusTxt');
  if (pill && txt) {
    txt.textContent = isOpen ? 'Öppet nu' : 'Stängt nu';
    pill.classList.toggle('closed-pill', !isOpen);
  }

  // Markera dagens rad
  document.querySelectorAll('#hoursTable tr[data-day]').forEach(row => {
    row.classList.toggle('today-row', Number(row.dataset.day) === day);
  });
}
updateHoursUI();

// ── Dynamiskt år i footer ──
const yearEl = document.getElementById('footerYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── "Boka"-CTA: ring på touch, scrolla till kontakt på dator ──
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('a.book-cta').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = document.getElementById('kontakt');
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
