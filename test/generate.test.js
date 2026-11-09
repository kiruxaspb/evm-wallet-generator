const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');
const { Wallet } = require('ethers');

const script = path.resolve(__dirname, '../src/generate.js');

test('creates and replaces credentials that restore the same wallet', (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'wallet-creator-test-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const cwd = path.join(root, 'project');
  fs.mkdirSync(cwd);
  const folder = path.join(root, 'wallet_credentials');
  let previousAddress;

  for (let attempt = 0; attempt < 2; attempt++) {
    const result = spawnSync(process.execPath, [script], { cwd, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    const read = (name) => fs.readFileSync(path.join(folder, name), 'ascii');
    const address = read('address.txt');
    const privateKey = read('pkey.txt');
    const phrase = read('mnemonic.txt');
    assert.match(privateKey, /^0x[0-9a-f]{64}$/i);
    assert.equal(Wallet.fromPhrase(phrase).address, address);
    assert.equal(new Wallet(privateKey).address, address);
    assert.notEqual(address, previousAddress);
    assert.ok(!result.stdout.includes(privateKey));
    assert.ok(!result.stdout.includes(phrase));
    previousAddress = address;
  }
});

test('reports a filesystem error with a failing exit code', (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'wallet-creator-test-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const cwd = path.join(root, 'project');
  fs.mkdirSync(cwd);
  fs.writeFileSync(path.join(root, 'wallet_credentials'), 'blocked');
  const result = spawnSync(process.execPath, [script], { cwd, encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Failed to generate wallet:/);
  assert.ok(!result.stdout.includes('Generated wallet address:'));
});
