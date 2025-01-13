import { test, expect, request } from '@playwright/test';
import { StaticVariables } from '~/constants';
import auth from '~/pages/api/auth';
import user from '~/pages/api/user';

let emailAdmin = StaticVariables.emailAdmin;
let passwordAdmin = StaticVariables.passwordAdmin;
let token: string;
let adminUserId: string;
let userIdToAssignRole = '1a73e6e8-38b4-4348-9f8f-6097a78901f3';
let adminRole = StaticVariables.adminRole;
let managerRole = StaticVariables.managerRole;
let contributorRole = StaticVariables.contributorRole;

test.describe('Admin - User tests', () => {
  test.beforeAll('Admin login', async () => {
    const newlogin = await request.newContext();
    let loginResponse = await auth.login(newlogin, emailAdmin, passwordAdmin);
    expect(loginResponse.data).toHaveProperty('token');
    token = loginResponse.data.token;
    adminUserId = loginResponse.data.user.id;
    await newlogin.dispose();
  });

  test('Admin - Get all user successfully', async () => {
    const newGetAllUser = await request.newContext();
    let getAllUserResponse = await user.getAllUsers(newGetAllUser, token);
    expect(getAllUserResponse).toHaveProperty('data');
    await newGetAllUser.dispose();
  });

  test('Admin - Get User by ID successfully', async () => {
    const newGetUserById = await request.newContext();
    let getUserByIdResponse = await user.getUserById(newGetUserById, token, adminUserId);
    expect(getUserByIdResponse.data.id).toBe(adminUserId);
    await newGetUserById.dispose();
  });

  test('Admin - Assign role to user successfully', async () => {
    const newAssignRole = await request.newContext();
    let assignRoleResponse = await user.assigRoleToUser(newAssignRole, token, userIdToAssignRole, managerRole);
    expect(assignRoleResponse.data.id).toBe(userIdToAssignRole);
    expect(assignRoleResponse.data.role.name).toBe(managerRole);
    await newAssignRole.dispose();
  });
});

test.describe('Manager - User tests', () => {
  test.beforeAll('Manager login', async () => {
    const newlogin = await request.newContext();
    let loginResponse = await auth.login(newlogin, StaticVariables.emailManager, StaticVariables.passwordManager);
    expect(loginResponse.data).toHaveProperty('token');
    token = loginResponse.data.token;
    adminUserId = loginResponse.data.user.id;
    await newlogin.dispose();
  });

  test('Manager - Get all user - Forbidden', async () => {
    const newGetAllUser = await request.newContext();
    let getAllUserResponse = await user.getAllUsers(newGetAllUser, token);
    expect(getAllUserResponse.statusCode).toBe(403);
    await newGetAllUser.dispose();
  });

  test('Manager - Get User by ID - Forbidden', async () => {
    const newGetUserById = await request.newContext();
    let getUserByIdResponse = await user.getUserById(newGetUserById, token, adminUserId);
    expect(getUserByIdResponse.statusCode).toBe(403);
    await newGetUserById.dispose();
  });

  test('Manager - Assign role to user - Forbidden', async () => {
    const newAssignRole = await request.newContext();
    let assignRoleResponse = await user.assigRoleToUser(newAssignRole, token, userIdToAssignRole, managerRole);
    expect(assignRoleResponse.statusCode).toBe(403);
    await newAssignRole.dispose();
  });
});

test.describe('Contributor - User tests', () => {
  test.beforeAll('Contributor login', async () => {
    const newlogin = await request.newContext();
    let loginResponse = await auth.login(
      newlogin,
      StaticVariables.emailContributor,
      StaticVariables.passwordContributor,
    );
    expect(loginResponse.data).toHaveProperty('token');
    token = loginResponse.data.token;
    adminUserId = loginResponse.data.user.id;
    await newlogin.dispose();
  });

  test('Contributor - Get all user - Forbidden', async () => {
    const newGetAllUser = await request.newContext();
    let getAllUserResponse = await user.getAllUsers(newGetAllUser, token);
    expect(getAllUserResponse.statusCode).toBe(403);
    await newGetAllUser.dispose();
  });

  test('Contributor - Get User by ID - Forbidden', async () => {
    const newGetUserById = await request.newContext();
    let getUserByIdResponse = await user.getUserById(newGetUserById, token, adminUserId);
    expect(getUserByIdResponse.statusCode).toBe(403);
    await newGetUserById.dispose();
  });

  test('Contributor - Assign role to user - Forbidden', async () => {
    const newAssignRole = await request.newContext();
    let assignRoleResponse = await user.assigRoleToUser(newAssignRole, token, userIdToAssignRole, managerRole);
    expect(assignRoleResponse.statusCode).toBe(403);
    await newAssignRole.dispose();
  });
});
