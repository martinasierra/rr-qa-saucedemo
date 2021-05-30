import Page from './page';

class CartPage extends Page {

    //Buttons
    get btnCheckOut() { return $('[name="checkout"]')}
    get btnContinueShopping() { return $('[name="continue-shopping"]')}
    get btnB2products() { return $('[name="back-to-products"]')}

    //Remove Products
    get rmCartItems() { return $$('.removed_cart_item')}
    
    open () {
        return super.open('cart.html');
    }
  
}

export default new CartPage();
