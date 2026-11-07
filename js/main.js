/* =============================================
   AL SHADOUF GROUP — Main JavaScript
   Advanced Interactive Engine & Utilities
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ===== Dynamic Favicon Check =====
  if (!document.querySelector("link[rel*='icon']")) {
    const favicon = document.createElement('link');
    favicon.rel = 'shortcut icon';
    favicon.type = 'image/svg+xml';
    favicon.href = 'images/favicon.svg';
    document.head.appendChild(favicon);
  }

  // ===== Sticky Navbar =====
  const navbars = document.querySelectorAll('.navbar, #navbar');
  window.addEventListener('scroll', () => {
    const isScrolled = window.scrollY > 40;
    navbars.forEach(nav => {
      nav.classList.toggle('scrolled', isScrolled);
    });
  });

  // ===== Universal Mobile Menu Handler =====
  const hamburgerButtons = document.querySelectorAll('.hamburger, #menuToggle, .menu-toggle');
  const menus = document.querySelectorAll('.nav-menu, .nav-links, #navLinks');

  hamburgerButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('active');
      menus.forEach(menu => menu.classList.toggle('active'));
      const isActive = btn.classList.contains('active');
      document.body.style.overflow = isActive ? 'hidden' : '';
    });
  });

  // Close menu on link clicks
  document.querySelectorAll('.nav-menu a, .nav-links a').forEach(link => {
    if (!link.classList.contains('dropdown-toggle') && !link.closest('.dropdown') && !link.closest('.nav-dropdown-menu')) {
      link.addEventListener('click', () => {
        hamburgerButtons.forEach(btn => btn.classList.remove('active'));
        menus.forEach(menu => menu.classList.remove('active'));
        document.body.style.overflow = '';
      });
    }
  });

  // Mobile dropdown toggle
  document.querySelectorAll('.nav-dropdown, .nav-links > li').forEach(item => {
    const trigger = item.querySelector('.nav-link, a');
    const dropdown = item.querySelector('.nav-dropdown-menu, .dropdown');
    if (trigger && dropdown) {
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 860) {
          if (dropdown.classList.contains('open') || item.classList.contains('dropdown-open')) {
            dropdown.classList.remove('open');
            item.classList.remove('dropdown-open');
          } else {
            e.preventDefault();
            dropdown.classList.add('open');
            item.classList.add('dropdown-open');
          }
        }
      });
    }
  });

  // ===== Scroll Reveal Animations =====
  const animateElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in, [data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animateElements.forEach(el => observer.observe(el));

  // ===== Animated Stats Counters =====
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        if (isNaN(target)) return;

        const suffix = el.getAttribute('data-suffix') || '+';
        const prefix = el.getAttribute('data-prefix') || '';
        const duration = 2200;
        const stepTime = 20;
        const totalSteps = duration / stepTime;
        const step = target / totalSteps;
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
        }, stepTime);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(el => counterObserver.observe(el));

  // ===== Product & Project Filtering =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const filterableCards = document.querySelectorAll('.product-card[data-category], .project-card[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      filterableCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'opacity .4s ease, transform .4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ===== Live Product Search =====
  const productSearch = document.getElementById('productSearchInput');
  if (productSearch) {
    productSearch.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      filterableCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (!q || text.includes(q)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // ===== Universal Form Handling =====
  const forms = document.querySelectorAll('.contact-form, form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        if (!field.value || !field.value.trim()) {
          field.style.borderColor = '#EF4444';
          field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.15)';
          valid = false;
        } else {
          field.style.borderColor = '#10B981';
          field.style.boxShadow = 'none';
        }
      });

      if (valid) {
        const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('button');
        if (submitBtn) {
          const originalText = submitBtn.innerHTML;
          submitBtn.innerHTML = '✓ Inquiry Sent Successfully!';
          submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
          submitBtn.style.color = '#FFFFFF';
          submitBtn.disabled = true;

          // Alert banner
          const notice = document.createElement('div');
          notice.className = 'submission-alert';
          notice.innerHTML = `
            <div style="background:#ECFDF5; border:1px solid #A7F3D0; color:#065F46; padding:16px 20px; border-radius:12px; margin-top:16px; font-weight:500; font-size:0.92rem; display:flex; align-items:center; gap:12px;">
              <span style="font-size:1.4rem;">🎉</span>
              <div>
                <strong>Thank you! Your MEP specification has been received.</strong>
                <div style="font-size:0.84rem; color:#047857; margin-top:2px;">An Al Shadouf technical sales engineer will review your BOQ / request and respond within 2-4 business hours.</div>
              </div>
            </div>
          `;
          form.appendChild(notice);

          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.style.color = '';
            submitBtn.disabled = false;
            form.reset();
            setTimeout(() => notice.remove(), 4000);
          }, 3500);
        }
      }
    });
  });

  // ===== Back to Top Button =====
  const backToTop = document.querySelector('.back-to-top, #backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== INJECT GLOBAL FLOATING WHATSAPP CHAT BUTTON =====
  const waBtn = document.createElement('div');
  waBtn.className = 'floating-wa-wrapper';
  waBtn.innerHTML = `
    <a href="https://wa.me/97165423984?text=Hello%20Al%20Shadouf%20Group,%20I%20would%20like%20to%20inquire%20about%20MEP%20materials%20and%20quotations." 
       target="_blank" rel="noopener noreferrer" class="floating-wa-btn" aria-label="Chat on WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.004.545 1.791.783 2.806.783 3.182 0 5.768-2.587 5.768-5.766.001-3.18-2.585-5.766-5.768-5.766zm9.965 5.765c0 5.503-4.475 9.979-9.965 9.979-1.748 0-3.376-.452-4.808-1.242l-7.223 1.894 1.928-7.039c-.879-1.488-1.393-3.218-1.393-5.068 0-5.503 4.475-9.979 9.965-9.979 5.491 0 9.966 4.476 9.966 9.979z"/>
      </svg>
      <span class="wa-tooltip">
        <span class="wa-status-dot"></span>
        Chat on WhatsApp
      </span>
    </a>
  `;
  document.body.appendChild(waBtn);

  // ===== INJECT GLOBAL QUICK RFQ MODAL =====
  const rfqModal = document.createElement('div');
  rfqModal.id = 'globalRfqModal';
  rfqModal.className = 'rfq-modal-overlay';
  rfqModal.innerHTML = `
    <div class="rfq-modal-box">
      <button class="rfq-close-btn" id="closeRfqModal" aria-label="Close modal">&times;</button>
      <div class="rfq-modal-header">
        <div class="rfq-badge">⚡ Instant Response Within 4 Hours</div>
        <h3>Request an MEP Project Quotation</h3>
        <p>Send your project BOQ or product requirements directly to our estimation team.</p>
      </div>
      <form class="contact-form rfq-form" id="rfqModalForm">
        <div class="form-row">
          <div class="form-group">
            <label>Contact Name *</label>
            <input type="text" required placeholder="e.g. Eng. Tariq Al Mansoori">
          </div>
          <div class="form-group">
            <label>Company / Contractor *</label>
            <input type="text" required placeholder="e.g. Arabtec Contracting LLC">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Email Address *</label>
            <input type="email" required placeholder="tariq@contracting.ae">
          </div>
          <div class="form-group">
            <label>Phone / WhatsApp *</label>
            <input type="tel" required placeholder="+971 50 123 4567">
          </div>
        </div>
        <div class="form-group">
          <label>Primary Material Division *</label>
          <select required>
            <option value="">Select Division</option>
            <option value="electrical">Electrical & Cable Management (GI Trays, Trunking, Conduits)</option>
            <option value="plumbing">Sanitary & Plumbing (PVC, HDPE, PPR Pipes & Valves)</option>
            <option value="lighting">Commercial & Industrial Lighting (LED Panels, Floodlights)</option>
            <option value="solar">Solar Energy Systems & Inverters</option>
            <option value="switchgear">Switchgear & Distribution Panels (ABB, Schneider)</option>
            <option value="elv">ELV Systems, Automation & Networking</option>
            <option value="turnkey">Complete Turnkey MEP Material Package</option>
          </select>
        </div>
        <div class="form-group">
          <label>Project Details / Bill of Quantities (BOQ)</label>
          <textarea placeholder="List required sizes, brands (e.g. Schneider, Ducab, Decoduct), quantities, and target site delivery location in UAE..."></textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-lg" style="width: 100%; justify-content: center; font-size: 1rem;">
          Submit RFQ to Engineering Team →
        </button>
      </form>
    </div>
  `;
  document.body.appendChild(rfqModal);

  // Hook up all "Get a Quote", "Request a Quote", "#quote" buttons to open the modal
  const quoteButtons = document.querySelectorAll('a[href="#quote"], .nav-cta, a.btn-primary:not(form button)');
  quoteButtons.forEach(btn => {
    if (btn.getAttribute('href') === '#quote' || btn.textContent.toLowerCase().includes('quote')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        rfqModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
  });

  const closeBtn = document.getElementById('closeRfqModal');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      rfqModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  rfqModal.addEventListener('click', (e) => {
    if (e.target === rfqModal) {
      rfqModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

});

// ===== INJECT STYLES FOR FLOATING ELEMENTS & MODALS =====
const customStyles = document.createElement('style');
customStyles.textContent = `
  /* Floating WhatsApp */
  .floating-wa-wrapper {
    position: fixed;
    bottom: 30px;
    left: 30px;
    z-index: 998;
  }
  .floating-wa-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #25D366;
    color: #FFFFFF !important;
    padding: 12px 18px;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 600;
    box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .floating-wa-btn:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 30px rgba(37, 211, 102, 0.55);
    background: #20bd5a;
  }
  .wa-tooltip {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: inherit;
  }
  .wa-status-dot {
    width: 8px;
    height: 8px;
    background: #FFFFFF;
    border-radius: 50%;
    display: inline-block;
    box-shadow: 0 0 0 2px rgba(255,255,255,0.4);
    animation: waPulse 1.8s infinite;
  }
  @keyframes waPulse {
    0% { transform: scale(0.9); opacity: 0.8; }
    50% { transform: scale(1.3); opacity: 1; }
    100% { transform: scale(0.9); opacity: 0.8; }
  }
  @media (max-width: 600px) {
    .wa-tooltip { display: none; }
    .floating-wa-btn { padding: 14px; border-radius: 50%; }
    .floating-wa-wrapper { bottom: 20px; left: 20px; }
  }

  /* Back to Top Position adjustment */
  .back-to-top, #backToTop {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #0A1628;
    color: #F59E0B;
    border: 2px solid #F59E0B;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 6px 20px rgba(10, 22, 40, 0.25);
    z-index: 997;
  }
  .back-to-top.visible, #backToTop.visible {
    opacity: 1;
    visibility: visible;
  }
  .back-to-top:hover, #backToTop:hover {
    background: #F59E0B;
    color: #0A1628;
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(245, 158, 11, 0.4);
  }

  /* RFQ Modal */
  .rfq-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10, 22, 40, 0.85);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 20px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
  .rfq-modal-overlay.active {
    opacity: 1;
    visibility: visible;
  }
  .rfq-modal-box {
    background: #FFFFFF;
    border-radius: 24px;
    width: 100%;
    max-width: 680px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 40px;
    position: relative;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
    transform: scale(0.92) translateY(20px);
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .rfq-modal-overlay.active .rfq-modal-box {
    transform: scale(1) translateY(0);
  }
  .rfq-close-btn {
    position: absolute;
    top: 20px;
    right: 24px;
    font-size: 2rem;
    line-height: 1;
    color: #94A3B8;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s;
  }
  .rfq-close-btn:hover { color: #0A1628; }
  .rfq-badge {
    display: inline-block;
    background: rgba(245, 158, 11, 0.12);
    color: #D97706;
    padding: 6px 14px;
    border-radius: 50px;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  .rfq-modal-header h3 {
    font-size: 1.6rem;
    color: #0A1628;
    margin-bottom: 6px;
    font-weight: 800;
  }
  .rfq-modal-header p {
    color: #64748B;
    font-size: 0.95rem;
    margin-bottom: 24px;
  }
  @media (max-width: 600px) {
    .rfq-modal-box { padding: 24px; }
  }
`;
document.head.appendChild(customStyles);
