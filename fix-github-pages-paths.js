const fs = require("fs");
const path = require("path");

function fixGitHubPagesPaths() {
  const jsPath = path.join(__dirname, "docs", "assets", "index-DteBn_nr.js");

  if (!fs.existsSync(jsPath)) {
    console.log("❌ Archivo JavaScript no encontrado");
    return;
  }

  let content = fs.readFileSync(jsPath, "utf8");
  let changes = 0;

  // Reemplazar rutas relativas con rutas absolutas para GitHub Pages
  const replacements = [
    // Cambiar ./assets/ por /React-MERN-backend/assets/
    {
      from: /"\.\/assets\//g,
      to: '"/React-MERN-backend/assets/',
    },
    // Cambiar ./vite.svg por /React-MERN-backend/vite.svg
    {
      from: /"\.\/vite\.svg/g,
      to: '"/React-MERN-backend/vite.svg',
    },
    // Cambiar ./sw.js por /React-MERN-backend/sw.js
    {
      from: /"\.\/sw\.js/g,
      to: '"/React-MERN-backend/sw.js',
    },
  ];

  replacements.forEach(({ from, to }) => {
    const matches = content.match(from);
    if (matches) {
      content = content.replace(from, to);
      changes += matches.length;
      console.log(`✅ Reemplazadas ${matches.length} rutas: ${from} -> ${to}`);
    }
  });

  fs.writeFileSync(jsPath, content);
  console.log(`🎉 Total de cambios realizados: ${changes}`);
}

// También actualizar el HTML para usar rutas absolutas
function fixHTMLPaths() {
  const htmlPath = path.join(__dirname, "docs", "index.html");

  if (!fs.existsSync(htmlPath)) {
    console.log("❌ Archivo HTML no encontrado");
    return;
  }

  let content = fs.readFileSync(htmlPath, "utf8");

  // Reemplazar rutas relativas con rutas absolutas
  content = content.replace(/href="\.\//g, 'href="/React-MERN-backend/');
  content = content.replace(/src="\.\//g, 'src="/React-MERN-backend/');

  fs.writeFileSync(htmlPath, content);
  console.log("✅ HTML actualizado con rutas absolutas");
}

try {
  fixGitHubPagesPaths();
  fixHTMLPaths();
  console.log("🎉 Todos los archivos han sido actualizados para GitHub Pages");
} catch (error) {
  console.error("❌ Error:", error.message);
}
