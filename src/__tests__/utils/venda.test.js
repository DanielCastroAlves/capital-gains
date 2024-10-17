const venda = require("../../utils/venda");
const { estado, resetarEstado } = require("../../utils/estado");

beforeEach(() => {
  resetarEstado();
  estado.precoMedio = 10;
  estado.quantidade = 100;
});

test("Calcula corretamente o imposto para uma venda lucrativa", () => {
  const resultado = venda(50.0, 50);

  expect(resultado).toEqual({ tax: 400.0 });
  expect(estado.historico).toEqual([{ tax: 400.0 }]);
  expect(estado.quantidade).toBe(50);
});

test("Não calcula imposto para uma venda sem lucro", () => {
  const resultado = venda(10.0, 10);

  expect(resultado).toEqual({ tax: 0 });
  expect(estado.historico).toEqual([{ tax: 0 }]);
  expect(estado.quantidade).toBe(90);
});

test("Não calcula imposto para uma venda com prejuízo", () => {
  const resultado = venda(5.0, 50);

  expect(resultado).toEqual({ tax: 0 });
  expect(estado.historico).toEqual([{ tax: 0 }]);
  expect(estado.quantidade).toBe(50);
});
