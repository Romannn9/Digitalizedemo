import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Cases from './pages/Cases';
import Services from './pages/Services';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Post from './pages/Post';
import Page from './pages/Page';
import CaseStudy from './pages/CaseStudy';
import NotFound from './pages/NotFound';

const rootEl = document.getElementById('root')!;

const isWP = import.meta.env.MODE === 'wp';
function getDevPageFromPath(pathname: string) {
  const normalized = pathname.replace(/^\/Digitalizedemo\/?/, '/');
  if (normalized.startsWith('/cases/')) return 'cases';
  if (normalized.startsWith('/services/')) return 'services';
  if (normalized.startsWith('/about/')) return 'about';
  if (normalized.startsWith('/blog/')) return 'blog';
  if (normalized.startsWith('/contact/')) return 'contact';
  return 'home';
}

const page = isWP
  ? (rootEl.dataset.page ?? 'home')
  : getDevPageFromPath(window.location.pathname);

const pages: Record<string, React.ReactElement> = {
  home:     <Home />,
  cases:    <Cases />,
  services: <Services />,
  about:    <About />,
  blog:     <Blog />,
  contact:  <Contact />,
  post:     <Post />,
  page:     <Page />,
  case:     <CaseStudy />,
  '404':    <NotFound />,
};

createRoot(rootEl).render(
  <StrictMode>
    <Layout>
      {pages[page] ?? <NotFound />}
    </Layout>
  </StrictMode>
);
