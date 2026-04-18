export {};

declare global {
  interface Window {
    wpPage?: {
      id: number;
      slug: string;
      title: string;
      content: string;
      excerpt: string;
    } | null;
    wpSite?: {
      name: string;
      url: string;
      apiUrl: string;
    };
  }
}
