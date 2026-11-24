import {test,expect} from '@playwright/test'
import { Page } from '@playwright/test' 
import { CreateAccount } from '../../src/pages/udhaya_createAccount.page';
import { Login_Signup } from '../../src/pages/udhaya_login&signup.page';
import udhaya_config from '../testdata/udhaya_config.json' with { type: 'json' };
import { ProductDetailsPage } from '../../src/pages/udhaya_PDP.page';
import { Guest_Profile } from '../../src/pages/udhaya_guest_home.page';
import { Profile_HomePage } from '../../src/pages/udhaya_profile_home.page';
import { ProductListingPage } from '../../src/pages/udhaya_PLP.page';
import { Cart_Page } from '../../src/pages/udhaya_cart.page';
import { CheckOut_Page } from '../../src/pages/udhaya_checkout.page';
import { Payment_Page } from '../../src/pages/udhaya_payment.page';
import { Contact_Us_Page } from '../../src/pages/udhaya_contact_us.page';

let profile_home : Profile_HomePage
let plp : ProductListingPage
let pdp : ProductDetailsPage
let cart : Cart_Page
let checkout : CheckOut_Page
let payment: Payment_Page
let contact_us : Contact_Us_Page

test.describe('E2E_Automation_Checkout_Flow',() => {

    test.beforeEach('Login to the user profile',async({page})=>{

        const guest_user = new Guest_Profile(page)
        const log_sign = new Login_Signup(page)
        
        profile_home = new Profile_HomePage(page)
        plp = new ProductListingPage(page)
        cart = new Cart_Page(page)
        checkout = new CheckOut_Page(page)
        pdp = new ProductDetailsPage(page)
        payment = new Payment_Page(page)
        contact_us = new Contact_Us_Page(page)

        await page.goto(udhaya_config.WebSite.URL)
        await guest_user.signin_login.click()

        await log_sign.log_in(udhaya_config.login_data.username,udhaya_config.login_data.password)

    })

    test('AE-005 = PDP_Check', async({page})=>{
        
        await profile_home.navigation_products_Page();
        await plp.All_Prod_TitleValidation()
        await plp.view_product()
        await pdp.adClose()
        await pdp.PDP_details_check()
        console.log("Execution Completed")
        })
    
    test('AE-006 = Search Product',async({ page })=>{
        
        await profile_home.navigation_products_Page();
        await plp.searchProducts('dress')
        await plp.searchPage_TitleValidation()
    
        const products: string[] = await plp.searchProductsInfo.allTextContents();

        for (const product of products) {
        const isRelevant = product.includes('Sleeve') || product.includes('Dress');
        expect(isRelevant).toBeTruthy()
        }
        console.log("All the products are relevent to the search 'Dress' ")
    })

    test('AE-007 = Cart Value calculations',async({page})=>{

        await profile_home.navigation_products_Page();
        await plp.add_to_cart()
        await plp.moving_to_cart_page()
        try {
            await cart.list_of_products_check()
            console.log("Products are available")
            }
        catch(error){
            console.log("Products are not available")
        }
        await cart.moving_to_checkout_page()
        await checkout.verifyAddressmatch()
        await checkout.calculation_check()
        await plp.moving_to_cart_page()
        await cart.clear_cart()
        await cart.validate_CartEmpty()

    })
    test('AE-008 = Update qty and remove item from cart',async({page})=>{

        await profile_home.navigation_products_Page();
        await plp.view_product()
        await pdp.adClose()
        await pdp.update_qty("4")
        await pdp.add_to_cart()
        await plp.moving_to_cart_page()
        await cart.validateProd_qty("4")
        await cart.remove_products()
        await cart.validate_CartEmpty()
    })

    test('AE-009 = Checkout & Payment [Success Order]',async({page})=>{

        await profile_home.navigation_products_Page();
        await plp.add_to_cart()
        await plp.moving_to_cart_page()
        await cart.moving_to_checkout_page()
        await checkout.verifyAddressmatch()
        await checkout.calculation_check()
        await checkout.checkOut_Text("Placing Success Order - 2 products")
        await checkout.place_Order()
        await payment.fillCard_Details()
        await payment.confirm_Payment()
        await payment.verify_successOrder_text()

    })
    
    test('AE-010 = Contactus & Subscription',async({page})=>{

        await profile_home.navigation_contactUs_Page()
        await contact_us.fillDetails()
        await contact_us.submit_form()
        await contact_us.navigation_homePage()
        await profile_home.email_Subscription()

    })


    //--- Negative test cases ---

})
