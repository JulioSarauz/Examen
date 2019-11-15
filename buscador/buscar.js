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

let leer = (base, pais, anio) => {
    return new Promise((resolve, reject) => {
        fs.readFile(base, 'utf-8', (err, data) => {
            if (err) {
                reject('El archivo no existe o esta dañado!');
            } else {
                console.log(anio);
                console.log(pais);
                fs.createReadStream(base)
                    .pipe(parseador)
                    .on("end", function() {
                        col.escribir(2, "Se ha terminado de leer el archivo");
                        parseador.end();
                        let rep = "No se encontro";
                        //row 1 - 4
                        for (let i = 0; i < libro.length; i++) {
                            aux = libro[i];
                            for (let j = 0; j < aux.length; j++) {
                                if (j === 1) {
                                    if (aux[j] == pais) {
                                        console.log(libro[i]);
                                    }
                                }
                                if (j === 4) {
                                    if (aux[j] == anio) {
                                        console.log(libro[i]);
                                    }
                                }
                            }
                        }
                        resolve(libro);
                    });
            }
        });
    });
}
let busqueda = (base, pais, anio) => {
    return new Promise((resolve, reject) => {
        fs.readFile(base, 'utf-8', (err, data) => {
            if (err) {
                reject('El archivo no existe o esta dañado!');
            } else {
                console.log(anio);
                console.log(pais);
                fs.createReadStream(base)
                    .pipe(parseador)
                    .on("end", function() {
                        col.escribir(2, "Se ha terminado de leer el archivo");
                        parseador.end();
                        let rep = "No se encontro";
                        //row 1 - 4
                        for (let i = 0; i < libro.length; i++) {
                            aux = libro[i];
                            for (let j = 0; j < aux.length; j++) {
                                if (j === 1) {
                                    if (aux[j] == pais) {
                                        if (aux[j + 3] == anio) {
                                            console.log(libro[i]);
                                            fs.writeFile(`resultados/${pais}-${anio}.txt`, data, (err) => {
                                                if (err)
                                                    reject(err);
                                                else {
                                                    resolve(`tabla-${base}`);
                                                }

                                            });
                                        }
                                    }
                                }
                                if (j === 4) {
                                    if (aux[j] == anio) {
                                        if (aux[j - 3] == pais) {
                                            console.log(libro[i]);
                                            fs.writeFile(`resultados/${pais}-${anio}.txt`, data, (err) => {
                                                if (err)
                                                    reject(err);
                                                else {
                                                    resolve(`tabla-${base}`);
                                                }

                                            });
                                        }
                                    }
                                }
                            }
                        }
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