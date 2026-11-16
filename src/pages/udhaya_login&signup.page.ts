import{Page,Locator} from '@playwright/test'

export class Login_Signup{

    readonly page: Page;
    readonly new_user:Locator;
    readonly new_email:Locator;
    readonly signup:Locator;
    readonly username:Locator;
    readonly password:Locator;
    readonly login:Locator;
    readonly login_error:Locator;
    readonly signup_error:Locator;

    constructor(page: Page) {
        this.page = page;
        this.new_user = page.getByPlaceholder('Name'),
        this.new_email = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address'),
        this.signup = page.getByRole('button', { name: 'Signup' }),
        this.username = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address'),
        this.password = page.getByRole('textbox', { name: 'Password' }),
        this.login = page.getByRole('button', { name: 'Login' })

        this.login_error = page.getByText('Your email or password is')
        this.signup_error = page.getByText('Email Address already exist!')
    }
    async log_in(user:string,pass:string){
        await this.username.fill(user)
        await this.password.fill(pass)
        await this.login.click()
    }
    async sign_up(new_u:string,new_e:string){
        await this.new_user.fill(new_u)
        await this.new_email.fill(new_e)
        await this.signup.click()
    }

}
