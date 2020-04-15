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

  /**
   * @method bindRemovePlaceholderValue - remove the placeholder option
   */
  bindRemovePlaceholderValue() {
    Array.from(this.rootElement.querySelectorAll('[data-max]')).map(select => {
      select.addEventListener('change', (event) => {
        if(event.target.querySelector('[data-remove]')) {
          event.target.removeChild(event.target.querySelector('[data-remove]'));
          event.target.removeAttribute('style');
          event.target.closest('.line-item').removeAttribute('data-item-error');
          event.target.closest('.line-item').querySelector('.item-error-message').style.opacity = 0;
          this.checkLimitsAndUpdate();
        }
      });
    });
  }

  /**
   * @method checkLimitsAndUpdate - check product limits and update message and checkout button
   */
  checkLimitsAndUpdate() {
    if(this.limits) {
      let disable_checkout = false;
      const limit_items = Array.from(this.rootElement.querySelectorAll('[data-max]'));
      const checkout_button = this.rootElement.querySelector('.checkout-button');
      limit_items.map(item => {
        const value = parseInt(item.value);
        if(!value){
          disable_checkout = true;
        }
      });
      if(disable_checkout) {
        checkout_button.removeAttribute('href');
        checkout_button.classList.add('disabled');
      }else{
        document.querySelector('.summary-sticky').removeAttribute('data-has-errors');
        checkout_button.href = '/checkout';
        checkout_button.classList.remove('disabled');
      }
    }
  }

  init() {
    const tooltipped = document.querySelectorAll('.tooltipped');
    const tooltips = M.Tooltip.init(tooltipped);
    this.requireTermsAgreement();
    this.checkLimitsAndUpdate();
    this.bindRemovePlaceholderValue();
  }
}