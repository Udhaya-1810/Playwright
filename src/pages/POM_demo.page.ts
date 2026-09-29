import {Page, Locator} from '@playwright/test'


export class POM_Demo{

    readonly page:Page
    readonly username:Locator
    readonly password:Locator
    readonly login_click:Locator
    readonly burgermenu:Locator
    readonly logout_click:Locator

    constructor(page:Page)
    {
        this.page = page
        this.username = page.getByRole('textbox',{name:'Username'})
        this.password = page.getByRole('textbox',{name:'Password'})
        this.login_click = page.locator("#login-button")
        this.burgermenu = page.locator("#react-burger-menu-btn")
        this.logout_click = page.locator("#logout_sidebar_link")

    }
    async login(user:string,pass:string){
        await this.username.fill(user)
        await this.password.fill(pass)
        await this.login_click.click()
    }
    async logout()
    {
        await this.burgermenu.click()
        await this.logout_click.click()
    }
}