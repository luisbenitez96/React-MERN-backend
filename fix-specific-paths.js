const fs = require("fs");
const path = require("path");

function fixSpecificPaths() {
  const jsPath = path.join(__dirname, "docs", "assets", "index-DteBn_nr.js");

  if (!fs.existsSync(jsPath)) {
    console.log("❌ Archivo JavaScript no encontrado");
    return;
  }

  let content = fs.readFileSync(jsPath, "utf8");
  let changes = 0;

  // Buscar patrones específicos que causan problemas
  const patterns = [
    // Buscar rutas que empiecen con / y terminen con .js, .css, .svg, etc.
    {
      from: /"(\/[^"]*\.(js|css|svg|png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot))"/g,
      to: (match, path) => `".${path}"`,
    },
    // Buscar rutas que empiecen con /assets/
    {
      from: /"(\/assets\/[^"]*)"/g,
      to: (match, path) => `".${path}"`,
    },
    // Buscar rutas que empiecen con /sw.js
    {
      from: /"(\/sw\.js)"/g,
      to: (match, path) => `".${path}"`,
    },
    // Buscar rutas que empiecen con /vite.svg
    {
      from: /"(\/vite\.svg)"/g,
      to: (match, path) => `".${path}"`,
    },
  ];

  patterns.forEach(({ from, to }) => {
    const matches = content.match(from);
    if (matches) {
      content = content.replace(from, to);
      changes += matches.length;
      console.log(
        `✅ Reemplazadas ${matches.length} rutas con patrón: ${from}`
      );
    }
  });

  fs.writeFileSync(jsPath, content);
  console.log(`🎉 Total de cambios realizados: ${changes}`);
}

// Verificar si hay rutas problemáticas restantes
function checkProblematicPaths() {
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
}

try {
  fixSpecificPaths();
  checkProblematicPaths();
} catch (error) {
  console.error("❌ Error:", error.message);
}
