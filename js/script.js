// =========================================================
// Portfolio — script commun
// =========================================================

// ----- Menu mobile -----
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ----- Reveal au scroll -----
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));
}

// ----- Barres de compétences animées (page À propos) -----
const skillBars = document.querySelectorAll('.skill-bar-fill');
if (skillBars.length) {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target.dataset.level || '0';
        entry.target.style.width = target + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillBars.forEach(bar => barObserver.observe(bar));
}

// ----- Filtres de projets (page Projets) -----
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('[data-tags]');
if (filterBtns.length && projectCards.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const tags = card.dataset.tags.split(',');
        if (filter === 'tous' || tags.includes(filter)) {
          card.classList.remove('hidden-card');
        } else {
          card.classList.add('hidden-card');
        }
      });
    });
  });
}

// ----- Formulaire de contact (démo, sans backend) -----
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const successMsg = document.querySelector('.form-success');
    if (successMsg) {
      successMsg.classList.add('show');
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    contactForm.reset();
  });
}

// ----- Année dans le footer -----
document.querySelectorAll('.current-year').forEach(el => {
  el.textContent = new Date().getFullYear();
});
