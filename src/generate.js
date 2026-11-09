const { Wallet } = require('ethers');
const fs = require('node:fs');
const path = require('node:path');

const folder = path.resolve('..', 'wallet_credentials');

function generate() {
  const wallet = Wallet.createRandom();

  fs.mkdirSync(folder, { recursive: true, mode: 0o700 });
  const credentials = {
    'address.txt': wallet.address,
    'pkey.txt': wallet.privateKey,
    'mnemonic.txt': wallet.mnemonic.phrase,
  };

  for (const [filename, value] of Object.entries(credentials)) {
    fs.writeFileSync(path.join(folder, filename), value, {
      encoding: 'ascii',
      mode: 0o600,
    });
  }

  console.log('Generated wallet address:', wallet.address);
  console.log('Credentials:', folder);
}

try {
  generate();
} catch (error) {
  console.error('Failed to generate wallet:', error.message);
  process.exitCode = 1;
}
