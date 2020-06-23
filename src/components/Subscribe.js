import BaseClass from '../system/BaseClass';

export default class Subscribe extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.init();
  }

  init() {
    const form = this.rootElement;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const header = new Headers({'Content-Type': 'application/json'});
      const email = form.querySelector(`[name="EMAIL"]`);
      const phone = form.querySelector(`[name="PHONE"]`);
      const submit = form.querySelector(`[name="subscribe"]`);
      if(email.value.trim() !== '' || phone.value.trim() !== '') {
        const response = await fetch('https://api.suavecito.com/api/shopify/retail/contact', {
          method: 'POST',
          headers: header,
          mode: 'cors',
          body: JSON.stringify({email: email.value, phone: phone.value})
        });
        console.log(response);
        email.value = '';
        phone.value = '';
        submit.value = 'SUBMITTED';
        setTimeout(function() {
          submit.value = 'SUBSCRIBE';
        }, 3000);
      }
    });
  }
}