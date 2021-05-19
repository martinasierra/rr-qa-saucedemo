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
  
}

export default new LoginPage();
