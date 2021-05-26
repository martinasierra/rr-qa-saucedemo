import Page from './page';

class LoginPage extends Page {
  
    get inputUsername () { return $('[name="user-name"]') }
    get inputPassword () { return $('[name="password"]') }
    get btnSubmit () { return $('[name="login-button"]') }
    get divErrorMsg () { return $('.error-message-container')}
    get errorMsg () { return $('h3')}
   
   
    open () {
        return super.open('');
    }

    submit () {
        this.btnSubmit.click();
    }

    login (username, password) {
        this.inputUsername.setValue(username);  
        this.inputPassword.setValue(password);
        this.submit();
    }
  
}

export default new LoginPage();
