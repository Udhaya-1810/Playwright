import { Page, expect, Locator } from '@playwright/test';
import udhaya_config from '../../tests/testdata/udhaya_config.json' with {type:'json'};

export class Contact_Us_Page {

    readonly page:Page;
    readonly name:Locator;
    readonly email:Locator;
    readonly subject:Locator;
    readonly description:Locator;
    readonly selectFile:Locator;
    readonly submit:Locator;
    readonly submit_text:Locator;
    readonly homePage:Locator;

    
    constructor(page:Page)
    {
        this.page = page;
        this.name = page.getByRole('textbox', { name: 'Name' })
        this.email = page.getByRole('textbox', { name: 'Email', exact: true })
        this.subject = page.getByRole('textbox', { name: 'Subject' })
        this.description = page.getByRole('textbox', { name: 'Your Message Here' })
        this.selectFile = page.getByRole('button', { name: 'Choose File' })
        this.submit = page.getByRole('button', { name: 'Submit' })
        this.submit_text = page.locator('#contact-page').getByText('Success! Your details have')
        this.homePage = page.locator("//span[text()=' Home']")

    }

    /*async fillDetails(Contact_us_data:{
        name:string,
        email:string,
        subject:string,
        description:string,
        selectFile:string
    })*/
   async fillDetails()
    {
        await this.name.fill(udhaya_config.Contactus_data.name)
        await this.email.fill(udhaya_config.Contactus_data.email)
        await this.subject.fill(udhaya_config.Contactus_data.subject)
        await this.description.fill(udhaya_config.Contactus_data.description)
        await this.selectFile.setInputFiles(udhaya_config.Contactus_data.selectFile)
        
    }
    async submit_form()
    {   
        const dialogPromise = this.page.waitForEvent('dialog').then(async (dialog) => {

        const message = dialog.message();

        console.log('Dialog Type:', dialog.type());
        console.log('Dialog Message:', message);

        await dialog.accept();
        })
        await this.submit.click()
        await expect(this.submit_text).toBeVisible()
    }

    async navigation_homePage()
    {
        await this.homePage.click()
    }

}

