const readline = require('readline');
const compra = require('./utils/compra');
const venda = require('./utils/venda');
const { estadoAcoes, resetarEstado } = require('./utils/estadoAcoes');

const entrada = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const perguntarOperacao = () => {
  entrada.question('Operação (buy/sell): ', (tipo) => {
    if (tipo !== 'buy' && tipo !== 'sell') {
      console.log('Operação inválida. Tente novamente.');
      return perguntarOperacao();
    }

    entrada.question('Preço unitário: ', (preco) => {
      const valor = parseFloat(preco);
      if (isNaN(valor) || valor <= 0) {
        console.log('Preço inválido. Tente novamente.');
        return perguntarOperacao();
      }

      entrada.question('Quantidade: ', (quantidade) => {
        const qtd = parseInt(quantidade, 10);
        if (isNaN(qtd) || qtd <= 0) {
          console.log('Quantidade inválida. Tente novamente.');
          return perguntarOperacao();
        }

        if (tipo === 'buy') {
          compra(valor, qtd);
        } else if (tipo === 'sell') {
          venda(valor, qtd);
        }

        console.log('Estado atual:', estadoAcoes.historico);

        entrada.question('Deseja realizar outra operação? (s/n): ', (resposta) => {
          if (resposta.toLowerCase() === 's') {
            perguntarOperacao();
          } else {
            console.log('Resultado final:', JSON.stringify(estadoAcoes.historico));
            entrada.close();
          }
        });
      });
    });
  });
};

resetarEstado();
perguntarOperacao();
