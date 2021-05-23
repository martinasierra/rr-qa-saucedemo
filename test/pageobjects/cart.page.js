import Page from './page';

class CartPage extends Page {
  
    get btnB2products() { return $('[name="back-to-products"]')}
    get btnB2shopping() { return $('[name="continue-shopping"]')}
    get btnCheckOut() { return $('[name="checkout"]')}
   
   
    open () {
        return super.open('cart.html');
    }
  
}

export default new CartPage();
