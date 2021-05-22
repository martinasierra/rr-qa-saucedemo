import Page from './page';

class InventoryPage extends Page {
  
    get title() { return $('.title')}
    get btnCart() { return $('.shopping_cart_link')}
    get badgeCart() { return $('.shopping_cart_badge')}
    get itemPrice() { return $$('.inventory_item_price')}
    get imgBackpack() { return $('#item_4_img_link img')}
    get imgBikeLight() { return $('#item_0_img_link img')}
    get titleBikeLight() { return $('#item_0_title_link')}
    get btnAddBikeLight() { return $('[name="add-to-cart-sauce-labs-bike-light"]')}
    get btnRmBikeLight() { return $('[name="remove-sauce-labs-bike-light"]')}

    get imgBoltTShirt() { return $('#item_1_img_link img')}

    get btnB2products() { return $('[name="back-to-products"]')}

    open () {
        return super.open('inventory.html');
    }
    
}

export default new InventoryPage();
