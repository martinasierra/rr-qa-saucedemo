import LoginPage from '../pageobjects/login.page';
import ProductsPage from '../pageobjects/products.page';

describe('Login Form', () => {
   
    it('should login correctly when standard_user and correct password is entered', () => {
        LoginPage.open();
        LoginPage.inputUsername.setValue('standard_user');
        LoginPage.inputPassword.setValue('secret_sauce');
        LoginPage.btnSubmit.click();
        browser.pause(2000);
        expect(ProductsPage.title).toHaveText('PRODUCTS');
    });

    it('should show Password is required message when empty password is entered', () => {
        LoginPage.open();
        LoginPage.inputUsername.setValue('standard_user');
        LoginPage.inputPassword.setValue('');
        LoginPage.btnSubmit.click();
        browser.pause(2000);
        expect(LoginPage.divErrorMsg).toBeDisplayed();
        expect(LoginPage.errorMsg).toHaveText('Epic sadface: Password is required');
    });

    it('should show Username is required message when empty username is entered', () => {
        LoginPage.open();
        LoginPage.inputUsername.setValue('');
        LoginPage.inputPassword.setValue('secret_sauce');
        LoginPage.btnSubmit.click();
        browser.pause(2000);
        expect(LoginPage.divErrorMsg).toBeDisplayed();
        expect(LoginPage.errorMsg).toHaveText('Epic sadface: Username is required');
    });

    it('should show Username is required message when empty data is entered', () => {
        LoginPage.open();
        LoginPage.inputUsername.setValue('');
        LoginPage.inputPassword.setValue('');
        LoginPage.btnSubmit.click();
        browser.pause(2000);
        expect(LoginPage.divErrorMsg).toBeDisplayed();
        expect(LoginPage.errorMsg).toHaveText('Epic sadface: Username is required');
    });

    it('should show error message when wrong data is in both inputs entered', () => {
        LoginPage.open();
        LoginPage.inputUsername.setValue('example@gmail.com');
        LoginPage.inputPassword.setValue('password');
        LoginPage.btnSubmit.click();
        browser.pause(2000);
        expect(LoginPage.divErrorMsg).toBeDisplayed();
        expect(LoginPage.errorMsg).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });

    it('should deny access when logging in with locked out user', () => {
        LoginPage.open();
        LoginPage.inputUsername.setValue('locked_out_user');
        LoginPage.inputPassword.setValue('secret_sauce');
        LoginPage.btnSubmit.click();
        browser.pause(2000);
        expect(LoginPage.divErrorMsg).toBeDisplayed();
        expect(LoginPage.errorMsg).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });

    it('should log in in a version with faults', () => {
        LoginPage.open();
        LoginPage.inputUsername.setValue('problem_user');
        LoginPage.inputPassword.setValue('secret_sauce');
        LoginPage.btnSubmit.click();
        browser.pause(2000);
        expect(ProductsPage.imgBackpack).not.toHaveAttributeContaining('src', '/static/media/sauce-backpack-1200x1500.34e7aa42.jpg');
        expect(ProductsPage.imgBikeLight).not.toHaveAttributeContaining('src', '/static/media/bike-light-1200x1500.a0c9caae.jpg');
        expect(ProductsPage.imgBoltTShirt).not.toHaveAttributeContaining('src', '/static/media/bolt-shirt-1200x1500.c0dae290.jpg"');
    }); 
});