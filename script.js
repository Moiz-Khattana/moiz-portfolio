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
    // Thum.io first (no W logo), then mShots, then Microlink
    const providers = [
      `https://image.thum.io/get/width/1200/crop/900/noanimate/${site}`,
      `https://s0.wp.com/mshots/v1/${enc}?w=1200&h=900`,
      `https://api.microlink.io/?url=${enc}&screenshot=true&meta=false&embed=screenshot.url`
    ];
    let providerIndex = 0;

    const markAsLoaded = () => {
      const wrap = img.closest('.project-img');
      if (wrap) wrap.classList.add('shot-loaded');
    };

    img.addEventListener('load', () => {
      // If thum.io returns very small image (fail case), try next provider
      if (img.naturalWidth < 100 && providerIndex < providers.length - 1) {
        providerIndex++;
        img.src = providers[providerIndex];
        return;
      }
      markAsLoaded();
    });

    img.addEventListener('error', () => {
      providerIndex++;
      if (providerIndex < providers.length) {
        img.src = providers[providerIndex];
      } else {
        const wrap = img.closest('.project-img');
        if (wrap) wrap.classList.add('shot-failed', 'shot-loaded');
        img.remove();
      }
    });
  });
});

// ============================================================
// ===== THREE.JS 3D ANIMATIONS ================================
// ============================================================
(function initThreeJSAnimations() {
  if (typeof THREE === 'undefined') {
    console.warn('Three.js not loaded — skipping 3D animations.');
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;

  // Shared normalized mouse position (-1 to 1)
  const mouse = { x: 0, y: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  /* ---------------------------------------------------------
     1. GLOBAL BACKGROUND PARTICLES  →  #bg3d-canvas
     Fixed full-page starfield, subtle parallax on mouse move
  --------------------------------------------------------- */
  function initBackgroundScene() {
    const canvas = document.getElementById('bg3d-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const particleCount = isMobile ? 350 : 800;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00c853,
      size: 0.5,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    function resize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', resize);

    let rafId;
    function animate() {
      rafId = requestAnimationFrame(animate);
      points.rotation.y += 0.0006;
      points.rotation.x += 0.0002;
      camera.position.x += (mouse.x * 5 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }

    if (!prefersReducedMotion) {
      animate();
    } else {
      renderer.render(scene, camera);
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else if (!prefersReducedMotion) {
        animate();
      }
    });
  }

  /* ---------------------------------------------------------
     2. HERO 3D OBJECT  →  #hero3d
     Wireframe icosahedron + glowing core + orbiting particles
  --------------------------------------------------------- */
  function initHeroScene() {
    const container = document.getElementById('hero3d');
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Outer wireframe shape
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00c853,
      wireframe: true,
      transparent: true,
      opacity: 0.55
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Inner glowing core
    const coreGeo = new THREE.IcosahedronGeometry(0.9, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00e676,
      transparent: true,
      opacity: 0.15
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Orbiting particle halo
    const particleCount = isMobile ? 60 : 150;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 3 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00c853,
      size: 0.04,
      transparent: true,
      opacity: 0.7
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    function resize() {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', resize);

    let rafId;
    function animate() {
      rafId = requestAnimationFrame(animate);
      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.004;
      core.rotation.y -= 0.002;
      particles.rotation.y += 0.0015;

      // Subtle mouse-follow tilt
      mesh.rotation.y += mouse.x * 0.0015;
      mesh.rotation.x += mouse.y * 0.0015;

      renderer.render(scene, camera);
    }

    if (!prefersReducedMotion) {
      animate();
    } else {
      renderer.render(scene, camera);
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(rafId);
      else if (!prefersReducedMotion) animate();
    });
  }

  /* ---------------------------------------------------------
     3. ABOUT SECTION ACCENT  →  #about3d
     Small rotating torus knot near the profile photo
  --------------------------------------------------------- */
  function initAboutScene() {
    const container = document.getElementById('about3d');
    if (!container) return;

    const width = container.clientWidth || 150;
    const height = container.clientHeight || 150;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(0.8, 0.25, 100, 16);
    const material = new THREE.MeshNormalMaterial({ wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function resize() {
      const w = container.clientWidth || width;
      const h = container.clientHeight || height;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', resize);

    let rafId;
    function animate() {
      rafId = requestAnimationFrame(animate);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.015;
      renderer.render(scene, camera);
    }

    // Only animate while visible on screen (perf-friendly)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!prefersReducedMotion) animate();
        } else {
          cancelAnimationFrame(rafId);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(container);

    if (prefersReducedMotion) renderer.render(scene, camera);
  }

  /* ---------------------------------------------------------
     4. PROCESS CTA ACCENT  →  #processCta3d
     Soft drifting particle field behind the CTA stats
  --------------------------------------------------------- */
  function initProcessCtaScene() {
    const container = document.getElementById('processCta3d');
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const particleCount = isMobile ? 80 : 180;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0x00c853,
      size: 0.06,
      transparent: true,
      opacity: 0.4
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    function resize() {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || height;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', resize);

    let rafId;
    function animate() {
      rafId = requestAnimationFrame(animate);
      points.rotation.y += 0.001;
      points.rotation.x += 0.0005;
      renderer.render(scene, camera);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!prefersReducedMotion) animate();
        } else {
          cancelAnimationFrame(rafId);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(container);

    if (prefersReducedMotion) renderer.render(scene, camera);
  }

  // ===== Initialize all 3D scenes =====
  function initAll() {
    initBackgroundScene();
    initHeroScene();
    initAboutScene();
    initProcessCtaScene();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
