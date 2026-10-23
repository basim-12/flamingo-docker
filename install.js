#!/usr/bin/env node
// Installs what the Flamingo node needs: Bitcoin Core and Core Lightning, each pinned so
// the same install always produces the same binaries. The Dockerfile runs this, and so can
// anything else that has a plain ubuntu with node on it, which is why it lives here rather
// than in the Dockerfile: one description of the install, for every way of running it.
//
//   node install.js
//
// Expects to run as root on ubuntu 22.04, with curl and node already there.

const { execFileSync } = require('child_process')
const crypto = require('crypto')
const fs = require('fs')
const os = require('os')

const bitcoin = {
  version: '25.0',
  // the published SHA256SUMS for bitcoin-<version>-<arch>-linux-gnu.tar.gz
  sha256: {
    aarch64: '3a7bdd959a0b426624f63f394f25e5b7769a5a2f96f8126dcc2ea53f3fa5212b',
    x86_64: '33930d432593e49d58a9bff4c30078823e9af5d98594d2935862788ce8a20aec'
  }
}

const lightning = {
  repo: 'https://github.com/ElementsProject/lightning.git',
  tag: 'v23.08.1',
  // the tag is a convenience for a shallow clone; this commit is the contract
  commit: 'e66d642e3d707c35d1d346cb64038ef0188de22b'
}

// What the node needs at runtime, plus what building Core Lightning needs.
const packages = [
  'git', 'wget', 'jq', 'build-essential', 'python3', 'python3-pip',
  'autoconf', 'automake', 'libtool', 'libgmp-dev', 'libsqlite3-dev', 'libsodium-dev', 'gettext'
]

const arch = { arm64: 'aarch64', x64: 'x86_64' }[os.arch()]
if (!arch) throw new Error(`Bitcoin Core has no build for ${os.arch()}`)

run('apt-get', ['update'])
run('apt-get', ['install', '-y', ...packages])
run('pip3', ['install', 'mako'])

const tarball = `bitcoin-${bitcoin.version}-${arch}-linux-gnu.tar.gz`
console.log(`Installing Bitcoin Core ${bitcoin.version} (${arch}) ...`)
run('curl', ['-fsSLO', `https://bitcoincore.org/bin/bitcoin-core-${bitcoin.version}/${tarball}`], '/tmp')
verify(`/tmp/${tarball}`, bitcoin.sha256[arch])
run('tar', ['xzf', tarball], '/tmp')
run('sh', ['-c', `install -m 0755 -t /usr/local/bin bitcoin-${bitcoin.version}/bin/*`], '/tmp')

console.log(`Installing Core Lightning ${lightning.commit.slice(0, 12)} ...`)
run('git', ['clone', '--depth', '1', '--branch', lightning.tag, lightning.repo], '/tmp')
const head = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: '/tmp/lightning', encoding: 'utf8' }).trim()
if (head !== lightning.commit) throw new Error(`${lightning.tag} is ${head}, expected ${lightning.commit}`)
run('./configure', ['--disable-valgrind'], '/tmp/lightning')
run('make', ['-j', String(os.availableParallelism())], '/tmp/lightning')
run('make', ['install'], '/tmp/lightning')

run('rm', ['-rf', `/tmp/${tarball}`, `/tmp/bitcoin-${bitcoin.version}`, '/tmp/lightning', '/var/lib/apt/lists'])
console.log('Installed.')

function run (command, args, cwd) {
  execFileSync(command, args, { cwd, stdio: 'inherit' })
}

function verify (file, expected) {
  const sum = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')
  if (sum !== expected) throw new Error(`${file} is ${sum}, expected ${expected}`)
}
