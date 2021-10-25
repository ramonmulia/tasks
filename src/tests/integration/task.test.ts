import { GraphQLClient } from "graphql-request";

import {
  CreateTaskMutation,
  createTaskVariables,
  host,
  SignUpMutation,
  signupVariables,
  TasksQuery,
  UpdateStatusMutation,
} from "../constants";
import { TaskStatus } from "../../entity/Task";
import "../setup";

describe("Task", () => {
  const client = new GraphQLClient(host);

  const signUpUser = async () => {
    const {
      signup: { token },
    } = await client.request(SignUpMutation, signupVariables);

    return token;
  };

  beforeEach(async () => {
    const token = await signUpUser();
    client.setHeader("authorization", `Bearer ${token}`);
  });

  it("should create task correctly for an authenticated user", async () => {
    const {
      createTask: { title, status },
    } = await client.request(CreateTaskMutation, createTaskVariables);

    expect(status).toBe(TaskStatus.TO_DO);
    expect(title).toBe(createTaskVariables.title);
  });

  it("should update task status by ID", async () => {
    // create task
    const {
      createTask: { id },
    } = await client.request(CreateTaskMutation, createTaskVariables);

    // update status
    const {
      updateStatus: { status },
    } = await client.request(UpdateStatusMutation, {
      taskId: id,
      status: TaskStatus.IN_PROGRESS,
    });

    expect(status).toBe(TaskStatus.IN_PROGRESS);
  });

  it("should get tasks by signed user", async () => {
    // create tasks
    await client.request(CreateTaskMutation, createTaskVariables);
    await client.request(CreateTaskMutation, {
      title: 'fake-title-2',
      status: TaskStatus.IN_PROGRESS,
      description: "fake-description-2",
    });

    // get tasks
    const { tasks } = await client.request(TasksQuery);

    expect(tasks).toHaveLength(2);
  });
});
