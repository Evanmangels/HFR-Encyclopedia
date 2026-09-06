#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

if ! command -v python3 >/dev/null 2>&1; then
  echo "Python 3 is required. Install it, then run this script again."
  exit 1
fi

if [ ! -d .venv ]; then
  python3 -m venv .venv
fi

.venv/bin/python -m pip install --upgrade pip
.venv/bin/python -m pip install -r requirements.txt

echo "Opening the HFR Encyclopedia at http://127.0.0.1:8000"
(
  sleep 2
  if command -v open >/dev/null 2>&1; then open http://127.0.0.1:8000;
  elif command -v xdg-open >/dev/null 2>&1; then xdg-open http://127.0.0.1:8000;
  fi
) &
.venv/bin/mkdocs serve
