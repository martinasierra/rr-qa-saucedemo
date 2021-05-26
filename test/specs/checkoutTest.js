import LoginPage from '../pageobjects/login.page';
import InventoryPage from '../pageobjects/inventory.page';
import CartPage from '../pageobjects/cart.page';
import CheckoutPage from '../pageobjects/checkout.page';

describe('Shopping cart', () => {

    describe('Basic Flow', () => {
        
        it('should select a product, proceed to checkout and continue', () => {
            LoginPage.open();
            LoginPage.login('standard_user','secret_sauce');
            InventoryPage.btnAddTestTShirt.click();
            InventoryPage.btnCart.click();
            CartPage.btnCheckOut.click();
            CheckoutPage.inputFirstName.setValue('Natalie');
            CheckoutPage.inputLastName.setValue('Dawn');
            CheckoutPage.inputPostalCode.setValue('2700');
            CheckoutPage.btnContinue.click();
            expect(CheckoutPage.title).toHaveText('CHECKOUT: OVERVIEW');
            expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html');
        });

        it('should select a product, proceed to checkout, continue and finish', () => {
            InventoryPage.open();
            InventoryPage.btnAddBackpack.click();
            InventoryPage.btnCart.click();
            CartPage.btnCheckOut.click();
            CheckoutPage.inputFirstName.setValue(' '); //The app does not validate what is entered in this input field
            CheckoutPage.inputLastName.setValue(' ');  //The app does not validate what is entered in this input field
            CheckoutPage.inputPostalCode.setValue(' '); //The app does not validate what is entered in this input field
            CheckoutPage.btnContinue.click();
            CheckoutPage.btnFinish.click();
            expect(CheckoutPage.title).toHaveText('CHECKOUT: COMPLETE!');
            expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html');
        });

        it('should select a product, proceed to checkout, continue, finish, and go back home', () => {
            InventoryPage.open();
            InventoryPage.btnAddBackpack.click();
            InventoryPage.btnCart.click();
            CartPage.btnCheckOut.click();
            CheckoutPage.inputFirstName.setValue(' '); 
            CheckoutPage.inputLastName.setValue(' ');  
            CheckoutPage.inputPostalCode.setValue(' ');
            CheckoutPage.btnContinue.click();
            CheckoutPage.btnFinish.click();
            CartPage.btnB2products.click();
            expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        });

    });

    describe('Wrong Inputs', () => {

        it('should show error message when giving empty information', () => {
            InventoryPage.open();
            InventoryPage.btnAddTestTShirt.click();
            InventoryPage.btnAddBackpack.click();
            InventoryPage.btnCart.click();
            browser.pause(2000);
            CartPage.btnCheckOut.click();
            CheckoutPage.inputFirstName.setValue('');
            CheckoutPage.inputLastName.setValue('');
            CheckoutPage.inputPostalCode.setValue('');
            CheckoutPage.btnContinue.click();
            expect(LoginPage.divErrorMsg).toBeDisplayed();
            expect(LoginPage.errorMsg).toHaveText('Error: First Name is required');
        }); 

        it('should show error message when giving empty last name and zip code', () => {
            CheckoutPage.open('step-one');
            CheckoutPage.inputFirstName.setValue('Natalie');
            CheckoutPage.btnContinue.click();
            expect(LoginPage.divErrorMsg).toBeDisplayed();
            expect(LoginPage.errorMsg).toHaveText('Error: Last Name is required');
        });

        it('should show error message when giving empty zip code', () => {
            CheckoutPage.open('step-one');
            CheckoutPage.inputFirstName.setValue('Natalie');
            CheckoutPage.inputLastName.setValue('Dawn');
            CheckoutPage.btnContinue.click();
            expect(LoginPage.divErrorMsg).toBeDisplayed();
            expect(LoginPage.errorMsg).toHaveText('Error: Postal Code is required');
        });

        it('should show error message when giving empty last name', () => {
            CheckoutPage.open('step-one');
            CheckoutPage.inputFirstName.setValue('Natalie');
            CheckoutPage.inputPostalCode.setValue('3000');
            CheckoutPage.btnContinue.click();
            expect(LoginPage.divErrorMsg).toBeDisplayed();
            expect(LoginPage.errorMsg).toHaveText('Error: Last Name is required');
        });

        it('should show error message when giving empty first name', () => {
            CheckoutPage.open('step-one');
            CheckoutPage.inputLastName.setValue('Dawn');
            CheckoutPage.inputPostalCode.setValue('3000');
            CheckoutPage.btnContinue.click();
            expect(LoginPage.divErrorMsg).toBeDisplayed();
            expect(LoginPage.errorMsg).toHaveText('Error: First Name is required');
        });

    });

    describe('Cancel Purchase', () => {

        it('should select a product, proceed to checkout and then cancel', () => {
            InventoryPage.open();
            InventoryPage.btnAddBikeLight.click();
            InventoryPage.btnCart.click();
            browser.pause(2000);
            CartPage.btnCheckOut.click();
            CheckoutPage.btnCancel.click();
            expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
        }); 

        it('should  and then cancel', () => {
            CheckoutPage.open('step-one');
            CheckoutPage.inputFirstName.setValue('Natalie');
            CheckoutPage.inputLastName.setValue('Dawn');
            CheckoutPage.inputPostalCode.setValue('3000');
            CheckoutPage.btnContinue.click();
            CheckoutPage.btnCancel.click();
            expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        });

    });
});