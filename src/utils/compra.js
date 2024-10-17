const { estadoAcoes } = require('./estadoAcoes');

const compra = (valorDeCompra, quantidadeComprada) => {
  estadoAcoes.precoMedio = 
    ((estadoAcoes.quantidade * estadoAcoes.precoMedio) +
      (quantidadeComprada * valorDeCompra)) /
    (estadoAcoes.quantidade + quantidadeComprada);

  estadoAcoes.precoMedio = parseFloat(estadoAcoes.precoMedio.toFixed(2));
  estadoAcoes.quantidade += quantidadeComprada;

  estadoAcoes.historico.push({ tax: 0.00 });
};

module.exports = compra;
