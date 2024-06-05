function calcularIMC() {
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;

    if(peso > 0 && altura > 0) {
        const imc = peso / (altura * altura);
        document.getElementById('resultado').innerHTML = 'Seu IMC é ' + imc.toFixed(2);
    } else {
        document.getElementById('resultado').innerHTML = 'Por favor, insira valores válidos para peso e altura.';
    }
}