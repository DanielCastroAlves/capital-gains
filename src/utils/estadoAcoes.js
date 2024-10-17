let estadoAcoes = {
  quantidade: 0,
  precoMedio: 0,
  prejuizo: 0,
  historico: [],
};

const resetarEstado = () => {
  estadoAcoes.quantidade = 0;
  estadoAcoes.precoMedio = 0;
  estadoAcoes.prejuizo = 0;
  estadoAcoes.historico = [];
};

module.exports = { estadoAcoes, resetarEstado };
