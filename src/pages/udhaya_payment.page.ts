import { Page, expect, Locator } from '@playwright/test';
import udhaya_config from '../../tests/testdata/udhaya_config.json' with {type:'json'};

export class Payment_Page {

    readonly page: Page;
    readonly name: Locator
    readonly cardNumber: Locator
    readonly cvvNumber: Locator
    readonly expiryMonth: Locator
    readonly expiryYear: Locator
    readonly confirmPayment: Locator
    readonly successOrder_text:Locator


    constructor(page:Page)
    {
        this.page = page;
        this.name = page.locator('input[name="name_on_card"]')
        this.cardNumber = page.locator('input[name="card_number"]')
        this.cvvNumber = page.getByRole('textbox', { name: 'ex.' })
        this.expiryMonth = page.getByRole('textbox', { name: 'MM' })
        this.expiryYear = page.getByRole('textbox', { name: 'YYYY' })
        this.confirmPayment = page.getByRole('button', { name: 'Pay and Confirm Order' })
        this.successOrder_text = page.getByText('Congratulations! Your order')
    }

   /* async fillCard_Details(payment_data:{
        name:string,
        cardNumber:,
        cvvNumber:string,
        expiryMonth:string,
        expiryYear:string
})*/
   async fillCard_Details() { 

        await this.name.fill(udhaya_config.pay_data.name)
        await this.cardNumber.fill(udhaya_config.pay_data.cardNumber)
        await this.cvvNumber.fill(udhaya_config.pay_data.cvvNumber)
        await this.expiryMonth.fill(udhaya_config.pay_data.expiryYear)
        await this.expiryYear.fill(udhaya_config.pay_data.expiryYear)

    }
    async confirm_Payment()
    {
        await this.confirmPayment.click()
    }
    async verify_successOrder_text()
    {
        await expect(this.successOrder_text).toBeVisible()
    }

}