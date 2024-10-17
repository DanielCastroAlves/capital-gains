let estado = {
  quantidade: 0,
  precoMedio: 0,
  prejuizo: 0,
  historico: [],
};

const resetarEstado = () => {
  estado = {
    quantidade: 0,
    precoMedio: 0,
    prejuizo: 0,
    historico: [],
  };
};

module.exports = { estado, resetarEstado };

