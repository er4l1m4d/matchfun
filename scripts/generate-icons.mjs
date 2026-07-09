import { writeFileSync } from "fs";
import { join } from "path";

// Minimal 1x1 PNG in orange, then we'll note these are placeholders
// For production, replace with proper designed icons

const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#FF6B35"/>
  <circle cx="256" cy="256" r="120" fill="none" stroke="#fff" stroke-width="16"/>
  <path d="M256 160l60 44-22 66h-76l-22-66z" fill="#fff"/>
</svg>`;

const publicDir = join(import.meta.dirname, "public");

// Write SVG icon
writeFileSync(join(publicDir, "icon.svg"), svgIcon);
console.log("Created public/icon.svg");

console.log("\nNOTE: For proper PWA icons, replace public/icons/icon-192.png");
console.log("and public/icons/icon-512.png with designed PNG icons.");
console.log("You can use the favicon.svg as a base and export at correct sizes.");
