
# Capital Gains - Desafio Nubank

## Descrição do Projeto

Este projeto é uma aplicação de linha de comando para cálculo de Ganho de Capital com base em operações de compra e venda de ativos financeiros. A solução foi desenvolvida para funcionar completamente em memória, sem dependências de bancos de dados ou APIs externas. Ela aceita entradas tanto via **stdin** quanto através de um arquivo e retorna o resultado em **stdout** no formato JSON.

---

## Decisões Técnicas e Arquiteturais

### Estado Gerenciado em Memória
- O estado da aplicação é armazenado e gerenciado usando o módulo `estado.js`.
- Toda vez que a aplicação é executada, o estado é resetado, garantindo que operações anteriores não afetem as subsequentes.

### Separação de Responsabilidades
- O código é modularizado em diferentes arquivos:
  - **compra.js**: Lógica para tratar compras de ativos.
  - **venda.js**: Lógica para tratar vendas e cálculo de impostos.
  - **estado.js**: Módulo que gerencia o estado global da aplicação.
- Essa separação facilita a manutenção e a extensão do código no futuro.

### Arredondamento de Decimais
- Todas as operações financeiras são arredondadas para duas casas decimais utilizando `toFixed(2)`, para manter precisão e consistência nos cálculos.

### Tratamento de Erros
- A aplicação presume que as entradas são válidas. 
- Caso encontre um JSON inválido, um erro é exibido no console, sem interromper o funcionamento geral.

---

## Leitura de Entrada e Saída
- A aplicação aceita operações como entrada via **stdin** ou por meio de um arquivo.
- O resultado é sempre retornado em **stdout** no formato JSON.

---

## Justificativa para o Uso de Bibliotecas
- **Jest** foi utilizado para os testes automatizados. A escolha se deve à sua simplicidade, excelente suporte à comunidade e integração fluida com projetos Node.js.
- Não foram utilizadas outras bibliotecas para manter a aplicação enxuta e fácil de entender.

---

## Como Compilar e Executar o Projeto

### Pré-requisitos
- Node.js instalado.

### Passos para Execução

1. Clone o repositório:

```bash
git clone <repository-url>
cd capital-gains
```

2. Instale as dependências:

```bash
npm install
```

3. Executando o Projeto:

**Via stdin:**

```bash
node src/index.js
```

Digite as operações no formato JSON e pressione **Enter**.

**Via arquivo:**

```bash
node src/index.js input-teste.txt
```

---

## Como Executar os Testes

1. Executando todos os testes:

```bash
npm test
```

2. Executando testes específicos:

```bash
npx jest src/tests/utils/compra.test.js --verbose
npx jest src/tests/utils/venda.test.js --verbose
npx jest src/tests/index.test.js --verbose
```

---

## Notas Adicionais

- **Estado Inicial**: O estado é resetado toda vez que o programa é executado para evitar interferências entre execuções consecutivas.
- **Cálculo de Impostos**: O imposto é aplicado apenas em vendas com lucro e acima de R$ 20.000, com uma alíquota de 20% sobre o lucro.
- **Erro de JSON**: Se um JSON inválido for inserido, uma mensagem de erro será exibida sem interromper o programa.
