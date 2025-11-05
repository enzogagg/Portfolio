# 📋 Linting Configuration - Enterprise Standards# 📋 Linting Configuration - Enterprise Standards# 📋 Linting Configuration - Enterprise Standards

This document explains the linting rules configured for this project and provides guidance on addressing issues.

## 📊 Project Current State## 📊 Project Current State## 📊 Project Current State

### Global Summary

````### Global Summary### Global Summary

CSS  : 162 errors, 103 warnings

JS   : 1 error, 74 warnings```

Total: 265 issues

```CSS  : 162 errors, 103 warnings```



### CSS Errors BreakdownJS   : 1 error, 74 warnings



| Type | Count | Severity | Action |Total: 265 issuesCSS  : 162 errors, 103 warningsCSS

|------|-------|----------|--------|

| Duplicate selectors | ~112 | ❌ Error | Refactor CSS architecture |```

| Animations in kebab-case | 12 | ❌ Error | Rename to camelCase |

| Named colors (`red`) | 8 | ❌ Error | Replace with hex/rgb |JS   : 1 error, 74 warningsJS

| ID selectors (#id) | 1 | ❌ Error | Replace with classes |

| `!important` | 103 | ⚠️ Warning | Restructure CSS specificity |### CSS Errors Breakdown



### JavaScript Errors BreakdownTotal: 265 issues



| Type | Count | Severity | Action || Type | Count | Severity | Action |

|------|-------|----------|--------|

| Unused variable | 1 | ❌ Error | Remove `closeMobileMenu` ||------|-------|----------|--------|```

| `console.log` statements | 74 | ⚠️ Warning | Remove before production |

| Duplicate selectors | ~112 | ❌ Error | Refactor CSS architecture |

---

| Animations in kebab-case | 12 | ❌ Error | Rename to camelCase |### CSS Errors Breakdown

## 🎯 ESLint Configuration

| Named colors (`red`) | 8 | ❌ Error | Replace with hex/rgb |

**Location**: `tests/.eslintrc.js`

| ID selectors (#id) | 1 | ❌ Error | Replace with classes || Type | Count | Severity | Action || Type | Nombre | Sévérité | Action |

This configuration enforces 35 strict rules for JavaScript ES6+ code:

| `!important` | 103 | ⚠️ Warning | Restructure CSS specificity |

### 1. Variable Declaration Rules

|------|-------|----------|--------||------|--------|----------|--------|

```javascript

// ❌ BAD - var is outdated### JavaScript Errors Breakdown

var count = 0;

| Duplicate selectors | ~112 | ❌ Error | Refactor CSS architecture || Sélecteurs dupliqués | ~112 | ❌ Error | Refactorisation architecture CSS |

// ✅ GOOD - Use let for mutable variables

let count = 0;| Type | Count | Severity | Action |



// ✅ BEST - Use const when value won't change|------|-------|----------|--------|| Animations in kebab-case | 12 | ❌ Error | Rename to camelCase || Animations en kebab-case | 12 | ❌ Error | Renommer en camelCase |

const MAX_SIZE = 100;

```| `console.log()` | 74 | ⚠️ Warning | Remove or keep warn/error/info only |



**Rules applied:**| Unused variable | 1 | ❌ Error | Remove `closeMobileMenu` || Named colors (`red`) | 8 | ❌ Error | Replace with hex/rgb || Couleurs nommées (`red`) | 8 | ❌ Error | Remplacer par hex/rgb |

- `no-var`: Enforce `let`/`const` instead of `var`

- `prefer-const`: Require `const` when variable is never reassigned

- `one-var`: Require separate declarations (`let a = 1; let b = 2;`)

---| ID selectors (#id) | 1 | ❌ Error | Replace with classes || Sélecteurs ID (#id) | 1 | ❌ Error | Remplacer par classes |

### 2. Comparison Rules



```javascript

// ❌ BAD - Type coercion can cause bugs## 🎯 ESLint Configuration (JavaScript)| `!important` | 103 | ⚠️ Warning | Restructure CSS specificity || `!important` | 103 | ⚠️ Warning | Restructurer spécificité CSS |

if (value == "5") // true for 5 and "5"



// ✅ GOOD - Strict equality

if (value === "5") // only true for "5"### Strict Rules Applied### JavaScript Errors Breakdown

````

**Rules applied:**

- `eqeqeq`: Require `===` and `!==` instead of `==` and `!=`#### **Variables and Declarations**| Type | Count | Severity | Action || Type | Nombre | Sévérité | Action |

- `no-eq-null`: Disallow `== null` comparisons

````javascript

### 3. Function Rules

'no-var': 'error'                    // ❌ `var` forbidden|------|-------|----------|--------||------|--------|----------|--------|

```javascript

// ❌ BAD - Traditional function syntax'prefer-const': 'error'              // ❌ Force `const` if never reassigned

array.map(function(item) {

  return item * 2;'no-unused-vars': 'error'            // ❌ Unused variables (_prefix OK)| `console.log()` | 74 | ⚠️ Warning | Remove or keep warn/error/info only |

});

'no-undef': 'error'                  // ❌ Undeclared variable| Unused variable | 1 | ❌ Error | Remove `closeMobileMenu` |

// ✅ GOOD - Arrow function

array.map(item => item * 2);'no-use-before-define': 'error'      // ❌ Use before declaration

````

````---

**Rules applied:**

- `prefer-arrow-callback`: Require arrow functions as callbacks

- `arrow-body-style`: Require concise arrow function bodies when possible

- `no-unused-vars`: Disallow unused variables and functions#### **Quality and Security**## 🎯 ESLint Configuration (JavaScript)



### 4. Code Quality Rules```javascript



```javascript'eqeqeq': ['error', 'always']        // ❌ Force === instead of ==### Strict Rules Applied

// ❌ BAD - console.log in production

console.log('Debug info');'no-eval': 'error'                   // ❌ eval() forbidden



// ✅ GOOD - Remove console statements before production'no-prototype-builtins': 'error'     // ❌ obj.hasOwnProperty() forbidden#### **Variables and Declarations**

// Or use proper logging library

```'no-param-reassign': 'error'         // ❌ No parameter mutation



**Rules applied:**'array-callback-return': 'error'     // ❌ .map()/.filter() must return`javascript`javascript

- `no-console`: Warn about console usage (can be removed in dev)

- `no-debugger`: Error on debugger statements```

- `no-alert`: Disallow `alert`, `confirm`, `prompt`

'no-var': 'error' // ❌ `var` forbidden'no-var': 'error'

### 5. Formatting Rules

#### **Modern Code Style**

```javascript

// ❌ BAD - Missing semicolon, wrong quotes```javascript'prefer-const': 'error' // ❌ Force `const` if never reassigned'prefer-const': 'error'

const name = "John"

'prefer-arrow-callback': 'error'     // ❌ Prefer () => {}

// ✅ GOOD - Consistent style

const name = 'John';'prefer-template': 'error'           // ❌ Prefer `${x}` over 'str' + x'no-unused-vars': 'error' // ❌ Unused variables (\_prefix OK)'no-unused-vars': 'error'

````

'semi': ['error', 'always'] // ❌ Semicolons required

**Rules applied:**

- `semi`: Require semicolons at end of statements'quotes': ['error', 'single'] // ❌ Single quotes'no-undef': 'error' // ❌ Undeclared variable'no-undef': 'error'

- `quotes`: Enforce single quotes for strings

- `indent`: Enforce 2-space indentation'indent': ['error', 2] // ❌ 2 spaces indentation

- `comma-dangle`: Require trailing commas in multiline

- `object-curly-spacing`: Require spacing inside braces `{ foo }````'no-use-before-define': 'error' // ❌ Use before declaration'no-use-before-define': 'error'

### 6. Advanced ES6+ Rules

- `no-duplicate-imports`: Combine multiple imports from same module### Allowed Exceptions````

- `prefer-template`: Use template literals instead of string concatenation

- `prefer-destructuring`: Use destructuring when accessing object properties

- `object-shorthand`: Use ES6 object shorthand (`{ name }` instead of `{ name: name }`)

- `console.warn()`, `console.error()`, `console.info()` → OK

---

- Variables prefixed with `_` (e.g., `_unused`) → Ignored

## 🎨 Stylelint Configuration

- Template literals with quotes → OK#### **Quality and Security**

**Location**: `tests/.stylelintrc.json`

- Function declarations before use → OK (hoisting)

This configuration enforces 15 strict rules for CSS code:

`javascript`javascript

### 1. Naming Conventions

---

````````css

/* ❌ BAD - Classes in camelCase or snake_case */'eqeqeq': ['error', 'always']        // ❌ Force === instead of =='eqeqeq': ['error', 'always']

.myButton { }

.my_button { }## 🎨 Stylelint Configuration (CSS)



/* ✅ GOOD - Classes in kebab-case */'no-eval': 'error'                   // ❌ eval() forbidden'no-eval': 'error'

.my-button { }

### Strict Rules Applied

/* ❌ BAD - Animation in kebab-case */

@keyframes fade-in { }'no-prototype-builtins': 'error'     // ❌ obj.hasOwnProperty() forbidden'no-prototype-builtins': 'error'



/* ✅ GOOD - Animation in camelCase */#### **Naming Conventions**

@keyframes fadeIn { }

``````css'no-param-reassign': 'error'         // ❌ No parameter mutation'no-param-reassign': 'error'



**Rules applied:**selector-class-pattern         // ❌ kebab-case required

- `selector-class-pattern`: Enforce kebab-case for class names

- `keyframes-name-pattern`: Enforce camelCase for animation namescustom-property-pattern        // ❌ --kebab-case required'array-callback-return': 'error'     // ❌ .map()/.filter() must return'array-callback-return': 'error'



### 2. Selector Ruleskeyframes-name-pattern         // ❌ camelCase required



```css```````

/* ❌ BAD - ID selector */

#header {

  background: blue;

}**Valid Examples**:#### **Modern Code Style**#### **Style de code moderne**



/* ✅ GOOD - Class selector */```css

.header {

  background: blue;.my-button { }                 // ✅ kebab-case`javascript`javascript

}

.card__title { }               // ✅ BEM

/* ❌ BAD - Duplicate selector */

.button { color: red; }.text-xl { }                   // ✅ Tailwind'prefer-arrow-callback': 'error' // ❌ Prefer () => {}'prefer-arrow-callback': 'error' // ❌ Préfère () => {}

.button { background: blue; } /* Should be combined */

--bg-primary: #000;            // ✅ Variable kebab-case

/* ✅ GOOD - Combined selector */

.button {'prefer-template': 'error' // ❌ Prefer `${x}` over 'str' + x'prefer-template': 'error' // ❌ Préfère `${x}` à 'str' + x

  color: red;

  background: blue;@keyframes fadeIn { }          // ✅ Animation camelCase

}

``````'semi': ['error', 'always'] // ❌ Semicolons required'semi': ['error', 'always'] // ❌ Point-virgules obligatoires



**Rules applied:**

- `selector-max-id`: Disallow ID selectors (max 0)

- `no-duplicate-selectors`: Disallow duplicate selectors in same file**Invalid Examples**:'quotes': ['error', 'single'] // ❌ Single quotes'quotes': ['error', 'single'] // ❌ Guillemets simples

- `selector-max-compound-selectors`: Maximum 4 levels of nesting

```css

### 3. Color Rules

#myId { }                      // ❌ No ID selectors'indent': ['error', 2] // ❌ 2 spaces indentation'indent': ['error', 2] // ❌ Indentation 2 espaces

```css

/* ❌ BAD - Named colors */.myButton { }                  // ❌ camelCase forbidden

.error {

  color: red;--bgPrimary: #000;             // ❌ camelCase forbidden````

}



/* ✅ GOOD - Hex or RGB */

.error {@keyframes fade-in { }         // ❌ kebab-case forbidden

  color: #ff0000;

  /* or */```

  color: rgb(255, 0, 0);

}### Allowed Exceptions### Exceptions autorisées

````````

#### **Code Quality**

**Rules applied:**

- `color-named`: Disallow named colors, use hex/rgb/hsl```css

### 4. Code Quality Rulesno-duplicate-selectors // ❌ Duplicate selectors forbidden

```cssmax-nesting-depth: 4           // ❌ Max 4 nesting levels- `console.warn()`, `console.error()`, `console.info()`→ OK-`console.warn()`, `console.error()`, `console.info()` → OK

/_ ❌ BAD - !important overuse _/

.button {selector-max-id: 0 // ❌ No ID selectors

color: blue !important;

}color-named: 'never' // ❌ `red` → `#ff0000`- Variables prefixed with `_` (e.g., `_unused`) → Ignored- Variables préfixées `_` (ex: `_unused`) → Ignorées

/_ ✅ GOOD - Proper specificity _/declaration-no-important // ⚠️ !important discouraged (warning)

.modal .button {

color: blue;```- Template literals with quotes → OK- Template literals avec quotes → OK

}

````



**Rules applied:**---- Function declarations before use → OK (hoisting)- Fonctions déclarées avant utilisation → OK (hoisting)

- `declaration-no-important`: Warn against `!important` usage

- `max-nesting-depth`: Maximum 4 levels of nesting

- `no-descending-specificity`: Disallow lower specificity after higher

## 🚀 Action Plan - Prioritization

### 5. Formatting Rules



- `indentation`: Enforce 2-space indentation

- `string-quotes`: Enforce single quotes `'`### Phase 1: Quick Fixes (1-2h)------

- `number-leading-zero`: Require leading zero (0.5 not .5)

- `color-hex-length`: Prefer short hex notation (#fff not #ffffff)

- `declaration-block-no-duplicate-properties`: Disallow duplicate properties

**JavaScript**:

---

1. ✅ Remove unused `closeMobileMenu` in `burger.js`

## 📝 Action Plan

2. ✅ Replace `color: red` → `color: #ff0000` (8 occurrences)## 🎨 Stylelint Configuration (CSS)## 🎨 Configuration Stylelint (CSS)

### Phase 1: Quick Fixes (1-2 hours)

3. ✅ Rename animations kebab-case → camelCase (12 occurrences)

**JavaScript:**

```bash4. ✅ Replace `#minimal-loader` → `.minimal-loader` (1 occurrence)

# Remove unused closeMobileMenu function

# File: assets/js/modules/navigation.js

````

### Phase 2: Medium Optimizations (2-4h)### Strict Rules Applied### Règles strictes appliquées

**CSS:**

`````bash

# Replace named colors with hex

sed -i '' 's/color: red/color: #ff0000/g' assets/css/**/*.css**JavaScript**:



# Rename animations to camelCase- Create build plugin to strip `console.log()` in production

# Manual: fade-in → fadeIn, slide-up → slideUp, etc.

- Or keep only `console.warn/error/info`#### **Naming Conventions**#### **Conventions de nommage**

# Replace ID selector with class

# File: assets/css/loader.css

# Change: #loader → .loader

```**CSS**:```css```css



### Phase 2: Medium Optimizations (2-4 hours)- Replace `!important` with better specificity (103 occurrences)



**Remove/minimize `!important` usage:**- Group CSS rules to avoid duplicationselector-class-pattern         // ❌ kebab-case requiredselector-class-pattern         // ❌ kebab-case obligatoire

- Increase specificity naturally instead

- Reorder CSS to avoid conflicts

- Use CSS cascade properly

### Phase 3: Major Refactoring (1-2 days)custom-property-pattern        // ❌ --kebab-case requiredcustom-property-pattern        // ❌ --kebab-case obligatoire

**Group duplicate CSS rules:**

- Combine selectors with same properties

- Extract common patterns to utility classes

- Use CSS custom properties for shared values**CSS**:keyframes-name-pattern         // ❌ camelCase requiredkeyframes-name-pattern         // ❌ camelCase obligatoire



### Phase 3: Major Refactoring (1-2 days)- Restructure `components.css` to eliminate 112 duplicate selectors



**Refactor `components.css` to eliminate ~112 duplicate selectors:**- Create Sass mixins or use CSS variables for reusability````

- Create component-based architecture

- Use CSS modules or BEM methodology- Separate duplicate components into dedicated files

- Extract common styles to base classes

- Implement design tokens system**Valid Examples**:**Exemples valides** :



------



## 🚀 Available Commands`css`css



### Linting Commands## 📝 Available Commands



```bash.my-button { } // ✅ kebab-case.my-button { } // ✅ kebab-case

# Run all linting (CSS + JS)

npm run lint```bash



# Run CSS linting only# Full linting.card**title { } // ✅ BEM.card**title { } // ✅ BEM

npm run lint:css

npm run lint                    # CSS + JavaScript

# Run JavaScript linting only

npm run lint:js.text-xl { } // ✅ Tailwind.text-xl { } // ✅ Tailwind



# Fix auto-fixable issues# Separate linting

npm run lint:fix

npm run lint:css:fix  # CSS onlynpm run lint:css                # CSS only--bg-primary: #000; // ✅ Variable kebab-case--bg-primary: #000; // ✅ Variable kebab-case

npm run lint:js:fix   # JS only

npm run lint:js                 # JavaScript only

# Generate linting report

npm run lint:report@keyframes fadeIn { } // ✅ Animation camelCase@keyframes fadeIn { } // ✅ Animation camelCase

`````

# Auto-fix (fixes what can be fixed)

### Formatting Commands

npm run lint:css:fix # Auto-fix CSS````

````bash

# Format all files (HTML, CSS, JS, JSON, MD)npm run lint:js:fix             # Auto-fix JavaScript

npm run format

npm run lint:fix                # Auto-fix everything

# Check formatting without modifying

npm run format:check



# Validate code (format + lint)# Code formatting**Invalid Examples**:**Exemples invalides** :

npm run validate

```npm run format                  # Prettier on entire project



---npm run format:check            # Check format without modifying```css```css



## 💡 Best Practices



### JavaScript# Complete validation (CI/CD)#myId { }                      // ❌ No ID selectors#myId { }                      // ❌ Pas de sélecteur ID



1. **Always use `const` by default**, only use `let` when you need to reassignnpm run validate                # Format + Lint (no auto-fix)

2. **Prefer arrow functions** for callbacks and short functions

3. **Use template literals** for string concatenation.myButton { }                  // ❌ camelCase forbidden.myButton { }                  // ❌ camelCase interdit

4. **Destructure objects** to extract multiple properties

5. **Remove all `console.log`** before committing to production# Report



### CSSnpm run lint:report             # Generate lint-report.txt--bgPrimary: #000;             // ❌ camelCase forbidden--bgPrimary: #000;             // ❌ camelCase interdit



1. **Use classes only**, never IDs for styling```

2. **Avoid `!important`** - fix specificity issues instead

3. **Name animations in camelCase** (fadeIn, slideUp)

4. **Name classes in kebab-case** (btn-primary, card-header)

5. **Use hex/rgb colors** instead of named colors---

6. **Combine duplicate selectors** to reduce file size

@keyframes fade-in { }         // ❌ kebab-case forbidden@keyframes fade-in { }         // ❌ kebab-case interdit

---

## 🎓 Best Practices to Adopt

## 🔧 Temporarily Disable Rules

````

### For Specific Lines

### JavaScript

````javascript

// eslint-disable-next-line no-console1. ✅ Always use `const` by default, `let` if reassignment needed#### **Code Quality**#### **Qualité du code**

console.log('Debugging info');

```2. ✅ Prefix unused variables with `_`: `_unusedParam`



```css3. ✅ Use `===` instead of `==``css`css

/* stylelint-disable-next-line declaration-no-important */

.utility-class { margin: 0 !important; }4. ✅ Prefer arrow functions: `() => {}`

````

5. ✅ Template literals: `` `Hello ${name}` ``no-duplicate-selectors // ❌ Duplicate selectors forbiddenno-duplicate-selectors // ❌ Sélecteurs répétés interdits

### For Entire Files

6. ✅ Semicolons everywhere

```javascript

/* eslint-disable no-console */7. ❌ Avoid `console.log()` → `console.info()` acceptablemax-nesting-depth: 4 // ❌ Max 4 nesting levelsmax-nesting-depth: 4 // ❌ Max 4 niveaux d'imbrication

// All console.log allowed in this file

```

```css### CSSselector-max-id: 0 // ❌ No ID selectorsselector-max-id: 0 // ❌ Aucun sélecteur par ID

/* stylelint-disable color-named */

/* Named colors allowed in this file */1. ✅ Classes in kebab-case: `.my-component`

```

2. ✅ Animations in camelCase: `@keyframes fadeIn`color-named: 'never' // ❌ `red` → `#ff0000`color-named: 'never' // ❌ `red` → `#ff0000`

---

3. ✅ Variables in kebab-case: `--my-color`

## 📚 Resources

4. ❌ Never use ID selectors: `#id`declaration-no-important // ⚠️ !important discouraged (warning)declaration-no-important // ⚠️ !important déconseillé (warning)

- **ESLint**: https://eslint.org/docs/latest/rules/

- **Stylelint**: https://stylelint.io/user-guide/rules/5. ❌ Never use named colors: `red` → `#ff0000`

- **Prettier**: https://prettier.io/docs/en/options.html

- **Airbnb JavaScript Style Guide**: https://github.com/airbnb/javascript6. ⚠️ Limit `!important` to strict minimum````

---7. ✅ Max 4 nesting levels

## 🎯 Target Compliance

**Current**: 265 issues ---

**Short-term Goal**: < 50 issues (80% reduction)

**Long-term Goal**: 0 errors, < 10 warnings (95%+ compliance)------

**Priority**: Enterprise-grade code quality with 95%+ compliance to industry standards.## 🔧 Temporarily Disable a Rule

### ESLint (JavaScript)

````javascript## 🚀 Action Plan - Prioritization## 🚀 Plan d'action - Priorisation

// eslint-disable-next-line no-console

console.log('Important debug');



/* eslint-disable no-console */### Phase 1: Quick Fixes (1-2h)### Phase 1 : Corrections rapides (1-2h)

console.log('Entire block');

console.log('Multiple lines');

/* eslint-enable no-console */

```**JavaScript**:**JavaScript** :



### Stylelint (CSS)1. ✅ Remove unused `closeMobileMenu` in `burger.js`1. ✅ Supprimer `closeMobileMenu` inutilisé dans `burger.js`

```css

/* stylelint-disable-next-line declaration-no-important */2. ✅ Replace `color: red` → `color: #ff0000` (8 occurrences)2. ✅ Remplacer `color: red` → `color: #ff0000` (8 occurrences)

.override { color: red !important; }

3. ✅ Rename animations kebab-case → camelCase (12 occurrences)3. ✅ Renommer animations kebab-case → camelCase (12 occurrences)

/* stylelint-disable */

.legacy-code {4. ✅ Replace `#minimal-loader` → `.minimal-loader` (1 occurrence)4. ✅ Remplacer `#minimal-loader` → `.minimal-loader` (1 occurrence)

  color: red;

  #old-id { }

}

/* stylelint-enable */### Phase 2: Medium Optimizations (2-4h)### Phase 2 : Optimisations moyennes (2-4h)

````

⚠️ **Warning**: Use sparingly! Always justify why.

**JavaScript**:**JavaScript** :

---

- Create build plugin to strip `console.log()` in production- Créer un plugin de build pour strip les `console.log()` en prod

## 📚 Resources

- Or keep only `console.warn/error/info`- Ou garder uniquement `console.warn/error/info`

- [ESLint Rules](https://eslint.org/docs/latest/rules/)

- [Stylelint Rules](https://stylelint.io/user-guide/rules/)

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

- [BEM Naming Convention](http://getbem.com/naming/)**CSS**:**CSS** :

---- Replace `!important` with better specificity (103 occurrences)- Remplacer les `!important` par une meilleure spécificité (103 occurrences)

**Last Updated**: November 5, 2025 - Group CSS rules to avoid duplication- Regrouper les règles CSS pour éviter la duplication

**Current Compliance Level**: 74% (265/1000+ lines of code)

**Enterprise Target**: 95%+ compliance

### Phase 3: Major Refactoring (1-2 days)### Phase 3 : Refactorisation majeure (1-2 jours)

**CSS**:**CSS** :

- Restructure `components.css` to eliminate 112 duplicate selectors- Restructurer `components.css` pour éliminer les 112 sélecteurs dupliqués

- Create Sass mixins or use CSS variables for reusability- Créer des mixins Sass ou utiliser CSS variables pour réutilisation

- Separate duplicate components into dedicated files- Séparer les composants dupliqués en fichiers dédiés

---

## 📝 Available Commands## 📝 Commandes disponibles

`bash`bash

# Full linting# Linting complet

npm run lint # CSS + JavaScriptnpm run lint # CSS + JavaScript

# Separate linting# Linting séparé

npm run lint:css # CSS onlynpm run lint:css # CSS uniquement

npm run lint:js # JavaScript onlynpm run lint:js # JavaScript uniquement

# Auto-fix (fixes what can be fixed)# Auto-fix (corrige ce qui peut l'être)

npm run lint:css:fix # Auto-fix CSSnpm run lint:css -- --fix # Auto-fix CSS

npm run lint:js:fix # Auto-fix JavaScriptnpm run lint:js -- --fix # Auto-fix JavaScript

npm run lint:fix # Auto-fix everything

# Format du code

# Code formattingnpm run format # Prettier sur tout le projet

npm run format # Prettier on entire project```

npm run format:check # Check format without modifying

---

# Complete validation (CI/CD)

npm run validate # Format + Lint (no auto-fix)## 🎓 Bonnes pratiques à adopter

# Report### JavaScript

npm run lint:report # Generate lint-report.txt1. ✅ Toujours utiliser `const` par défaut, `let` si réassignation

```2. ✅ Préfixer les variables inutilisées par `\_`:`\_unusedParam`

3. ✅ Utiliser `===` au lieu de `==`

---4. ✅ Préférer les arrow functions : `() => {}`

5. ✅ Template literals : `` `Hello ${name}` ``

## 🎓 Best Practices to Adopt6. ✅ Point-virgules partout

7. ❌ Éviter `console.log()` → `console.info()` acceptable

### JavaScript

1. ✅ Always use `const` by default, `let` if reassignment needed### CSS

2. ✅ Prefix unused variables with `_`: `_unusedParam`1. ✅ Classes en kebab-case : `.my-component`

3. ✅ Use `===` instead of `==`2. ✅ Animations en camelCase : `@keyframes fadeIn`

4. ✅ Prefer arrow functions: `() => {}`3. ✅ Variables en kebab-case : `--my-color`

5. ✅ Template literals: `` `Hello ${name}` ``4. ❌ Jamais de sélecteur ID : `#id`

6. ✅ Semicolons everywhere5. ❌ Jamais de couleurs nommées : `red` → `#ff0000`

7. ❌ Avoid `console.log()` → `console.info()` acceptable6. ⚠️ Limiter `!important` au strict minimum

8. ✅ Max 4 niveaux d'imbrication

### CSS

1. ✅ Classes in kebab-case: `.my-component`---

2. ✅ Animations in camelCase: `@keyframes fadeIn`

3. ✅ Variables in kebab-case: `--my-color`## 🔧 Désactiver temporairement une règle

4. ❌ Never use ID selectors: `#id`

5. ❌ Never use named colors: `red` → `#ff0000`### ESLint (JavaScript)

6. ⚠️ Limit `!important` to strict minimum```javascript

7. ✅ Max 4 nesting levels// eslint-disable-next-line no-console

console.log('Debug important');

---

/_ eslint-disable no-console _/

## 🔧 Temporarily Disable a Ruleconsole.log('Bloc entier');

console.log('Plusieurs lignes');

### ESLint (JavaScript)/_ eslint-enable no-console _/

`javascript`

// eslint-disable-next-line no-console

console.log('Important debug');### Stylelint (CSS)

````css

/* eslint-disable no-console *//* stylelint-disable-next-line declaration-no-important */

console.log('Entire block');.override { color: red !important; }

console.log('Multiple lines');

/* eslint-enable no-console *//* stylelint-disable */

```.legacy-code {

  color: red;

### Stylelint (CSS)  #old-id { }

```css}

/* stylelint-disable-next-line declaration-no-important *//* stylelint-enable */

.override { color: red !important; }```



/* stylelint-disable */⚠️ **Attention** : À utiliser avec parcimonie ! Justifiez toujours pourquoi.

.legacy-code {

  color: red;---

  #old-id { }

}## 📚 Ressources

/* stylelint-enable */

```- [ESLint Rules](https://eslint.org/docs/latest/rules/)

- [Stylelint Rules](https://stylelint.io/user-guide/rules/)

⚠️ **Warning**: Use sparingly! Always justify why.- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

- [BEM Naming Convention](http://getbem.com/naming/)

---

---

## 📚 Resources

**Dernière mise à jour** : 5 novembre 2025

- [ESLint Rules](https://eslint.org/docs/latest/rules/)**Niveau de conformité actuel** : 74% (265/1000+ lignes de code)

- [Stylelint Rules](https://stylelint.io/user-guide/rules/)**Objectif entreprise** : 95%+ conformité

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [BEM Naming Convention](http://getbem.com/naming/)

---

**Last Updated**: November 5, 2025
**Current Compliance Level**: 74% (265/1000+ lines of code)
**Enterprise Target**: 95%+ compliance
````
