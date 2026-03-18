# Flamingo Docker Environment

Docker configuration for the [Flamingo Node](https://github.com/playproject-io/flamingo-node) backend.

## Required Folder Structure

This Docker setup uses **Bind Mounts** for instant code reloading. All repos must sit side-by-side:

```text
your-workspace/
  ├── flamingo-node/       ← Backend
  ├── flamingo-ui/         ← Frontend
  ├── flamingo-docker/     ← This repository
  └── flamingo-wallet/     ← Orchestration & scenarios
```

## Getting Started

### Option A: Docker Compose (recommended for Docker users)

**Start:**
```bash
docker compose up --build
```

**Stop:**
```bash
# Ctrl+C in the running terminal, or:
docker compose down
```

### Option B: Raw Docker Commands (no docker-compose needed)

**Build:**
```bash
docker build -t flamingo-app .
```

**Start:**
```bash
docker run -d --name flamingo-app \
  -v $(pwd)/../flamingo-node/data:/data \
  -v $(pwd)/../flamingo-node:/app \
  -v /app/node_modules \
  -v $(pwd)/../flamingo-ui:/ui \
  -v /ui/node_modules \
  -v $(pwd)/env.docker.json:/config/env.docker.json \
  -p 9966:9966 \
  -p 8080:8080 \
  -e ENV_FILE=/config/env.docker.json \
  -e UI_MODE=start-legacy \
  flamingo-app \
  bash -c "cd /app && npm install && npm run cli start & cd /ui && npm install && npm run start-legacy & wait"
```

**Stop:**
```bash
docker stop flamingo-app && docker rm flamingo-app
```

**Logs:**
```bash
docker logs -f flamingo-app
```

### Option C: Node.js CLI (no Docker knowledge needed)

If you have Node.js installed, you can use the `fw` CLI which handles Docker automatically:

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
| 9966 | Backend (Node.js) |
| 8080 | Frontend (UI) |

## Configuration

Edit `env.docker.json` to customize paths, RPC credentials, and ports.