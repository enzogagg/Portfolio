# README - CSS

This folder contains the style sheets used for the portfolio.

## Main files

- `style.css`: Custom styles for the entire site (layout, animations, glassmorphism, responsive design).

## Dependencies

- Tailwind CSS (via CDN)
- FontAwesome for icons
- Inter Font (Google Fonts)

## Organization

- Tailwind utility classes are used for most layout and color management.
- Custom styles are grouped in `style.css` for specific elements, overrides, and custom animations.
- CSS variables are used to facilitate maintenance and color consistency.

## Conventions

- Use clear and consistent class names for custom components.
- Prefer utility classes for speed and visual consistency.
- Animations are defined in dedicated, reusable classes.

## Best practices

- Test on multiple browsers to ensure compatibility (Chrome, Firefox, Safari, Edge).
- Use mobile-first responsive design for optimal experience on all screens.
- Group specific styles in dedicated classes within `style.css`.
- Document complex or non-standard parts directly in the CSS code.

## Recommended structure

- `assets/css/style.css`: Main styles and overrides
- Use Tailwind for grid, colors, spacing, and typography

## Integration example

```html
<link rel="stylesheet" href="assets/css/style.css" />
<script src="https://cdn.tailwindcss.com"></script>
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
/>
```

## Author

Enzo Gaggiotti
