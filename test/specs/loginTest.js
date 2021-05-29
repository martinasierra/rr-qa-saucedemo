import LoginPage from '../pageobjects/login.page';
import InventoryPage from '../pageobjects/inventory.page';

describe('Login Form', () => {
   
    describe('Standard User', () => {
        it('should login correctly when standard_user and correct password is entered', () => {
            LoginPage.open();
            LoginPage.login('standard_user','secret_sauce');
            browser.pause(2000);
            expect(InventoryPage.title).toHaveText('PRODUCTS');
        });

        it('should show Password is required message when empty password is entered', () => {
            LoginPage.open();
            LoginPage.login('standard_user','');
            browser.pause(2000);
            expect(LoginPage.divErrorMsg).toBeDisplayed();
            expect(LoginPage.errorMsg).toHaveText('Epic sadface: Password is required');
        });

        it('should show Username is required message when empty username is entered', () => {
            LoginPage.open();
            LoginPage.login('','secret_sauce');
            browser.pause(2000);
            expect(LoginPage.divErrorMsg).toBeDisplayed();
            expect(LoginPage.errorMsg).toHaveText('Epic sadface: Username is required');
        });

        it('should show Username is required message when empty data is entered', () => {
            LoginPage.open();
            LoginPage.login('','');
            browser.pause(2000);
            expect(LoginPage.divErrorMsg).toBeDisplayed();
            expect(LoginPage.errorMsg).toHaveText('Epic sadface: Username is required');
        });

        it('should show error message when wrong data is in both inputs entered', () => {
            LoginPage.open();
            LoginPage.login('example@gmail.com','password');
            browser.pause(2000);
            expect(LoginPage.divErrorMsg).toBeDisplayed();
            expect(LoginPage.errorMsg).toHaveText('Epic sadface: Username and password do not match any user in this service');
        });
    });

    describe('Lock out User', () => {
        it('should deny access and show error message', () => {
            LoginPage.open();
            LoginPage.login('locked_out_user','secret_sauce');
            browser.pause(2000);
            expect(LoginPage.divErrorMsg).toBeDisplayed();
            expect(LoginPage.errorMsg).toHaveText('Epic sadface: Sorry, this user has been locked out.');
        });
    });

    describe('Problem User', () => {
        it('should log in in a version wrong images', () => {
            LoginPage.open();
            LoginPage.login('problem_user','secret_sauce');
            browser.pause(2000);
            expect(InventoryPage.imgPrblmUsr).
            toHaveAttributeContaining('src', '/static/media/sl-404.168b1cce.jpg'); // Wrong image
        }); 
    });

    describe('Close error alert', () => {
        it('should back form to normal', () => {
            LoginPage.open();
            LoginPage.login('','');
            LoginPage.errorCross.click();
            expect(LoginPage.errorMsg).not.toBeDisplayed();
            expect(LoginPage.inputUsername).not.toHaveElementClass('input_error form_input error');
        });
    });
});