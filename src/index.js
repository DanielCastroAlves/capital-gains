const fs = require('fs');
const readline = require('readline');

function processInput(input) {
  try {
    const operations = JSON.parse(input.trim()); // Processa a entrada completa como um array JSON
    const resultado = processOperations(operations);
    console.log(JSON.stringify(resultado));
  } catch (erro) {
    console.error('Erro ao processar JSON:', erro.message);
  }
}

function processOperations(operations) {
  const resultado = [];
  let perda = 0;
  let totalAcoes = 0;
  let precoMedio = 0;

  operations.forEach((operation) => {
    const { operation: type, 'unit-cost': unitCost, quantity } = operation;

    if (type === 'buy') {
      precoMedio = ((totalAcoes * precoMedio) + (quantity * unitCost)) / (totalAcoes + quantity);
      precoMedio = parseFloat(precoMedio.toFixed(2));
      totalAcoes += quantity;
      resultado.push({ tax: 0.00 });
    } else if (type === 'sell') {
      const valorVenda = unitCost * quantity;
      const lucroPorAcao = unitCost - precoMedio;
      const lucro = lucroPorAcao * quantity;

      let imposto = 0;

      if (valorVenda > 20000 && lucro > 0) {
        const lucroTributavel = Math.max(0, lucro - perda);
        imposto = parseFloat((lucroTributavel * 0.2).toFixed(2));
        perda = Math.max(0, perda - lucro);
      } else {
        perda += Math.abs(lucro);
      }

      totalAcoes -= quantity;
      resultado.push({ tax: imposto });
    }
  });

  return resultado;
}

const caminhoArquivo = process.argv[2];

if (caminhoArquivo) {
  try {
    const input = fs.readFileSync(caminhoArquivo, 'utf8');
    processInput(input);
  } catch (erro) {
    console.error('Erro ao ler o arquivo:', erro.message);
  }
} else {
  let entrada = '';
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("Digite suas operações como um array JSON:");

  rl.on('line', (linha) => {
    if (linha.trim() === '') rl.close();
    else entrada += linha.trim();
  });

  rl.on('close', () => processInput(entrada));
}
