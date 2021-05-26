import LoginPage from '../pageobjects/login.page';
import InventoryPage from '../pageobjects/inventory.page';
import CartPage from '../pageobjects/cart.page';

describe('Shopping cart', () => {

    it('should select a product and proceed to checkout',() => {
        LoginPage.open();
        LoginPage.login('standard_user','secret_sauce');
        browser.pause(2000);
        InventoryPage.btnAddTestTShirt.click();
        InventoryPage.btnCart.click();
        browser.pause(2000);
        CartPage.btnCheckOut.click()
        browser.pause(2000);
        expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html');
    }); 

    it('should return to the Inventory from the Cart by clicking in Continue Shopping', () => {
        InventoryPage.open();
        InventoryPage.btnAddFleeceJacket.click();
        browser.pause(2000);
        InventoryPage.btnCart.click();
        browser.pause(2000);
        CartPage.btnContinueShopping.click();
        browser.pause(2000);
        expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    });

    it('should return to the Inventory from the Cart by clicking in All Items', () => {
        InventoryPage.btnCart.click();
        InventoryPage.btnMenu.click();
        InventoryPage.btnAllItems.click();
        expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    });
});
