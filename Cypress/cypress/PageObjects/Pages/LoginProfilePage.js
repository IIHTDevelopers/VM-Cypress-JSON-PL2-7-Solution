class LoginPage {
  // Define selectors as class properties
  elements = {
    usernameInput: 'input[name="username"]',
    passwordInput: 'input[name="password"]',
    loginButton: 'button[type="submit"]',
    errorMsg: "//div[contains(text(),'Invalid credentials !')]",
    adminMenu: "//li[@class='dropdown dropdown-user']",
    logoutBtn: "//a[text()=' Log Out ']"
  };

  // Method to perform login using fixture
  performLogin() {
   
    cy.wait(2000);
    cy.fixture('LoginData').then((credentials) => {
      cy.visit('/auth/login');
      cy.wait(4000);
      cy.get(this.elements.usernameInput).type(credentials.username);
      cy.get(this.elements.passwordInput).type(credentials.password);
      cy.get(this.elements.loginButton).click();
      cy.url().should('include', '/dashboard');
    });
  }
}

export default LoginPage;
