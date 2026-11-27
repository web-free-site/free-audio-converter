/** Removes build-time static homepage SEO so the React app owns a single h1 after mount. */
export function removeHomeStaticSeo(): void {
  document.getElementById('home-static-prerender')?.remove();
}