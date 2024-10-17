const { estado } = require('./estado');

const compra = (custo, qtd) => {
  estado.precoMedio =
    ((estado.quantidade * estado.precoMedio) + (qtd * custo)) /
    (estado.quantidade + qtd);
  estado.precoMedio = parseFloat(estado.precoMedio.toFixed(2));
  estado.quantidade += qtd;
  estado.historico.push({ tax: 0.00 });
  return { tax: 0.00 };
};

module.exports = compra;
