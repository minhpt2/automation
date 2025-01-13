import { expect, request } from '@playwright/test';
import { StaticVariables } from '~/constants';
import { APIRequestContext } from '@playwright/test';
class task {
  async getAllTask(request: APIRequestContext, token: string) {
    const newGetAllTask = await request.get(StaticVariables.apiURL + '/api/tasks', {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
    return newGetAllTask.json();
  }

  async createTask(request: APIRequestContext, token: string, projectId: string, userId: string) {
    const newCreateTask = await request.post(StaticVariables.apiURL + '/api/tasks', {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      data: {
        title: 'Task Auto_' + Date.now(),
        description: 'Task Desc Auto_' + Date.now(),
        project: StaticVariables.projectId,
        assignees: [StaticVariables.userId],
      },
    });
    expect(newCreateTask.status()).toBe(201);
    return newCreateTask.json();
  }

  async getTaskById(request: APIRequestContext, token: string, taskId: string) {
    const newGetTaskByID = await request.get(StaticVariables.apiURL + '/api/tasks/' + taskId, {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
    return newGetTaskByID.json();
  }

  async updateTask(request: APIRequestContext, token: string, taskId: string) {
    const newUpdateTask = await request.patch(StaticVariables.apiURL + '/api/tasks/' + taskId, {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      data: {
        title: StaticVariables.updatedTaskTitle,
        description: StaticVariables.updatedTaskDesc,
        project: '05124e41-b36f-452c-b630-775332133b1c',
        assignees: ['6f15f979-0a25-46c6-ba1c-a1ddf59a3e97'],
        status: StaticVariables.inprogressStatus,
      },
    });
    expect(newUpdateTask.status()).toBe(200);
    return newUpdateTask.json();
  }
  async deleteTask(request: APIRequestContext, token: string, taskId: string) {
    const newDeleteTask = await request.delete(StaticVariables.apiURL + '/api/tasks/' + taskId, {
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
    // expect(newDeleteTask.status()).toBe(200);
    return newDeleteTask.json();
  }
}
export default new task();
