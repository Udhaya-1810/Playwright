
import { Page, Locator } from '@playwright/test';

export class CreateAccount {

    readonly page: Page;
 
    readonly radio: Locator;
    readonly pass: Locator;
    readonly days: Locator;
    readonly months: Locator;
    readonly years: Locator;
    readonly first_name: Locator;
    readonly last_name: Locator;
    readonly company: Locator;
    readonly address: Locator;
    readonly address_2: Locator;
    readonly state: Locator;
    readonly city: Locator;
    readonly zipcode: Locator;
    readonly mobile: Locator;
    readonly createAccount: Locator;
    readonly accountCreated_text: Locator;
    readonly continue_CTA:Locator;

    constructor(page: Page) {

        this.page = page;


        this.radio = page.getByRole('radio', { name: 'Mr.' });
        this.pass = page.getByRole('textbox', { name: 'Password *' });
        this.days = page.locator('#days');
        this.months = page.locator('#months');
        this.years = page.locator('#years');
        this.first_name = page.getByRole('textbox', { name: 'First name *' });
        this.last_name = page.getByRole('textbox', { name: 'Last name *' });
        this.company = page.getByRole('textbox', { name: 'Company', exact: true });
        this.address = page.getByRole('textbox', { name: 'Address * (Street address, P.' });
        this.address_2 = page.getByRole('textbox', { name: 'Address 2' });
        this.state = page.getByRole('textbox', { name: 'State *' });
        this.city = page.getByRole('textbox', { name: 'City * Zipcode *' });
        this.zipcode = page.locator('#zipcode');
        this.mobile = page.getByRole('textbox', { name: 'Mobile Number *' });

        this.createAccount = page.getByRole('button', { name: 'Create Account' });
        this.accountCreated_text = page.getByText('Account Created! Congratulations! Your new account has been successfully');
        this.continue_CTA = page.getByRole('link', { name: 'Continue' });
    }

    async sign_up_newuser(data: {
        pass: string;
        days: string;
        months: string;
        years: string;
        first_name: string;
        last_name: string;
        company: string;
        address: string;
        address_2: string;
        state: string;
        city: string;
        zipcode: string;
        mobile: string;
    }) {

        await this.page.getByRole('radio', { name: 'Mr.' }).check();
        await this.pass.fill(data.pass);
        await this.days.selectOption(data.days);
        await this.months.selectOption(data.months);
        await this.years.selectOption(data.years);

        await this.first_name.fill(data.first_name);
        await this.last_name.fill(data.last_name);
        await this.company.fill(data.company);
        await this.address.fill(data.address);
        await this.address_2.fill(data.address_2);
        await this.state.fill(data.state);
        await this.city.fill(data.city);
        await this.zipcode.fill(data.zipcode);
        await this.mobile.fill(data.mobile);

        await this.createAccount.click();
    }
}
