/**
 * Theme toggle system for Gabriel's CV 2.0 Portfolio
 * Reads localStorage 'portfolio-theme', defaults to 'dark'
 * Sets data-theme="dark" or data-theme="light" on <html>
 */

const THEME_KEY = 'portfolio-theme';

/**
 * Initialize theme from localStorage or system preference
 * Runs on page load to set the correct theme before first paint
 */
function initTheme(): void {
  // First check localStorage
  let theme = localStorage.getItem(THEME_KEY);

  // If no stored preference, check system preference
  if (!theme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = prefersDark ? 'dark' : 'light';
  }

  // Apply theme
  document.documentElement.setAttribute('data-theme', theme);
}

/**
 * Toggle between dark and light themes
 * Saves preference to localStorage
 */
function toggleTheme(): void {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
}

// Expose globally for Header button
declare global {
  interface Window {
    toggleTheme: typeof toggleTheme;
  }
}

window.toggleTheme = toggleTheme;

// Initialize on load
initTheme();

export { initTheme, toggleTheme };