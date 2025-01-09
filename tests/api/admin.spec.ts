import { test, expect, request } from '@playwright/test';
import auth from '../../pages/api/auth.ts';
import project from '../../pages/api/project.ts';
import { StaticVariables } from '../../helpers/staticVariables.ts';
import task from '../../pages/api/task.ts';

let token: string;
let userId: string;
let userIdUpdated = '6f15f979-0a25-46c6-ba1c-a1ddf59a3e97';
test.beforeAll('admin login', async () => {
    const newLogin = await request.newContext();
    await auth.login(newLogin, StaticVariables.emailAdmin, StaticVariables.passwordAdmin);
    token = auth.token;
    userId = auth.userid;
    await newLogin.dispose();
});
test.describe('Admin - Task test', () => {
    test('Get all task', async () => {
        const newGetAllTask = await request.newContext();
        let getAllTaskResponse = await task.getAllTask(newGetAllTask, token); 
        expect(getAllTaskResponse).toHaveProperty('data');
        await newGetAllTask.dispose();
    });
});

test.describe('Admin - Project test', () => {
    test('Get all projects', async() => {
        const newGetAllProject = await request.newContext();
        let getAllProjectResponse = await project.getAllProject(newGetAllProject, token);
        expect(getAllProjectResponse).toHaveProperty('data');
        await newGetAllProject.dispose();
    });

    test('Create a projects', async() => {
        const newCreateProject = await request.newContext();
        let createProjectResponse = await project.createProject(newCreateProject, token, userId);
        expect(createProjectResponse).toHaveProperty('data');
        await newCreateProject.dispose();

    });

    test('Update a projects', async() => {
        //Create project
        const newCreateProject = await request.newContext();
        let createProjectResponse = await project.createProject(newCreateProject, token, userId);
        let projectId = await createProjectResponse.data.id;
        await newCreateProject.dispose();
        // Update project
        const newUpdateProject = await request.newContext();
        let updateProjectResponse = await project.updateProject(newUpdateProject, token, userIdUpdated, projectId);
        expect(updateProjectResponse).toHaveProperty('data');
        expect(updateProjectResponse.data.id).toBe(projectId);
        expect(updateProjectResponse.data.name).toBe(StaticVariables.updatedProjectName);
        expect(updateProjectResponse.data.description).toBe(StaticVariables.updatedProjectDesc);

        await newUpdateProject.dispose();
        //Delete project
        const newDeleteProject = await request.newContext();
        let deleteProjectResponse = await project.deleteProject(newDeleteProject, token, projectId);
        await newDeleteProject.dispose();
    });

    test('Delete a projects', async() => {
        //Create project
        const newCreateProject = await request.newContext();
        let createProjectResponse = await project.createProject(newCreateProject, token, userId);
        let projectId = await createProjectResponse.data.id;
        await newCreateProject.dispose();
        //Delete project
        const newDeleteProject = await request.newContext();
        let deleteProjectResponse = await project.deleteProject(newDeleteProject, token, projectId);
        await newDeleteProject.dispose();
        //Get deleted project to verify
        const newGetProjectById = await request.newContext();
        let getProjectById = await project.getProjectById(newGetProjectById, token, projectId)
        expect(getProjectById.data).not.toHaveProperty('name');
    });
})