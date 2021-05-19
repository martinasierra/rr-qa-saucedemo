import Page from './page';

class LoginPage extends Page {
  
    get inputUsername () { return $('input[name="user-name"]') }
    get inputPassword () { return $('input[name="password"]') }
    get btnSubmit () { return $('button[type="login-button"]') }

  
  
}

export default new LoginPage();
