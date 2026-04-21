/** Decode HTML entities (&#8217; → ', &amp; → &, etc.) for plain-text rendering of WP API data. */
export function decodeHtml(html: string): string {
  if (!html) return '';
  if (typeof document === 'undefined') {
    // SSR fallback: handle the most common ones
    return html
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&#8216;/g, '\u2018')
      .replace(/&#8217;/g, '\u2019')
      .replace(/&#8220;/g, '\u201C')
      .replace(/&#8221;/g, '\u201D')
      .replace(/&rsquo;/g, '\u2019')
      .replace(/&lsquo;/g, '\u2018')
      .replace(/&apos;/g, "'");
  }
  const el = document.createElement('textarea');
  el.innerHTML = html;
  return el.value;
}

/** Strip HTML tags and decode entities — for excerpt/plain-text display. */
export function stripHtml(html: string): string {
  return decodeHtml(html.replace(/<[^>]+>/g, '')).trim();
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });
}
