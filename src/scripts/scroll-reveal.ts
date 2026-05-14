/**
 * Scroll reveal system using IntersectionObserver
 * Observes all elements with data-reveal attribute
 * Adds 'revealed' class when element enters viewport
 * Unobserves after first reveal (one-time animation)
 * Respects prefers-reduced-motion
 */

const REVEAL_THRESHOLD = 0.15;

/**
 * Initialize scroll reveal observer
 */
function initScrollReveal(): void {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Immediately reveal all elements without animation
    const elements = document.querySelectorAll('[data-reveal]');
    elements.forEach((el) => {
      el.classList.add('revealed');
    });
    return;
  }

  // Create IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add revealed class
          entry.target.classList.add('revealed');

          // Stop observing this element (one-time animation)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: REVEAL_THRESHOLD,
      rootMargin: '0px 0px -50px 0px', // Trigger slightly before element is fully visible
    }
  );

  // Observe all elements with data-reveal attribute
  const elements = document.querySelectorAll('[data-reveal]');
  elements.forEach((el) => {
    observer.observe(el);
  });
}

// Run on DOM content loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}

export { initScrollReveal };