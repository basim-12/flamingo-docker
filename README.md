# Flamingo Docker Environment

This repository contains the Docker configuration and containerization logic for the [Flamingo Node](https://github.com/playproject-io/flamingo-node) backend. 

By separating the Docker environment from the core application codebase, we keep the core package lightweight while providing a highly flexible, instant-reloading local development environment.

##  Important: Required Folder Structure

Because this Docker setup uses **Bind Mounts** to instantly reflect your code changes inside the container, **this repository MUST sit side-by-side with the core application repository** in the same parent folder.

Your local workspace must look exactly like this:

```text
your-workspace/
  ├── flamingo-node/       <-- The core application code
  └── flamingo-docker/     <-- This repository