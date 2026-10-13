/**
 * Netlify injects an HTML comment (plus line breaks) into <head> on *.netlify.app.
 * React hydrates the whole document, sees nodes it did not render, throws error #418
 * and re-renders everything on the client, dropping the theme set on <html>.
 * This runs inline during parsing, before hydration, and removes comment and
 * whitespace-only text nodes from <head>. React never renders either inside <head>.
 */
export const headCleanupScript =
  '(function(){var h=document.head,n=h.firstChild;while(n){var x=n.nextSibling;if(n.nodeType===8||(n.nodeType===3&&!/\\S/.test(n.nodeValue)))h.removeChild(n);n=x}})();';
