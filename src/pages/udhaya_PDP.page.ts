
import { Page, expect, Locator } from '@playwright/test';

export class ProductDetailsPage {

    readonly page: Page;

    readonly productName: Locator;
    readonly category: Locator;
    readonly price: Locator;
    readonly availability: Locator;
    readonly condition: Locator;
    readonly brand: Locator;

    readonly qty_update:Locator
    readonly addToCart:Locator

    readonly ad_Close:Locator;

    constructor(page: Page) {

        this.page = page;

        this.productName = page.getByRole('heading', {name: 'Blue Top'});
        this.category = page.getByText('Category: Women > Tops');
        this.price = page.locator("//span[text()='Rs. 500']");
        this.availability = page.getByText('Availability: In Stock');
        this.condition = page.getByText('Condition: New');
        this.brand = page.getByText('Brand: Polo');
        this.ad_Close = page.locator("//div[@id='dismiss-button-element']")
        this.qty_update = page.locator("//input[@id='quantity']")
        this.addToCart = page.locator("//button[contains(., 'Add to cart')]")
        
    }

    async PDP_details_check()
    {
        await expect(this.productName).toBeVisible();
        await expect(this.category).toBeVisible();
        await expect(this.price).toBeVisible();
        await expect(this.availability).toBeVisible();
        await expect(this.condition).toBeVisible();
        await expect(this.brand).toBeVisible();
    }
    async adClose() {

        const isAdVisible = await this.ad_Close.isVisible();
        if (isAdVisible)
        {
            await this.ad_Close.click();
            console.log("Advertisement closed");
        }
        else
            console.log("Advertisement not displayed");
        /*try
        {
            const isAdVisible = await pdp.ad_Close.isVisible();
            if (isAdVisible) {
                await pdp.ad_Close.click();
                console.log("Advertisement closed");
            }}
            else

        catch (error) {
            console.log("Advertisement handling failed");
        }*/
    }

    async update_qty(qty:string)
    {
        await this.qty_update.fill(qty)
    }
    async add_to_cart()
    {
        await this.addToCart.click()
    }
}
