#!/bin/sh
set -e

echo "==> Applying database migrations…"
# Запустим миграции на скомпилированном датасорсе
npx typeorm migration:run -d dist/data-source.js

echo "==> Launching app…"
exec "$@"
