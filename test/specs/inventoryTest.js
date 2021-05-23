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
        CartPage.btnB2products.click();
        browser.pause(1000);
        InventoryPage.btnAddBikeLight.click();
        expect(InventoryPage.btnRmBikeLight).toBeDisplayed();
        browser.pause(1000);
        expect(InventoryPage.btnRmBikeLight).toHaveText('REMOVE');
        expect(InventoryPage.badgeCart).toHaveText('1');
    });

    it('should change Remove button to Add to Cart button and remove the 1 from the shopping cart icon', () => {
        InventoryPage.btnRmBikeLight.click();
        expect(InventoryPage.btnAddBikeLight).toBeDisplayed();
        expect(InventoryPage.btnAddBikeLight).toHaveText('ADD TO CART');
        expect(InventoryPage.badgeCart).not.toBeDisplayed();
    }); 

    it('should lead to shopping cart', () => {
        InventoryPage.btnCart.click();
        expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
    }); 

    it('should check that the social media links are correct', () => {
        InventoryPage.open();
        expect(InventoryPage.btnTwitterLink).toHaveHref('https://twitter.com/saucelabs');
        expect(InventoryPage.btnFacebookLink).toHaveHref('https://www.facebook.com/saucelabs');
        expect(InventoryPage.btnTLinkedinLink).toHaveHref('https://www.linkedin.com/company/sauce-labs/');
    });

    it('should open side menu', () => {
        InventoryPage.btnMenu.click();
        browser.pause(2000);
        expect(InventoryPage.wprapMenu).toBeDisplayed();
    });

    it('should close side menu', () => {
        InventoryPage.btnCrossMenu.click();
        expect(InventoryPage.wprapMenu).toHaveAttribute('hidden', 'true');
        expect(InventoryPage.wprapMenu).not.toBeDisplayed();
    }); 

    it('should redirect to Sauce Labs page', () => {
        InventoryPage.btnMenu.click();
        browser.pause(4000);
        expect(InventoryPage.btnAboutLink).toHaveHref('https://saucelabs.com/');
        InventoryPage.btnAboutLink.click();
        expect(browser).toHaveUrl('https://saucelabs.com/');
    });

    it('should logout', () => {LoginPage.open();
        LoginPage.inputUsername.setValue('standard_user');
        LoginPage.inputPassword.setValue('secret_sauce');
        LoginPage.btnSubmit.click();
        InventoryPage.btnMenu.click();
        browser.pause(4000);
        InventoryPage.btnLogout.click();
        expect(browser).toHaveUrl('https://www.saucedemo.com/');
    });

    it('should reset app state', () => {
        LoginPage.inputUsername.setValue('standard_user');
        LoginPage.inputPassword.setValue('secret_sauce');
        LoginPage.btnSubmit.click();
        InventoryPage.btnAddTestTShirt.click();
        InventoryPage.btnMenu.click();
        browser.pause(4000);
        InventoryPage.btnResetApp.click();
        expect(InventoryPage.badgeCart).not.toExist();

    });

    it('should validate that all prices have an $', () => {
        InventoryPage.itemPrice.forEach(element => {
            expect(element).toHaveTextContaining('$')
        });

    });

});

