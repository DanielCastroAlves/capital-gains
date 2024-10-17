const fs = require('fs');
const readline = require('readline');
const compra = require('./utils/compra');
const venda = require('./utils/venda');
const { resetarEstado, estado } = require('./utils/estado');

function processOperations(operations) {
  resetarEstado();

  operations.forEach((operation) => {
    const { operation: tipo, 'unit-cost': custo, quantity: qtd } = operation;

    if (tipo === 'buy') {
      compra(custo, qtd);
    } else if (tipo === 'sell') {
      venda(custo, qtd);
    }
  });

  return estado.historico;
}

function processInput(input) {
  try {
    const operations = JSON.parse(input.trim());
    const resultado = processOperations(operations);
    console.log(JSON.stringify(resultado));
  } catch (erro) {
    console.error('Erro ao processar JSON:', erro.message);
  }
}

const caminhoArquivo = process.argv[2]; // Arquivo como argumento na linha de comando.

if (caminhoArquivo) {
  try {
    const input = fs.readFileSync(caminhoArquivo, 'utf8'); // Lê o conteúdo do arquivo.
    processInput(input); // Processa o conteúdo lido.
  } catch (erro) {
    console.error('Erro ao ler o arquivo:', erro.message);
  }
} else {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('Digite suas operações como um array JSON:');

  let entrada = '';
  rl.on('line', (linha) => {
    entrada += linha;
  });

  rl.on('close', () => {
    processInput(entrada);
  });
}

module.exports = { processOperations, processInput };