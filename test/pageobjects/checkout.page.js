import Page from './page';

class CheckoutPage extends Page {
  
    //Title
    get title() { return $('.title')}

    //Buttons
    get btnCancel() { return $('[name="cancel"]')}
    get btnContinue() { return $('[type="submit"]')}
    get btnFinish() { return $('[name="finish"]')}

    //Inputs
    get inputFirstName() { return $('[name="firstName"]')}
    get inputLastName() { return $('[name="lastName"]')}
    get inputPostalCode() { return $('[name="postalCode"]')}

    //Cost Summary
    get subtotal() { return $('.summary_subtotal_label')}
    get tax() { return $('.summary_tax_label')}
    get total() { return $('.summary_total_label')}

    //Error Message
    get divErrorMsg () { return $('.error-message-container')}
    get errorMsg () { return $('h3')}
    get errorCross() { return $('.error-button')}

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