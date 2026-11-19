import { Page, expect, Locator } from '@playwright/test';

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

    async fillCard_Details(payment_data:{
        name:string,
        cardNumber:string,
        cvvNumber:string,
        expiryMonth:string,
        expiryYear:string
    })
    { 
        await this.name.fill(payment_data.name)
        await this.cardNumber.fill(payment_data.cardNumber)
        await this.cvvNumber.fill(payment_data.cvvNumber)
        await this.expiryMonth.fill(payment_data.expiryYear)
        await this.expiryYear.fill(payment_data.expiryYear)

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