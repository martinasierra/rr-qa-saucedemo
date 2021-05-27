import LoginPage from '../pageobjects/login.page';
import InventoryPage from '../pageobjects/inventory.page';
import CartPage from '../pageobjects/cart.page';
import CheckoutPage from '../pageobjects/checkout.page';

describe('End to End Test 1', () => {

    it('should login',() => {
        LoginPage.open();
        LoginPage.login('standard_user','secret_sauce');
        expect(InventoryPage.title).toHaveText('PRODUCTS');
        expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    }); 

    it('should add one item to the cart', () => {
        InventoryPage.imgBikeLight.click();
        InventoryPage.btnAddBikeLight.click();
        expect(InventoryPage.badgeCart).toHaveText('1');
    });

    it('should add another item to the cart', () => {
        CartPage.btnB2products.click();
        InventoryPage.titleFleeceJacket.click();
        InventoryPage.btnAddFleeceJacket.click();
        expect(InventoryPage.badgeCart).toHaveText('2');
    });

    it('should checkout and complete information', () => {
        InventoryPage.btnCart.click();
        CartPage.btnCheckOut.click();
        CheckoutPage.inputFirstName.setValue('Justine'); 
        CheckoutPage.inputLastName.setValue('Anderson');  
        CheckoutPage.inputPostalCode.setValue('4400');
        CheckoutPage.btnContinue.click();
        expect(CheckoutPage.title).toHaveText('CHECKOUT: OVERVIEW');
        expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html');
    });

    it('should finish purchase', () => {
        CheckoutPage.btnFinish.click();
        expect(CheckoutPage.title).toHaveText('CHECKOUT: COMPLETE!');
        expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html');
    });

    it('should go back home', () => {
        CartPage.btnB2products.click();
        expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    });

    it('should log out', () => {
        InventoryPage.btnMenu.click();
        InventoryPage.btnLogout.click();
        expect(browser).toHaveUrl('https://www.saucedemo.com/');
    });
});