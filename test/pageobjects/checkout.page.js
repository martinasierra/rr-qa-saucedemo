import Page from './page';

class CheckoutPage extends Page {
  
    get inputFirstName() { return $('[name="firstName"]')}
    get inputLastName() { return $('[name="lastName"]')}
    get inputPostalCode() { return $('[name="postalCode"]')}
    get btnCancel() { return $('[name="cancel"]')}
    get btnContinue() { return $('[type="submit"]')}
    get btnFinish() { return $('[name="finish"]')}

    open (path2) {
        return super.open(`checkout-${path2}.html`);
    }
 
}

export default new CheckoutPage();