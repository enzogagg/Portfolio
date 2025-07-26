# Portfolio

## 🚀 Usage

This portfolio supports both local file usage and server deployment:

### Local Usage (Double-click to open)
- Simply double-click any HTML file to open it in your browser
- The application automatically detects `file://` protocol and loads the standalone version
- All features work including theme switching, navigation, and project filters

### Server Usage (Development/Production)
- Serve files through HTTP/HTTPS for the full modular experience
- Example: `python -m http.server 8000` then visit `http://localhost:8000`
- Uses modern ES6 modules for better code organization and performance

## 📁 Project Structure

```
├── index.html              # Homepage
├── projects.html           # Projects showcase with filters
├── about.html              # About page
├── contact.html            # Contact page
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet with glassmorphisme design
│   ├── images/             # Profile pictures and assets
│   └── js/
│       ├── app.js          # Main application (ES6 modules)
│       ├── standalone.js   # Standalone version (file:// compatible)
│       └── modules/        # Modular JavaScript architecture
│           ├── navigation.js   # Mobile menu and navigation
│           ├── projects.js     # Project filtering system
│           ├── animations.js   # Scroll animations
│           ├── accessibility.js # Keyboard navigation & WCAG
│           └── performance.js  # Performance optimizations
└── README.md               # This file
```

## ✨ Features

- **Dual-mode compatibility**: Works with or without HTTP server
- **Modern glassmorphisme design** with smooth transitions
- **Light/Dark theme** with persistent storage
- **Responsive design** optimized for all devices
- **Project filtering system** with smooth animations
- **Accessibility features** (WCAG compliant)
- **Performance optimized** with lazy loading and debouncing
- **Modular architecture** for maintainable code

## 🛠️ Development

The project uses a dual-architecture approach:

- **Modular (ES6)**: For development and HTTP deployment
- **Standalone**: For direct file access without server

Both versions maintain feature parity and share the same CSS and HTML files.