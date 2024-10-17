// src/__tests__/utils/venda.test.js
const venda = require('../../utils/venda');
const { estado, resetarEstado } = require('../../utils/estado');

beforeEach(() => {
  resetarEstado(); // Garante que o estado esteja limpo para cada teste
  estado.precoMedio = 10; // Define preço médio inicial
  estado.quantidade = 100; // Define quantidade inicial de ações
});

test('Deve calcular corretamente o imposto para uma venda lucrativa', () => {
  const resultado = venda(50.00, 50); // Venda com lucro

  expect(resultado).toEqual({ tax: 400.00 }); // 20% de (50 - 10) * 50
  expect(estado.historico).toMatchObject([{ tax: 400.00 }]); // Verifica histórico
  expect(estado.quantidade).toBe(50); // Verifica quantidade restante
});

test('Não deve calcular imposto para uma venda abaixo de 20.000', () => {
  const resultado = venda(10.00, 10); // Venda total de 100 (sem imposto)

  expect(resultado).toEqual({ tax: 0 });
  expect(estado.historico).toMatchObject([{ tax: 0 }]); // Verifica histórico
  expect(estado.quantidade).toBe(90); // Atualiza quantidade corretamente
});

test('Não deve calcular imposto para uma venda com prejuízo', () => {
  const resultado = venda(5.00, 50); // Venda com prejuízo

  expect(resultado).toEqual({ tax: 0 });
  expect(estado.historico).toMatchObject([{ tax: 0 }]); // Verifica histórico
  expect(estado.quantidade).toBe(50); // Verifica quantidade restante
});
