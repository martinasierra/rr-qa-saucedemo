import LoginPage from '../pageobjects/login.page';
import InventoryPage from '../pageobjects/inventory.page';
import CartPage from '../pageobjects/cart.page';
import CheckoutPage from '../pageobjects/checkout.page';
const NumericRegex = /[-]{0,1}[\d]*[.]{0,1}[\d]+/;

describe('End to End Test', () => {

    it('should login',() => {
        LoginPage.open();
        LoginPage.login('standard_user','secret_sauce');
        browser.pause(2000);
        expect(InventoryPage.title).toHaveText('PRODUCTS');
        expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    }); 

    it('should order products by price Low to Hight', () => {
        InventoryPage.filterLoHi.click();
        browser.pause(4000);
        let itemsPrices = [];
        InventoryPage.itemsPrice.forEach(element => {
        let numPriceText = element.getText();
        let numPrice = parseFloat(numPriceText.match(NumericRegex));
        itemsPrices.push(numPrice);
        });
        let sorted;
        for (let i = 0; i < itemsPrices.length - 1; i++) { // Tried another way to check if the products are ordered
            if (itemsPrices[i] > itemsPrices[i+1]) {
                sorted = false;
                break;
            } else sorted = true;
        }
        browser.pause(2000);
        expect(sorted).toBeTruthy();
    });       

    it('should add one item to the cart', () => {
        InventoryPage.imgLinkSelector(0).click();
        InventoryPage.btnAddBikeLight.click();
        browser.pause(2000);
        expect(InventoryPage.btnRmBikeLight).toBeDisplayed();
        expect(InventoryPage.badgeCart).toHaveText('1');
    });

    it('should add another item to the cart', () => {
        CartPage.btnB2products.click();
        InventoryPage.titleLinkSelector(1).click();
        InventoryPage.btnAddBoltTShirt.click();
        browser.pause(2000);
        expect(InventoryPage.btnRmBoltTShirt).toBeDisplayed();
        expect(InventoryPage.badgeCart).toHaveText('2');
    });

    it('should add another item to the cart', () => {
        CartPage.btnB2products.click();
        InventoryPage.titleLinkSelector(5).click();
        InventoryPage.btnAddFleeceJacket.click();
        browser.pause(2000);
        expect(InventoryPage.btnRmFleeceJacket).toBeDisplayed();
        expect(InventoryPage.badgeCart).toHaveText('3');
    });

    it('should remove one item from the cart', () => {
        CartPage.btnB2products.click();
        InventoryPage.btnRmBoltTShirt.click();
        browser.pause(2000);
        expect(InventoryPage.badgeCart).toHaveText('2');
        expect(InventoryPage.btnAddBoltTShirt).toBeDisplayed();
    });

    it('cart should contain added items', () => {
        InventoryPage.btnCart.click();
        expect(InventoryPage.titleLinkSelector(5)).toBeDisplayed();
        expect(InventoryPage.titleLinkSelector(0)).toBeDisplayed();
        let price1 = InventoryPage.itemsPrice[0].getText();
        price1 = parseFloat(price1.match(NumericRegex));  
        expect(price1).toEqual(9.99);
        let price2 = InventoryPage.itemsPrice[1].getText();
        price2 = parseFloat(price2.match(NumericRegex));  
        browser.pause(2000);
        expect(price2).toEqual(49.99);
    });

    it('should checkout and complete information', () => {
        CartPage.btnCheckOut.click();
        CheckoutPage.checkout('Justine','Anderson','4400')
        expect(CheckoutPage.title).toHaveText('CHECKOUT: OVERVIEW');
        expect(InventoryPage.titleLinkSelector(5)).toBeDisplayed();
        expect(InventoryPage.titleLinkSelector(0)).toBeDisplayed();
        let total = CheckoutPage.total.getText();
        total = parseFloat(total.match(NumericRegex));
        let tax = CheckoutPage.tax.getText();
        tax = parseFloat(tax.match(NumericRegex));
        let expectedTax = 59.980000000000004 * 0.08;
        const taxRounded = Math.round(expectedTax * 100) / 100;
        browser.pause(2000);
        expect(tax).toBe(taxRounded);
        expect(total).toBe(taxRounded+59.980000000000004);
        expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html');
    });

    it('should finish purchase', () => {
        CheckoutPage.btnFinish.click();
        browser.pause(2000);
        expect(CheckoutPage.title).toHaveText('CHECKOUT: COMPLETE!');
        expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html'); 
    });

    it('should go back home', () => {
        CartPage.btnB2products.click();
        browser.pause(2000);
        expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        expect(InventoryPage.badgeCart).not.toExist();
    });

    it('should log out', () => {
        InventoryPage.btnMenu.click();
        InventoryPage.btnLogout.click();
        browser.pause(2000);
        expect(browser).toHaveUrl('https://www.saucedemo.com/');
    });
});