import { Page, expect, Locator } from '@playwright/test';

export class Cart_Page {    

    readonly page:Page;
    readonly prod_A_headerCart:Locator
    readonly prod_B_headerCart:Locator
    readonly prod_A_priceCart:Locator
    readonly prod_B_priceCart:Locator
    readonly removeProduct_A: Locator
    readonly removeProduct_B: Locator
    readonly proceedCheckout:Locator
    readonly cartEmptyText:Locator
    readonly prod_Qty:Locator

    constructor(page:Page)
    {   
        this.page = page;

        this.prod_A_headerCart = page.locator("//a[text()='Blue Top']")
        this.prod_B_headerCart = page.locator("//a[text()='Men Tshirt']")
        this.prod_A_priceCart = page.locator("//p[text()='Rs. 500']").first()
        this.prod_B_priceCart = page.locator("//p[text()='Rs. 400']").first()
        this.removeProduct_A = page.locator("//a[@data-product-id='1']")
        this.removeProduct_B = page.locator("//a[@data-product-id='2']")
        this.proceedCheckout = page.locator("//a[text()='Proceed To Checkout']")
        this.cartEmptyText = page.locator("#empty_cart > p")
        this.prod_Qty = page.locator('.cart_quantity button')
    }


    async list_of_products_check()
    {
        //ensure the list of the added products available at cart page

        await expect(this.prod_A_headerCart).toBeVisible()
        await expect(this.prod_A_priceCart).toBeVisible()
        await expect(this.prod_B_headerCart).toBeVisible()
        await expect(this.prod_B_priceCart).toBeVisible()

    }

    async moving_to_checkout_page()
    {
        await this.proceedCheckout.click()
    }

    async remove_products()
    {
        // remove the products from the cart by passing values as a parameter
        await this.removeProduct_A.click()
    }
    async clear_cart()
    {
        await this.removeProduct_A.click()
        await this.removeProduct_B.click()
    }
    async validate_CartEmpty()
    {
        await expect(this.cartEmptyText).toContainText("Cart is empty!")
    }
    async validateProd_qty(qty:String)
    {   
    
        const actualQty = await this.prod_Qty.innerText();

       expect(actualQty).toBe(qty);
        
}
}
