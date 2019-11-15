let escribir = (tipo, texto) => {
    //0 - negro
    //1 - rojo
    //2 - verde
    //3 - amarillo
    //4 - azul
    //5 - morado
    //6 - celeste
    if (tipo >= 0 && tipo <= 6) {
        console.log(`\x1b[3${tipo}m%s\x1b[0m`, texto);
    } else {
        console.log('Color no válido');
    }
}
module.exports = {
    escribir
};