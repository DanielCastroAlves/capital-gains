const { estado } = require('./estado');

const venda = (custo, qtd) => {
  const valorTotal = custo * qtd;
  const lucro = (custo - estado.precoMedio) * qtd;
  let imposto = 0;

  if (valorTotal > 20000 && lucro > 0) {
    const lucroTributavel = Math.max(0, lucro + estado.prejuizo);
    imposto = parseFloat((lucroTributavel * 0.2).toFixed(2));
    estado.prejuizo = Math.min(0, lucro + estado.prejuizo);
  } else {
    estado.prejuizo += lucro;
  }

  estado.quantidade -= qtd;
  estado.historico.push({ tax: imposto });
  return { tax: imposto };
};

module.exports = venda;
