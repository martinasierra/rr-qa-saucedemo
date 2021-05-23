import Page from './page';

class CheckoutPage extends Page {
  
    
   
    open () {
        return super.open('checkout.html');
    }
  
}

export default new CheckoutPage();