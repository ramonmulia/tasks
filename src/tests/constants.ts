import { gql } from "apollo-server-core";

export const host = "http://localhost:3000";

export const SignUpMutation = gql`
  mutation SignUp(
    $signupEmail: String!
    $signupPassword: String!
    $signupName: String!
  ) {
    signup(email: $signupEmail, password: $signupPassword, name: $signupName) {
      token
    }
  }
`;

export const LoginMutation = gql`
  mutation Login($signupEmail: String!, $signupPassword: String!) {
    login(email: $signupEmail, password: $signupPassword) {
      token
    }
  }
`;

export const MeQuery = gql`
  query me {
    me {
      name
      email
    }
  }
`;

export const CreateTaskMutation = gql`
  mutation CreateTask($title: String!, $description: String!, $status: Status) {
    createTask(title: $title, description: $description, status: $status) {
      id
      title
      description
      status
    }
  }
`;

export const UpdateStatusMutation = gql`
  mutation UpdateStatus($taskId: ID!, $status: Status!) {
    updateStatus(taskId: $taskId, status: $status) {
      title
      status
    }
  }
`;

export const TasksQuery = gql`
 query tasks {
    tasks {
      title
      description
      status
    }
  }
`

export const createTaskVariables = {
  title: "fake-title",
  description: "fake-description",
};

export const loginVariables = {
  signupEmail: "fake-email@fake.com",
  signupPassword: "fake-password",
  signupName: "fake-name",
};

export const signupVariables = {
  signupEmail: "fake-email@fake.com",
  signupPassword: "fake-password",
  signupName: "fake-name",
};
