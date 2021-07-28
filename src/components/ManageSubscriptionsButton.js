import BaseClass from '../system/BaseClass';

export default class ManageSubscriptionsButton extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
    this.init();
  }
  
  async handleClick() {
    this.state = this.rootElement.dataset;
    try {
      console.log('clicked get auth');
      const response = await fetch('/apps/app_proxy/auth', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerEmail: this.state.customerEmail,
          customerId: this.state.customerId
        })
      });
        
      const jsonResponse = await response.json();
      console.log('JSON RESPONSE', jsonResponse);
      M.toast({ html: "EMAIL WITH LINK SENT" });
    } catch(e) {
      console.log('ERROR', e.message);
      M.toast({ html: "ERROR - PLEASE TRY AGAIN" });
    }
  }
  
  init() {
    const button = this.rootElement;
    button.addEventListener('click', this.handleClick);
  }
}