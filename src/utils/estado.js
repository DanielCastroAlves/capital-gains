// src/utils/estado.js
const estado = {
  quantidade: 0,
  precoMedio: 0,
  prejuizo: 0,
  historico: [],
};

const resetarEstado = () => {
  estado.quantidade = 0;
  estado.precoMedio = 0;
  estado.prejuizo = 0;
  estado.historico = [];
};

module.exports = { estado, resetarEstado };
