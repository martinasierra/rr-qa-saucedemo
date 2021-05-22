import LoginPage from '../pageobjects/login.page';
import InventoryPage from '../pageobjects/inventory.page';

describe('Inventory of products', () => {

    it('should deny access when trying to visualize the inventory without log in', () => {
        InventoryPage.open();
        browser.pause(2000);
        expect(LoginPage.errorMsg).toHaveText('Epic sadface: You can only access \'/inventory.html\' when you are logged in.');
    });

    it('should login correctly when standard_user and correct password is entered',() => {
        LoginPage.open();
        LoginPage.inputUsername.setValue('standard_user');
        LoginPage.inputPassword.setValue('secret_sauce');
        LoginPage.btnSubmit.click();
        expect(InventoryPage.title).toHaveText('PRODUCTS');
    });

    it('should lead to the product page by clicking in the product image',() => {
        InventoryPage.imgBikeLight.click();
        browser.pause(2000);
        expect(browser).toHaveUrl('https://www.saucedemo.com/inventory-item.html?id=0');
    });

    it('should lead to the product page by clicking in the product image',() => {
        InventoryPage.open();
        browser.pause(1000);
        InventoryPage.titleBikeLight.click();
        browser.pause(2000);
        expect(browser).toHaveUrl('https://www.saucedemo.com/inventory-item.html?id=0');
    });

    it('should change Add to Cart button to Remove button and add a 1 to the shopping cart icon', () => {
        InventoryPage.btnB2products.click();
        browser.pause(3000);
        InventoryPage.btnAddBikeLight.click();
        expect(InventoryPage.btnRmBikeLight).toBeDisplayed();
        browser.pause(3000);
        expect(InventoryPage.btnRmBikeLight).toHaveText('REMOVE');
        expect(InventoryPage.badgeCart).toHaveText('1');
    });

    it('should change Remove button to Add to Cart button and remove the 1 from the shopping cart icon', () => {
        InventoryPage.btnRmBikeLight.click();
        expect(InventoryPage.btnAddBikeLight).toBeDisplayed();
        expect(InventoryPage.btnAddBikeLight).toHaveText('ADD TO CART');
        expect(InventoryPage.badgeCart).not.toBeDisplayed();
    }); 

   /* it('', () => {
        InventoryPage.itemPrice.forEach(element => {
            expect(element).toHaveTextContaining('$')
        });

    });*/ 
});

