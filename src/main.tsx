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

const rootEl = document.getElementById('root')!;

function pageFromUrl(): string {
  const slug = window.location.pathname.replace(/^\/|\/$/g, '').split('/').pop() ?? '';
  const map: Record<string, string> = {
    '': 'home', 'home': 'home',
    'cases': 'cases', 'services': 'services',
    'about': 'about', 'blog': 'blog', 'contact': 'contact',
  };
  return map[slug] ?? 'home';
}

const isWP = import.meta.env.MODE === 'wp';
const page = isWP ? pageFromUrl() : (rootEl.dataset.page ?? 'home');

const pages: Record<string, React.ReactElement> = {
  home:     <Home />,
  cases:    <Cases />,
  services: <Services />,
  about:    <About />,
  blog:     <Blog />,
  contact:  <Contact />,
};

createRoot(rootEl).render(
  <StrictMode>
    <Layout>
      {pages[page] ?? <Home />}
    </Layout>
  </StrictMode>
);
