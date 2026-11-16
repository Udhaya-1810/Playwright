import { Page, Locator } from '@playwright/test';

export class Guest_Profile {

    readonly page: Page;
    readonly signin_login: Locator;
    
    constructor(page:Page)
    {
        this.page = page;
        this.signin_login = page.getByRole('link', { name: ' Signup / Login' });
    }

    }