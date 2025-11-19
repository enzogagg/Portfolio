# Components System

This directory contains reusable HTML components that are dynamically loaded into pages.

## Available Components

### 1. **footer.html**

The main footer section with:

- Brand information and description
- Social media links (Email, GitHub, LinkedIn)
- Navigation links
- Featured projects showcase
- Copyright information

### 2. **header.html**

The navigation header with:

- Logo
- Desktop navigation menu
- Mobile hamburger menu
- Responsive mobile navigation

### 3. **background.html**

The animated background with:

- Gradient orbs animation
- Light rays effect
- Loading spinner

## Usage

To use a component in any HTML page:

```html
<div data-component="component-name"></div>
```

For example:

```html
<div data-component="header"></div>
<div data-component="footer"></div>
```

## Implementation

Components are loaded automatically by the `component-loader.js` script. Make sure to include it in your HTML:

```html
<script src="assets/js/component-loader.js"></script>
```

The component loader will:

1. Scan the DOM for elements with `data-component` attribute
2. Fetch the corresponding HTML file from the `components/` directory
3. Replace the placeholder element with the component content
4. Dispatch a `componentLoaded` event when complete

## Benefits

- ✅ **Single source of truth**: Update once, changes reflect everywhere
- ✅ **Reduced code duplication**: Eliminated ~81,445 bytes of duplicate code
- ✅ **Easier maintenance**: Make changes in one place
- ✅ **Better organization**: Clear separation of concerns
- ✅ **No build step required**: Pure JavaScript solution

## File Structure

```
components/
├── README.md          # This file
├── header.html        # Navigation header component
├── footer.html        # Footer component
└── background.html    # Animated background component
```
