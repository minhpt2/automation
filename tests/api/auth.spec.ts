import { test, expect, request } from '@playwright/test';
import { StaticVariables } from '~/constants';
import auth from '~/pages/api/auth';

let email: string;
let password = '12345678';
let newPassword = '12345679';
let emailToTestChangeEmail = 'emailToTestChangeEmail@autotestmail.com';
let changedEmail = 'changedEmail@autotestmail.com';
let token: string;
let token1: string;
test.describe('Common - Auth tests', () => {
  test('User register successfully', async () => {
    const newRegister = await request.newContext();
    let registerResponse = await auth.register(newRegister);
    expect(registerResponse).toHaveProperty('data');
    email = registerResponse.data.user.email;
    await newRegister.dispose();
  });

  test('User login successfully', async () => {
    const newlogin = await request.newContext();
    let loginResponse = await auth.login(newlogin, email, password);
    expect(loginResponse.data).toHaveProperty('token');
    await newlogin.dispose();
  });
});

test.describe('Admin - Auth tests', () => {
  test('Admin - Reset password successfully', async () => {
    const newlogin = await request.newContext();
    let loginResponse = await auth.login(newlogin, StaticVariables.emailAdmin_1, StaticVariables.passwordAdmin_1);
    expect(loginResponse.data).toHaveProperty('token');
    token = loginResponse.data.token;
    await newlogin.dispose();

    const newResetPw = await request.newContext();
    let resetPwResponse = await auth.resetPassword(newResetPw, token, StaticVariables.emailAdmin_1, newPassword);
    expect(resetPwResponse.data.message).toBe('Password reset successfully');
    await newResetPw.dispose();

    // login with new password
    const newlogin1 = await request.newContext();
    let loginResponse1 = await auth.login(newlogin1, StaticVariables.emailAdmin_1, newPassword);
    token1 = loginResponse1.data.token;
    expect(loginResponse1.data).toHaveProperty('token');
    await newlogin1.dispose();

    // reset to old password
    const newResetPw1 = await request.newContext();
    let resetPwResponse1 = await auth.resetPassword(
      newResetPw1,
      token1,
      StaticVariables.emailAdmin_1,
      StaticVariables.passwordAdmin_1,
    );
    expect(resetPwResponse1.data.message).toBe('Password reset successfully');
    await newResetPw1.dispose();
  });

  test('Admin - Change email successfully', async () => {
    const newlogin = await request.newContext();
    let loginResponse = await auth.login(newlogin, StaticVariables.emailAdmin_1, StaticVariables.passwordAdmin_1);
    expect(loginResponse.data).toHaveProperty('token');
    token = loginResponse.data.token;
    await newlogin.dispose();

    const newChangeEmail = await request.newContext();
    let changeEmailResponse = await auth.changeEmail(
      newChangeEmail,
      token,
      changedEmail,
      StaticVariables.passwordAdmin_1,
    );
    expect(changeEmailResponse.data.message).toBe('Email changed successfully');
    await newChangeEmail.dispose();

    const newlogin1 = await request.newContext();
    let loginResponse1 = await auth.login(newlogin1, changedEmail, StaticVariables.passwordAdmin_1);
    expect(loginResponse1.data).toHaveProperty('token');
    token1 = loginResponse.data.token;
    await newlogin.dispose();

    const newChangeEmail1 = await request.newContext();
    let changeEmailResponse1 = await auth.changeEmail(
      newChangeEmail1,
      token1,
      StaticVariables.emailAdmin_1,
      StaticVariables.passwordAdmin_1,
    );
    expect(changeEmailResponse1.data.message).toBe('Email changed successfully');
    await newChangeEmail1.dispose();
  });
});

test.describe('Manager - Auth tests', () => {
  test('Manager - Reset password successfully', async () => {
    const newlogin = await request.newContext();
    let loginResponse = await auth.login(newlogin, StaticVariables.emailManager, StaticVariables.passwordManager);
    expect(loginResponse.data).toHaveProperty('token');
    token = loginResponse.data.token;
    await newlogin.dispose();

    const newResetPw = await request.newContext();
    let resetPwResponse = await auth.resetPassword(newResetPw, token, StaticVariables.emailManager, newPassword);
    expect(resetPwResponse.data.message).toBe('Password reset successfully');
    await newResetPw.dispose();

    // login with new password
    const newlogin1 = await request.newContext();
    let loginResponse1 = await auth.login(newlogin1, StaticVariables.emailManager, newPassword);
    token1 = loginResponse1.data.token;
    expect(loginResponse1.data).toHaveProperty('token');
    await newlogin1.dispose();

    // reset to old password
    const newResetPw1 = await request.newContext();
    let resetPwResponse1 = await auth.resetPassword(
      newResetPw1,
      token1,
      StaticVariables.emailManager,
      StaticVariables.passwordManager,
    );
    expect(resetPwResponse1.data.message).toBe('Password reset successfully');
    await newResetPw1.dispose();
  });

  test('Manager - Change email successfully', async () => {
    const newlogin = await request.newContext();
    let loginResponse = await auth.login(newlogin, StaticVariables.emailManager, StaticVariables.passwordManager);
    expect(loginResponse.data).toHaveProperty('token');
    token = loginResponse.data.token;
    await newlogin.dispose();

    const newChangeEmail = await request.newContext();
    let changeEmailResponse = await auth.changeEmail(
      newChangeEmail,
      token,
      changedEmail,
      StaticVariables.passwordManager,
    );
    expect(changeEmailResponse.data.message).toBe('Email changed successfully');
    await newChangeEmail.dispose();

    const newlogin1 = await request.newContext();
    let loginResponse1 = await auth.login(newlogin1, changedEmail, StaticVariables.passwordManager);
    expect(loginResponse1.data).toHaveProperty('token');
    token1 = loginResponse.data.token;
    await newlogin.dispose();

    const newChangeEmail1 = await request.newContext();
    let changeEmailResponse1 = await auth.changeEmail(
      newChangeEmail1,
      token1,
      StaticVariables.emailManager,
      StaticVariables.passwordManager,
    );
    expect(changeEmailResponse1.data.message).toBe('Email changed successfully');
    await newChangeEmail1.dispose();
  });
});

test.describe('Contributor - Auth tests', () => {
  test('Contributor - Reset password successfully', async () => {
    const newlogin = await request.newContext();
    let loginResponse = await auth.login(
      newlogin,
      StaticVariables.emailContributor,
      StaticVariables.passwordContributor,
    );
    expect(loginResponse.data).toHaveProperty('token');
    token = loginResponse.data.token;
    await newlogin.dispose();

    const newResetPw = await request.newContext();
    let resetPwResponse = await auth.resetPassword(newResetPw, token, StaticVariables.emailContributor, newPassword);
    expect(resetPwResponse.data.message).toBe('Password reset successfully');
    await newResetPw.dispose();

    // login with new password
    const newlogin1 = await request.newContext();
    let loginResponse1 = await auth.login(newlogin1, StaticVariables.emailContributor, newPassword);
    token1 = loginResponse1.data.token;
    expect(loginResponse1.data).toHaveProperty('token');
    await newlogin1.dispose();

    // reset to old password
    const newResetPw1 = await request.newContext();
    let resetPwResponse1 = await auth.resetPassword(
      newResetPw1,
      token1,
      StaticVariables.emailContributor,
      StaticVariables.passwordContributor,
    );
    expect(resetPwResponse1.data.message).toBe('Password reset successfully');
    await newResetPw1.dispose();
  });

  test('Contributor - Change email successfully', async () => {
    const newlogin = await request.newContext();
    let loginResponse = await auth.login(
      newlogin,
      StaticVariables.emailContributor,
      StaticVariables.passwordContributor,
    );
    expect(loginResponse.data).toHaveProperty('token');
    token = loginResponse.data.token;
    await newlogin.dispose();

    const newChangeEmail = await request.newContext();
    let changeEmailResponse = await auth.changeEmail(
      newChangeEmail,
      token,
      changedEmail,
      StaticVariables.passwordContributor,
    );
    expect(changeEmailResponse.data.message).toBe('Email changed successfully');
    await newChangeEmail.dispose();

    const newlogin1 = await request.newContext();
    let loginResponse1 = await auth.login(newlogin1, changedEmail, StaticVariables.passwordContributor);
    expect(loginResponse1.data).toHaveProperty('token');
    token1 = loginResponse.data.token;
    await newlogin.dispose();

    const newChangeEmail1 = await request.newContext();
    let changeEmailResponse1 = await auth.changeEmail(
      newChangeEmail1,
      token1,
      StaticVariables.emailContributor,
      StaticVariables.passwordContributor,
    );
    expect(changeEmailResponse1.data.message).toBe('Email changed successfully');
    await newChangeEmail1.dispose();
  });
});
