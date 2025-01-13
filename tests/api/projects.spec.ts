import { test, expect, request } from '@playwright/test';
import auth from '~/pages/api/auth';
import project from '~/pages/api/project';
import { StaticVariables } from '~/constants';

let token: string;
let userId: string;
let userIdUpdated = '6f15f979-0a25-46c6-ba1c-a1ddf59a3e97';
test.describe('Admin - Project test', () => {
  test.beforeAll('admin login', async () => {
    const newLogin = await request.newContext();
    await auth.login(newLogin, StaticVariables.emailAdmin, StaticVariables.passwordAdmin);
    token = auth.token;
    userId = auth.userid;
    await newLogin.dispose();
  });
  let createdProjectId: string;
  test.beforeEach('Create Project data to test', async ({}, testInfo) => {
    if (testInfo.title === 'Admin - Create project successfully') {
      console.log('Skip setup for Create project test case');
      return;
    }
    const newCreateProject = await request.newContext();
    let createProjectResponse = await project.createProject(newCreateProject, token, userId);
    createdProjectId = await createProjectResponse.data.id;
    await newCreateProject.dispose();
  });
  test.afterEach('Delete created Project data', async ({}, testInfo) => {
    if (
      testInfo.title === 'Admin - Delete project successfully' ||
      testInfo.title === 'Admin - Create project successfully'
    ) {
      console.log('Skip cleanup data Delete project test case');
      return;
    }
    const newDeleteProject = await request.newContext();
    let deleteProjectResponse = await project.deleteProject(newDeleteProject, token, createdProjectId);
    await newDeleteProject.dispose();
  });

  test('Admin - Get all projects successfully', async () => {
    const newGetAllProject = await request.newContext();
    let getAllProjectResponse = await project.getAllProject(newGetAllProject, token);
    expect(getAllProjectResponse).toHaveProperty('data');
    await newGetAllProject.dispose();
  });

  test('Admin - Create project successfully', async () => {
    const newCreateProject = await request.newContext();
    let createProjectResponse = await project.createProject(newCreateProject, token, userId);
    expect(createProjectResponse).toHaveProperty('data');
    await newCreateProject.dispose();
  });

  test('Admin - Update project successfully', async () => {
    const newUpdateProject = await request.newContext();
    let updateProjectResponse = await project.updateProject(newUpdateProject, token, userIdUpdated, createdProjectId);
    expect(updateProjectResponse).toHaveProperty('data');
    expect(updateProjectResponse.data.id).toBe(createdProjectId);
    expect(updateProjectResponse.data.name).toBe(StaticVariables.updatedProjectName);
    expect(updateProjectResponse.data.description).toBe(StaticVariables.updatedProjectDesc);
    await newUpdateProject.dispose();
  });

  test('Admin - Delete project successfully', async () => {
    const newDeleteProject = await request.newContext();
    let deleteProjectResponse = await project.deleteProject(newDeleteProject, token, createdProjectId);
    expect(deleteProjectResponse.data.affected).toBe(1);
    await newDeleteProject.dispose();
    const newGetProjectById = await request.newContext();
    let getProjectById = await project.getProjectById(newGetProjectById, token, createdProjectId);
    expect(getProjectById.data).not.toHaveProperty('name');
  });

  test('Admin - Get project by Id successfully', async () => {
    const newGetProjectById = await request.newContext();
    let getProjectById = await project.getProjectById(newGetProjectById, token, createdProjectId);
    expect(getProjectById.data.id).toBe(createdProjectId);
  });
});

test.describe('Contributor - Project test', () => {
  let createdProjectId: string;
  test.beforeAll('Admin login', async () => {
    const newLogin = await request.newContext();
    await auth.login(newLogin, StaticVariables.emailAdmin, StaticVariables.passwordAdmin);
    token = auth.token;
    userId = auth.userid;
    await newLogin.dispose();

    const newCreateProject = await request.newContext();
    let createProjectResponse = await project.createProject(newCreateProject, token, userId);
    createdProjectId = await createProjectResponse.data.id;
    await newCreateProject.dispose();
  });
  test.beforeEach('Contributor login', async () => {
    const newLogin = await request.newContext();
    await auth.login(newLogin, StaticVariables.emailContributor, StaticVariables.passwordContributor);
    token = auth.token;
    userId = auth.userid;
    await newLogin.dispose();
  });

  test('Contributor - Get project by Id successfully', async () => {
    const newGetProjectById = await request.newContext();
    let getProjectById = await project.getProjectById(newGetProjectById, token, createdProjectId);
    expect(getProjectById.data.id).toBe(createdProjectId);
    await newGetProjectById.dispose();
  });

  test('Contributor - Get all projects - Forbidden', async () => {
    const newGetAllProject = await request.newContext();
    let getAllProjectResponse = await project.getAllProject(newGetAllProject, token);
    expect(getAllProjectResponse.statusCode).toBe(403);
    await newGetAllProject.dispose();
  });

  test('Contributor - Create project - Forbidden', async () => {
    const newCreateProject = await request.newContext();
    let createProjectResponse = await project.createProject(newCreateProject, token, userId);
    expect(createProjectResponse.statusCode).toBe(403);
    await newCreateProject.dispose();
  });

  test('Contributor - Update project - Forbidden', async () => {
    const newUpdateProject = await request.newContext();
    let updateProjectResponse = await project.updateProject(newUpdateProject, token, userIdUpdated, createdProjectId);
    expect(updateProjectResponse.statusCode).toBe(403);
    await newUpdateProject.dispose();
  });

  test('Contributor - Delete project - Forbidden', async () => {
    const newDeleteProject = await request.newContext();
    let deleteProjectResponse = await project.deleteProject(newDeleteProject, token, createdProjectId);
    expect(deleteProjectResponse.statusCode).toBe(403);
    await newDeleteProject.dispose();
  });
});

test.describe('Manager - Project test', () => {
  test.beforeAll('Manager login', async () => {
    const newLogin = await request.newContext();
    await auth.login(newLogin, StaticVariables.emailManager, StaticVariables.passwordManager);
    token = auth.token;
    userId = auth.userid;
    await newLogin.dispose();
  });
  let createdProjectId: string;
  test.beforeEach('Create Project data to test', async ({}, testInfo) => {
    if (testInfo.title === 'Manager - Create project successfully') {
      console.log('Skip setup for Create project test case');
      return;
    }
    const newCreateProject = await request.newContext();
    let createProjectResponse = await project.createProject(newCreateProject, token, userId);
    createdProjectId = await createProjectResponse.data.id;
    await newCreateProject.dispose();
  });
  test.afterEach('Delete created Project data', async ({}, testInfo) => {
    if (
      testInfo.title === 'Manager - Delete project successfully' ||
      testInfo.title === 'Manager - Create project successfully'
    ) {
      console.log('Skip cleanup data Delete project test case');
      return;
    }
    const newDeleteProject = await request.newContext();
    let deleteProjectResponse = await project.deleteProject(newDeleteProject, token, createdProjectId);
    await newDeleteProject.dispose();
  });

  test('Manager - Get all projects successfully', async () => {
    const newGetAllProject = await request.newContext();
    let getAllProjectResponse = await project.getAllProject(newGetAllProject, token);
    expect(getAllProjectResponse).toHaveProperty('data');
    await newGetAllProject.dispose();
  });

  test('Manager - Create project successfully', async () => {
    const newCreateProject = await request.newContext();
    let createProjectResponse = await project.createProject(newCreateProject, token, userId);
    expect(createProjectResponse).toHaveProperty('data');
    await newCreateProject.dispose();
  });

  test('Manager - Update project successfully', async () => {
    const newUpdateProject = await request.newContext();
    let updateProjectResponse = await project.updateProject(newUpdateProject, token, userIdUpdated, createdProjectId);
    expect(updateProjectResponse).toHaveProperty('data');
    expect(updateProjectResponse.data.id).toBe(createdProjectId);
    expect(updateProjectResponse.data.name).toBe(StaticVariables.updatedProjectName);
    expect(updateProjectResponse.data.description).toBe(StaticVariables.updatedProjectDesc);
    await newUpdateProject.dispose();
  });

  test('Manager - Delete project successfully', async () => {
    const newDeleteProject = await request.newContext();
    let deleteProjectResponse = await project.deleteProject(newDeleteProject, token, createdProjectId);
    expect(deleteProjectResponse.data.affected).toBe(1);
    await newDeleteProject.dispose();
    const newGetProjectById = await request.newContext();
    let getProjectById = await project.getProjectById(newGetProjectById, token, createdProjectId);
    expect(getProjectById.data).not.toHaveProperty('name');
  });

  test('Manager - Get project by Id successfully', async () => {
    const newGetProjectById = await request.newContext();
    let getProjectById = await project.getProjectById(newGetProjectById, token, createdProjectId);
    expect(getProjectById.data.id).toBe(createdProjectId);
  });
});
