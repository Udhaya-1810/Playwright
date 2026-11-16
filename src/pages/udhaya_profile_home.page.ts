import {test,expect, Locator} from '@playwright/test'
import { Page } from '@playwright/test' 

export class Profile_HomePage{

    readonly page: Page;
    readonly loggedin_as: Locator;
    readonly deleteAccount:Locator;
    readonly accountDeleted_text:Locator;
    readonly continue_CTA:Locator;
    readonly product:Locator;
    
    constructor(page:Page){
        this.page = page;
        this.loggedin_as = page.locator('b');
        this.deleteAccount = page.getByRole('link', { name: ' Delete Account' });
        this.accountDeleted_text = page.getByText('Account Deleted! Your account');
        this.continue_CTA = page.getByRole('link', { name: 'Continue' });
        this.product = page.getByRole('link', { name: ' Products' })

    }

}