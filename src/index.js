const readline = require('readline');
const compra = require('./utils/compra');
const venda = require('./utils/venda');
const { estado, resetarEstado } = require('./utils/estado');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

let linhas = []; 

console.log("Digite suas operações (JSON por linha). Digite 'done' para finalizar:");

rl.on('line', (linha) => {
  if (linha.trim().toLowerCase() === 'done') {
    rl.close(); 
  } else {
    linhas.push(linha.trim()); 
  }
});

rl.on('close', () => {
  try {
    linhas.forEach((conteudo) => {
      resetarEstado(); 
      const operacoes = JSON.parse(conteudo); 
      const resultado = processarOperacoes(operacoes); 
      console.log(JSON.stringify(resultado)); 
    });
  } catch (erro) {
    console.error('Erro ao processar JSON:', erro.message);
  }
});

const processarOperacoes = (operacoes) => {
  return operacoes.map((operacao) => {
    const { operation, 'unit-cost': custo, quantity: qtd } = operacao;
    if (operation === 'buy') {
      return compra(custo, qtd);
    } else if (operation === 'sell') {
      return venda(custo, qtd);
    }
  });
};
