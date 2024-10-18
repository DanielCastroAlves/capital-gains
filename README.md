
# Capital Gains

## Descrição do Projeto

Este projeto é uma aplicação de linha de comando para cálculo de Ganho de Capital com base em operações de compra e venda de ativos financeiros. A solução foi desenvolvida para funcionar completamente em memória, sem dependências de bancos de dados ou APIs externas. Ela aceita entradas tanto via **stdin** quanto através de um arquivo e retorna o resultado em **stdout** no formato JSON.

Repositório oficial: [GitHub - DanielCastroAlves/capital-gains](https://github.com/DanielCastroAlves/capital-gains)

---

## Decisões Técnicas e Arquiteturais

### Estado Gerenciado em Memória
- O estado da aplicação é armazenado e gerenciado usando o módulo `estado.js`.
- Toda vez que a aplicação é executada, o estado é resetado para garantir que operações anteriores não afetem as subsequentes.

### Separação de Responsabilidades
- O código é modularizado em diferentes arquivos:
  - **compra.js**: Lógica para tratar compras de ativos.
  - **venda.js**: Lógica para tratar vendas e cálculo de impostos.
  - **estado.js**: Módulo que gerencia o estado global da aplicação.
- Essa separação facilita a manutenção e a extensão do código no futuro.

### Regras de Cálculo
- Prejuízos acumulados são deduzidos de lucros futuros para minimizar impostos.
- O imposto é de 20% sobre o lucro somente quando o valor total da venda excede R$ 20.000,00.
- Nenhum imposto é aplicado a operações de compra.

### Arredondamento de Decimais
- Todas as operações financeiras são arredondadas para duas casas decimais utilizando `toFixed(2)`, para manter precisão e consistência nos cálculos.

### Tratamento de Erros
- A aplicação presume que as entradas são válidas.
- Caso encontre um JSON inválido, uma mensagem de erro é exibida no console, sem interromper o funcionamento geral.

---

## Leitura de Entrada e Saída
- A aplicação aceita operações como entrada via **stdin** ou por meio de um arquivo.
- O resultado é sempre retornado em **stdout** no formato JSON.

### Exemplo de Entrada
```json
[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
 {"operation":"sell", "unit-cost":50.00, "quantity": 10000}]
```

### Exemplo de Saída
```json
[{"tax":0.00}, {"tax":80000.00}]
```

---

## Justificativa para o Uso de Bibliotecas
- **Jest** foi utilizado para os testes automatizados, devido à sua simplicidade e excelente integração com projetos Node.js.
- Não foram utilizadas outras bibliotecas para manter a aplicação enxuta e fácil de entender.

---

## Docker
- O projeto inclui um `Dockerfile` para facilitar a construção e execução da aplicação em um ambiente contêinerizado. Para construir a imagem Docker, execute:

```bash
docker build -t capital-gains .
```

E para executar a aplicação, utilize:

```bash
docker run -it -v "$(pwd):/app" -w /app capital-gains node src/index.js < src/tests/input-teste.txt
```

---

## Como Compilar e Executar o Projeto

### Pré-requisitos
- Node.js instalado.

### Passos para Execução

1. Clone o repositório:

```bash
git clone https://github.com/DanielCastroAlves/capital-gains
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

Digite as operações no formato JSON e pressione **Enter** para cada linha. Envie uma linha vazia para finalizar.

**Via redirecionamento de arquivo:**

```bash
node src/index.js < input-teste.txt
```

---

## Como Executar os Testes

1. Executando todos os testes:

```bash
npm test
```

2. Executando testes específicos:

```bash
npx jest src/tests/compra.test.js --verbose
npx jest src/tests/venda.test.js --verbose
npx jest src/tests/index.test.js --verbose
```

---

## Notas Adicionais

- **Estado Inicial**: O estado é resetado toda vez que o programa é executado para evitar interferências entre execuções consecutivas.
- **Cálculo de Impostos**: Prejuízos são acumulados e deduzidos de lucros futuros para minimizar impostos.
- **Uso de Stdin**: A aplicação foi configurada para aceitar operações via stdin ou redirecionamento de arquivos, conforme necessário pelo desafio.
- **Testes Automatizados**: Os testes cobrem cenários como vendas com lucro, sem lucro e com prejuízo, garantindo a precisão da aplicação.

---

## Considerações Finais

Este projeto foi desenvolvido para ser simples, modular e eficiente, atendendo aos requisitos do desafio do Nubank. O uso de uma arquitetura bem definida facilita a manutenção e expansão futura do código.
