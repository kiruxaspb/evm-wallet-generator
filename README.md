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

### Contract Calls and ETH Transfers

In `scripts/call-contract.js`, set `PRIVATE_KEY`, `RPC_URL` (Infura),
`CONTRACT_ADDRESS`, and `ABI`, then replace `contract.setValue(123n)` with
the desired function and arguments. The example expects a function that sends
a transaction; `view`/`pure` functions return data instead of a transaction hash.

```bash
npm run contract
```

In `scripts/send-eth.js`, set `PRIVATE_KEY`, `RPC_URL`, `TO_ADDRESS`,
and `AMOUNT_ETH`. For example, `'0.001'` means 0.001 ETH. Use a string with
a decimal point and no `ETH` suffix. Transaction fees are paid on top of this amount.

```bash
npm run send-eth
```

Both scripts use the network specified by `RPC_URL` (Mainnet in the template)
and print the transaction hash after submission. Uncomment `tx.wait()` to wait
for confirmation. Ethers estimates gas and fees automatically.
Reference: [ethers v6](https://docs.ethers.org/v6/single-page/).

Set `PRIVATE_KEY` and `RPC_URL` at the top of each script.
Do not commit files containing a real private key.

### Check the Deployer Address

Set `SEED_PHRASE` and/or `PRIVATE_KEY` in `scripts/check-address.js`:

```bash
npm run check-address
```

The script derives the sender address locally for each input and checks whether
the addresses match. No RPC connection is required, and no transactions are sent.
The output is the wallet address that will send the deployment transaction when
using that account, not the address of the future contract.

The default seed derivation path is `m/44'/60'/0'/0/0` (the first account).
If your deployment uses a different path or an additional BIP-39 passphrase,
set the same `DERIVATION_PATH` and `SEED_PASSPHRASE` here.
Do not commit the file with real secrets.

### Run Tests
```bash
npm test
```

### Audit Dependencies
```bash
npm audit
```
