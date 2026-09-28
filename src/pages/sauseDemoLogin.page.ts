import{Page,Locator} from '@playwright/test'

export class Login{
    readonly page: Page;
    readonly username:Locator;
    readonly password:Locator;

    constructor(page: Page) {
        this.page = page;
        this.username=page.getByRole('textbox',{name:'Username'})
        this.password=page.getByRole('textbox',{name:'Password'})
    }
async login(user:string,pass:string){
    await this.username.fill(user)
    await this.password.fill(pass)
}
async validatePagetitle(expected:string){


}
}