
## Tasks
Built under Graphql Apollo server using typescript and typeorm (Postgres database).

### Prerequisites
* docker@20.10.6
* yarn@1.22.4
* node@14.18.1

### Run locally
   ```sh
   docker compose up --build
   ```
server will start on: [localhost:3000](http://localhost:3000)
-  First create one user using the following mutation

```sh
mutation Mutation($signupEmail2: String!, $signupPassword2: String!, $signupName2: String!) {
  signup(email: $signupEmail2, password: $signupPassword2, name: $signupName2) {
    token
  }
}
```

- Get the token and put it on Authorization Header to create/get/update tasks
``` authorization Bearer ${token} ```


### Tests
   ```sh
   yarn install
   yarn test
   ```
