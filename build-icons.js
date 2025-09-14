#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ICONS_SOURCE_DIR = path.join(__dirname, 'assets/icons/source');
const MAPPINGS_FILE = path.join(__dirname, 'assets/icons/mappings.json');
const TEMPLATE_FILE = path.join(__dirname, 'assets/js/src/icon-replacer.template.js');
const OUTPUT_FILE = path.join(__dirname, 'assets/js/icon-replacer.js');

console.log('🔨 Building icon replacer with inlined SVGs...');

// Read all SVG files
const svgFiles = fs.readdirSync(ICONS_SOURCE_DIR).filter(file => file.endsWith('.svg'));
const icons = {};

svgFiles.forEach(file => {
  const name = path.basename(file, '.svg');
  let content = fs.readFileSync(path.join(ICONS_SOURCE_DIR, file), 'utf8');
  
  // Replace color attributes with currentColor
  content = content
    // Replace stroke colors
    .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
    // Replace fill colors (except 'none')
    .replace(/fill="(?!none)[^"]*"/g, 'fill="currentColor"')
    // Clean up the SVG content (remove extra whitespace, newlines)
    .replace(/\n\s*/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
  
  icons[name] = content;
  console.log(`📄 Loaded SVG: ${name} (colors → currentColor)`);
});

// Read mappings
let mappings = {};
if (fs.existsSync(MAPPINGS_FILE)) {
  mappings = JSON.parse(fs.readFileSync(MAPPINGS_FILE, 'utf8'));
  console.log(`🗺️  Loaded ${Object.keys(mappings).length} icon mappings`);
} else {
  console.warn('⚠️  No mappings.json found, creating empty mappings');
}

// Read template
const template = fs.readFileSync(TEMPLATE_FILE, 'utf8');

// Generate icons object string
const iconsString = Object.entries(icons)
  .map(([key, value]) => `    '${key}': \`${value}\``)
  .join(',\n');

// Generate mappings object string
const mappingsString = Object.entries(mappings)
  .map(([key, value]) => `    '${key}': '${value}'`)
  .join(',\n');

// Replace placeholders in template
const output = template
  .replace('/* ICONS_PLACEHOLDER */', iconsString)
  .replace('/* MAPPINGS_PLACEHOLDER */', mappingsString);

// Write output file
fs.writeFileSync(OUTPUT_FILE, output);

console.log(`✅ Generated ${OUTPUT_FILE}`);
console.log(`📊 Included ${Object.keys(icons).length} SVG icons`);
console.log(`🔗 Configured ${Object.keys(mappings).length} class mappings`);
console.log('');
console.log('🚀 Icon replacer ready! Include in Roam with:');
console.log('   {{[[roam/js]]}}');
console.log(`   var script = document.createElement('script');`);
console.log(`   script.src = 'http://localhost:3000/icon-replacer.js';`);
console.log(`   document.head.appendChild(script);`);