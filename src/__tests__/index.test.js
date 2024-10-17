const { processOperations, processInput } = require('../index');
const { estado, resetarEstado } = require('../utils/estado');


beforeEach(() => {
  resetarEstado();
});

describe('Testes para processOperations', () => {
  test('Deve processar corretamente uma operação de compra', () => {
    const operations = [{ operation: 'buy', 'unit-cost': 10.00, quantity: 100 }];

    const resultado = processOperations(operations);

    expect(estado.historico).toEqual([{ tax: 0 }]);
    expect(resultado).toEqual([{ tax: 0 }]);
  });

  test('Deve processar corretamente uma operação de venda lucrativa', () => {
    const operations = [
      { operation: 'buy', 'unit-cost': 10.00, quantity: 100 },
      { operation: 'sell', 'unit-cost': 20.00, quantity: 50 }
    ];

    const resultado = processOperations(operations);

    expect(estado.historico).toEqual([{ tax: 0 }, { tax: 100 }]);
    expect(resultado).toEqual([{ tax: 0 }, { tax: 100 }]);
  });

  test('Deve processar corretamente uma venda com prejuízo', () => {
    const operations = [
      { operation: 'buy', 'unit-cost': 10.00, quantity: 100 },
      { operation: 'sell', 'unit-cost': 5.00, quantity: 50 }
    ];

    const resultado = processOperations(operations);

    expect(estado.historico).toEqual([{ tax: 0 }, { tax: 0 }]);
    expect(resultado).toEqual([{ tax: 0 }, { tax: 0 }]);
  });
});

describe('Testes para processInput', () => {
  test('Deve retornar erro ao processar JSON inválido', () => {
    const input = '{ operation: buy }';

    console.error = jest.fn();
    processInput(input);

    expect(console.error).toHaveBeenCalledWith(
      'Erro ao processar JSON:', expect.any(String)
    );
  });

  test('Deve processar operações do arquivo corretamente', () => {
    const mockInput = JSON.stringify([
      { operation: 'buy', 'unit-cost': 10.00, quantity: 100 },
      { operation: 'sell', 'unit-cost': 20.00, quantity: 50 }
    ]);

    console.log = jest.fn();
    processInput(mockInput);

    expect(console.log).toHaveBeenCalledWith(
      JSON.stringify([{ tax: 0 }, { tax: 100 }])
    );
  });
});
