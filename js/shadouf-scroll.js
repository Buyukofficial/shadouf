/**
 * ===================================================================
 * AL SHADOUF GROUP — Enterprise Smooth Scrolling & Kinetic Reveal Engine
 * Powered by Lenis & Hardware-Accelerated Intersection Observers
 * ===================================================================
 */

(function () {
  'use strict';

  // Respect user's motion preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let lenisInstance = null;

  document.addEventListener('DOMContentLoaded', () => {
    initLenisScroll();
    initScrollProgressBar();
    initCircularBackToTop();
    initStaggeredScrollReveals();
    initParallaxLayers();
    initTimelineScrollCircuit();
    initSectionScrollHighlights();
  });

  /* ===================================================================
     1. LENIS INERTIA SMOOTH SCROLLING
     =================================================================== */
  function initLenisScroll() {
    if (prefersReducedMotion || typeof Lenis === 'undefined') {
      console.log('Lenis smooth scroll disabled or fallback to native.');
      return;
    }

    try {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.05,
        touchMultiplier: 1.5,
        infinite: false
      });

      // Integrate with requestAnimationFrame
      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Provide smooth scroll for all internal anchor links (e.g. href="#quote", href="#estimator")
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          const targetId = this.getAttribute('href');
          if (targetId && targetId !== '#' && !targetId.includes('quote')) {
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
              e.preventDefault();
              lenisInstance.scrollTo(targetEl, { offset: -80, duration: 1.2 });
            }
          }
        });
      });

      window.lenis = lenisInstance;
    } catch (e) {
      console.warn('Lenis init fallback to native scroll:', e);
    }
  }

  /* ===================================================================
     2. TELEMETRY TOP SCROLL PROGRESS BAR
     =================================================================== */
  function initScrollProgressBar() {
    let bar = document.getElementById('scrollProgressBar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'scrollProgressBar';
      bar.innerHTML = '<div class="scroll-progress-fill"><div class="scroll-progress-head"></div></div>';
      document.body.appendChild(bar);
    }

    const fill = bar.querySelector('.scroll-progress-fill');

    function updateProgress() {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      if (fill) {
        fill.style.width = `${progress}%`;
      }
    }

    if (lenisInstance) {
      lenisInstance.on('scroll', updateProgress);
    } else {
      window.addEventListener('scroll', updateProgress, { passive: true });
    }
    updateProgress();
  }

  /* ===================================================================
     3. CIRCULAR PROGRESS BACK-TO-TOP BUTTON
     =================================================================== */
  function initCircularBackToTop() {
    let btn = document.getElementById('backToTop');
    if (!btn) {
      btn = document.createElement('div');
      btn.id = 'backToTop';
      btn.className = 'back-to-top-circle';
      btn.innerHTML = `
        <svg class="progress-ring" width="52" height="52" viewBox="0 0 52 52">
          <circle class="progress-ring-bg" cx="26" cy="26" r="23" fill="none" stroke-width="3"></circle>
          <circle class="progress-ring-circle" cx="26" cy="26" r="23" fill="none" stroke-width="3"></circle>
        </svg>
        <span class="back-to-top-arrow">↑</span>
      `;
      document.body.appendChild(btn);
    }

    const circle = btn.querySelector('.progress-ring-circle');
    const radius = 23;
    const circumference = 2 * Math.PI * radius;

    if (circle) {
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = `${circumference}`;
    }

    function updateCircle() {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;

      if (circle) {
        const offset = circumference - progress * circumference;
        circle.style.strokeDashoffset = offset;
      }

      if (scrollY > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }

    if (lenisInstance) {
      lenisInstance.on('scroll', updateCircle);
    } else {
      window.addEventListener('scroll', updateCircle, { passive: true });
    }

    btn.addEventListener('click', () => {
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  /* ===================================================================
     4. STAGGERED SCROLL REVEALS & KINETIC CHOREOGRAPHY
     =================================================================== */
  function initStaggeredScrollReveals() {
    // Automatically prepare sibling grids for cascading stagger
    const gridContainers = document.querySelectorAll(
      '.bento-grid, .terminal-bento-mini, .spotlight-metric-grid, .p3d-stats-row, .timeline-strip, .brand-grid, .footer-grid'
    );

    gridContainers.forEach(container => {
      const children = Array.from(container.children);
      children.forEach((child, index) => {
        child.style.setProperty('--stagger', index);
        if (!child.classList.contains('fade-in')) {
          child.classList.add('fade-in');
        }
      });
    });

    // Meaningful reveal targets
    const revealTargets = document.querySelectorAll(
      '.section-header, .hero-content, .hero-glass-terminal, .bento-card, .product-card, .project-card, .project-dossier-card, .mini-bento-card, .diagnostic-radar-box, .blueprint-explorer-card, .lever-physics-card, .product-3d-stage, .spotlight-project-frame, .contact-card, .wizard-card'
    );

    const observerOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // If section header, also animate overline
          const overline = entry.target.querySelector('.overline');
          if (overline) overline.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealTargets.forEach(el => {
      el.classList.add('scroll-reveal');
      revealObserver.observe(el);
    });
  }

  /* ===================================================================
     5. SCROLL VELOCITY PARALLAX DEPTH LAYERS
     =================================================================== */
  function initParallaxLayers() {
    if (prefersReducedMotion || window.innerWidth < 768) return;

    const hero3d = document.querySelector('.hero-3d-container');
    const heroLeft = document.querySelector('.hero-left');
    const heroTerminal = document.querySelector('.hero-glass-terminal');

    function applyParallax() {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      if (scrollY < 900) {
        // Hero 3D floats smoothly down at a fraction of scroll
        if (hero3d) {
          hero3d.style.transform = `translate3d(0, ${scrollY * 0.16}px, 0)`;
        }
        if (heroLeft) {
          heroLeft.style.transform = `translate3d(0, ${scrollY * 0.08}px, 0)`;
        }
        if (heroTerminal) {
          heroTerminal.style.transform = `translate3d(0, ${scrollY * 0.12}px, 0)`;
        }
      }
    }

    if (lenisInstance) {
      lenisInstance.on('scroll', applyParallax);
    } else {
      window.addEventListener('scroll', applyParallax, { passive: true });
    }
  }

  /* ===================================================================
     6. ABOUT US: SCROLL-DRIVEN TIMELINE CONDUIT FILL
     =================================================================== */
  function initTimelineScrollCircuit() {
    const timeline = document.querySelector('.timeline-strip');
    if (!timeline) return;

    const nodes = timeline.querySelectorAll('.timeline-node');
    if (nodes.length === 0) return;

    // Track scroll through the timeline
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('node-active');
        }
      });
    }, { threshold: 0.35, rootMargin: '0px 0px -40px 0px' });

    nodes.forEach(node => timelineObserver.observe(node));
  }

  /* ===================================================================
     7. SECTION SCROLL HIGHLIGHTS & TELEMETRY BADGES
     =================================================================== */
  function initSectionScrollHighlights() {
    const sections = document.querySelectorAll('section[id], section.section');
    if (sections.length === 0) return;

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-active');
        }
      });
    }, { threshold: 0.2 });

    sections.forEach(sec => sectionObserver.observe(sec));
  }

})();
