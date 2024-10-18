const fs = require("fs");
const readline = require("readline");
const { resetarEstado, estado } = require("./utils/estado");

function compra(preco, quantidade) {
  const totalAtual = estado.quantidade * estado.precoMedio;
  const novoTotal = preco * quantidade;
  estado.quantidade += quantidade;
  estado.precoMedio = (totalAtual + novoTotal) / estado.quantidade;
  estado.historico.push({ tax: parseFloat((0).toFixed(2)) });
}

function vendaComImposto(precoVenda, qtdVenda) {
  const valorVenda = precoVenda * qtdVenda;
  const custoVenda = estado.precoMedio * qtdVenda;
  const lucro = valorVenda - custoVenda;

  let imposto = 0;

  if (valorVenda > 20000 && lucro > 0) {
    const lucroTributavel = Math.max(0, lucro - estado.prejuizo);
    imposto = lucroTributavel * 0.2;
    estado.prejuizo = Math.max(0, estado.prejuizo - lucro);
  } else if (lucro < 0) {
    estado.prejuizo += Math.abs(lucro);
  }

  estado.quantidade -= qtdVenda;
  estado.historico.push({ tax: parseFloat(imposto.toFixed(2)) });
}

function processOperations(operations) {
  resetarEstado();
  operations.forEach(({ operation, "unit-cost": custo, quantity }) => {
    if (operation === "buy") compra(custo, quantity);
    if (operation === "sell") vendaComImposto(custo, quantity);
  });

  return estado.historico.map((item) => ({
    tax: Number(item.tax.toFixed(2)),
  }));
}

function formatOutput(output) {
  return JSON.stringify(output).replace(
    /"tax":(\d+(\.\d+)?)/g,
    (_, number) => `"tax":${parseFloat(number).toFixed(2)}`
  );
}

function processInput(input) {
  try {
    const blocks = input.match(/\[.*?\]/g) || [];
    blocks.forEach((block) => {
      const operations = JSON.parse(block);
      const resultado = processOperations(operations);

      console.log(formatOutput(resultado));
    });
  } catch (erro) {
    console.error("Erro ao processar JSON:", erro.message);
  }
}

const caminhoArquivo = process.argv[2];

if (caminhoArquivo) {
  try {
    const input = fs.readFileSync(caminhoArquivo, "utf8");
    processInput(input);
  } catch (erro) {
    console.error("Erro ao ler o arquivo:", erro.message);
  }
} else {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(
    "Digite suas operações como um array JSON (linha vazia para finalizar):"
  );
  let entrada = "";

  rl.on("line", (linha) => {
    if (linha.trim() === "") {
      rl.close();
    } else {
      entrada += linha;
    }
  });

  rl.on("close", () => {
    processInput(entrada);
    process.exit(0);
  });
}

module.exports = { processOperations, processInput };
