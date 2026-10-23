# Pinned by digest, so the same tag can never mean two different images.
FROM ubuntu:22.04@sha256:0a9887931b0e38af2e3487ed39e29436b0535c4f3f52e57745baaf79d1898956

ENV DEBIAN_FRONTEND=noninteractive

# Only what install.js itself needs. Everything else it installs, so there is one
# description of the install and nothing here to drift from it.
RUN apt-get update && apt-get install -y curl ca-certificates gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

COPY install.js /tmp/install.js
RUN node /tmp/install.js && rm /tmp/install.js

WORKDIR /app

EXPOSE 9966 8080

# Overridden by docker-compose.json, which mounts the app and starts it from there.
CMD ["npm", "run", "fw", "start"]
