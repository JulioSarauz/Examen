let opt = {
    archivo: {
        demand: true,
        alias: 'f',
        description: 'Permite establecer el path del archivo CSV que contiene los datos a analizar'
    },
    pais: {
        alias: 'c',
        default: 'ECU',
        description: 'Permite determinar el país a analizar a través de su código ISO 3166 ALPHA-3 (Enlaces a un sitio externo.). El valor por defecto es “ECU”'
    },
    anio: {
        alias: 'y',
        default: 1960,
        description: 'Permite especificar el año para el cual se requiere las estadísticas. Por defecto, 1960.'
    }
};


const argv = require('yargs')
    .command('mostrar', 'Mostrar resultado de la busqueda en pantalla', opt)
    .command('guardar', 'Este comando genera un archivo de texto con el resultado de la búsqueda', opt).help().argv;

module.exports = {
    argv
};