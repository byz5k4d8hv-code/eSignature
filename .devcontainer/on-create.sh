#!/usr/bin/env bash

# Install dependencies
npm install

# Copy the env file
cp .env.example .env

# In GitHub Codespaces the app is opened at https://<name>-3000.<domain>, not localhost.
# Auth cookies are scoped to NEXT_PUBLIC_WEBAPP_URL, so login fails unless it matches.
if [ -n "${CODESPACE_NAME:-}" ]; then
  sed -i "s#^NEXT_PUBLIC_WEBAPP_URL=.*#NEXT_PUBLIC_WEBAPP_URL=\"https://${CODESPACE_NAME}-3000.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}\"#" .env
fi

# Run the dev setup
npm run dx
