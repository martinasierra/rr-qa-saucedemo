import Page from './page';

class InventoryPage extends Page {
  
    //Cart
    get btnCart() { return $('.shopping_cart_link')}
    get badgeCart() { return $('.shopping_cart_badge')}

    //Menu
    get btnMenu() { return $('#react-burger-menu-btn')}
    get wprapMenu() { return $('.bm-menu-wrap')}
    get itemPrice() { return $$('.inventory_item_price')}
    get btnCrossMenu() { return $('#react-burger-cross-btn')}
    get btnAllItems() { return $('#inventory_sidebar_link')}
    get btnAboutLink() { return $('#about_sidebar_link')}
    get btnLogout() { return $('#logout_sidebar_link')}
    get btnResetApp() { return $('#reset_sidebar_link')}
    
    //Bike Light Product
    get imgBackpack() { return $('#item_4_img_link img')}
    get imgBikeLight() { return $('#item_0_img_link img')}
    get titleBikeLight() { return $('#item_0_title_link')}
    get btnAddBikeLight() { return $('[name="add-to-cart-sauce-labs-bike-light"]')}
    get btnRmBikeLight() { return $('[name="remove-sauce-labs-bike-light"]')}

    //Backpack Product
    get btnAddBackpack() { return $('[name="add-to-cart-sauce-labs-backpack"]')}

    //Bolt T-Shirt Product
    get imgBoltTShirt() { return $('#item_1_img_link img')}

    //Fleece Jacket Product
    get titleFleeceJacket () { return $('#item_5_title_link')}
    get btnAddFleeceJacket() { return $('[name="add-to-cart-sauce-labs-fleece-jacket"]')}

    //Test.allthethings() T-Shirt Product
    get btnAddTestTShirt() { return $('[name="add-to-cart-test.allthethings()-t-shirt-(red)"]')}
    get btnRmTestTShirt() { return $('[name="remove-test.allthethings()-t-shirt-(red)"]')}

    //Social Media Links
    get btnTwitterLink() { return $('.social_twitter a')}
    get btnFacebookLink() { return $('.social_facebook a')}
    get btnTLinkedinLink() { return $('.social_linkedin a')}

    
    open () {
        return super.open('inventory.html');
    }
    
}

export default new InventoryPage();
