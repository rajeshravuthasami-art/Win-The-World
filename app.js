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
