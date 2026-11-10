const { HDNodeWallet, Wallet } = require('ethers');

// Fill in one or both values. Do not commit real secrets.
const SEED_PHRASE = '';
const PRIVATE_KEY = '';
const SEED_PASSPHRASE = ''; // Optional BIP-39 passphrase, if used.
const DERIVATION_PATH = "m/44'/60'/0'/0/0"; // First EVM account.

let seedAddress;
let keyAddress;

if (SEED_PHRASE.trim()) {
  try {
    const phrase = SEED_PHRASE.trim().replace(/\s+/gu, ' ');
    seedAddress = HDNodeWallet.fromPhrase(phrase, SEED_PASSPHRASE, DERIVATION_PATH).address;
    console.log(`Address from seed (${DERIVATION_PATH}):`, seedAddress);
  } catch {
    console.error('Failed to derive the seed address: check the phrase and derivation path.');
    process.exitCode = 1;
  }
}

if (PRIVATE_KEY.trim()) {
  try {
    keyAddress = new Wallet(PRIVATE_KEY.trim()).address;
    console.log('Address from private key:', keyAddress);
  } catch {
    console.error('Invalid private key.');
    process.exitCode = 1;
  }
}

if (!SEED_PHRASE.trim() && !PRIVATE_KEY.trim()) {
  console.error('Set SEED_PHRASE and/or PRIVATE_KEY in scripts/check-address.js.');
  process.exitCode = 1;
}

if (seedAddress && keyAddress) {
  console.log('Addresses match:', seedAddress === keyAddress ? 'yes' : 'no');
}
