
import { Page, expect, Locator } from '@playwright/test';

export class ProductDetailsPage {

    readonly page: Page;

    readonly productName: Locator;
    readonly category: Locator;
    readonly price: Locator;
    readonly availability: Locator;
    readonly condition: Locator;
    readonly brand: Locator;

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

}
