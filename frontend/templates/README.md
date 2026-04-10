# Template System

This folder contains reusable HTML templates for the portfolio.

## 📁 Structure

```
templates/
├── critical-loader.html   # Critical loader (inline CSS + HTML structure)
├── loader-script.html     # Loader cleanup script
├── head-common.html       # Common <head> elements
└── matomo.html           # Matomo tracking code
```

## 🎯 Purpose

These templates serve as reference and documentation for the inline code used across HTML pages.
They are **NOT** automatically injected - the loader code is already inline in each page for maximum performance.

## 📚 Templates Available

### `critical-loader.html`

Contains everything needed for the anti-flash-white loader:

- Ultra-fast inline styles
- HTML structure of the loader
- Spinner animations

**Already inline** in all HTML files for instant loading.

### `loader-script.html`

Script responsible for:

- Removing the loader after page load
- Restoring scroll
- Applying Tailwind classes to body

**Already inline** at the end of each HTML page.

### `head-common.html`

Common `<head>` elements:

- Meta tags (charset, viewport, theme-color)
- External fonts
- CSS frameworks (Tailwind)
- JavaScript libraries (Three.js, GSAP, Lenis)

**Usage**: Reference when creating new pages.

### `matomo.html`

Matomo analytics tracking code.

**Usage**: Copy to `<head>` of each page.

## � Usage

### When creating a new page

1. Copy an existing page as template
2. Modify specific content (title, description, etc.)
3. Verify the critical loader is present (it should be if you copied an existing page)

### To update the loader globally

**Important**: The loader is inline in each page for performance. To update it:

1. Modify the template in this folder
2. Manually update each HTML page OR create a script to do it
3. Test on all pages

## ⚡ Why Inline?

The loader is inline (not loaded from external file) because:

- ✅ **Zero Flash**: Code executes before ANY external resource loads
- ✅ **Performance**: No HTTP request needed
- ✅ **Reliability**: Works even if CSS files fail to load
- ✅ **Critical Path**: Optimizes critical rendering path

## 📝 Note

This folder is primarily for:

- **Documentation**: Understanding the loader structure
- **Reference**: When creating new pages
- **Maintenance**: Single source to understand what needs updating

For production, the loader code is **already embedded** in each HTML file.
