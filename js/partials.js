const PARTIAL_SEQUENCE = [
  'nav',
  'hero',
  'marquee',
  'about',
  'services',
  'process',
  'testimonials',
  'contact',
  'footer'
];

async function fetchPartial(name) {
  const response = await fetch(`partials/${name}.html`, { cache: 'no-cache' });

  if (!response.ok) {
    throw new Error(`Failed to load partial: ${name}.html (HTTP ${response.status})`);
  }

  return response.text();
}

async function loadPartialsIntoRoot() {
  const root = document.getElementById('partials-root');
  if (!root) {
    throw new Error('Missing #partials-root container in index.html');
  }

  const fragments = await Promise.all(PARTIAL_SEQUENCE.map(fetchPartial));
  root.innerHTML = fragments.join('\n');
}

window.tmcPartialsReady = loadPartialsIntoRoot().catch(error => {
  console.error(error);

  const root = document.getElementById('partials-root');
  if (root) {
    root.innerHTML = '<section class="partials-load-error"><h2 class="partials-load-error-title">Unable to load page content</h2><p>Please refresh the page or check your hosting path configuration.</p></section>';
  }

  throw error;
});
