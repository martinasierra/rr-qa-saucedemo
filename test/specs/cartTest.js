import LoginPage from '../pageobjects/login.page';
import InventoryPage from '../pageobjects/inventory.page';
import CartPage from '../pageobjects/cart.page';

describe('Shopping cart', () => {

    it('should add a product to cart, visualize it in the cart and proceed to checkout',() => {
        LoginPage.open();
        LoginPage.login('standard_user','secret_sauce');
        browser.pause(2000);
        InventoryPage.btnAddTestTShirt.click();
        InventoryPage.btnCart.click();
        expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
        expect(InventoryPage.titleLinkSelector(3)).toBeDisplayed();
        CartPage.btnCheckOut.click()
        browser.pause(2000);
        expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html');
    }); 

    it('should add all the products to cart, visualize them in the cart and proceed to checkout',() => {
        InventoryPage.open();
        InventoryPage.btnAddBikeLight.click();
        InventoryPage.btnAddBackpack.click();
        InventoryPage.btnAddBoltTShirt.click();
        InventoryPage.btnAddFleeceJacket.click();
        InventoryPage.btnAddOnesie.click();   
        InventoryPage.btnCart.click();
        expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');         
        for (let index = 0; index < 5; index++) {
            expect(InventoryPage.titleLinkSelector(index)).toBeDisplayed();
        }
        CartPage.btnCheckOut.click()
        browser.pause(2000);
        expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html');
    }); 

    it('should remove all products from the cart', () => {
        CartPage.open();
        InventoryPage.btnRmBikeLight.click();
        InventoryPage.btnRmBackpack.click();
        InventoryPage.btnRmBoltTShirt.click();
        InventoryPage.btnRmFleeceJacket.click();
        InventoryPage.btnRmTestTShirt.click();
        InventoryPage.btnRmOnesie.click();
        browser.pause(2000);
        expect(CartPage.rmCartItems.length).toEqual(6);
    });

    it('should return to the Inventory by clicking in Continue Shopping', () => {
    CartPage.btnContinueShopping.click();
    expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    });

    it('should return to the Inventory by clicking in All Items', () => {
        InventoryPage.btnCart.click();
        InventoryPage.btnMenu.click();
        InventoryPage.btnAllItems.click();
        expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    });
});
