const fs = require('fs');

function processInput(input) {
  const operations = JSON.parse(input);
  const resultado = [];
  let perda = 0;
  let totalAcoes = 0;
  let precoMedio = 0;

  operations.forEach(operation => {
    const { operation: type, 'unit-cost': unitCost, quantity } = operation;

    if (type === 'buy') {
      precoMedio = ((totalAcoes * precoMedio) + (quantity * unitCost)) / (totalAcoes + quantity);
      precoMedio = parseFloat(precoMedio.toFixed(2));
      totalAcoes += quantity;
      resultado.push({ tax: 0.00 });
    } else if (type === 'sell') {
        const vendaTotal = unitCost * quantity;
        const lucro = (vendaTotal - precoMedio) * quantity;
        let imposto = 0;

        if (vendaTotal > 20000 && lucro > 0) {
          const lucroTributavel = Math.max(0, lucro - perda);
          imposto = parseFloat(lucroTributavel * 0.2).toFixed(2);
          perda += lucro
        } else {
          perda += lucro;
        }
        totalAcoes -= quantity;
        resultado.push({ tax: parseFloat(imposto) });
    }
  });

  console.log(JSON.stringify(resultado));
}

if (process.stdin.isTTY) {
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function(data) {
    processInput(data);
  });
} else {
  let input = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function(chunk) {
    input += chunk;
  });
  process.stdin.on('end', function() {
    processInput(input);
  });
}