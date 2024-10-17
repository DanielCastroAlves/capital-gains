const { estadoAcoes } = require('./estadoAcoes');

const venda = (valorDeVenda, quantidadeVendida) => {
  const valorTotal = valorDeVenda * quantidadeVendida;
  const lucro = (valorDeVenda - estadoAcoes.precoMedio) * quantidadeVendida;

  let imposto = 0;

  if (valorTotal > 20000 && lucro > 0) {
    const lucroTributavel = Math.max(0, lucro + estadoAcoes.prejuizo);
    imposto = parseFloat((lucroTributavel * 0.2).toFixed(2));
    estadoAcoes.prejuizo = Math.min(0, lucro + estadoAcoes.prejuizo);
  } else {
    estadoAcoes.prejuizo += lucro;
  }

  estadoAcoes.quantidade -= quantidadeVendida;
  estadoAcoes.historico.push({ tax: imposto });
};

module.exports = venda;
