const { estado } = require("./estado");

const compra = (custo, qtd) => {
  estado.precoMedio = parseFloat(
    (
      (estado.quantidade * estado.precoMedio + qtd * custo) /
      (estado.quantidade + qtd)
    ).toFixed(2)
  );

  estado.quantidade += qtd;
  estado.historico.push({ tax: 0.0 });

  return { tax: 0.0 };
};

module.exports = compra;
