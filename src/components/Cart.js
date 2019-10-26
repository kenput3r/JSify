import BaseClass from '../system/BaseClass';

export default class Cart extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.init();
  }

  /**
   * @method requireTermsAgreement - prevent progressing to checkout if terms and conditions is not agreed to
   */
  requireTermsAgreement() {
    const checkout_button = document.querySelector('.checkout-button');
    const terms_agreement = document.querySelector('.terms-agreement');
    checkout_button.addEventListener('click', (event) => {
      if(!terms_agreement.checked) {
        event.preventDefault();
        alert('Please agree to the terms & conditions to checkout');
      }
    });
  }

  init() {
    const tooltipped = document.querySelectorAll('.tooltipped');
    const tooltips = M.Tooltip.init(tooltipped);
    this.requireTermsAgreement();
  }
}