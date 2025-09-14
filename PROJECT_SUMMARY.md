# Roam Foam - Project Summary

A modern, clean Roam Research theme built with Tailwind CSS and modular architecture.

## Project Structure

```
roam-foam/
├── src/                    # Source CSS files (modular)
│   ├── main.css           # Main entry point with imports
│   ├── core.css           # Variables, base styles, layout fundamentals
│   ├── blocks.css         # Block containers, bullets, indentation, sidebars
│   ├── ui.css             # Forms, navigation, search, checkboxes
│   ├── typography.css     # Headings, text formatting, code blocks
│   └── themes.css         # Placeholder for future theme variants
├── dist/
│   └── theme.css          # Built CSS (served to Roam)
├── package.json           # Build scripts and dependencies
├── postcss.config.js      # PostCSS with import, nested, tailwind
├── tailwind.config.js     # Tailwind configuration
└── server.js              # Development server (port 3000)
```

## Design System

### Color Hierarchy
```css
/* Background layers (light → dark) */
--bg-primary:   zinc.50  → zinc.900   /* Main background */
--bg-secondary: zinc.100 → zinc.800   /* Cards, sidebars */
--bg-tertiary:  zinc.200 → zinc.700   /* Highlighted elements */

/* Text hierarchy (light → dark) */
--text-primary:   zinc.900 → zinc.200   /* Main text */
--text-secondary: zinc.600 → zinc.300   /* Secondary text */
--text-muted:     zinc.500 → zinc.400   /* De-emphasized text */
--text-subtle:    zinc.300 → zinc.600   /* Very subtle (brackets, etc.) */

/* Theme colors */
--accent-color:   teal.600 → teal.400   /* Links, accents */
--border-color:   zinc.200 → zinc.700   /* All borders */
--hover-bg:       zinc.100 → zinc.800   /* Hover states */
--selection-bg:   teal.100 → teal.800   /* Selections */
--focus-ring:     zinc.100 → zinc.800   /* Focus states */
```

### Typography
```css
--font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
--font-mono: "TX-02", "Monaco", "Menlo", Consolas, "Liberation Mono", "Courier New", monospace
```

### Font Sizes
```css
--font-size-small:  12px
--font-size-normal: 14px  /* Base size */
--font-size-medium: 16px
--font-size-large:  18px  /* Level 3 headings */
--font-size-xl:     22px  /* Level 2 headings */
--font-size-xxl:    28px  /* Level 1 headings */
```

## Key Features

### 1. Modular Architecture
- **core.css**: Central design system variables
- **blocks.css**: All block-related styling (containers, bullets, sidebars)
- **ui.css**: Interactive elements (forms, checkboxes, menus)
- **typography.css**: Text styling and code blocks
- **themes.css**: Future theme variants (currently placeholder)

### 2. Semantic Variable System
- Uses semantic names (`--text-subtle`) instead of component-specific (`--text-bracket`)
- Automatic light/dark mode switching via CSS custom properties
- Consistent hierarchy across all UI elements

### 3. Enhanced UI Components

#### Checkboxes (shadcn/ui inspired)
- 18x18px containers with 16x16px checkboxes
- Teal accent color matching theme
- Custom SVG checkmark with proper scaling
- Focus rings using `--focus-ring` variable

#### Completed Tasks
- Strike-through text with reduced opacity (0.7)
- Targets `.rm-done` class and parent spans
- Preserves link colors while muting overall appearance

#### Bullets & Indentation
- Styled `.rm-bullet__inner` elements
- 12px indent size with border-left guides
- Consistent `--text-subtle` color

### 4. Typography System
- Inter font for all text
- TX-02 monospace for code elements
- Comprehensive code styling (`code`, `pre`, `kbd`, `samp`, `.CodeMirror`, etc.)
- Inline code: secondary background, 90% font size, no border

### 5. Mobile Block Optimizations (600px and below)
- **Right-side chevrons**: Expand/collapse carets moved to right with `float: right` + `position: absolute`
- **Larger touch targets**: 24px font size and height for better mobile interaction
- **Reduced left padding**: Main article padding reduced to 16px for more content space
- **Increased right padding**: 32px right padding to accommodate moved chevrons
- **Enhanced caret visibility**: Forces hidden carets to be visible on collapsed blocks
- **Adjusted bullet positioning**: 16px left margin to maintain visual hierarchy

## Development Workflow

### Build Commands
```bash
npm run build    # Build CSS once
npm run watch    # Watch for changes and rebuild
npm run serve    # Start development server
npm run dev      # Start both server and watch
```

### Server
- Express server on port 3000
- CORS enabled for Roam integration
- CSS served at `http://localhost:3000/theme.css`

### Mobile Testing Setup
To test the theme on mobile devices, expose the local server via tunnel:

```bash
# Install localtunnel (one-time setup)
npm install -g localtunnel

# Start tunnel (while dev server is running on port 3000)
lt --port 3000 --subdomain roamfoam
```

This creates a public URL: `https://roamfoam.loca.lt/theme.css`

**Mobile Testing Steps:**
1. Start development server: `npm run serve`
2. Start tunnel: `lt --port 3000 --subdomain roamfoam`
3. Update Roam CSS import on phone: `@import url("https://roamfoam.loca.lt/theme.css");`
4. Test mobile optimizations (chevrons on right, reduced padding, larger touch targets)
5. When done, switch back to local: `@import url("http://localhost:3000/theme.css");`

### CSS Processing
1. **PostCSS Import**: Resolves @import statements
2. **Tailwind CSS**: Processes utility classes and theme() functions
3. **PostCSS Nested**: Flattens nested CSS syntax

## Roam Integration

Add this CSS code block to your Roam database:
```css
@import url("http://localhost:3000/theme.css");
```

## Important Design Decisions

### 1. Color Strategy
- **Light mode base**: Changed from zinc.white to zinc.50 for softer appearance
- **Consistent hierarchy**: Each background/text level serves specific UI needs
- **Semantic naming**: Variables describe purpose, not appearance

### 2. Component Styling
- **Page reference brackets**: Use `--text-subtle` for minimal visual weight
- **Block highlights**: Use `--bg-tertiary` for good contrast without overwhelm
- **Sidebar**: Uses `--bg-secondary` with `--bg-primary` windows
- **Log pages**: Border color matches theme borders

### 3. Typography Choices
- **Inter**: Clean, modern sans-serif for readability
- **TX-02**: Distinctive monospace for code
- **Size scale**: Conservative progression (14px base)

## Extension Points

### Adding New Colors
Add to both light and dark mode sections in `core.css`:
```css
:root {
  --new-color: theme("colors.zinc.400");
}
@media (prefers-color-scheme: dark) {
  :root {
    --new-color: theme("colors.zinc.600");
  }
}
```

### Adding New Components
- **Layout/blocks**: Add to `blocks.css`
- **Interactive elements**: Add to `ui.css`
- **Text styling**: Add to `typography.css`

### Using @apply
You can use Tailwind utilities with @apply:
```css
.my-component {
  @apply space-y-4 font-medium rounded;
  background-color: var(--bg-secondary);
}
```

## Current State

### Completed Features
- ✅ Modular CSS architecture
- ✅ Semantic color system
- ✅ Dark/light mode support
- ✅ Enhanced checkboxes
- ✅ Completed task styling
- ✅ Typography system
- ✅ Code block styling
- ✅ Sidebar styling
- ✅ Page reference styling
- ✅ Block highlight styling
- ✅ Development server setup

### File Organization
- All hardcoded colors replaced with semantic variables
- No duplicate media query sections for individual components
- Clean separation of concerns across files
- Consistent use of `var(--variable-name)` throughout

This summary captures the current state as of the last development session. The theme is fully functional with a clean, maintainable architecture ready for further customization.