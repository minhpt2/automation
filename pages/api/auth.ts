import { test, expect, request } from '@playwright/test';
import { APIRequestContext } from '@playwright/test';
import { StaticVariables } from '../../helpers/staticVariables';

class auth{
    public token: string;
    public userid: string;
    async login(
        request: APIRequestContext,
        email: string, password: string) {
        const newLogin = await request.post(StaticVariables.apiURL + '/api/auth/login', {
                data: {
                    email: email,
                    password: password,
                }
            });
        expect(newLogin.status()).toBe(201);
        let responseBody = await newLogin.json();
        expect(responseBody.data).toHaveProperty('token');
        this.token = responseBody.data.token;
        this.userid = responseBody.data.user.id;
    }
}
export default new auth();