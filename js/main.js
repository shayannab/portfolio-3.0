/* ============================================
   Portfolio 3.0 - Animations & Interactions
   ============================================ */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Initialize theme toggle
  initThemeToggle();

  // Update current time in footer
  updateTime();
  setInterval(updateTime, 1000);

  // Initialize visitor counter
  initVisitorCounter();

  // Initialize animations
  initScrollAnimations();
  initHoverEffects();
  initCustomCursor();
  initPillNav();
  initMagicText();
  initGitHubCalendar();
  initActivityStatus();
});

/* ---------- GitHub Calendar ---------- */
function initGitHubCalendar() {
  const container = document.querySelector('.calendar');
  if (container) {
    console.log("Initializing GitHub Calendar for shayannab...");
    
    // Set a timeout to show error if it takes too long
    const timeout = setTimeout(() => {
      if (container.innerText.includes("Loading")) {
        container.innerHTML = `<p class="text-muted" style="font-size: 0.75rem;">Still loading... GitHub might be slow. <a href="https://github.com/shayannab" target="_blank" style="text-decoration: underline;">View profile</a></p>`;
      }
    }, 5000);

    GitHubCalendar(".calendar", "shayannab", {
      responsive: true,
      tooltips: true,
      // Using corsproxy.io for better reliability
      proxy: (username) => {
        return fetch(`https://corsproxy.io/?${encodeURIComponent(`https://github.com/users/${username}/contributions`)}`)
          .then(res => {
            if (!res.ok) throw new Error("Could not fetch contributions");
            return res.text();
          });
      }
    }).then(() => {
      clearTimeout(timeout);
      console.log("GitHub Calendar loaded successfully.");
    }).catch(err => {
      clearTimeout(timeout);
      console.error("GitHub Calendar Error:", err);
      container.innerHTML = `<p class="text-muted" style="font-size: 0.75rem;">Could not load live activity. <a href="https://github.com/shayannab" target="_blank" style="text-decoration: underline;">View on GitHub</a></p>`;
    });
  }
}

/* ---------- GitHub Activity Status (Live Events) ---------- */
async function initActivityStatus() {
  const statusContainer = document.getElementById('github-status-container');
  if (!statusContainer) return;

  try {
    const response = await fetch('https://api.github.com/users/shayannab/events/public');
    if (!response.ok) throw new Error('Failed to fetch GitHub events');
    const events = await response.json();

    // Find the latest push or commit-related event
    const activityEvent = events.find(e => e.type === 'PushEvent' || e.type === 'CreateEvent' || e.type === 'WatchEvent');
    
    if (activityEvent) {
      const repoName = activityEvent.repo.name.split('/')[1] || activityEvent.repo.name;
      const eventTime = new Date(activityEvent.created_at);
      const timeAgo = formatTimeAgo(eventTime);
      
      let statusText = '';
      if (activityEvent.type === 'PushEvent') {
        statusText = `pushed to <b>${repoName}</b>`;
      } else if (activityEvent.type === 'CreateEvent') {
        statusText = `created <b>${repoName}</b>`;
      } else {
        statusText = `active in <b>${repoName}</b>`;
      }

      statusContainer.innerHTML = `
        <div class="status-indicator">
          <span class="status-pulse"></span>
          <span class="status-text">${timeAgo} — ${statusText}</span>
        </div>
      `;
    }
  } catch (err) {
    console.error('Error fetching activity status:', err);
    statusContainer.innerHTML = ''; // Hide if failed
  }
}

function formatTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return "just now";
}

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

/* ---------- Floating Pill Nav ---------- */
function initPillNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.top = '10px';
      nav.style.padding = '0 6px';
    } else {
      nav.style.top = '20px';
      nav.style.padding = '0 4px';
    }
  });
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
        duration: 0.3,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 98%',
          toggleActions: 'play none none none'
        },
        delay: index * 0.02
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
        duration: 0.25,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 98%',
          toggleActions: 'play none none none'
        },
        delay: index * 0.03
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
        duration: 0.3,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 98%',
          toggleActions: 'play none none none'
        },
        delay: index * 0.02
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
        duration: 0.25,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: method,
          start: 'top 98%',
          toggleActions: 'play none none none'
        },
        delay: index * 0.02
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

  // Nav link hover enhancement (Disabled to prevent flickering with CSS)
  /*
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        y: -1,
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
  */
}

/* ---------- Custom Cursor ---------- */
function initCustomCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    // Using GSAP for ultra-smooth tracking if available, otherwise fallback to style
    gsap.to(cursor, {
      x: clientX,
      y: clientY,
      xPercent: -50,
      yPercent: -50,
      opacity: 1,
      duration: 0.1,
      ease: 'power2.out'
    });
  });

  // Track hover states for interactive elements
  const interactives = document.querySelectorAll('a, button, .project-card, .tech-pill, .cta-button');
  
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      // Hover effect disabled as requested
    });
    el.addEventListener('mouseleave', () => {
      // Hover effect disabled as requested
    });
  });

  // Hide cursor when it leaves window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
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
      y: 40,
      filter: 'blur(10px)'
    },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'expo.out',
      stagger: 0.1,
      delay: 0.1
    }
  );
});

/* ---------- Smooth Scroll ---------- */
// Add smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
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

/* ---------- Visitor Counter ---------- */
function initVisitorCounter() {
  const countElement = document.getElementById('visitor-count');
  if (!countElement) return;

  // Get or create visitor count from localStorage
  let totalVisitors = parseInt(localStorage.getItem('portfolio_visitors')) || 0;

  // Check if this is a new session (not just a page refresh)
  const hasVisited = sessionStorage.getItem('portfolio_session_counted');

  if (!hasVisited) {
    // New visitor session - increment count
    totalVisitors++;
    localStorage.setItem('portfolio_visitors', totalVisitors.toString());
    sessionStorage.setItem('portfolio_session_counted', 'true');
  }

  // Animate the counter with # prefix
  animateCounter(countElement, totalVisitors);
}

function animateCounter(element, target) {
  let current = 0;
  const duration = 1500; // 1.5 seconds
  const steps = 60;
  const stepDuration = duration / steps;
  const increment = target / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = '#' + Math.floor(current).toLocaleString();
  }, stepDuration);
}

/* ---------- Theme Toggle ---------- */
function initThemeToggle() {
  const toggleButton = document.getElementById('theme-toggle');
  if (!toggleButton) return;

  // Check for saved theme preference, or use system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Set initial theme
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (!systemPrefersDark) {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  // Toggle theme on button click
  toggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    if (newTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', newTheme);
    }

    localStorage.setItem('theme', newTheme);
  });

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    }
  });
}

/* ---------- Magic Text Reveal (GSAP ScrollTrigger) ---------- */
function initMagicText() {
  const container = document.querySelector('.magic-text-container');
  if (!container) return;
  
  const originalNodes = Array.from(container.childNodes);
  container.innerHTML = '';
  
  originalNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const words = node.textContent.split(/(\s+)/);
      words.forEach(word => {
        if (word.trim() === '') {
          container.appendChild(document.createTextNode(word));
          return;
        }
        
        const wordSpan = document.createElement('span');
        wordSpan.className = 'magic-word-container';
        
        const bgSpan = document.createElement('span');
        bgSpan.className = 'magic-word-bg';
        bgSpan.textContent = word;
        
        const fgSpan = document.createElement('span');
        fgSpan.className = 'magic-word-fg';
        fgSpan.textContent = word;
        
        wordSpan.appendChild(bgSpan);
        wordSpan.appendChild(fgSpan);
        container.appendChild(wordSpan);
      });
    } else {
      // Preserve <br> or other elements
      container.appendChild(node.cloneNode(true));
    }
  });

  // Create ScrollTrigger to animate fgSpan opacity
  gsap.to('.magic-word-fg', {
    opacity: 1,
    stagger: 0.1,
    ease: 'none',
    scrollTrigger: {
      trigger: '.about-reveal-section',
      start: 'top 50%',
      end: 'bottom 95%',
      scrub: 0.5,
    }
  });
}
