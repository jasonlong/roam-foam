// Roam Foam - Custom Icon Replacer
// Auto-generated from SVG files and icon mappings

const IconReplacer = {
  // SVG icons (auto-generated from assets/icons/source/)
  icons: {
    /* ICONS_PLACEHOLDER */
  },

  // Icon class mappings (class name -> SVG file name)
  mappings: {
    /* MAPPINGS_PLACEHOLDER */
  },

  // Track replaced elements to prevent loops
  replacedElements: new WeakSet(),
  isReplacing: false,

  // Initialize icon replacement
  init() {
    console.log("🎨 Roam Foam: Initializing custom icons...");
    console.log("📋 Available icons:", Object.keys(this.icons));
    console.log("🗺️  Mappings:", this.mappings);

    // Replace existing icons
    this.replaceExistingIcons();

    // Watch for new icons (for dynamic content)
    this.watchForNewIcons();
  },

  // Replace icons that are already on the page
  replaceExistingIcons() {
    console.log("🔍 Scanning page for existing icons...");

    Object.entries(this.mappings).forEach(([className, iconKey]) => {
      console.log(`🔎 Looking for class: ${className} -> ${iconKey}`);

      // Handle both with and without bp3- prefix
      const selectors = [
        `.${className}`,
        `.${className} svg`,
        `[class*="${className}"]`,
        `[class*="${className}"] svg`,
      ];

      selectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        console.log(
          `  📊 Found ${elements.length} elements for selector: ${selector}`,
        );
        elements.forEach((el) => {
          console.log(`    🎯 Element:`, el.tagName, el.className);
          this.replaceIcon(el, iconKey, className);
        });
      });
    });
  },

  // Watch for dynamically added icons
  watchForNewIcons() {
    const observer = new MutationObserver((mutations) => {
      // Skip if we're currently replacing icons
      if (this.isReplacing) return;
      
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE && 
              !this.replacedElements.has(node) &&
              !node.classList?.contains('roam-foam-custom-icon') &&
              !node.querySelector?.('.roam-foam-custom-icon')) {
            
            this.isReplacing = true;
            // Check if the new node or its children contain icons to replace
            Object.entries(this.mappings).forEach(([className, iconKey]) => {
              const selectors = [
                `.${className}`,
                `.${className} svg`,
                `[class*="${className}"]`,
                `[class*="${className}"] svg`,
              ];

              selectors.forEach((selector) => {
                let elements = [];

                // Check if the node itself matches
                if (node.matches && node.matches(selector)) {
                  elements.push(node);
                }

                // Check children
                if (node.querySelectorAll) {
                  elements.push(...node.querySelectorAll(selector));
                }

                elements.forEach((el) =>
                  this.replaceIcon(el, iconKey, className),
                );
              });
            });
            
            // Reset flag after processing
            setTimeout(() => {
              this.isReplacing = false;
            }, 100);
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  },

  // Replace a single icon element
  replaceIcon(element, iconKey, className) {
    const svgContent = this.icons[iconKey];
    if (!svgContent) return;
    
    // Skip if already processed
    if (this.replacedElements.has(element) || 
        element.classList.contains('roam-foam-custom-icon')) {
      return;
    }
    
    // Mark as processed
    this.replacedElements.add(element);

    // For bp3-icon-* spans (most common case)
    if (element.tagName === "SPAN" && element.classList.contains(className)) {
      // Check if it has an SVG child first
      const svgChild = element.querySelector("svg");
      if (svgChild) {
        // Store original content if not already stored
        if (!svgChild.dataset.originalContent) {
          svgChild.dataset.originalContent = svgChild.outerHTML;
        }

        // Replace with custom SVG
        svgChild.outerHTML = svgContent;
        element.classList.add("roam-foam-custom-icon");

        console.log(`🔄 Replaced SVG child: ${iconKey} (${className})`);
      } else {
        // No SVG child - this is likely a pseudo-element icon
        // Store original state
        if (!element.dataset.originalContent) {
          element.dataset.originalContent = element.innerHTML;
          element.dataset.originalClass = element.className;
        }

        // Clear any existing content and inject our SVG
        element.innerHTML = svgContent;

        // Add CSS to hide the pseudo-element and show our SVG
        element.classList.add("roam-foam-custom-icon");
        element.style.cssText += `
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        `;

        // Add CSS to hide the ::before pseudo-element
        if (!document.getElementById("roam-foam-icon-styles")) {
          const style = document.createElement("style");
          style.id = "roam-foam-icon-styles";
          style.textContent = `
            .roam-foam-custom-icon::before {
              display: none !important;
              content: none !important;
            }
            .roam-foam-custom-icon svg {
              width: 20px;
              height: 20px;
              flex-shrink: 0;
            }
          `;
          document.head.appendChild(style);
        }

        console.log(
          `🔄 Replaced pseudo-element icon: ${iconKey} (${className})`,
        );
      }
    }
    // For direct SVG elements
    else if (element.tagName === "svg") {
      // Store original content if not already stored
      if (!element.dataset.originalContent) {
        element.dataset.originalContent = element.outerHTML;
      }

      // Replace with custom SVG
      element.outerHTML = svgContent;

      console.log(`🔄 Replaced direct SVG: ${iconKey} (${className})`);
    }
  },

  // Restore original icons (useful for debugging)
  restoreOriginalIcons() {
    const customIcons = document.querySelectorAll(".roam-foam-custom-icon");
    customIcons.forEach((element) => {
      // Handle spans with SVG children
      const svgChild = element.querySelector("svg");
      if (svgChild && svgChild.dataset.originalContent) {
        svgChild.outerHTML = svgChild.dataset.originalContent;
      }
      // Handle pseudo-element replacements
      else if (element.dataset.originalContent !== undefined) {
        element.innerHTML = element.dataset.originalContent;
        if (element.dataset.originalClass) {
          element.className = element.dataset.originalClass;
        }
        element.style.cssText = "";
        delete element.dataset.originalContent;
        delete element.dataset.originalClass;
      }

      element.classList.remove("roam-foam-custom-icon");
    });

    // Also handle direct SVGs
    document.querySelectorAll("svg[data-original-content]").forEach((svg) => {
      svg.outerHTML = svg.dataset.originalContent;
    });

    // Remove injected styles
    const styleEl = document.getElementById("roam-foam-icon-styles");
    if (styleEl) {
      styleEl.remove();
    }

    console.log("🔄 Restored original icons");
  },
};

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => IconReplacer.init());
} else {
  IconReplacer.init();
}

// Make available globally for debugging
window.RoamFoamIconReplacer = IconReplacer;

