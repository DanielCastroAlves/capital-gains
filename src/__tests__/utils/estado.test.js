// src/__tests__/utils/estado.test.js
const { estado, resetarEstado } = require('../../utils/estado');

beforeEach(() => {
  resetarEstado(); // Garante que o estado esteja limpo para cada teste
});

test('Estado inicial deve estar zerado', () => {
  expect(estado.quantidade).toBe(0);
  expect(estado.precoMedio).toBe(0);
  expect(estado.prejuizo).toBe(0);
});
