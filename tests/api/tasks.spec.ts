import { test, expect, request } from '@playwright/test';
import auth from '~/pages/api/auth';
import { StaticVariables } from '~/constants';
import task from '~/pages/api/task';

let token: string;
let userId: string;
let userIdUpdated = '6f15f979-0a25-46c6-ba1c-a1ddf59a3e97';
let createdTaskId: string;
test.describe('Admin - Task test', () => {
  test.beforeAll('admin login', async () => {
    const newLogin = await request.newContext();
    await auth.login(newLogin, StaticVariables.emailAdmin, StaticVariables.passwordAdmin);
    token = auth.token;
    userId = auth.userid;
    await newLogin.dispose();
  });
  let createdTaskId: string;
  test.beforeEach('Create Task data to test', async ({}, testInfo) => {
    if (testInfo.title === 'Admin - Create task successfully') {
      console.log('Skip setup for Create tast test case');
      return;
    }
    // Create a task
    const newCreateTask = await request.newContext();
    let getCreateTaskResponse = await task.createTask(
      newCreateTask,
      token,
      StaticVariables.projectId,
      StaticVariables.userId,
    );
    createdTaskId = getCreateTaskResponse.data.id;
  });
  test.afterEach('Delete created Task data', async ({}, testInfo) => {
    if (
      testInfo.title === 'Admin - Delete task successfully' ||
      testInfo.title === 'Admin - Create task successfully'
    ) {
      console.log('Skip cleanup data Delete tast test case');
      return;
    }
    // Delete created task
    const newDeleteTask = await request.newContext();
    let getDeleteTaskResponse = await task.deleteTask(newDeleteTask, token, createdTaskId);
    await newDeleteTask.dispose();
  });

  test('Admin - Get all task successfully', async () => {
    const newGetAllTask = await request.newContext();
    let getAllTaskResponse = await task.getAllTask(newGetAllTask, token);
    expect(getAllTaskResponse).toHaveProperty('data');
    await newGetAllTask.dispose();
  });
  test('Admin - Create task successfully', async () => {
    const newCreateTask = await request.newContext();
    let getCreateTaskResponse = await task.createTask(
      newCreateTask,
      token,
      StaticVariables.projectId,
      StaticVariables.userId,
    );
    expect(getCreateTaskResponse.data).toHaveProperty('title');
    expect(getCreateTaskResponse.data.title).toContain('Task Auto_');
    await newCreateTask.dispose();
  });

  test('Admin - Update task successfully', async () => {
    const newUpdateTask = await request.newContext();
    let getUpdateTaskResponse = await task.updateTask(newUpdateTask, token, createdTaskId);
    expect(getUpdateTaskResponse.data.title).toBe(StaticVariables.updatedTaskTitle);
    expect(getUpdateTaskResponse.data.description).toBe(StaticVariables.updatedTaskDesc);
    expect(getUpdateTaskResponse.data.status).toBe(StaticVariables.inprogressStatus);
    await newUpdateTask.dispose();
  });

  test('Admin - Get a task by ID successfully', async () => {
    const newGetTask = await request.newContext();
    let getTaskResponse = await task.getTaskById(newGetTask, token, createdTaskId);
    expect(getTaskResponse.data.id).toBe(createdTaskId);
    await newGetTask.dispose();
  });

  test('Admin - Delete task successfully', async () => {
    const newDeleteTask = await request.newContext();
    let getDeleteTaskResponse = await task.deleteTask(newDeleteTask, token, createdTaskId);
    await newDeleteTask.dispose();
    // Get deleted task
    const newGetTask = await request.newContext();
    let getTaskResponse = await task.getTaskById(newGetTask, token, createdTaskId);
    expect(getTaskResponse.data).not.toHaveProperty('id');
    await newGetTask.dispose();
  });
});
test.describe('Contributor - Task test', () => {
  test.beforeAll('Contributor login', async () => {
    const newLogin = await request.newContext();
    await auth.login(newLogin, StaticVariables.emailContributor, StaticVariables.passwordContributor);
    token = auth.token;
    userId = auth.userid;
    await newLogin.dispose();
  });
  test.beforeEach('Create Task data to test', async ({}, testInfo) => {
    if (testInfo.title === 'Contributor - Create task successfully') {
      console.log('Skip setup for Create tast test case');
      return;
    }
    const newCreateTask = await request.newContext();
    let getCreateTaskResponse = await task.createTask(
      newCreateTask,
      token,
      StaticVariables.projectId,
      StaticVariables.userId,
    );
    createdTaskId = getCreateTaskResponse.data.id;
  });
  test.afterEach('Delete created Task data', async ({}, testInfo) => {
    if (testInfo.title === 'Contributor - Create task successfully') {
      console.log('Skip cleanup data Delete tast test case');
      return;
    }
    const newDeleteTask = await request.newContext();
    let getDeleteTaskResponse = await task.deleteTask(newDeleteTask, token, createdTaskId);
    await newDeleteTask.dispose();
  });
  test('Contributor - Get all task successfully', async () => {
    const newGetAllTask = await request.newContext();
    let getAllTaskResponse = await task.getAllTask(newGetAllTask, token);
    expect(getAllTaskResponse).toHaveProperty('data');
    await newGetAllTask.dispose();
  });

  test('Contributor - Create task successfully', async () => {
    const newCreateTask = await request.newContext();
    let getCreateTaskResponse = await task.createTask(
      newCreateTask,
      token,
      StaticVariables.projectId,
      StaticVariables.userId,
    );
    expect(getCreateTaskResponse.data).toHaveProperty('title');
    expect(getCreateTaskResponse.data.title).toContain('Task Auto_');
    await newCreateTask.dispose();
  });

  test('Contributor - Update task successfully', async () => {
    // Update task
    const newUpdateTask = await request.newContext();
    let getUpdateTaskResponse = await task.updateTask(newUpdateTask, token, createdTaskId);
    expect(getUpdateTaskResponse.data.title).toBe(StaticVariables.updatedTaskTitle);
    expect(getUpdateTaskResponse.data.description).toBe(StaticVariables.updatedTaskDesc);
    expect(getUpdateTaskResponse.data.status).toBe(StaticVariables.inprogressStatus);
    await newUpdateTask.dispose();
  });

  test('Contributor - Assign task successfully', async () => {
    // Update task
    const newUpdateTask = await request.newContext();
    let getUpdateTaskResponse = await task.updateTask(newUpdateTask, token, createdTaskId);
    expect(getUpdateTaskResponse.data.title).toBe(StaticVariables.updatedTaskTitle);
    expect(getUpdateTaskResponse.data.description).toBe(StaticVariables.updatedTaskDesc);
    expect(getUpdateTaskResponse.data.status).toBe(StaticVariables.inprogressStatus);
    await newUpdateTask.dispose();
  });

  test('Contributor - Get a task by ID successfully', async () => {
    // Get deleted task
    const newGetTask = await request.newContext();
    let getTaskResponse = await task.getTaskById(newGetTask, token, createdTaskId);
    expect(getTaskResponse.data.id).toBe(createdTaskId);
    await newGetTask.dispose();
  });

  test('Contributor - Delete task - Forbidden', async () => {
    const newDeleteTask = await request.newContext();
    let deleteTaskResponse = await task.deleteTask(newDeleteTask, token, createdTaskId);
    expect(deleteTaskResponse.statusCode).toBe('403');
    await newDeleteTask.dispose();
  });
});

test.describe('Manager - Task test', () => {
  test.beforeAll('Manager login', async () => {
    const newLogin = await request.newContext();
    await auth.login(newLogin, StaticVariables.emailManager, StaticVariables.passwordManager);
    token = auth.token;
    userId = auth.userid;
    await newLogin.dispose();
  });
  test.beforeEach('Create Task data to test', async ({}, testInfo) => {
    if (testInfo.title === 'Manager - Create task successfully') {
      console.log('Skip setup for Create tast test case');
      return;
    }
    const newCreateTask = await request.newContext();
    let getCreateTaskResponse = await task.createTask(
      newCreateTask,
      token,
      StaticVariables.projectId,
      StaticVariables.userId,
    );
    createdTaskId = getCreateTaskResponse.data.id;
  });
  test.afterEach('Delete created Task data', async ({}, testInfo) => {
    if (testInfo.title === 'Manager - Create task successfully') {
      console.log('Skip cleanup data Delete tast test case');
      return;
    }
    const newDeleteTask = await request.newContext();
    let getDeleteTaskResponse = await task.deleteTask(newDeleteTask, token, createdTaskId);
    await newDeleteTask.dispose();
  });
  test('Manager - Get all task - Forbidden', async () => {
    const newGetAllTask = await request.newContext();
    let getAllTaskResponse = await task.getAllTask(newGetAllTask, token);
    expect(getAllTaskResponse.statusCode).toBe(403);
    await newGetAllTask.dispose();
  });

  test('Manager - Create task successfully', async () => {
    const newCreateTask = await request.newContext();
    let getCreateTaskResponse = await task.createTask(
      newCreateTask,
      token,
      StaticVariables.projectId,
      StaticVariables.userId,
    );
    expect(getCreateTaskResponse.data).toHaveProperty('title');
    expect(getCreateTaskResponse.data.title).toContain('Task Auto_');
    await newCreateTask.dispose();
  });

  test('Manager - Update task successfully', async () => {
    const newUpdateTask = await request.newContext();
    let getUpdateTaskResponse = await task.updateTask(newUpdateTask, token, createdTaskId);
    expect(getUpdateTaskResponse.data.title).toBe(StaticVariables.updatedTaskTitle);
    expect(getUpdateTaskResponse.data.description).toBe(StaticVariables.updatedTaskDesc);
    expect(getUpdateTaskResponse.data.status).toBe(StaticVariables.inprogressStatus);
    await newUpdateTask.dispose();
  });

  test('Manager - Assign task successfully', async () => {
    const newUpdateTask = await request.newContext();
    let getUpdateTaskResponse = await task.updateTask(newUpdateTask, token, createdTaskId);
    expect(getUpdateTaskResponse.data.title).toBe(StaticVariables.updatedTaskTitle);
    expect(getUpdateTaskResponse.data.description).toBe(StaticVariables.updatedTaskDesc);
    expect(getUpdateTaskResponse.data.status).toBe(StaticVariables.inprogressStatus);
    await newUpdateTask.dispose();
  });

  test('Manager - Get a task by ID - Forbidden', async () => {
    const newGetTask = await request.newContext();
    let getTaskResponse = await task.getTaskById(newGetTask, token, createdTaskId);
    expect(getTaskResponse.statusCode).toBe(403);
    await newGetTask.dispose();
  });

  test('Manager - Delete task - Forbidden', async () => {
    const newDeleteTask = await request.newContext();
    let deleteTaskResponse = await task.deleteTask(newDeleteTask, token, createdTaskId);
    expect(deleteTaskResponse.statusCode).toBe('403');
    await newDeleteTask.dispose();
  });
});
