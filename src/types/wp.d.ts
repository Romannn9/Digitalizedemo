export {};

declare global {
  interface Window {
    wpAcf?: Record<string, any>;
    wpMenu?: Array<{
      id: number;
      name: string;
      href: string;
      order: number;
    }>;
    wpFooterMenu?: Array<{
      id: number;
      name: string;
      href: string;
      order: number;
    }>;
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
