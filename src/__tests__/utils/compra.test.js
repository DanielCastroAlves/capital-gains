const compra = require("../../utils/compra");
const { estado, resetarEstado } = require("../../utils/estado");

beforeEach(() => resetarEstado());

test("Atualiza o estado corretamente após uma compra", () => {
  compra(10.0, 100);

  expect(estado).toEqual({
    quantidade: 100,
    precoMedio: 10.0,
    prejuizo: 0,
    historico: [{ tax: 0.0 }],
  });
});
