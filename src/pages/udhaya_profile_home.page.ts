import {test,expect, Locator} from '@playwright/test'
import { Page } from '@playwright/test' 

export class Profile_HomePage{

    readonly page: Page;
    readonly loggedin_as: Locator;
    readonly deleteAccount:Locator;
    readonly accountDeleted_text:Locator;
    readonly continue_CTA:Locator;
    readonly products:Locator;
    readonly contactUs:Locator;
    readonly subscription:Locator;
    readonly subscribe:Locator
    readonly substext:Locator
    
    
    constructor(page:Page){
        this.page = page;
        this.loggedin_as = page.locator('b');
        this.deleteAccount = page.getByRole('link', { name: ' Delete Account' });
        this.accountDeleted_text = page.getByText('Account Deleted! Your account');
        this.continue_CTA = page.getByRole('link', { name: 'Continue' });
        this.products = page.locator("//a[text()=' Products']")
        this.contactUs = page.locator("//a[text()=' Contact us']")
        this.subscription = page.locator("//input[@id='susbscribe_email']")
        this.subscribe = page.locator("//button[@id='subscribe']")
        this.substext = page.locator("//div[text()='You have been successfully subscribed!']")

        }

    async navigation_contactUs_Page()
    {
        await this.contactUs.click()
    }

    async email_Subscription(email:string)
    {
        await this.subscription.fill(email)
        await this.subscribe.click()
        expect(this.substext).toBeVisible()
    }
}