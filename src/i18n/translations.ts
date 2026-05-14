/**
 * i18n system for Gabriel's CV 2.0 Portfolio
 * Client-side language switching with manual JSON files
 * No page reload - updates all data-i18n elements instantly
 */

import esTranslations from '../i18n/es.json';
import enTranslations from '../i18n/en.json';
import deTranslations from '../i18n/de.json';

const LANG_KEY = 'portfolio-lang';
type Lang = 'es' | 'en' | 'de';

// Translation data - inlined at build time
const translations: Record<Lang, Record<string, unknown>> = {
  es: esTranslations,
  en: enTranslations,
  de: deTranslations,
};

let currentLang: Lang = 'es';

/**
 * Get nested translation by dot-notation key
 * Returns the key itself if not found (fallback)
 */
function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path; // Return key itself as fallback
    }
  }

  return typeof current === 'string' ? current : path;
}

/**
 * Set the current language and update all data-i18n elements
 * Updates document.documentElement.lang attribute
 * Saves preference to localStorage
 */
function setLanguage(lang: Lang): void {
  if (!translations[lang]) {
    console.warn(`Language "${lang}" not supported, defaulting to Spanish`);
    lang = 'es';
  }

  currentLang = lang;

  // Update lang attribute on HTML
  document.documentElement.lang = lang;

  // Update all data-i18n elements
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      const translated = getNestedValue(translations[lang], key);
      el.textContent = translated;
    }
  });

  // Persist to localStorage
  localStorage.setItem(LANG_KEY, lang);

  // Dispatch event for components that need to react
  window.dispatchEvent(new CustomEvent('language-changed', { detail: { lang } }));
}

/**
 * Get the current language
 */
function getLanguage(): Lang {
  return currentLang;
}

/**
 * Initialize i18n on page load
 * Reads localStorage, defaults to Spanish
 */
function initI18n(): void {
  // Check localStorage first
  const stored = localStorage.getItem(LANG_KEY);

  if (stored && stored in translations) {
    setLanguage(stored as Lang);
  } else {
    // Detect browser language
    const browserLang = navigator.language.split('-')[0] as Lang;
    if (translations[browserLang]) {
      setLanguage(browserLang);
    } else {
      setLanguage('es'); // Default to Spanish
    }
  }
}

// Expose globally for LanguageSwitcher component
declare global {
  interface Window {
    setLanguage: typeof setLanguage;
    getLanguage: typeof getLanguage;
  }
}

window.setLanguage = setLanguage;
window.getLanguage = getLanguage;

// Initialize on load
initI18n();

export { setLanguage, getLanguage, initI18n };