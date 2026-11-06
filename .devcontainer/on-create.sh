#!/usr/bin/env bash

# Install dependencies
npm install

# Copy the env file
cp .env.example .env

# In GitHub Codespaces the app is opened at https://<name>-3000.<domain>, not localhost.
# Auth cookies are scoped to NEXT_PUBLIC_WEBAPP_URL, so login fails unless it matches.
if [ -n "${CODESPACE_NAME:-}" ]; then
  sed -i "s#^NEXT_PUBLIC_WEBAPP_URL=.*#NEXT_PUBLIC_WEBAPP_URL=\"https://${CODESPACE_NAME}-3000.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}\"#" .env
  # Codespaces rewrites the Origin header to https://localhost:3000.
  echo 'NEXT_PRIVATE_CSRF_TRUSTED_ORIGINS="https://localhost:3000"' >> .env
fi

# Run the dev setup
npm run dx
