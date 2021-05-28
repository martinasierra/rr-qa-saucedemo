import Page from './page';

class CheckoutPage extends Page {
  
    //Buttons
    get btnCancel() { return $('[name="cancel"]')}
    get btnContinue() { return $('[type="submit"]')}
    get btnFinish() { return $('[name="finish"]')}

    //Inputs
    get inputFirstName() { return $('[name="firstName"]')}
    get inputLastName() { return $('[name="lastName"]')}
    get inputPostalCode() { return $('[name="postalCode"]')}

    open (path2) {
        return super.open(`checkout-${path2}.html`);
    }

    checkout(firstName, lastName, zipCode) {
        this.inputFirstName.setValue(firstName);
        this.inputLastName.setValue(lastName);
        this.inputPostalCode.setValue(zipCode);
        this.btnContinue.click();
    }
 
}

export default new CheckoutPage();