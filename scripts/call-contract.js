const { Contract, JsonRpcProvider, Wallet, getAddress, parseEther } = require('ethers');

// Fill in the settings. The RPC URL determines the network (mainnet, sepolia, etc.).
const PRIVATE_KEY = 'YOUR_PRIVATE_KEY';
const RPC_URL = 'https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY';
const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS';
// Use the full JSON ABI or just the signature of the function you need.
const ABI = ['function setValue(uint256 newValue)'];

async function main() {
  if (PRIVATE_KEY === 'YOUR_PRIVATE_KEY' || RPC_URL.includes('YOUR_INFURA_API_KEY')) {
    throw new Error('Set PRIVATE_KEY and RPC_URL.');
  }
  const address = getAddress(CONTRACT_ADDRESS);
  const provider = new JsonRpcProvider(RPC_URL);

  try {
    const wallet = new Wallet(PRIVATE_KEY, provider);
    if (await provider.getCode(address) === '0x') {
      throw new Error('No contract exists at this address on the selected network.');
    }
    const contract = new Contract(address, ABI, wallet);

    // Replace the function name and arguments with your own.
    // For a payable function: contract.deposit({ value: parseEther('0.001') }).
    // For uint256, use a bigint (123n) or a string to avoid losing precision.
    const tx = await contract.setValue(123n);
    console.log('Transaction hash:', tx.hash);
    // The hash indicates submission, not confirmation. To wait for confirmation:
    const receipt = await tx.wait();
    console.log('Confirmed in block:', receipt);
  } finally {
    provider.destroy();
  }
}

main().catch((error) => {
  console.error('Contract call failed:', error.shortMessage || error.message);
  process.exitCode = 1;
});
