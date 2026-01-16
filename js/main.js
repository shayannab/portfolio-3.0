/* ============================================
   Portfolio 3.0 - Animations & Interactions
   ============================================ */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize GSAP
  gsap.registerPlugin(ScrollTrigger);
  
  // Update current time in footer
  updateTime();
  setInterval(updateTime, 1000);
  
  // Initialize animations
  initScrollAnimations();
  initHoverEffects();
});

/* ---------- Time Display ---------- */
function updateTime() {
  const timeElement = document.getElementById('current-time');
  if (timeElement) {
    const now = new Date();
    const options = { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    };
    timeElement.textContent = now.toLocaleTimeString('en-US', options);
  }
}

/* ---------- Scroll Animations ---------- */
function initScrollAnimations() {
  // Fade in elements on scroll
  const fadeElements = document.querySelectorAll('.fade-in');
  
  fadeElements.forEach((element, index) => {
    gsap.fromTo(element, 
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        delay: index * 0.1
      }
    );
  });

  // Project cards stagger animation
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach((card, index) => {
    gsap.fromTo(card,
      {
        opacity: 0,
        y: 40
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        delay: index * 0.15
      }
    );
  });

  // Experience items
  const experienceItems = document.querySelectorAll('.experience-item');
  
  experienceItems.forEach((item, index) => {
    gsap.fromTo(item,
      {
        opacity: 0,
        x: -20
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        delay: index * 0.1
      }
    );
  });

  // Contact methods
  const contactMethods = document.querySelectorAll('.contact-method');
  
  contactMethods.forEach((method, index) => {
    gsap.fromTo(method,
      {
        opacity: 0,
        x: -20
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: method,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        delay: index * 0.08
      }
    );
  });
}

/* ---------- Hover Effects ---------- */
function initHoverEffects() {
  // Project card hover
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    const image = card.querySelector('.project-image');
    
    card.addEventListener('mouseenter', () => {
      gsap.to(image, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(image, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });

  // Nav link hover enhancement
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        y: -2,
        duration: 0.2,
        ease: 'power2.out'
      });
    });
    
    link.addEventListener('mouseleave', () => {
      gsap.to(link, {
        y: 0,
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  });
}

/* ---------- Page Load Animation ---------- */
window.addEventListener('load', () => {
  // Animate hero section on page load
  const heroName = document.querySelector('.hero-name');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroBio = document.querySelector('.hero-bio');
  const heroAvailability = document.querySelector('.hero-availability');
  const socialLinks = document.querySelector('.social-links');

  const heroElements = [heroName, heroSubtitle, heroBio, heroAvailability, socialLinks].filter(Boolean);

  gsap.fromTo(heroElements,
    {
      opacity: 0,
      y: 30
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.12
    }
  );
});

/* ---------- Smooth Scroll ---------- */
// Add smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
