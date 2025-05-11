const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";

const filePath = path.join(__dirname, "../../hrms/hrms/www/hrms.html");

console.log(`${GREEN}Loading ${filePath}${RESET}`);

const mainHTML = fs.readFileSync(filePath, "utf8");
const $ = cheerio.load(mainHTML);



console.warn(`${YELLOW}Overriding ${filePath}${RESET}`);

$("title").text("Cubes HR");
$("link[rel='icon']").attr("href", "/assets/datavalue_theme_15/images/logo-icon.png");
$('<style>:root { --surface-gray-7: #4aa04d !important; }</style>').appendTo("head");
console.log(`${GREEN}Done overriding ${filePath}${RESET}`);

console.warn(`${YELLOW}Overriding PWA Manifest ${RESET}`);

const manifestPath = path.join(__dirname, "../../hrms/hrms/public/frontend/manifest.webmanifest");

if (fs.existsSync(manifestPath)) {
    let manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    manifest.name = "Cubes HR";
    manifest.short_name = "Cubes HR";
    manifest.icons = [
        {
            "src": "/assets/hrms_override/manifest/manifest-icon-192.maskable.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
        },
        {
            "src": "/assets/hrms_override/manifest/manifest-icon-192.maskable.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": "/assets/hrms_override/manifest/manifest-icon-512.maskable.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
        },
        {
            "src": "/assets/hrms_override/manifest/manifest-icon-512.maskable.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
        }
    ]
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
} else {
    console.log(`${RED}Manifest file not found: ${manifestPath}${RESET}`);
}

console.log(`${GREEN}Done overriding PWA Manifest ${RESET}`);


fs.writeFileSync(filePath, $.html(), "utf8");


