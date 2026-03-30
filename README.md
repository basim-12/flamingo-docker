# Flamingo Docker Environment

Docker configuration for the [Flamingo Node](https://github.com/basim-12/flamingo-node) backend.

## Setup

Clone this repo and [flamingo-node](https://github.com/basim-12/flamingo-node) side by side:

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

Set `FLAMINGO_PATH` to point to your `flamingo-node` directory and run via Docker Compose:

```bash
FLAMINGO_PATH=../flamingo-node docker compose -f docker-compose.json up --build
```

Stop:
```bash
docker compose -f docker-compose.json down
```

## Ports

| Port | Service |
|------|---------|
| 8080 | Backend WebSocket |

## Configuration

Edit `env.docker.json` to customize paths, RPC credentials, and ports.

## Related Repositories

- [flamingo-node](https://github.com/playproject-io/flamingo-node) — Backend: bitcoind, lightningd, WebSocket bridge
- [flamingo-wallet](https://github.com/playproject-io/flamingo-wallet) — Main entry point & orchestration
- [flamingo-ui](https://github.com/playproject-io/flamingo-ui) — Reusable UI component library