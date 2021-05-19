import Page from './page';

class ProductsPage extends Page {
  
    get title() { return $('.title')}
    get imgBackpack() { return $('#item_4_img_link img')}
    get imgBikeLight() { return $('#item_0_img_link img')}
    get imgBoltTShirt() { return $('#item_1_img_link img')}


    open () {
        return super.open('inventory.html');
    }
    
}

export default new ProductsPage();
