const { estado, resetarEstado } = require("../../utils/estado");

beforeEach(() => resetarEstado());

test("Estado inicial deve estar zerado", () => {
  expect(estado).toEqual({
    quantidade: 0,
    precoMedio: 0,
    prejuizo: 0,
    historico: [],
  });
});
