/* ============================================================
   RETRO JERSEY — script.js
   Mobile nav toggle · sticky header state · active link tracking
   scroll-reveal animation · back-to-top button · footer year
   Vanilla JS, no dependencies.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const header      = document.getElementById('siteHeader');
  const menuToggle   = document.getElementById('menuToggle');
  const mainNav      = document.getElementById('mainNav');
  const navLinks     = document.querySelectorAll('.nav-link');
  const scrollTopBtn = document.getElementById('scrollTop');
  const yearEl       = document.getElementById('year');

  /* Footer year */
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile menu toggle ---------- */
  function closeMenu() {
    mainNav.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  }

  function openMenu() {
    mainNav.classList.add('open');
    menuToggle.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close menu');
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });

    /* Close the menu whenever a nav link is tapped (mobile) */
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    /* Close on Escape key */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- Sticky header background on scroll ---------- */
  function handleHeaderScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }
  handleHeaderScroll();
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  /* ---------- Back-to-top button ---------- */
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Scroll-triggered reveal animation ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    /* Fallback: just show everything if IntersectionObserver isn't supported */
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- Active nav link tracking while scrolling ---------- */
  const sections = document.querySelectorAll('section[id]');

  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const matchingLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (!matchingLink) return;

        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
          matchingLink.classList.add('active');
        }
      });
    }, {
      threshold: 0.4,
      rootMargin: '-80px 0px -40% 0px'
    });

    sections.forEach(section => navObserver.observe(section));
  }

});
