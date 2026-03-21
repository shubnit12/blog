#!/bin/bash

REPO="shubnit12/blog"
INSTALL_DIR="$HOME/blog/app"
VERSION_FILE="$HOME/blog/version.txt"

LATEST_TAG=$(curl -s "https://api.github.com/repos/${REPO}/releases/latest" | grep '"tag_name"' | cut -d '"' -f 4)

if [ -z "$LATEST_TAG" ]; then
  echo "[$(date)] Could not fetch latest release tag. Skipping."
  exit 1
fi

CURRENT_TAG=$(cat "$VERSION_FILE" 2>/dev/null || echo "none")

if [ "$LATEST_TAG" == "$CURRENT_TAG" ]; then
  echo "[$(date)] Already on latest release: $LATEST_TAG. No update needed."
  exit 0
fi

echo "[$(date)] New release found: $LATEST_TAG (current: $CURRENT_TAG). Deploying..."

curl -sL "https://github.com/${REPO}/releases/download/${LATEST_TAG}/blog.zip" -o /tmp/blog.zip

rm -rf /tmp/blog_extracted
unzip -q /tmp/blog.zip -d /tmp/blog_extracted

rm -rf "$INSTALL_DIR"
mkdir -p "$INSTALL_DIR"
cp -r /tmp/blog_extracted/. "$INSTALL_DIR"/

pm2 restart blog 2>/dev/null || pm2 start "$INSTALL_DIR/expressServer/index.js" --name blog

echo "$LATEST_TAG" > "$VERSION_FILE"

rm -f /tmp/blog.zip
rm -rf /tmp/blog_extracted

echo "[$(date)] Successfully deployed $LATEST_TAG."
