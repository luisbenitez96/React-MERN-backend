const fs = require("fs");
const path = require("path");

function fixJavaScriptPaths() {
  const jsPath = path.join(__dirname, "docs", "assets", "index-DteBn_nr.js");

  if (!fs.existsSync(jsPath)) {
    console.log("❌ Archivo JavaScript no encontrado");
    return;
  }

  let content = fs.readFileSync(jsPath, "utf8");
  let changes = 0;

  // Buscar y reemplazar rutas específicas
  const replacements = [
    // Reemplazar rutas que empiecen con /assets/
    {
      from: /"\/assets\//g,
      to: '"/React-MERN-backend/assets/',
    },
    // Reemplazar rutas que empiecen con /vite.svg
    {
      from: /"\/vite\.svg/g,
      to: '"/React-MERN-backend/vite.svg',
    },
    // Reemplazar rutas que empiecen con /sw.js
    {
      from: /"\/sw\.js/g,
      to: '"/React-MERN-backend/sw.js',
    },
    // Reemplazar rutas que contengan /assets/ en el medio
    {
      from: /\/assets\//g,
      to: "/React-MERN-backend/assets/",
    },
    // Reemplazar rutas que contengan /vite.svg en el medio
    {
      from: /\/vite\.svg/g,
      to: "/React-MERN-backend/vite.svg",
    },
    // Reemplazar rutas que contengan /sw.js en el medio
    {
      from: /\/sw\.js/g,
      to: "/React-MERN-backend/sw.js",
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

// Verificar si hay rutas problemáticas restantes
function checkRemainingPaths() {
  const jsPath = path.join(__dirname, "docs", "assets", "index-DteBn_nr.js");

  if (!fs.existsSync(jsPath)) {
    console.log("❌ Archivo JavaScript no encontrado");
    return;
  }

  const content = fs.readFileSync(jsPath, "utf8");

  // Buscar rutas que empiecen con / y terminen con extensiones de archivo
  const problematicPaths = content.match(
    /"\/[^"]*\.(js|css|svg|png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot)"/g
  );

  if (problematicPaths) {
    console.log("⚠️  Rutas problemáticas restantes:");
    problematicPaths.slice(0, 10).forEach((path) => {
      console.log(`   ${path}`);
    });
    if (problematicPaths.length > 10) {
      console.log(`   ... y ${problematicPaths.length - 10} más`);
    }
  } else {
    console.log("✅ No se encontraron rutas problemáticas restantes");
  }

  // Buscar rutas que empiecen con /assets/
  const assetsPaths = content.match(/"\/assets\/[^"]*"/g);
  if (assetsPaths) {
    console.log("⚠️  Rutas /assets/ restantes:");
    assetsPaths.slice(0, 5).forEach((path) => {
      console.log(`   ${path}`);
    });
  } else {
    console.log("✅ No se encontraron rutas /assets/ restantes");
  }
}

try {
  fixJavaScriptPaths();
  checkRemainingPaths();
} catch (error) {
  console.error("❌ Error:", error.message);
}
