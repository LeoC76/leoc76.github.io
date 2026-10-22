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

// // ----- Filtres de projets (page Projets) -----
// const filterBtns = document.querySelectorAll('.filter-btn');
// const projectCards = document.querySelectorAll('[data-tags]');
// if (filterBtns.length && projectCards.length) {
//   filterBtns.forEach(btn => {
//     btn.addEventListener('click', () => {
//       filterBtns.forEach(b => b.classList.remove('active'));
//       btn.classList.add('active');
//       const filter = btn.dataset.filter;
//       projectCards.forEach(card => {
//         const tags = card.dataset.tags.split(',');
//         if (filter === 'tous' || tags.includes(filter)) {
//           card.classList.remove('hidden-card');
//         } else {
//           card.classList.add('hidden-card');
//         }
//       });
//     });
//   });
// }

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

// ----- Chargement dynamique des projets et gestion des filtres -----
async function chargerProjets() {
  const container = document.querySelector('.projects-grid-full');
  if (!container) return; // Sécurité si on n'est pas sur la page projets

  try {
    const reponse = await fetch('../projets.json');
    const projets = await reponse.json();

    container.innerHTML = ''; // Nettoyage du conteneur

    projets.forEach(projet => {
      const tagsHTML = projet.technos.map(tech => `<span class="tag">${tech}</span>`).join('');
      
      const carteHTML = `
        <div class="card project-card-full reveal in" data-tags="${projet.tags.join(',')}">
          <div class="project-image-container">
            <img src="${projet.image}" alt="Aperçu de ${projet.titre}" class="project-image">
            <span class="status">${projet.status}</span>
          </div>
          <h3>${projet.titre}</h3>
          <p>${projet.description}</p>
          <div class="project-tags">
            ${tagsHTML}
          </div>
          <div class="links">
            <a href="${projet.lien}" target="_blank">${projet.texteLien}</a>
          </div>
        </div>
      `;
      
      container.insertAdjacentHTML('beforeend', carteHTML);
    });

    // Activation des filtres une fois les cartes injectées
    activerFiltres();
    
  } catch (erreur) {
    console.error("Erreur lors du chargement des projets :", erreur);
  }
}

function activerFiltres() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('[data-tags]');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      // On s'assure de ne pas dupliquer les écouteurs si la fonction est rappelée
      btn.replaceWith(btn.cloneNode(true));
    });

    // On ré-assigne les écouteurs sur les boutons frais
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        
        document.querySelectorAll('[data-tags]').forEach(card => {
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
}

document.addEventListener('DOMContentLoaded', chargerProjets);