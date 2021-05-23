import Page from './page';

class InventoryPage extends Page {
  
    get title() { return $('.title')}
    get btnCart() { return $('.shopping_cart_link')}
    get badgeCart() { return $('.shopping_cart_badge')}

    //Menu
    get btnMenu() { return $('#react-burger-menu-btn')}
    get wprapMenu() { return $('.bm-menu-wrap')}
    get itemPrice() { return $$('.inventory_item_price')}
    get btnCrossMenu () { return $('#react-burger-cross-btn')}
    get btnAboutLink () { return $('#about_sidebar_link')}
    
    //Bike Light Product
    get imgBackpack() { return $('#item_4_img_link img')}
    get imgBikeLight() { return $('#item_0_img_link img')}
    get titleBikeLight() { return $('#item_0_title_link')}
    get btnAddBikeLight() { return $('[name="add-to-cart-sauce-labs-bike-light"]')}
    get btnRmBikeLight() { return $('[name="remove-sauce-labs-bike-light"]')}

    get imgBoltTShirt() { return $('#item_1_img_link img')}

    get btnTwitterLink() { return $('.social_twitter a')}
    get btnFacebookLink() { return $('.social_facebook a')}
    get btnTLinkedinLink() { return $('.social_linkedin a')}

    get btnB2products() { return $('[name="back-to-products"]')}
    get btnB2shopping() { return $('[name="continue-shopping"]')}

    
    open () {
        return super.open('inventory.html');
    }
    
}

export default new InventoryPage();
