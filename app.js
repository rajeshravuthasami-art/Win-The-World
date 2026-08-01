/**
 * Win the World - Interactive Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Header Scroll Effect
  initHeader();

  // Initialize Animated Statistics Counters
  initStatCounters();

  // Initialize Jobs Filter & Modal
  initJobs();

  // Initialize Testimonials Carousel
  initTestimonials();

  // Initialize FAQ Accordion
  initFAQ();

  // Initialize Lead Form Validation & Submission
  initLeadForm();

  // Initialize Scroll Fade Animations
  initScrollAnimations();
});

/* ==========================================
   1. Header & Navigation Logic
   ========================================== */
function initHeader() {
  const header = document.querySelector('.header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navActions = document.querySelector('.nav-actions');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      let mobileNav = document.querySelector('.mobile-nav');
      if (!mobileNav) {
        mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        mobileNav.innerHTML = `
          ${navMenu.innerHTML}
          <div class="mobile-nav-actions">
            ${navActions.innerHTML}
          </div>
        `;
        header.appendChild(mobileNav);
      } else {
        mobileNav.style.display = mobileNav.style.display === 'none' ? 'flex' : 'none';
      }
    });
  }
}

/* ==========================================
   2. Animated Statistics Counters
   ========================================== */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          const suffix = stat.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 2000;
          const stepTime = Math.abs(Math.floor(duration / (target / 50 || 1)));

          const timer = setInterval(() => {
            count += Math.ceil(target / 40);
            if (count >= target) {
              stat.textContent = target.toLocaleString() + suffix;
              clearInterval(timer);
            } else {
              stat.textContent = count.toLocaleString() + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('#achievements');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================
   3. Job Filtering & Apply Modal Logic
   ========================================== */
function initJobs() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const jobCards = document.querySelectorAll('.job-card');
  const modalBackdrop = document.getElementById('applyModal');
  const modalClose = document.getElementById('modalClose');
  const modalJobTitle = document.getElementById('modalJobTitle');
  const jobApplyForm = document.getElementById('jobApplyForm');

  // Filter Tabs
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-filter');

      jobCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal Open Handlers
  document.querySelectorAll('.btn-apply-job').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-job-title') || 'Position';
      if (modalJobTitle) modalJobTitle.textContent = title;
      if (modalBackdrop) modalBackdrop.classList.add('active');
    });
  });

  if (modalClose && modalBackdrop) {
    modalClose.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
      }
    });
  }

  if (jobApplyForm) {
    jobApplyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('🎉 Application Submitted Successfully! Our placement team will reach out to you within 24 hours.');
      if (modalBackdrop) modalBackdrop.classList.remove('active');
      jobApplyForm.reset();
    });
  }
}

/* ==========================================
   4. Testimonial Carousel Logic
   ========================================== */
function initTestimonials() {
  const track = document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const nextBtn = document.querySelector('.next-slide');
  const prevBtn = document.querySelector('.prev-slide');
  const dotsContainer = document.querySelector('.slider-dots');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const slideCount = slides.length;

  // Create Pagination Dots
  dotsContainer.innerHTML = '';
  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = `dot ${idx === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slideCount;
      updateSlider();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      updateSlider();
    });
  }

  // Auto Advance Carousel
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlider();
  }, 6000);
}

/* ==========================================
   5. FAQ Accordion Logic
   ========================================== */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all active items
      faqItems.forEach(i => i.classList.remove('active'));

      // If clicked item wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================
   6. Lead Form Validation & Submission Logic
   ========================================== */
function initLeadForm() {
  const leadForm = document.getElementById('careerLeadForm');
  
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('leadName').value;
      const interest = document.getElementById('leadInterest').value;

      // Show custom success popup
      showSuccessModal(name, interest);
      leadForm.reset();
    });
  }
}

function showSuccessModal(name, interest) {
  let successModal = document.getElementById('successModal');
  if (!successModal) {
    successModal = document.createElement('div');
    successModal.id = 'successModal';
    successModal.className = 'modal-backdrop active';
    document.body.appendChild(successModal);
  }

  successModal.innerHTML = `
    <div class="modal-content" style="text-align: center;">
      <div style="width: 60px; height: 60px; background: var(--success-light); color: var(--success); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1.5rem auto;">
        ✓
      </div>
      <h3 style="font-size: 1.6rem; margin-bottom: 0.75rem;">Welcome to Win the World, ${name}!</h3>
      <p style="color: var(--text-muted); margin-bottom: 1.5rem;">
        Your request for <strong>${interest}</strong> free career guidance has been received. Our senior counselor will call you within 15 minutes!
      </p>
      <button class="btn btn-primary" onclick="document.getElementById('successModal').classList.remove('active')">Great, Thank You!</button>
    </div>
  `;
  successModal.classList.add('active');
}

/* ==========================================
   7. Scroll Fade Animations
   ========================================== */
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  fadeElements.forEach(el => observer.observe(el));
}
