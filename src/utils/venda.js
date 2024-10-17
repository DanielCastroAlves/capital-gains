const { estado } = require("./estado");

function venda(unitCost, quantity) {
  const vendaTotal = unitCost * quantity;
  const lucro = (unitCost - estado.precoMedio) * quantity;
  let imposto = lucro > 0 ? parseFloat((lucro * 0.2).toFixed(2)) : 0;

  console.log(`Venda Total: ${vendaTotal}, Lucro: ${lucro}`);
  console.log(`Estado após venda:`, estado);

  estado.quantidade -= quantity;
  estado.historico.push({ tax: imposto });

  return { tax: imposto };
}

module.exports = venda;
