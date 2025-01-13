import { test, expect, request, APIRequestContext } from '@playwright/test';
import { StaticVariables } from '~/constants';

class user {
  async getAllUsers(request: APIRequestContext, token: string) {
    const newGetAllUser = await request.get(StaticVariables.apiURL + '/api/users', {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
    return newGetAllUser.json();
  }

  async getUserById(request: APIRequestContext, token: string, userId: string) {
    const newGetUserById = await request.get(StaticVariables.apiURL + '/api/users/' + userId, {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
    return newGetUserById.json();
  }
  async assigRoleToUser(request: APIRequestContext, token: string, userId: string, role: string) {
    const newAssigRoleToUser = await request.patch(StaticVariables.apiURL + '/api/users/' + userId + '/role', {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      data: {
        role: role,
      },
    });
    return newAssigRoleToUser.json();
  }
}
export default new user();
