import {test,expect} from '@playwright/test'
import { Page } from '@playwright/test' 
import { CreateAccount } from '../../src/pages/udhaya_createAccount.page';
import { Login_Signup } from '../../src/pages/udhaya_login&signup.page';
import udhaya_config from '../testdata/udhaya_config.json' with { type: 'json' };
import { Profile_HomePage } from '../../src/pages/udhaya_profile_home.page';
import { Guest_Profile } from '../../src/pages/udhaya_guest_home.page';

let log_sign : Login_Signup;

test.describe('Login_Automation_Check_Flow',() => {

    test.beforeEach('Login steps to signin and login',async({page})=>{

        const guest_user = new Guest_Profile(page)
        
        log_sign = new Login_Signup(page)

        await page.goto(udhaya_config.WebSite.URL)
        await guest_user.signin_login.click()

    })
    
    test('AE-001 = Register a new user', async ({ page }) => {
    
        const acc_add = new CreateAccount(page);
        //const log_sign = new Login_Signup(page)
        const profile_home = new Profile_HomePage(page)

        await log_sign.sign_up(udhaya_config.new_user.sign_up.user_name,udhaya_config.new_user.sign_up.email)
        await acc_add.sign_up_newuser(udhaya_config.new_user.data);
        await expect(acc_add.accountCreated_text).toBeVisible();
        await acc_add.continue_CTA.click();
        await expect(profile_home.loggedin_as).toContainText(udhaya_config.new_user.sign_up.user_name)
        await profile_home.deleteAccount.click();
        await expect(profile_home.accountDeleted_text).toBeVisible();
        await profile_home.continue_CTA.click();
    });

    test('AE-002 = Successfull Login', async({ page })=>{

        //const log_sign = new Login_Signup(page)
        const profile_home = new Profile_HomePage(page)

        await log_sign.log_in(udhaya_config.login_data.username,udhaya_config.login_data.password)
        await expect(profile_home.loggedin_as).toContainText('test')
    })

    test('AE-003 = Login check with invalid data', async({ page})=>{

        //const log_sign = new Login_Signup(page)

        await log_sign.log_in(udhaya_config.failure_login_data.username,udhaya_config.failure_login_data.password)
        await expect(log_sign.login_error).toBeVisible();
    })

    test('AE-004 = Signup with existing account', async({ page })=> {
        
        //const log_sign = new Login_Signup(page)

        await log_sign.sign_up(udhaya_config.login_data.username,udhaya_config.login_data.password)
        await expect(log_sign.signup_error).toBeVisible();
    })
   
})

