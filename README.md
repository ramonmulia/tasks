
## Tasks
Built under Graphql Apollo server using typescript and typeorm (Postgres database).

### Prerequisites
* docker@20.10.6
* yarn@1.22.4

### Build

Build the images first, running:
````sh
docker compose build
````
### Run locally
   ```sh
   docker compose up -d
   ```
server will start on: [localhost:3000](http://localhost:3000)

### Tests
   ```sh
   yarn install
   yarn test
   ```
