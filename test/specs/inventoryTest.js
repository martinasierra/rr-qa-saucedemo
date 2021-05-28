import LoginPage from '../pageobjects/login.page';
import InventoryPage from '../pageobjects/inventory.page';
import CartPage from '../pageobjects/cart.page';
const NumericRegex = /[-]{0,1}[\d]*[.]{0,1}[\d]+/;

describe('Products Inventory', () => {

    describe('Access', () => {
        it('should deny access when trying to visualize the inventory without log in', () => {
            InventoryPage.open();
            browser.pause(2000);
            expect(LoginPage.errorMsg).toHaveText('Epic sadface: You can only access \'/inventory.html\' when you are logged in.');
        });
        it('should allow access to Products Inventory',() => {
            LoginPage.open();
            LoginPage.login('standard_user','secret_sauce');
            expect(InventoryPage.title).toHaveText('PRODUCTS');
        }); 
    });

    describe('Filters', () => {
        it('should show dropdown optins when clicking it', () => {
            InventoryPage.dropdownFilter.click();
            expect(InventoryPage.filterAZ).toBeDisplayed();
            expect(InventoryPage.filterZA).toBeDisplayed();
            expect(InventoryPage.filterLoHi).toBeDisplayed();
            expect(InventoryPage.filterLoHi).toBeDisplayed();
        });

        it('should select filter to be Z to A and order it', () => {
            InventoryPage.filterZA.click();
            browser.pause(2000);
            let sortedElementsNames = [];
            InventoryPage.itemsName.forEach(element => {
                sortedElementsNames.push(element.getText());
            });
            let mockedSortedNames = [];
            InventoryPage.itemsName.forEach(element => {
            mockedSortedNames.push(element.getText());
            });
            mockedSortedNames = mockedSortedNames.sort(function (a, b) {
                if (a > b) return -1;
                else if (a < b) return 1;
                return 0;
            });
            expect(sortedElementsNames).toEqual(mockedSortedNames);
        });

        it('should select filter to be A to Z and order it', () => {
            InventoryPage.filterAZ.click();
            browser.pause(2000);
            let sortedElementsNames = [];
            InventoryPage.itemsName.forEach(element => {
                sortedElementsNames.push(element.getText());
            });
            let mockedSortedNames = [];
            InventoryPage.itemsName.forEach(element => {
                mockedSortedNames.push(element.getText());
            });
            mockedSortedNames = mockedSortedNames.sort();
            expect(sortedElementsNames).toEqual(mockedSortedNames);
        });

        it('should select filter to be Low to High Price and order it', () =>{
            InventoryPage.filterLoHi.click();
            browser.pause(2000);
            let sortedElementsPrices = [];
            InventoryPage.itemsPrice.forEach(element => {
                let numPriceText = element.getText();
                let numPrice = parseFloat(numPriceText.match(NumericRegex));
                sortedElementsPrices.push(numPrice);
            });
            let mockedSortedPrices = [];
            InventoryPage.itemsPrice.forEach(element => {
                let numPriceText = element.getText();
                let numPrice = parseFloat(numPriceText.match(NumericRegex));
                mockedSortedPrices.push(numPrice);
            });
            mockedSortedPrices = mockedSortedPrices.sort((a,b)=>a-b);
            expect(sortedElementsPrices).toEqual(mockedSortedPrices);
        });
    });

    describe('Prices', () => {
        it('should have an $', () => {
            InventoryPage.itemsPrice.forEach(element => {
                expect(element).toHaveTextContaining('$')
            });
        });

        it('should be differents than zero', () => {
            InventoryPage.itemsPrice.forEach(element => {
            let numPriceText = element.getText();
            let numPrice = parseFloat(numPriceText.match(NumericRegex));  
            expect(numPrice).not.toEqual(0);
            });
        });
    });
   
    describe('Clickable elements', () => {
        it('should lead to the products page by clicking in the products image',() => {
            for (let i = 0; i < 5; i++) {
                InventoryPage.imgLinkSelector(i).click();
                browser.pause(1000);
                expect(browser).toHaveUrl('https://www.saucedemo.com/inventory-item.html?id='+i+'');
                CartPage.btnB2products.click();
            }
        });

        it('should lead to the products page by clicking in the products name',() => {
            InventoryPage.open();
            for (let j = 0; j < 5; j++) {
                InventoryPage.titleLinkSelector(j).click();
                browser.pause(1000);
                expect(browser).toHaveUrl('https://www.saucedemo.com/inventory-item.html?id='+j+'');
                CartPage.btnB2products.click();
            }
        });
    });

    describe('Add/Remove Products', () => {
        it('should change Add to Cart button to Remove button and n+1 to the shopping cart icon', () => {
            InventoryPage.btnAddBikeLight.click();
            InventoryPage.btnAddBackpack.click();
            InventoryPage.btnAddBoltTShirt.click();
            InventoryPage.btnAddFleeceJacket.click();
            InventoryPage.btnAddTestTShirt.click();
            InventoryPage.btnAddOnesie.click();
            browser.pause(1000);
            expect(InventoryPage.btnRmBikeLight).toBeDisplayed();
            expect(InventoryPage.btnRmBackpack).toBeDisplayed();
            expect(InventoryPage.btnRmBoltTShirt).toBeDisplayed();
            expect(InventoryPage.btnRmFleeceJacket).toBeDisplayed();
            expect(InventoryPage.btnRmTestTShirt).toBeDisplayed();
            expect(InventoryPage.btnRmOnesie).toBeDisplayed();
            expect(InventoryPage.btnRmBikeLight).toHaveText('REMOVE');
            expect(InventoryPage.btnRmBackpack).toHaveText('REMOVE');
            expect(InventoryPage.btnRmBoltTShirt).toHaveText('REMOVE');
            expect(InventoryPage.btnRmFleeceJacket).toHaveText('REMOVE');
            expect(InventoryPage.btnRmTestTShirt).toHaveText('REMOVE');
            expect(InventoryPage.btnRmOnesie).toHaveText('REMOVE');
            expect(InventoryPage.badgeCart).toHaveText('6');
           });

        it('should change Remove button to Add to Cart button and n-1 from the shopping cart icon', () => {
            InventoryPage.btnRmBikeLight.click();
            InventoryPage.btnRmBackpack.click();
            InventoryPage.btnRmBoltTShirt.click();
            InventoryPage.btnRmFleeceJacket.click();
            InventoryPage.btnRmTestTShirt.click();
            InventoryPage.btnRmOnesie.click();
            browser.pause(1000);
            expect(InventoryPage.btnAddBikeLight).toBeDisplayed();
            expect(InventoryPage.btnAddBackpack).toBeDisplayed();
            expect(InventoryPage.btnAddBoltTShirt).toBeDisplayed();
            expect(InventoryPage.btnAddFleeceJacket).toBeDisplayed();
            expect(InventoryPage.btnAddTestTShirt).toBeDisplayed();
            expect(InventoryPage.btnAddOnesie).toBeDisplayed();
            expect(InventoryPage.btnAddBikeLight).toHaveText('ADD TO CART');
            expect(InventoryPage.btnAddBackpack).toHaveText('ADD TO CART');
            expect(InventoryPage.btnAddBoltTShirt).toHaveText('ADD TO CART');
            expect(InventoryPage.btnAddFleeceJacket).toHaveText('ADD TO CART');
            expect(InventoryPage.btnAddTestTShirt).toHaveText('ADD TO CART');
            expect(InventoryPage.btnAddOnesie).toHaveText('ADD TO CART');
            expect(InventoryPage.badgeCart).not.toBeDisplayed();
        }); 
    });
 

    describe('Cart', () => {
        it('should lead to shopping cart', () => {
            InventoryPage.btnCart.click();
            expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
            });
    }); 

    describe('Burger Menu', () => {
        it('should open menu', () => {
            InventoryPage.open();
            InventoryPage.btnMenu.click();
            browser.pause(2000);
            expect(InventoryPage.wprapMenu).toBeDisplayed();
        });

        it('should close menu', () => {
            InventoryPage.btnCrossMenu.click();
            expect(InventoryPage.wprapMenu).toHaveAttribute('hidden', 'true');
            expect(InventoryPage.wprapMenu).not.toBeDisplayed();
        }); 

        describe('Links', () => {
            it('should redirect to Sauce Labs page', () => {
                InventoryPage.btnMenu.click();
                browser.pause(3000);
                expect(InventoryPage.btnAboutLink).toHaveHref('https://saucelabs.com/');
                InventoryPage.btnAboutLink.click();
                expect(browser).toHaveUrl('https://saucelabs.com/');
            });
            it('should logout', () => {
                LoginPage.open();
                LoginPage.login('standard_user','secret_sauce');
                InventoryPage.btnMenu.click();
                browser.pause(3000);
                InventoryPage.btnLogout.click();
                expect(browser).toHaveUrl('https://www.saucedemo.com/');
            });
            it('should reset app state', () => {
                LoginPage.login('standard_user','secret_sauce');
                InventoryPage.btnAddTestTShirt.click();
                InventoryPage.btnMenu.click();
                browser.pause(3000);
                InventoryPage.btnResetApp.click();
                expect(InventoryPage.badgeCart).not.toExist();
            });
        });
    });

    describe('Footer', () => {
        it('should check that the social media links are correct', () => {
            InventoryPage.open();
            expect(InventoryPage.btnTwitterLink).toHaveHref('https://twitter.com/saucelabs');
            expect(InventoryPage.btnFacebookLink).toHaveHref('https://www.facebook.com/saucelabs');
            expect(InventoryPage.btnTLinkedinLink).toHaveHref('https://www.linkedin.com/company/sauce-labs/');
        });
    });    

});