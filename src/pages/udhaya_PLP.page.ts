import{Page,Locator} from '@playwright/test'

export class ProductListingPage{

    readonly page: Page;

    readonly allProd_text:Locator;
    readonly prod_A_view:Locator;
    readonly prod_search:Locator;
    readonly submit_search:Locator
    readonly product_A: Locator;
    readonly product_B:Locator;
    readonly search_header:Locator;
    readonly searchProductsInfo:Locator;
    readonly continueShopping:Locator;
    readonly cartPage: Locator;

    constructor(page: Page) {

        this.page = page;

        this.allProd_text = page.locator("//h2[text()='All Products']");
        this.product_A = page.locator('//a[@data-product-id="1"]').first();
        this.prod_A_view = page.getByRole('link', { name: ' View Product' }).first();
        this.product_B = page.locator('//a[@data-product-id="2"]').first()
        this.prod_search = page.getByRole('textbox', { name: 'Search Product' })
        this.submit_search = page.locator('#submit_search')
        this.search_header = page.locator("//h2[text()='Searched Products']")
        this.searchProductsInfo = page.locator('.productinfo.text-center');
        this.continueShopping = page.locator("//button[text()='Continue Shopping']")
        this.cartPage = page.locator("//a[text()=' Cart']")

    }

    async view_product()
    {
        await this.prod_A_view.click();
    }

    async add_to_cart(product_add_to_cart:Locator)
    {
        await product_add_to_cart.click()
        await this.continueShopping.click()
    }

    async moving_to_cart_page()
    {
        await this.cartPage.click()
    }
   
}
