const compra = require('../../utils/compra');
const { estado, resetarEstado } = require('../../utils/estado');

beforeEach(() => {
  resetarEstado();
});

test('Deve atualizar o estado corretamente após uma compra', () => {
  compra(10.00, 100);
  expect(estado.quantidade).toBe(100);
  expect(estado.precoMedio).toBe(10.00);
});
