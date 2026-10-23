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

## What is installed

The image is a plain ubuntu with node on it; everything the node needs is installed by
[`install.js`](install.js), which the Dockerfile runs. Each piece is pinned, so the same
install always produces the same binaries:

| | Pinned by |
| --- | --- |
| ubuntu base | image digest, so the tag can never mean two different images |
| Bitcoin Core 25.0 | the published SHA256 of the release tarball, checked after download |
| Core Lightning v23.08.1 | a commit sha, verified after a shallow clone of the tag |

The install lives in a script rather than in `RUN` steps so that anything else with a plain
ubuntu and node can run exactly the same install:

```bash
node install.js
```

Using it with Docker needs nothing extra: `docker build` runs it for you and the result is
baked into the image, cached like any other layer.

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