const estado = {
  quantidade: 0,
  precoMedio: 0,
  prejuizo: 0,
  historico: [],
};

const resetarEstado = () => {
  Object.assign(estado, {
    quantidade: 0,
    precoMedio: 0,
    prejuizo: 0,
    historico: [],
  });
};

module.exports = { estado, resetarEstado };
