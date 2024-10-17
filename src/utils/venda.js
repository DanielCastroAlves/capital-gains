const { estado } = require('./estado');

function venda(unitCost, quantity) {
  const vendaTotal = unitCost * quantity;
  const lucro = (unitCost - estado.precoMedio) * quantity;

  console.log(`Venda Total: ${vendaTotal}, Lucro: ${lucro}`);

  let imposto = 0;

  // Corrigido: Calcular imposto em qualquer venda com lucro, sem limite de 20.000
  if (lucro > 0) {
    imposto = parseFloat((lucro * 0.2).toFixed(2)); // 20% sobre o lucro
  }

  estado.quantidade -= quantity;
  estado.historico.push({ tax: imposto });

  console.log(`Estado após venda:`, estado);

  return { tax: imposto };
}

module.exports = venda;
