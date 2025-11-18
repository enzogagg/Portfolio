# 🎨 CSS Architecture

Professional, modular CSS architecture following enterprise-grade standards.

## ✅ Quality Status

**Stylelint Compliance**: 100% ✅

```
CSS Errors: 0 ✅
CSS Warnings: 0 ✅
Code Quality: 100% enterprise-grade ✅
Duplicate Code: 0 (removed ~800 lines) ✅
```

## 📁 Structure

```
assets/css/
├── main.css              # Main entry point
└── modules/
    ├── variables.css     # CSS custom properties
    ├── base.css          # Base styles, resets
    ├── animations.css    # Keyframe animations (camelCase)
    ├── header.css        # Header component
    ├── buttons.css       # Button variants
    ├── cards.css         # Card components
    ├── components.css    # Reusable components
    ├── special-components.css  # Specialized components
    ├── contact.css       # Contact page styles
    ├── project-actions.css     # Project action buttons
    └── loader.css        # Loading states
```

## 🎯 Architecture Principles

### Modular Design

- ✅ Each module is independent and reusable
- ✅ Clear separation of concerns
- ✅ No duplicate code (refactored from 2445 → 1370 lines in components.css)

### Naming Conventions

- ✅ **Classes**: kebab-case (`.my-class`)
- ✅ **Animations**: camelCase (`@keyframes fadeIn`)
- ✅ **Variables**: kebab-case (`--primary-color`)
- ✅ **No ID selectors** (use classes for styling)

## 🔧 Dependencies

- **Tailwind CSS** (via CDN) - Utility-first framework
- **FontAwesome** - now self-hosted under `frontend/assets/fonts/fontawesome/` (previously served from CDN)
- **Inter Font** - currently loaded via Google Fonts; consider self-hosting for full offline/privacy control

**Author**: Enzo Gaggiotti  
**Last Updated**: November 18, 2025

## Recent frontend CSS-related enhancements

- FontAwesome CSS and webfonts were moved to local assets to remove third-party requests and eliminate Lighthouse third-party cookie warnings.
- A small loader CSS (`frontend/assets/css/local-fontawesome.css`) was added to import the local FontAwesome bundle and act as a drop-in replacement for previous CDN links.
- Preload hints for the FontAwesome webfonts (woff2) were added on key pages to reduce Cumulative Layout Shift (CLS).
