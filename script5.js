function calcularIdade() {
    const dataNascimento = document.getElementById('dataNascimento').value;
    const partesData = dataNascimento.split('/');
    const data = new Date(partesData[2], partesData[1] - 1, partesData[0]);
    const diferenca = Date.now() - data.getTime();
    const idadeData = new Date(diferenca); 

    const idade = Math.abs(idadeData.getUTCFullYear() - 1970);

    document.getElementById('resultado').innerHTML = 'Sua idade é ' + idade;
}