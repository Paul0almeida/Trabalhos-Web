const exchangeRates = {
    'USD': {
        'EUR': 0.85, 
        'USD': 1   
    },
    'EUR': {
        'USD': 1.18, 
        'EUR': 1   
    }
};

function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    const rate = exchangeRates[fromCurrency][toCurrency];
    const result = amount * rate;

    document.getElementById('result').innerHTML = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
}