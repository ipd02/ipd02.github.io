import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ipd02.github.io',
  output: 'static',
  trailingSlash: 'never',
  // Preserve HTML-aware whitespace (a single space between inline elements),
  // matching pre-v7 behavior. Without this, v7's 'jsx' default would collapse
  // spaces between adjacent inline tags (e.g. the "01. About" section labels).
  compressHTML: true,
  integrations: [mdx(), sitemap()],
  security: {
    csp: {
      algorithm: 'SHA-256',
      scriptDirective: {
        resources: ["'strict-dynamic'"],
      },
      styleDirective: {
        resources: ["'self'", "'unsafe-inline'"],
      },
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'none'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests",
      ],
    },
  },
  server: {
    host: '127.0.0.1',
    port: 4321,
  },
  vite: {
    server: {
      hmr: { overlay: true },
    },
  },
});
