export type ContactQueryValue = string | number | boolean | null | undefined;

export function buildContactUrl(baseUrl: string, params: Record<string, ContactQueryValue> = {}): string {
  const isAbsolute = /^https?:\/\//i.test(baseUrl || '');
  const url = isAbsolute
    ? new URL(baseUrl)
    : new URL(baseUrl || '/contact/', 'https://digitalize.local');

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    const normalized = String(value).trim();
    if (!normalized) continue;
    url.searchParams.set(key, normalized);
  }

  return isAbsolute
    ? `${url.origin}${url.pathname}${url.search}${url.hash}`
    : `${url.pathname}${url.search}${url.hash}`;
}
