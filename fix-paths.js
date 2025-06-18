const fs = require("fs");
const path = require("path");

// Función para corregir las rutas en el archivo index.html
function fixIndexHtml() {
  const indexPath = path.join(__dirname, "docs", "index.html");
  let content = fs.readFileSync(indexPath, "utf8");

  // Reemplazar rutas absolutas con relativas
  content = content.replace(/href="\//g, 'href="./');
  content = content.replace(/src="\//g, 'src="./');

  fs.writeFileSync(indexPath, content);
  console.log("✅ index.html corregido");
}

// Función para corregir las rutas en el service worker
function fixServiceWorker() {
  const swPath = path.join(__dirname, "docs", "sw.js");
  let content = fs.readFileSync(swPath, "utf8");

  // Reemplazar rutas absolutas con relativas en el precache
  content = content.replace(/"url":"([^"]+)"/g, (match, url) => {
    if (url.startsWith("/")) {
      return `"url":".${url}"`;
    }
    return match;
  });

  fs.writeFileSync(swPath, content);
  console.log("✅ service worker corregido");
}

// Función para corregir las rutas en el archivo JavaScript
function fixJavaScript() {
  const jsPath = path.join(__dirname, "docs", "assets", "index-DteBn_nr.js");
  let content = fs.readFileSync(jsPath, "utf8");

  // Reemplazar rutas absolutas con relativas
  content = content.replace(/\/assets\//g, "./assets/");
  content = content.replace(/\/vite\.svg/g, "./vite.svg");

  fs.writeFileSync(jsPath, content);
  console.log("✅ JavaScript corregido");
}

// Ejecutar todas las correcciones
try {
  fixIndexHtml();
  fixServiceWorker();
  fixJavaScript();
  console.log("🎉 Todos los archivos han sido corregidos para GitHub Pages");
} catch (error) {
  console.error("❌ Error al corregir archivos:", error.message);
}
