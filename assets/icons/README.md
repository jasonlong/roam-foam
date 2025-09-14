# Icon Replacement System

This system allows you to replace Roam's built-in icons with custom SVGs using an automated build process.

## How it works

1. **SVG Source Files**: Put your SVG files in `assets/icons/source/`
2. **Icon Mappings**: Configure which Roam icon classes map to your SVGs in `mappings.json`
3. **Build Process**: Run `npm run build:icons` to generate the JavaScript with inlined SVGs
4. **Roam Integration**: Include the generated JavaScript in your Roam database

## Adding new icons

### 1. Add SVG files
Put your SVG files in `assets/icons/source/`. Name them descriptively:
```
assets/icons/source/
├── calendar.svg
├── caret-down.svg
├── search.svg
└── menu.svg
```

### 2. Configure mappings
Edit `assets/icons/mappings.json` to map Roam CSS classes to your SVG files:
```json
{
  "bp3-icon-calendar": "calendar",
  "bp3-icon-caret-down": "caret-down",
  "bp3-icon-search": "search",
  "bp3-icon-menu": "menu"
}
```

### 3. Build the icon replacer
```bash
npm run build:icons
```

This generates `assets/js/icon-replacer.js` with all SVGs inlined.

### 4. Use in Roam
Add this to a `{{[[roam/js]]}}` code block in your Roam database:
```javascript
var script = document.createElement('script');
script.src = 'http://localhost:3000/icon-replacer.js';
document.head.appendChild(script);
```

For mobile testing, use:
```javascript
var script = document.createElement('script');
script.src = 'https://roamfoam.loca.lt/icon-replacer.js';
document.head.appendChild(script);
```

## SVG Requirements

- Use `viewBox` instead of fixed width/height
- Use `fill="currentColor"` to inherit text color
- Keep SVGs optimized and clean
- 16x16 viewBox is recommended for consistency with Roam icons

## Finding Roam Icon Classes

Use browser dev tools to inspect elements and find the CSS classes:
- Look for classes like `bp3-icon-*`
- Check the DOM structure: `<span class="bp3-icon-calendar"><svg>...</svg></span>`

## Debugging

The icon replacer logs to console when it replaces icons. You can also:
- `window.RoamFoamIconReplacer.restoreOriginalIcons()` - restore original icons
- Check the generated mappings in the browser console

## Build Commands

- `npm run build:icons` - Build just the icon replacer
- `npm run build:all` - Build both icons and CSS theme