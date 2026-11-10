const { JsonRpcProvider, Wallet, getAddress, parseEther } = require('ethers');

// Fill in the settings. The RPC URL determines the network (mainnet, sepolia, etc.).
const PRIVATE_KEY = 'YOUR_PRIVATE_KEY';
const RPC_URL = 'https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY';
const TO_ADDRESS = 'YOUR_DESTINATION_ADDRESS';
const AMOUNT_ETH = '0.001'; // Amount in ETH as a string, without the ETH suffix. Fees are paid separately.

async function main() {
  if (PRIVATE_KEY === 'YOUR_PRIVATE_KEY' || RPC_URL.includes('YOUR_INFURA_API_KEY')) {
    throw new Error('Set PRIVATE_KEY and RPC_URL.');
  }
  const to = getAddress(TO_ADDRESS);
  const value = parseEther(AMOUNT_ETH);
  if (value <= 0n) {
    throw new Error('The ETH amount must be greater than zero.');
  }
  const provider = new JsonRpcProvider(RPC_URL);

  try {
    const wallet = new Wallet(PRIVATE_KEY, provider);
    const tx = await wallet.sendTransaction({ to, value });
    console.log('Transaction hash:', tx.hash);
    // The hash indicates submission, not confirmation. To wait for confirmation:
    // const receipt = await tx.wait();
    // console.log('Confirmed in block:', receipt.blockNumber);
  } finally {
    provider.destroy();
  }
}

main().catch((error) => {
  console.error('ETH transfer failed:', error.shortMessage || error.message);
  process.exitCode = 1;
});
