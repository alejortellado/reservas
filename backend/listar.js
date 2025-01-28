const fs = require('fs');
const path = require('path');

function listarDirectorios(dir, nivel = 0) {
    const archivos = fs.readdirSync(dir);

    archivos.forEach((archivo) => {
        const ruta = path.join(dir, archivo);
        const esDirectorio = fs.lstatSync(ruta).isDirectory();
        console.log('  '.repeat(nivel) + (esDirectorio ? '├── ' : '└── ') + archivo);

        if (esDirectorio) {
            listarDirectorios(ruta, nivel + 1);
        }
    });
}

listarDirectorios('./');
