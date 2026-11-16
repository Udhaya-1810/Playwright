import {test,expect} from '@playwright/test'
import { Page } from '@playwright/test' 
import { CreateAccount } from '../../src/pages/udhaya_createAccount.page';
import { Login_Signup } from '../../src/pages/udhaya_login&signup.page';
import udhaya_config from '../testdata/udhaya_config.json' with { type: 'json' };
import { ProductDetailsPage } from '../../src/pages/udhaya_PDP.page';
import { Guest_Profile } from '../../src/pages/udhaya_guest_home.page';
import { Profile_HomePage } from '../../src/pages/udhaya_profile_home.page';
import { ProductListingPage } from '../../src/pages/udhaya_PLP.page';

let profile_home : Profile_HomePage
let plp : ProductListingPage

test.describe('E2E_Automation_Checkout_Flow',() => {

    test.beforeEach('Login to the user profile',async({page})=>{

        const guest_user = new Guest_Profile(page)
        const log_sign = new Login_Signup(page)
        
        profile_home = new Profile_HomePage(page)
        plp = new ProductListingPage(page)

        await page.goto(udhaya_config.WebSite.URL)
        await guest_user.signin_login.click()

        await log_sign.log_in(udhaya_config.login_data.username,udhaya_config.login_data.password)

    })

    test('AE-005 = PDP_Check', async({page})=>{

        const pdp = new ProductDetailsPage(page)
        
        await page.pause()
        await profile_home.products.click();
        await expect(plp.allProd_text).toBeVisible();
        await plp.prod_A_view.click();
        const isAdVisible = await pdp.ad_Close.isVisible();
        if (isAdVisible)
        {
            await pdp.ad_Close.click();
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
        await pdp.PDP_details_check()
        console.log("Execution Completed")
        })
    })

    test.only('AE-006 = Search Product',async({ page })=>{
        
        await page.pause()
        await profile_home.products.click();
        await plp.prod_search.fill('dress')
        await plp.submit_search.click()
        expect(plp.search_header).toBeVisible(); 
    
        const products: string[] = await plp.searchProductsInfo.allTextContents();

        for (const product of products) {
        const isRelevant = product.includes('Sleeveless') || product.includes('Dress');
        expect(isRelevant).toBeTruthy();
        }
        console.log("All the products are relevent to the search 'Dress' ")
    })

    /*test('AE-007 = Cart Value calculations',async({page})=>{


    })
    test('AE-008 = Update qty and remove item from cart',async({page})=>{


    })
    test('AE-009 = Checkout & Payment [Success Order]',async({page})=>{


    })
    test('AE-010 = Contactus & Subscription',async({page})=>{


    })*/


    //--- Negative test cases ---


