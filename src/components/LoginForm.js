import BaseClass from '../system/BaseClass';

/**
 * @class LoginForm - The form for logging in to the store
 */
export default class LoginForm extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.init();
  }

  /**
   * @method toggleForms - Toggles visibility of the Login Form
   * and the forgot password form
   */
  toggleForms() {
    this.rootElement.addEventListener('click', (event) => {
      if(event.target.dataset.form === 'customer_login') {
        event.preventDefault();
        this.rootElement.querySelector('.customer-login').classList.add('hide');
        this.rootElement.querySelector('.recover-password').classList.remove('hide');
        this.rootElement.querySelector('.form-title').innerHTML = 'Recover Password'
      }else if(event.target.dataset.form === 'recover_password') {
        event.preventDefault();
        this.rootElement.querySelector('.customer-login').classList.remove('hide');
        this.rootElement.querySelector('.recover-password').classList.add('hide');
        this.rootElement.querySelector('.form-title').innerHTML = 'Sign In'
      }
    });
  }

  init() {
    this.toggleForms();
  }
}