document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('element')) {
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

  if (typeof jarallax !== 'undefined') {
    jarallax(document.querySelectorAll('.jarallax'), {
      speed: 0.5,
    });
  }

  if (typeof Swiper !== 'undefined' && document.querySelector('.home-swiper')) {
    new Swiper('.home-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.home-swiper .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.home-swiper .swiper-button-next',
        prevEl: '.home-swiper .swiper-button-prev',
      },
      breakpoints: {
        576: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }

  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  const toggler = document.getElementById('navToggler');
  const navMenu = document.getElementById('navbarNav');

  const closeMenu = () => {
    navMenu.classList.remove('is-open');
    toggler.classList.remove('is-open');
    toggler.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (toggler && navMenu) {
    // Open / close on button click
    toggler.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      toggler.classList.toggle('is-open', isOpen);
      toggler.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close when a nav link is clicked
    navMenu.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeMenu();
        toggler.focus();
      }
    });

    // Close when clicking outside the nav on mobile
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
  // AOS — animações ao scroll (inner-pages)
  // =========================================
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 600,
      easing: 'ease-out-quad',
      once: true,
      offset: 60,
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

  // =========================================
  // Footer — ano dinâmico
  // =========================================
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // =========================================
  // Back to top button
  // =========================================
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =========================================
  // Scroll suave para âncoras internas
  // =========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
