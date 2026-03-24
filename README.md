# Flamingo Docker Environment

Docker configuration for the [Flamingo Node](https://github.com/playproject-io/flamingo-node) backend.

## Setup

Clone this repo and [flamingo-node](https://github.com/playproject-io/flamingo-node) side by side:

```bash
git clone git@github.com:basim-12/flamingo-node.git
git clone git@github.com:basim-12/flamingo-docker.git
```

```text
your-workspace/
  ├── flamingo-node/       ← Backend
  └── flamingo-docker/     ← This repository (Docker config)
```

## Getting Started

### Option A: Docker Compose

Set `FLAMINGO_PATH` to point to your `flamingo-node` directory:

```bash
FLAMINGO_PATH=../flamingo-node docker compose up --build
```

Stop:
```bash
docker compose down
```

### Option B: Node.js CLI (no Docker knowledge needed)

If you have Node.js installed, the `fw` CLI handles everything automatically — it resolves `FLAMINGO_PATH` dynamically, so no env var is needed:

```bash
npm install -g flamingo-node
fw init .       # Generate default env.json
fw up           # Installs Docker if needed, builds & runs
fw down         # Stops & removes the container
fw logs         # Tail container logs
```

## Ports

| Port | Service |
|------|---------|
| 8080 | Backend WebSocket |

## Configuration

Edit `env.docker.json` to customize paths, RPC credentials, and ports.

## Related Repositories

- [flamingo-node](https://github.com/playproject-io/flamingo-node) — Backend: bitcoind, lightningd, WebSocket bridge
- [flamingo-docker](https://github.com/playproject-io/flamingo-docker) — Docker environment for the stack
- [flamingo-wallet](https://github.com/playproject-io/flamingo-wallet) — Main entry point & orchestration
- [flamingo-ui](https://github.com/playproject-io/flamingo-ui) — Reusable UI component library