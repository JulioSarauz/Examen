const { leer, busqueda } = require('./buscador/buscar')
const { argv } = require('./config/yargs')
const col = require('./color')

let comando = argv._[0];

switch (comando) {
    case 'mostrar':
        leer(argv.archivo)
            .then(archivo => col.escribir(3, `Archivo leído: ${archivo[0]}`))
            .catch(er => col.escribir(1, er));
        col.escribir(2, 'leyendo...')
        break;
    case 'guardar':
        busqueda(argv.busca, argv.leer)
            .then(archivo => col.escribir(3, `Archivo leído: ${archivo[0]}`))
            .catch(er => console.log(er));
        console.log('buscando....');
        break;
    default:
        console.log('comando no valido');
}