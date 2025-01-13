import { expect } from '@playwright/test';
import { APIRequestContext } from '@playwright/test';
import { StaticVariables } from '~/constants';

class project {
  async getAllProject(request: APIRequestContext, token: string) {
    const newGetAllProject = await request.get(StaticVariables.apiURL + '/api/projects', {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
    return newGetAllProject.json();
  }

  async createProject(request: APIRequestContext, token: string, userId: string) {
    const newCreateProject = await request.post(StaticVariables.apiURL + '/api/projects', {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: 'Project name Auto_' + Date.now(),
        description: 'Project des Auto_' + Date.now(),
        members: [userId],
        // members: ['6f15f979-0a25-46c6-ba1c-a1ddf59a3e97']
      },
    });
    return newCreateProject.json();
  }

  async updateProject(request: APIRequestContext, token: string, userId: string, projectId: string) {
    const newUpdateProject = await request.patch(StaticVariables.apiURL + '/api/projects/' + projectId, {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: StaticVariables.updatedProjectName,
        description: StaticVariables.updatedProjectDesc,
        members: [userId],
      },
    });
    return newUpdateProject.json();
  }

  async getProjectById(request: APIRequestContext, token: string, projectId: string) {
    const newGetProject = await request.get(StaticVariables.apiURL + '/api/projects/' + projectId, {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
    expect(newGetProject.status()).toBe(200);
    return newGetProject.json();
  }

  async deleteProject(request: APIRequestContext, token: string, deleteId: string) {
    const newDeletProject = await request.delete(StaticVariables.apiURL + '/api/projects/' + deleteId, {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
    return newDeletProject.json();
  }
}
export default new project();
