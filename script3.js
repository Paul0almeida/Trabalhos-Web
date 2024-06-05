function gerarCorAleatoria() {
    var letras = '0123456789ABCDEF';
    var cor = '#';
    for (var i = 0; i < 6; i++ ) {
        cor += letras[Math.floor(Math.random() * 16)];
    }
    return cor;
}

function mudarCorDeFundo() {
    document.body.style.backgroundColor = gerarCorAleatoria();
}

setInterval(mudarCorDeFundo, 5000);