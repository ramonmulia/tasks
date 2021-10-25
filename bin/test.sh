docker compose -f docker-compose.yaml -f docker-compose.test.yaml up -d db

echo "[db] not yet ready to accept connections"
WAIT_FOR_PG_ISREADY="while ! pg_isready; do sleep 1; done;"
docker-compose exec db bash -c "$WAIT_FOR_PG_ISREADY"
echo "[db] ready to accept connections"

echo "running all tests..."
jest --runInBand

echo "down containers..."
docker compose down -v --remove-orphans