/**
 * Inline script for `/`: sends Spanish-speaking browsers to /es and everyone
 * else to /en. Without JS the page shows a link to each language instead.
 */
export const localeRedirectScript =
  "(function(){var l=(navigator.language||'').toLowerCase().indexOf('es')===0?'es':'en';location.replace('/'+l)})();";
