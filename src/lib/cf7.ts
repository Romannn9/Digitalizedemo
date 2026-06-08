export const CF7_FORM_ID = 41;

/** CF7 REST `create_feedback` requires a sanitized `_wpcf7_unit_tag` (see Contact Form 7 `rest-api.php`). */
export function appendCf7HiddenFields(formData: FormData, formId: number = CF7_FORM_ID): void {
  const postId = typeof window !== 'undefined' ? window.wpPage?.id : undefined;
  // Mirrors `WPCF7_ContactForm::generate_unit_tag()` when not in the main loop (typical single embed).
  const unitTag = `wpcf7-f${formId}-o1`;
  formData.append('_wpcf7', String(formId));
  formData.append('_wpcf7_unit_tag', unitTag);
  if (postId != null && postId > 0) {
    formData.append('_wpcf7_container_post', String(postId));
  }
}

/** CF7 / WP may prepend notices to the body; parse the JSON object slice so the form still works. */
export function parseCf7FeedbackBody(raw: string): Record<string, unknown> {
  const trimmed = raw.trim();
  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start === -1 || end < start) {
    throw new SyntaxError('Not JSON');
  }
  return JSON.parse(trimmed.slice(start, end + 1)) as Record<string, unknown>;
}

export function getCf7FeedbackUrl(formId: number = CF7_FORM_ID): string {
  const apiBase = window.wpSite?.apiUrl ?? '/wp-json/';
  return `${apiBase}contact-form-7/v1/contact-forms/${formId}/feedback`;
}
