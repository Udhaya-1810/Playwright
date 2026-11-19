import { Page, expect, Locator } from '@playwright/test';

export class CheckOut_Page {

    readonly page: Page;
    readonly deliveryAddress: Locator
    readonly billingAddress: Locator
    readonly productRows: Locator;
    readonly grandTotalLocator: Locator;
    readonly checkoutText: Locator
    readonly placeOrder: Locator

    constructor(page:Page)
    {
        this.page = page;
        this.deliveryAddress = page.locator('#address_delivery li:not(.address_title)');
        this.billingAddress = page.locator('#address_invoice li:not(.address_title)');
        this.productRows = page.locator('#cart_info tbody tr[id^="product-"]');
        this.grandTotalLocator = page.locator('#cart_info tbody tr:last-child .cart_total_price')
        this.checkoutText = page.locator("//textarea[@name='message']")
        this.placeOrder = page.locator("//a[text()='Place Order']")
    }

    async verifyAddressmatch()
    {
        const del_Add = this.deliveryAddress.allInnerTexts()
        const bill_add = this.billingAddress.allInnerTexts()
        expect(del_Add).toStrictEqual(bill_add)
        console.log("Delivery Address matched with Billing address")
    }

    async calculation_check()
    {
        let calculatedGrandTotal = 0;

        for (const row of await this.productRows.all()) {
        const priceText = await row.locator('.cart_price p').innerText();
        const qtyText = await row.locator('.cart_quantity button').innerText();
        const rowTotalText = await row.locator('.cart_total .cart_total_price').innerText();

        const price = Number(priceText.split(' ')[1]);
        const qty = Number(qtyText);
        const displayedRowTotal = Number(rowTotalText.split(' ')[1]);

        const expectedRowTotal = price * qty;
        expect(displayedRowTotal, 'calculation Mismatched').toBe(expectedRowTotal);

        calculatedGrandTotal += expectedRowTotal;
    }

    const grandTotalText = await this.grandTotalLocator.innerText();
    const displayedGrandTotal = Number(grandTotalText.split(' ')[1]);
    expect(displayedGrandTotal, 'calculation match').toBe(calculatedGrandTotal);
    console.log(`Calculation matched: Total Amount is ${displayedGrandTotal}`);
    }

    async checkOut_Text(text:string){

        await this.checkoutText.fill(text)
    }

    async place_Order()
    {
        await this.placeOrder.click()
    }

}
