# Wallet Creator

Wallet generation works without an internet connection after installing dependencies.
Transaction scripts require an RPC connection.

## Requirements
* [Node.js](https://github.com/nodejs/node) (v26.12.1+)
* [Npm](https://www.npmjs.com/package/npm)

## Install

### Install Dependencies
```bash
npm install
```

### Generate New Wallet 
```bash
npm run create
```

### Destroy Generated Wallet 
```bash
npm run clean
```

Credentials are written to `../wallet_credentials` relative to the current working
directory. Running `npm run create` again replaces the existing wallet credentials.

### Вызов контракта и перевод ETH

В `scripts/call-contract.js` заполните `PRIVATE_KEY`, `RPC_URL` (Infura),
`CONTRACT_ADDRESS`, `ABI` и замените `contract.setValue(123n)` на нужную функцию
с аргументами. Пример рассчитан на функцию, отправляющую транзакцию;
`view`/`pure` возвращают данные, а не хэш.

```bash
npm run contract
```

В `scripts/send-eth.js` заполните `PRIVATE_KEY`, `RPC_URL`, `TO_ADDRESS`
и `AMOUNT_ETH`. Например, `'0.001'` означает 0.001 ETH; сумму задавайте строкой
с точкой, без суффикса `ETH`. Комиссия оплачивается сверх этой суммы.

```bash
npm run send-eth
```

Оба скрипта используют сеть из `RPC_URL` (в шаблоне — Mainnet) и выводят хэш
после отправки. Для ожидания подтверждения раскомментируйте `tx.wait()`.
Газ и комиссии рассчитывает ethers автоматически.
Справочник: [ethers v6](https://docs.ethers.org/v6/single-page/).

`PRIVATE_KEY` и `RPC_URL` задаются прямо в начале каждого скрипта.
Не коммитьте файлы с настоящим приватным ключом.

### Run Tests
```bash
npm test
```

### Audit Dependencies
```bash
npm audit
```
