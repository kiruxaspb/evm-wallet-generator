# Wallet Creator

The script works without an internet connection after installing dependencies.

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

### Run Tests
```bash
npm test
```

### Audit Dependencies
```bash
npm audit
```
