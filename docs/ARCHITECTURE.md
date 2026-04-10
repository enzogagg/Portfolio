# Architecture du Portfolio - Guide Complet

## 📁 Structure du Projet

```
Portfolio/
├── frontend/                    # Application frontend
│   ├── assets/                  # Ressources statiques
│   │   ├── css/                # Styles CSS modulaires
│   │   │   ├── main.css        # Fichier principal (imports)
│   │   │   ├── base/           # Reset, variables
│   │   │   ├── components/     # Composants UI
│   │   │   └── pages/          # Styles spécifiques aux pages
│   │   ├── js/                 # Scripts JavaScript
│   │   │   ├── app.js          # Application principale
│   │   │   ├── component-loader.js  # Chargeur de composants
│   │   │   ├── module-loader.js     # Chargeur de modules
│   │   │   └── utils/          # Utilitaires
│   │   ├── fonts/              # Polices locales (FontAwesome)
│   │   ├── images/             # Images et assets visuels
│   │   └── documents/          # Documents téléchargeables
│   ├── components/             # Composants HTML réutilisables
│   │   ├── header.html         # En-tête de navigation
│   │   ├── footer.html         # Pied de page
│   │   └── README.md           # Documentation composants
│   ├── templates/              # 🆕 Templates système
│   │   ├── critical-loader.html    # Loader critique (anti-flash)
│   │   ├── loader-script.html      # Script de cleanup loader
│   │   ├── head-common.html        # <head> commun
│   │   ├── matomo.html             # Analytics
│   │   └── README.md               # Documentation templates
│   ├── tests/                  # Tests E2E et unitaires
│   ├── *.html                  # Pages HTML du site
│   ├── nginx.conf              # Configuration Nginx
│   └── Dockerfile              # Image Docker frontend
├── backend/                    # API Go + PostgreSQL
├── scripts/                    # 🆕 Scripts de build
│   └── inject-loader.js        # Injection automatique du loader
├── config/                     # Configuration outils (ESLint, Jest, etc.)
├── docs/                       # Documentation projet
├── package.json                # 🔄 Mis à jour avec nouveaux scripts
└── compose.yaml                # Docker Compose
```

## 🎯 Principes d'Architecture

### 1. **Modularité**

- CSS organisé en modules (base, components, pages)
- JS avec architecture modulaire (app.js + modules)
- Composants HTML réutilisables (header, footer)
- **🆕 Templates** : Code critique partagé

### 2. **Performance**

- **Loader critique inline** : Élimine le flash blanc
- Chargement lazy des composants
- CSS minifié et optimisé
- Fonts preloadées

### 3. **Maintenabilité**

- **🆕 DRY** : Pas de duplication (templates)
- **🆕 Scripts de build** : Injection automatique
- Documentation claire
- Tests automatisés

### 4. **SEO & Accessibilité**

- Meta tags optimisés
- Structure sémantique
- Sitemap.xml
- robots.txt

## 🚀 Système de Templates (NOUVEAU)

### Problème résolu

Avant : Le loader critique était dupliqué dans chaque page HTML (8+ fichiers).
Maintenant : Une seule source de vérité dans `templates/`.

### Comment ça fonctionne

#### 1. Templates disponibles

**`critical-loader.html`**

```html
<!doctype html>
<style>
  ...CSS inline...
</style>
<html style="background:#000">
  <body style="background:#000">
    <div id="l">...</div>
  </body>
</html>
```

- CSS ultra-rapide (pas de flash blanc)
- Structure HTML du loader
- Animations du spinner

**`loader-script.html`**

```html
<script>
  // Retire le loader après chargement
  // Restaure le scroll
  // Applique les classes Tailwind
</script>
```

#### 2. Script d'injection

```bash
npm run inject:loader
```

Ce script :

1. Lit les templates dans `frontend/templates/`
2. Inject le loader dans toutes les pages HTML
3. Garantit la cohérence

#### 3. Workflow de développement

**Modifier le loader globalement :**

```bash
# 1. Modifier frontend/templates/critical-loader.html
# 2. Injecter dans toutes les pages
npm run inject:loader
# 3. Vérifier
npm run dev
```

**Créer une nouvelle page :**

```bash
# 1. Copier une page existante
cp frontend/index.html frontend/nouvelle-page.html

# 2. Modifier le contenu spécifique
# (titre, description, contenu)

# 3. S'assurer que le loader est injecté
npm run inject:loader
```

## 🔧 Scripts NPM Mis à Jour

```json
{
  "inject:loader": "node scripts/inject-loader.js", // 🆕 Injection loader
  "build": "npm run inject:loader && echo '✅ Build complete'", // 🔄 Build avec injection
  "dev": "cd frontend && python3 -m http.server 8000",
  "format": "npx prettier --write '**/*.{html,css,js,json,md}'",
  "lint": "npm run lint:css && npm run lint:js",
  "test": "jest --config=./config/jest.config.js",
  "test:e2e": "playwright test",
  "validate": "npm run format:check && npm run lint && npm run test:coverage && npm run test:e2e"
}
```

## 📏 Conventions de Code

### Nommage

- **Fichiers** : kebab-case (`portfolio-project.html`)
- **Classes CSS** : BEM ou Tailwind utility-first
- **Variables JS** : camelCase
- **Constantes** : UPPER_SNAKE_CASE

### Organisation CSS

```css
/* 1. Imports */
@import 'base/reset.css';

/* 2. Variables globales */
:root { --color-primary: #8b5cf6; }

/* 3. Base styles */
body { ... }

/* 4. Components */
.card { ... }

/* 5. Utilities */
.mt-4 { margin-top: 1rem; }
```

### Organisation JS

```javascript
// 1. Imports
import { module } from './module.js';

// 2. Constants
const API_URL = 'https://api.example.com';

// 3. State
let currentPage = 'home';

// 4. Functions
function initialize() { ... }

// 5. Event listeners
window.addEventListener('load', initialize);

// 6. Exports
export { initialize };
```

## 🎨 Système de Design

### Couleurs

- **Primary** : Purple (#8b5cf6)
- **Secondary** : Blue (#3b82f6)
- **Accent** : Cyan (#06b6d4)
- **Background** : Black (#000)
- **Text** : White (#fff)

### Typographie

- **Font principale** : Inter (Google Fonts)
- **Poids** : 400 (regular), 600 (semibold), 800 (extrabold)

### Espacements

- Base : 0.25rem (4px)
- Échelle : 4, 8, 12, 16, 24, 32, 48, 64, 96px

## 🔐 Sécurité

- **CSP** : Défini dans nginx.conf
- **HTTPS** : Forcé en production
- **Sanitization** : Inputs validés côté backend
- **CORS** : Configuré strictement

## 📊 Analytics

- **Matomo** : Auto-hébergé (matomo.ega.ovh)
- Template : `templates/matomo.html`
- Cookie domain : `*.portfolio.ega.ovh`

## 🚢 Déploiement

### Développement

```bash
npm run dev  # Serveur local sur http://localhost:8000
```

### Production

```bash
npm run build  # Injection loader + vérifications
docker compose up -d  # Lancement containers
```

## 📝 Maintenance

### Mise à jour du loader

```bash
# 1. Modifier frontend/templates/critical-loader.html
# 2. Injecter
npm run inject:loader
# 3. Tester
npm run dev
# 4. Commit
git add .
git commit -m "Update critical loader"
```

### Ajout d'une nouvelle page

```bash
# 1. Créer le fichier HTML
cp frontend/index.html frontend/ma-page.html
# 2. Modifier le contenu
# 3. Injecter le loader
npm run inject:loader
# 4. Ajouter au sitemap
# 5. Tester
npm run test:e2e
```

## 🐛 Debugging

### Flash blanc persiste

```bash
# Vérifier que le loader est bien injecté
npm run inject:loader
# Vérifier la console du navigateur
# Tester en incognito (sans extensions)
```

### Composants ne se chargent pas

```bash
# Vérifier les logs dans la console
# Vérifier component-loader.js
# S'assurer que le serveur HTTP fonctionne
```

## 📚 Ressources

- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation GSAP](https://greensock.com/docs/)
- [Documentation Three.js](https://threejs.org/docs/)
- [Documentation Lenis](https://github.com/studio-freight/lenis)

## 🎯 Roadmap

- [x] Système de templates
- [x] Injection automatique du loader
- [ ] Build system complet (minification, bundling)
- [ ] CI/CD pipeline
- [ ] Progressive Web App (PWA)
- [ ] i18n (Internationalisation)

---

**Version** : 2.1.0  
**Dernière mise à jour** : 2025-11-23
