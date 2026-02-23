document.addEventListener('DOMContentLoaded', () => {

  // 1. Header Scroll Effect
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Intersection Observer for Reveal Animations
  const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-zoom');

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // 3. Smooth Scrolling for Anchor Links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
  }

  // 5. Lightbox - Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || !lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // 5b. Lightbox - Click outside image to close
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

});

// =========================================
// PORTFOLIO LIGHTBOX
// =========================================
const portfolioImages = [
  'images/amazon/画像.jpg',
  'images/amazon/TOP画像（ブラウン＆ワインレッド）.jpg',
  'images/amazon/コンテンツ１.jpg',
  'images/amazon/画像１.jpg',
  'images/amazon/画像２ 5.jpg',
  'images/amazon/画像３.jpg',
  'images/amazon/画像２ 2.jpg',
  'images/amazon/画像２ 3.jpg',
  'images/amazon/画像４.jpg',
  'images/amazon/画像２.jpg',
  'images/amazon/画像６.jpg',
  'images/amazon/画像３ 2.jpg',
  'images/amazon/画像２ 6.jpg',
  'images/amazon/画像２ 7.jpg',
  'images/amazon/画像２ 8.jpg',
  'images/amazon/画像４ 2.jpg',
  'images/amazon/画像２ 4.jpg',
  'images/amazon/画像２ 9.jpg',
  'images/amazon/画像３ 3.jpg',
  'images/amazon/画像２ 10.jpg',
  'images/amazon/画像２ 11.jpg',
  'images/amazon/画像２ 12.jpg'
];

let currentLightboxIndex = 0;

function openLightbox(index) {
  currentLightboxIndex = index;
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const counter = document.getElementById('lightbox-counter');

  img.src = portfolioImages[index];
  counter.textContent = `${index + 1} / ${portfolioImages.length}`;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  currentLightboxIndex += direction;
  if (currentLightboxIndex < 0) currentLightboxIndex = portfolioImages.length - 1;
  if (currentLightboxIndex >= portfolioImages.length) currentLightboxIndex = 0;

  const img = document.getElementById('lightbox-img');
  const counter = document.getElementById('lightbox-counter');
  img.src = portfolioImages[currentLightboxIndex];
  counter.textContent = `${currentLightboxIndex + 1} / ${portfolioImages.length}`;
}
