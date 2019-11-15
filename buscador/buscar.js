// "Importar" módulos necesarios
//npm i rimraf
const fs = require('fs'); // filesystem
const csv = require('csv-parse'); // Encargado de parsear
const col = require('../color');
const rimraf = require('rimraf');
let libro = [];
const parseador = csv({
    delimiter: ',', //Delimitador, por defecto es la coma ,
    cast: true, // Intentar convertir las cadenas a tipos nativos
    comment: '#', // El carácter con el que comienzan las líneas de los comentarios, en caso de existir
});

parseador.on('readable', function() {
    let fila;
    while (fila = parseador.read()) {
        libro.push(fila);
    }
});

parseador.on('error', function(err) {
    console.error("Error al leer CSV:", err.message);
});

let leer = (base) => {
    return new Promise((resolve, reject) => {
        fs.readFile(base, 'utf-8', (err, data) => {
            if (err) {
                reject('El archivo no existe o esta dañado!');
            } else {
                fs.createReadStream(base)
                    .pipe(parseador)
                    .on("end", function() {
                        col.escribir(2, "Se ha terminado de leer el archivo");
                        parseador.end();
                        resolve(libro);
                    });
            }
        });
    });
}
let busqueda = (palabra, base) => {
    return new Promise((resolve, reject) => {
        fs.readFile(base, 'utf-8', (err, data) => {
            if (err) {
                reject('El archivo no existe o esta dañado!');
            } else {
                fs.createReadStream(base)
                    .pipe(parseador)
                    .on("end", function() {
                        col.escribir(2, "Se ha terminado de leer el archivo");
                        parseador.end();
                        var rep = 0;
                        for (let i = 0; i < libro.length; i++) {
                            aux = libro[i];
                            for (let j = 0; j < aux.length; j++) {
                                if (aux[j] === palabra) {
                                    rep++;
                                }
                            }
                        }
                        console.log(rep);
                        resolve(libro);
                    });
            }
        });
    });
}

module.exports = {
    leer,
    busqueda
};