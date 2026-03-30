/* ══════════════════════════════════════════════════
   LIMA WEB STUDIO — Interactions
   ══════════════════════════════════════════════════ */

// ─── Header scroll effect ───
const header = document.getElementById('header');

const onScroll = () => {
  if (window.scrollY > 40) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ─── Mobile menu toggle ───
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');

if (mobileBtn && mobileNav) {
  mobileBtn.addEventListener('click', () => {
    mobileBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile nav when clicking a link
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileBtn.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// ─── Scroll reveal animations ───
const revealElements = () => {
  // Add reveal class to elements we want to animate
  const targets = [
    ...document.querySelectorAll('.feature-card'),
    ...document.querySelectorAll('.portfolio-card'),
    ...document.querySelectorAll('.service-card'),
    ...document.querySelectorAll('.plan-card'),
    ...document.querySelectorAll('.process-step'),
    ...document.querySelectorAll('.testimonial-card'),
    ...document.querySelectorAll('.faq-item'),
    ...document.querySelectorAll('.section-tag'),
    ...document.querySelectorAll('.section-title'),
    ...document.querySelectorAll('.cta-section__inner'),
    ...document.querySelectorAll('.hero__proof'),
  ];

  targets.forEach(el => el.classList.add('reveal'));

  // Add stagger class to grids
  document.querySelectorAll('.features__grid, .portfolio__grid, .services__grid, .plans__grid, .process__grid, .faq__list, .testimonials__grid').forEach(grid => {
    grid.classList.add('reveal-stagger');
  });

  // Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
};

// Init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', revealElements);
} else {
  revealElements();
}

// ─── Smooth anchor scrolling (offset for fixed header) ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      const offset = 80;
      const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── Service modals ───
const openModal = (modalId) => {
  const overlay = document.getElementById(modalId);
  if (!overlay) return;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

const closeModal = (overlay) => {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
};

// Open modal from service card click or button click
document.querySelectorAll('[data-modal]').forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(trigger.dataset.modal);
  });
});

// Close modal via close button
document.querySelectorAll('.modal__close').forEach(btn => {
  btn.addEventListener('click', () => {
    closeModal(btn.closest('.modal-overlay'));
  });
});

// Close modal by clicking outside (on the overlay)
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal(overlay);
  });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(closeModal);
  }
});

// ─── FAQ Accordion ───
const faqButtons = document.querySelectorAll('.faq-item__question');
faqButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isActive = item.classList.contains('active');

    // Close all FAQs securely
    document.querySelectorAll('.faq-item').forEach(faq => {
      faq.classList.remove('active');
    });

    // Toggle if it wasn't already active
    if (!isActive) item.classList.add('active');
  });
});

// ─── 3D Tilt Effect on Plan Cards ───
if (window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll('.plan-card, .service-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}
