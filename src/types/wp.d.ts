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
    wpCasesArchive?: Array<{
      id: number;
      title: string;
      slug: string;
      url: string;
      excerpt: string;
      image: string;
      category: string;
      roi: string;
      cpa: string;
      roas: string;
    }>;
    wpPage?: {
      id: number;
      slug: string;
      title: string;
      content: string;
      excerpt: string;
      date?: string;
      author?: string;
      image?: string;
      categories?: string[];
      postType?: string;
    } | null;
    wpSite?: {
      name: string;
      url: string;
      apiUrl: string;
    };
    wpFooter?: Record<string, any>;
  }
}
