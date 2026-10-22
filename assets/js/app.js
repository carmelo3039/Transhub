document.addEventListener('DOMContentLoaded', () => {
  // =========================================
  // Typed.js — efeito de digitação no banner
  // =========================================
  if (typeof Typed !== 'undefined' && document.getElementById('element')) {
    new Typed('#element', {
      strings: [
        'Air Freight',
        'Sea Freight',
        'Road Transport',
        'Warehouse Management',
        'Courier Services',
        'Supply Chain',
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1800,
      startDelay: 400,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    });
  }

  // =========================================
  // Jarallax — parallax (respeita prefers-reduced-motion)
  // =========================================
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  if (!prefersReducedMotion && typeof jarallax !== 'undefined') {
    jarallax(document.querySelectorAll('.jarallax'), { speed: 0.5 });
  }

  // =========================================
  // Swiper — slider de demos (home-area)
  // =========================================
  if (typeof Swiper !== 'undefined' && document.querySelector('.home-swiper')) {
    new Swiper('.home-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: prefersReducedMotion
        ? false
        : { delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true },
      pagination: {
        el: '.home-swiper .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.home-swiper .swiper-button-next',
        prevEl: '.home-swiper .swiper-button-prev',
      },
      a11y: {
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
      },
      breakpoints: {
        576: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }

  // =========================================
  // Navbar — sombra ao fazer scroll
  // =========================================
  const navbar = document.querySelector('.navbar');

  // =========================================
  // Back to top button
  // =========================================
  const backToTop = document.getElementById('backToTop');

  // Single scroll listener for both navbar + back-to-top (avoids two listeners)
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      if (navbar) navbar.classList.toggle('scrolled', y > 50);
      if (backToTop) backToTop.classList.toggle('visible', y > 400);
    },
    { passive: true },
  );

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    });
  }

  // =========================================
  // Custom nav toggler — clip-path circle reveal
  // =========================================
  const toggler = document.getElementById('navToggler');
  const navMenu = document.getElementById('navbarNav');

  const closeMenu = () => {
    navMenu.classList.remove('is-open');
    toggler.classList.remove('is-open');
    toggler.setAttribute('aria-expanded', 'false');
    toggler.setAttribute('aria-label', 'Open navigation menu');
    document.body.style.overflow = '';
  };

  if (toggler && navMenu) {
    toggler.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      toggler.classList.toggle('is-open', isOpen);
      toggler.setAttribute('aria-expanded', String(isOpen));
      toggler.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu' : 'Open navigation menu',
      );
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navMenu.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeMenu();
        toggler.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('is-open') &&
        !navMenu.contains(e.target) &&
        !toggler.contains(e.target)
      ) {
        closeMenu();
      }
    });
  }

  // =========================================
  // AOS — animações ao scroll
  // =========================================
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: prefersReducedMotion ? 0 : 600,
      easing: 'ease-out-quad',
      once: true,
      offset: 60,
      disable: prefersReducedMotion,
    });
  }

  // =========================================
  // Counter — números animados (feature-area)
  // =========================================
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current;
    }, 16);
  };

  const counters = document.querySelectorAll('.stat-number');
  if (counters.length) {
    if (prefersReducedMotion) {
      // Immediately set final values — no animation
      counters.forEach((el) => {
        el.textContent = el.getAttribute('data-count');
      });
    } else {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
              entry.target.dataset.animated = 'true';
              animateCounter(entry.target);
            }
          });
        },
        { threshold: 0.4 },
      );
      counters.forEach((counter) => counterObserver.observe(counter));
    }
  }

  // =========================================
  // Footer — ano dinâmico
  // =========================================
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // =========================================
  // Scroll suave para âncoras internas
  // =========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });
        // Move focus to target for keyboard accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });
});
