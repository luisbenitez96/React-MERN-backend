const fs = require("fs");
const path = require("path");

// Función para corregir las rutas en el archivo JavaScript
function fixJavaScriptPaths() {
  const jsPath = path.join(__dirname, "docs", "assets", "index-DteBn_nr.js");

  if (!fs.existsSync(jsPath)) {
    console.log("❌ Archivo JavaScript no encontrado");
    return;
  }

  let content = fs.readFileSync(jsPath, "utf8");

  // Buscar y reemplazar rutas absolutas específicas
  const replacements = [
    // Reemplazar rutas que empiecen con /assets/
    { from: /"\/assets\//g, to: '"./assets/' },
    // Reemplazar rutas que empiecen con /vite.svg
    { from: /"\/vite\.svg/g, to: '"./vite.svg' },
    // Reemplazar rutas que empiecen con /sw.js
    { from: /"\/sw\.js/g, to: '"./sw.js' },
    // Reemplazar rutas que contengan /assets/ en el medio
    { from: /\/assets\//g, to: "./assets/" },
    // Reemplazar rutas que contengan /vite.svg en el medio
    { from: /\/vite\.svg/g, to: "./vite.svg" },
    // Reemplazar rutas que contengan /sw.js en el medio
    { from: /\/sw\.js/g, to: "./sw.js" },
  ];

  let changes = 0;
  replacements.forEach(({ from, to }) => {
    const matches = content.match(from);
    if (matches) {
      content = content.replace(from, to);
      changes += matches.length;
    }
  });

  fs.writeFileSync(jsPath, content);
  console.log(`✅ JavaScript corregido - ${changes} cambios realizados`);
}

// Función para verificar si hay rutas absolutas restantes
function checkRemainingPaths() {
  const jsPath = path.join(__dirname, "docs", "assets", "index-DteBn_nr.js");

  if (!fs.existsSync(jsPath)) {
    console.log("❌ Archivo JavaScript no encontrado");
    return;
  }

  const content = fs.readFileSync(jsPath, "utf8");

  // Buscar rutas absolutas restantes
  const absolutePaths = content.match(/"\/[^"]*"/g);

  if (absolutePaths) {
    console.log("⚠️  Rutas absolutas restantes encontradas:");
    absolutePaths.slice(0, 10).forEach((path) => {
      console.log(`   ${path}`);
    });
    if (absolutePaths.length > 10) {
      console.log(`   ... y ${absolutePaths.length - 10} más`);
    }
  } else {
    console.log("✅ No se encontraron rutas absolutas restantes");
  }
}

// Ejecutar las correcciones
try {
  fixJavaScriptPaths();
  checkRemainingPaths();
} catch (error) {
  console.error("❌ Error al corregir archivos:", error.message);
}
