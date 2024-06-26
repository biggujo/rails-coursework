#!/bin/bash

# Install Lefthook
if [[ "$OSTYPE" == "linux-gnu"* ]]; then # Linux (Debian-based)
  curl -1sLf 'https://dl.cloudsmith.io/public/evilmartians/lefthook/setup.deb.sh' | sudo -E bash
  sudo apt install lefthook
elif [[ "$OSTYPE" == "darwin"* ]]; then # macOS
  brew install lefthook
elif [[ "$OSTYPE" == "msys" ]]; then # Windows
  winget install evilmartians.lefthook
else
  echo "Unknown unsupported OS: $OSTYPE"
  exit 1
fi

echo "Lefthook is installed"

# Say to Git that our hooks are in .githooks folder
# This setting is set because hooks are in .git by default, which cannot be added to repository in case hooks are needed
git config core.hooksPath .githooks

echo "Hooks are linked to .githooks"
