import {  GraphQLClient } from "graphql-request";

import { host, LoginMutation, loginVariables, MeQuery, SignUpMutation, signupVariables } from "../constants";
import { User } from "../../entity/User";

import '../setup';

describe("User", () => {
  const client = new GraphQLClient(host);

  test("should signup user correctly", async () => {
    const { signupEmail, signupPassword } = signupVariables;
    const response = await client.request(SignUpMutation, signupVariables);
    expect(response).not.toBeNull();

    const users = await User.find({ where: { email: signupEmail } });
    expect(users).toHaveLength(1);

    const user = users[0];
    expect(user.email).toEqual(signupEmail);
    expect(user.password).not.toEqual(signupPassword);
  });

  test("should not allow signup users with same email", async () => {
    const response = await client.request(SignUpMutation, signupVariables);
    expect(response).not.toBeNull();
    await expect(
      client.request(SignUpMutation, signupVariables)
    ).rejects.toThrowError();
  });

  it("should login user correctly", async () => {
    await client.request(SignUpMutation, signupVariables);

    const { token } = await client.request(LoginMutation, loginVariables);

    expect(token).not.toBeNull();
  });

  it("should get the current user", async () => {
    
    const {
      signup: { token },
    } = await client.request(SignUpMutation, signupVariables);

    client.setHeader("authorization", `Bearer ${token}`);

    const {me: {email}} = await client.request(MeQuery);

    expect(email).toBe(signupVariables.signupEmail);
  });
});
