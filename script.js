// ==== Apple-Inspired Smooth UX Engine ====

document.addEventListener('DOMContentLoaded', () => {
  // Automatically update the footer year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Intersection Observer for highlighting the active nav link based on scroll position
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-links .nav-item');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3 // Trigger when 30% of the section is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to the currently visible section's link
        const activeId = entry.target.getAttribute('id');
        const activeLink = document.querySelector(`.nav-links a[href="#${activeId}"]`);
        
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  // Apply the observer to all sections
  sections.forEach(section => {
    observer.observe(section);
  });
});