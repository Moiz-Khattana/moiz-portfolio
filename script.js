// ===== Loader with Progress (Fast & Non-Blocking) =====
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader');
  const barFill = document.getElementById('loaderBarFill');
  const percentText = document.getElementById('loaderPercent');

  if (barFill && percentText) {
    let progress = 0;
    const interval = setInterval(() => {
      // Fast progress increment
      progress += Math.floor(Math.random() * 15) + 8;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          if (loader) loader.classList.add('hide');
        }, 300);
      }
      barFill.style.width = progress + '%';
      percentText.textContent = progress + '%';
    }, 80);
  } else if (loader) {
    setTimeout(() => loader.classList.add('hide'), 600);
  }
});

// ===== Custom Cursor =====
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
  window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    cursorOutline.animate(
      [{ left: e.clientX + 'px', top: e.clientY + 'px' }],
      { duration: 400, fill: 'forwards' }
    );
  });

  document.querySelectorAll('a, button, .skill-card, .project-card, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.style.transform = 'translate(-50%,-50%) scale(1.6)');
    el.addEventListener('mouseleave', () => cursorOutline.style.transform = 'translate(-50%,-50%) scale(1)');
  });
}

// ===== Mobile Nav Toggle =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.style.boxShadow = window.scrollY > 50 ? '0 4px 20px rgba(0,0,0,.3)' : 'none';
  }
});

// ===== Typed Text Effect =====
const typedEl = document.getElementById('typed');
if (typedEl) {
  const words = ['E-commerce Expert', 'App Developer', 'Liquid Specialist', 'UI/UX Enthusiast'];
  let wordIndex = 0, charIndex = 0, isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typedEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 50 : 120;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 400;
    }
    setTimeout(typeEffect, speed);
  }
  typeEffect();
}

// ===== Scroll Reveal =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ===== Counter Animation =====
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.target;
      let count = 0;
      const increment = target / 50;
      const update = () => {
        count += increment;
        if (count < target) {
          el.textContent = Math.ceil(count);
          requestAnimationFrame(update);
        } else {
          el.textContent = target;
        }
      };
      update();
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ===== Skill Bar Animation =====
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(fill => skillObserver.observe(fill));

// ===== Project Filter =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
        setTimeout(() => card.style.opacity = '1', 50);
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  });
});

// ===== Testimonial Slider =====
const track = document.getElementById('testimonialTrack');
const slides = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.getElementById('sliderDots');

if (track && slides.length > 0 && dotsContainer) {
  let currentSlide = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.slider-dots span');

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  }
  setInterval(nextSlide, 5000);
}

// ===== Contact Form — Formspree =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');
const messageArea = document.getElementById('messageArea');
const charCount = document.getElementById('charCount');

const FORMSPREE_ID = 'xvkpwpgr'; 

if (contactForm) {
  if (messageArea && charCount) {
    messageArea.addEventListener('input', () => {
      const count = messageArea.value.length;
      charCount.textContent = count;
      charCount.style.color =
        count > 900 ? '#f87171' :
        count > 700 ? '#fbbf24' :
        'var(--text-muted)';
    });
  }

  document.querySelectorAll('.custom-select-wrap select').forEach(select => {
    select.addEventListener('change', function () {
      if (this.value) this.style.color = 'var(--text)';
    });
  });

  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (FORMSPREE_ID === 'YOUR_FORM_ID' || FORMSPREE_ID === '') {
      formStatus.innerHTML = `⚠️ Formspree ID not set. Check script.js line 165.`;
      formStatus.className = 'form-status error';
      return;
    }

    const timeline = contactForm.querySelector('input[name="timeline"]:checked');
    if (!timeline) {
      formStatus.textContent = '⚠️ Please select a project timeline.';
      formStatus.className = 'form-status error';
      return;
    }

    submitBtn.classList.add('loading');
    submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner"></i>';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    const data = {
      name: contactForm.name.value,
      email: contactForm.email.value,
      inquiry: contactForm.inquiry.value,
      budget: contactForm.budget.value,
      timeline: timeline.value,
      message: contactForm.message.value,
    };

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        submitBtn.innerHTML = '✓ Sent! <i class="fa-solid fa-check"></i>';
        submitBtn.style.background = 'linear-gradient(135deg, #00c853, #00a844)';
        submitBtn.classList.remove('loading');

        formStatus.innerHTML = `
          <i class="fa-solid fa-circle-check"></i>
          Message sent! I'll get back to you within 24 hours.
        `;
        formStatus.className = 'form-status success';

        contactForm.reset();
        if (charCount) charCount.textContent = '0';

        document.querySelectorAll('.custom-select-wrap select').forEach(s => {
          s.style.color = '';
        });

        setTimeout(() => {
          submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
          submitBtn.style.background = '';
        }, 4000);

        setTimeout(() => {
          formStatus.textContent = '';
          formStatus.className = 'form-status';
        }, 8000);

      } else {
        const errMsg = result?.errors?.[0]?.message || 'Submission failed. Please try again.';
        throw new Error(errMsg);
      }

    } catch (error) {
      submitBtn.classList.remove('loading');
      submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';

      formStatus.innerHTML = `
        <i class="fa-solid fa-triangle-exclamation"></i>
        Something went wrong. Please email me directly at
        <a href="mailto:haidermoizkhattana@gmail.com" style="color:var(--primary)">
          haidermoizkhattana@gmail.com
        </a>
      `;
      formStatus.className = 'form-status error';
      console.error('Form error:', error);
    }
  });
}

// ===== Set Current Year =====
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ===== Mobile Project Card Tap =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function (e) {
    if (window.innerWidth <= 992) {
      const overlay = this.querySelector('.project-overlay');
      if (overlay) {
        const isVisible = overlay.style.opacity === '1';
        document.querySelectorAll('.project-overlay').forEach(o => o.style.opacity = '0');
        if (!isVisible) {
          overlay.style.opacity = '1';
          e.stopPropagation();
        }
      }
    }
  });
});

document.addEventListener('click', () => {
  if (window.innerWidth <= 992) {
    document.querySelectorAll('.project-overlay').forEach(o => o.style.opacity = '0');
  }
});

// ===== Smooth Anchor Scroll Offset Fix =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 76;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== Live Website Screenshots Fallback Handlers =====
document.addEventListener('DOMContentLoaded', () => {
  const siteImages = document.querySelectorAll('img.site-shot');
  
  siteImages.forEach(img => {
    const site = img.dataset.site;
    if (!site) return;

    const enc = encodeURIComponent(site);
    const providers = [
      `https://s0.wp.com/mshots/v1/${enc}?w=1000&h=750`,
      `https://image.thum.io/get/width/1000/crop/750/noanimate/${site}`,
      `https://api.microlink.io/?url=${enc}&screenshot=true&meta=false&embed=screenshot.url`
    ];
    let providerIndex = 0;

    const markAsLoaded = () => {
      const wrap = img.closest('.project-img');
      if (wrap) wrap.classList.add('shot-loaded');
    };

    img.addEventListener('load', () => {
      // If mshots returns its generating placeholder banner, wait and retry once
      if (img.naturalWidth < 80 && providerIndex === 0) {
        setTimeout(() => {
          img.src = providers[0] + '&r=' + Date.now();
        }, 3000);
        return;
      }
      markAsLoaded();
    });

    img.addEventListener('error', () => {
      providerIndex++;
      if (providerIndex < providers.length) {
        img.src = providers[providerIndex];
      } else {
        // Fallback placeholder container if all screenshot engines fail
        const wrap = img.closest('.project-img');
        if (wrap) wrap.classList.add('shot-failed', 'shot-loaded');
        img.remove();
      }
    });
  });
});
