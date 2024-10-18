const { processOperations, processInput } = require("../index");
const { estado, resetarEstado } = require("../utils/estado");

beforeEach(() => resetarEstado());

describe("Testes para processOperations", () => {
  test("Processa corretamente uma operação de compra", () => {
    const operations = [{ operation: "buy", "unit-cost": 10.0, quantity: 100 }];
    const resultado = processOperations(operations);

    expect(estado.historico).toEqual([{ tax: 0.0 }]);
    expect(resultado).toEqual([{ tax: 0.0 }]);
  });

  test("Processa corretamente uma venda com prejuízo", () => {
    const operations = [
      { operation: "buy", "unit-cost": 10.0, quantity: 100 },
      { operation: "sell", "unit-cost": 5.0, quantity: 50 },
    ];
    const resultado = processOperations(operations);

    expect(estado.historico).toEqual([{ tax: 0.0 }, { tax: 0.0 }]);
    expect(resultado).toEqual([{ tax: 0.0 }, { tax: 0.0 }]);
  });
});
