# Partials

This folder contains modular section markup used by the runtime shell.

## Files

- nav.html
- hero.html
- marquee.html
- about.html
- services.html
- process.html
- testimonials.html
- contact.html
- footer.html

## How It Is Used

- index.html is the shell page.
- js/partials.js fetches and injects these files in sequence into #partials-root.
- js/script.js initializes behavior after partials are loaded.

## Editing Guidance

- Keep structure-only markup here.
- Prefer classes over inline styles.
- Keep shared styles in css/styles.css.
- Keep behavior in js/script.js.
