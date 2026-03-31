# HTML Partials Structure

Your HTML has been modularized into separate component files for better maintainability and reusability.

## File Organization

```
partials/
├── nav.html           # Navigation bar
├── hero.html          # Hero section
├── marquee.html       # Marquee (services list ticker)
├── about.html         # About section
├── services.html      # Services grid
├── process.html       # Process/ritual steps
├── testimonials.html  # Testimonials section
├── contact.html       # Contact form
└── footer.html        # Footer
```

## How to Use These Partials

### Option 1: Static HTML Assembly (No Build Tool)
Keep them organized in the `partials/` folder as reference. Your main `index.html` remains your single source.

### Option 2: Server-Side Includes (PHP)
If running on a PHP server, you can include them dynamically:

```php
<!DOCTYPE html>
<html>
<head>
  <!-- ... head content ... -->
</head>
<body>
  <!-- Include components -->
  <?php include 'partials/nav.html'; ?>
  <?php include 'partials/hero.html'; ?>
  <?php include 'partials/marquee.html'; ?>
  <?php include 'partials/about.html'; ?>
  <?php include 'partials/services.html'; ?>
  <?php include 'partials/process.html'; ?>
  <?php include 'partials/testimonials.html'; ?>
  <?php include 'partials/contact.html'; ?>
  <?php include 'partials/footer.html'; ?>
  
  <script src="js/script.js"></script>
</body>
</html>
```

### Option 3: Build Tool (11ty / Eleventy) - RECOMMENDED
Use a static site generator to assemble partials at build time:

Install: `npm install --save-dev @11ty/eleventy`

Create `.eleventy.js`:
```javascript
module.exports = function(eleventyConfig) {
  return {
    dir: { input: ".", output: "_site" }
  };
};
```

Then use Nunjucks/Liquid templates to include partials:
```html
{% include "partials/nav.html" %}
{% include "partials/hero.html" %}
```

### Option 4: JavaScript Template Literals
Load and inject partials dynamically:

```javascript
async function loadPartials() {
  const nav = await fetch('partials/nav.html').then(r => r.text());
  const hero = await fetch('partials/hero.html').then(r => r.text());
  // ... etc
  
  document.body.innerHTML = nav + hero + /* ... rest ... */;
}
```

## Benefits of Modular Structure

✅ **Easier maintenance** - Edit components independently  
✅ **Better organization** - Clear file structure  
✅ **Reusability** - Components can be shared across pages  
✅ **Collaboration** - Developers can work on different sections  
✅ **Testing** - Easier to test individual components  

## Current Recommendation

For your static website, you can:
1. **Keep partials as reference docs** for future updates
2. **Use them if you add a build process later**
3. **Maintain index.html as-is** for now (it's already clean and organized)

The main benefit right now is having isolated, editable sections without needing to search through a giant file.
