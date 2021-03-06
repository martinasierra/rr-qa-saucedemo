import Page from './page';

class InventoryPage extends Page {

    //Title
    get title() { return $('.title')}
  
    //Filters
    get dropdownFilter() { return $('[data-test="product_sort_container"]')}
    get filterAZ() { return $('[value="az"]')}
    get filterZA() { return $('[value="za"]')}
    get filterLoHi() { return $('[value="lohi"]')}
    get filterHiLo() { return $('[value="hilo"]')}

    //Products
    get itemsName() { return $$('.inventory_item_name')}
    get itemsPrice() { return $$('.inventory_item_price')}

    //Bike Light Product
    get btnAddBikeLight() { return $('[name="add-to-cart-sauce-labs-bike-light"]')}
    get btnRmBikeLight() { return $('[name="remove-sauce-labs-bike-light"]')}

    //Backpack Product
    get btnAddBackpack() { return $('[name="add-to-cart-sauce-labs-backpack"]')}
    get btnRmBackpack() { return $('[name="remove-sauce-labs-backpack"]')}

    //Bolt T-Shirt Product
    get btnAddBoltTShirt () { return $('[name="add-to-cart-sauce-labs-bolt-t-shirt"]')}
    get btnRmBoltTShirt () { return $('[name="remove-sauce-labs-bolt-t-shirt"]')}

    //Fleece Jacket Product
    get btnAddFleeceJacket() { return $('[name="add-to-cart-sauce-labs-fleece-jacket"]')}
    get btnRmFleeceJacket() { return $('[name="remove-sauce-labs-fleece-jacket"]')}

    //Test.allthethings() T-Shirt Product
    get btnAddTestTShirt() { return $('[name="add-to-cart-test.allthethings()-t-shirt-(red)"]')}
    get btnRmTestTShirt() { return $('[name="remove-test.allthethings()-t-shirt-(red)"]')}

    //Onesie Product
    get btnAddOnesie() { return $('[name="add-to-cart-sauce-labs-onesie"]')}
    get btnRmOnesie() { return $('[name="remove-sauce-labs-onesie"]')}

    //Problem User Image
    get imgPrblmUsr() { return $('.inventory_item_img img')}
   
    //Social Media Links
    get btnTwitterLink() { return $('.social_twitter a')}
    get btnFacebookLink() { return $('.social_facebook a')}
    get btnTLinkedinLink() { return $('.social_linkedin a')}

    //Cart
    get btnCart() { return $('.shopping_cart_link')}
    get badgeCart() { return $('.shopping_cart_badge')}

    //Menu
    get btnMenu() { return $('#react-burger-menu-btn')}
    get wprapMenu() { return $('.bm-menu-wrap')}
    get btnCrossMenu() { return $('#react-burger-cross-btn')}
    get btnAllItems() { return $('#inventory_sidebar_link')}
    get btnAboutLink() { return $('#about_sidebar_link')}
    get btnLogout() { return $('#logout_sidebar_link')}
    get btnResetApp() { return $('#reset_sidebar_link')}

    
    open () {
        return super.open('inventory.html');
    }

    titleLinkSelector(num1) {
        return $('#item_'+num1+'_title_link')
    }

    imgLinkSelector(num2) {
        return $('#item_'+num2+'_img_link')
    }
    
}

export default new InventoryPage();