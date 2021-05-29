import LoginPage from '../pageobjects/login.page';
import InventoryPage from '../pageobjects/inventory.page';
import CartPage from '../pageobjects/cart.page';
import CheckoutPage from '../pageobjects/checkout.page';
const NumericRegex = /[-]{0,1}[\d]*[.]{0,1}[\d]+/;

describe('Shopping cart', () => {

    describe('Basic Flow', () => {

        it('should select a product, proceed to checkout and continue', () => {
            LoginPage.open();
            LoginPage.login('standard_user','secret_sauce');
            InventoryPage.btnAddTestTShirt.click();
            InventoryPage.btnCart.click();
            CartPage.btnCheckOut.click();
            CheckoutPage.checkout('Natalie', 'Dawn', '2700');
            let total = CheckoutPage.total.getText();
            total = parseFloat(total.match(NumericRegex));
            let subtotal = CheckoutPage.subtotal.getText();
            subtotal = parseFloat(subtotal.match(NumericRegex));
            let tax = CheckoutPage.tax.getText();
            tax = parseFloat(tax.match(NumericRegex));
            let expectedTax = subtotal * 0.08
            const taxRounded = Math.round(expectedTax * 100) / 100
            expect(InventoryPage.titleLinkSelector(3)).toBeDisplayed();
            expect(CheckoutPage.title).toHaveText('CHECKOUT: OVERVIEW');
            expect(subtotal).toBe(15.99);
            expect(tax).toBe(taxRounded);
            expect(total).toBe(taxRounded+subtotal);
            expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html');
        });

        it('should select a product, proceed to checkout, continue and finish', () => {
            InventoryPage.open();
            InventoryPage.btnAddBackpack.click();
            InventoryPage.btnCart.click();
            CartPage.btnCheckOut.click();
            CheckoutPage.checkout(' ', ' ', ' '); //The app does not validate what is entered in the input fields
            CheckoutPage.btnFinish.click();
            expect(CheckoutPage.title).toHaveText('CHECKOUT: COMPLETE!');
            expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html');
        });

        it('should select a product, proceed to checkout, continue, finish, and go back home', () => {
            InventoryPage.open();
            InventoryPage.btnAddBackpack.click();
            InventoryPage.btnCart.click();
            CartPage.btnCheckOut.click();
            CheckoutPage.checkout('12345','6789','myZipCode');//The app does not validate what is entered in the input fields
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
            CheckoutPage.checkout('', '', '');
            expect(LoginPage.divErrorMsg).toBeDisplayed();
            expect(LoginPage.errorMsg).toHaveText('Error: First Name is required');
        }); 

        it('should show error message when giving empty last name and zip code', () => {
            CheckoutPage.open('step-one');
            CheckoutPage.checkout('Natalie','','');
            expect(LoginPage.divErrorMsg).toBeDisplayed();
            expect(LoginPage.errorMsg).toHaveText('Error: Last Name is required');
        });

        it('should show error message when giving empty zip code', () => {
            CheckoutPage.open('step-one');
            CheckoutPage.checkout('Natalie', 'Dawn','');
            expect(LoginPage.divErrorMsg).toBeDisplayed();
            expect(LoginPage.errorMsg).toHaveText('Error: Postal Code is required');
        });

        it('should show error message when giving empty last name', () => {
            CheckoutPage.open('step-one');
            CheckoutPage.checkout('Natalie','', '2700');
            expect(LoginPage.divErrorMsg).toBeDisplayed();
            expect(LoginPage.errorMsg).toHaveText('Error: Last Name is required');
        });

        it('should show error message when giving empty first name', () => {
            CheckoutPage.open('step-one');
            CheckoutPage.checkout('','Dawn', '2700');
            expect(LoginPage.divErrorMsg).toBeDisplayed();
            expect(LoginPage.errorMsg).toHaveText('Error: First Name is required');
        });
    });

    describe('Close error alert', () => {
        it('should back form to normal', () => {
            CheckoutPage.open('step-one');
            browser.pause(2000);
            CheckoutPage.checkout('','','');
            browser.pause(2000);
            CheckoutPage.errorCross.click();
            expect(CheckoutPage.errorMsg).not.toBeDisplayed();
            expect(CheckoutPage.inputFirstName).not.toHaveElementClass('input_error form_input error');
            expect(CheckoutPage.inputLastName).not.toHaveElementClass('input_error form_input error');
            expect(CheckoutPage.inputPostalCode).not.toHaveElementClass('input_error form_input error');
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

        it('should checkout and then cancel', () => {
            CheckoutPage.open('step-one');
            CheckoutPage.checkout('Natalie', 'Dawn', '2700');
            CheckoutPage.btnCancel.click();
            expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        });
    });
});