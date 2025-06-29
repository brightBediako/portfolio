// Modern Portfolio JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Navigation functionality
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Mobile navigation toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
      navToggle.setAttribute(
        "aria-expanded",
        navToggle.classList.contains("active").toString()
      );
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !navToggle.contains(event.target) &&
        !navMenu.contains(event.target)
      ) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Navbar background on scroll
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
        navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
      } else {
        navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
        navbar.style.boxShadow = "none";
      }
    });
  }

  // Active navigation link highlighting
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll('.nav-link[href^="#"]');

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navItems.forEach((item) => {
          item.classList.remove("active");
          if (item.getAttribute("href") === `#${sectionId}`) {
            item.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink);

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".service-card, .project-card, .contact-item"
  );
  animateElements.forEach((el) => {
    observer.observe(el);
  });

  // Form handling
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      // Show loading state
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual form handling)
      setTimeout(() => {
        // Reset form
        this.reset();

        // Show success message
        showNotification("Message sent successfully!", "success");

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // Notification system
  function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 300px;
    `;

    // Set background color based on type
    if (type === "success") {
      notification.style.backgroundColor = "#10b981";
    } else if (type === "error") {
      notification.style.backgroundColor = "#ef4444";
    } else {
      notification.style.backgroundColor = "#0d9488";
    }

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  }

  // Project card hover effects
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Service card hover effects
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Scroll to top functionality
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 15l-6-6-6 6"/>
    </svg>
  `;
  scrollToTopBtn.className = "scroll-to-top";
  scrollToTopBtn.setAttribute("aria-label", "Scroll to top");

  // Add styles for scroll to top button
  scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: #0d9488;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  document.body.appendChild(scrollToTopBtn);

  // Show/hide scroll to top button
  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      scrollToTopBtn.style.opacity = "1";
      scrollToTopBtn.style.visibility = "visible";
    } else {
      scrollToTopBtn.style.opacity = "0";
      scrollToTopBtn.style.visibility = "hidden";
    }
  });

  // Scroll to top functionality
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Add hover effect to scroll to top button
  scrollToTopBtn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px)";
    this.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
  });

  scrollToTopBtn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "none";
  });

  // Performance optimization: Throttle scroll events
  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Apply throttling to scroll events
  const throttledScrollHandler = throttle(function () {
    updateActiveNavLink();
  }, 100);

  window.addEventListener("scroll", throttledScrollHandler);

  // Initialize page
  console.log("Portfolio loaded successfully!");
});
