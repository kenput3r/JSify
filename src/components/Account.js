import BaseClass from '../system/BaseClass';

export default class Account extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.update = this.update.bind(this);
    this.init();
  }

  async update() {
    const el = this.rootElement.querySelector('form.customer');
    const data = {
      customer: {
        id: this.customer,
        email: el.querySelector('.email').value,
        accepts_marketing: '',
        accepts_marketing_updated_at: '',
        marketing_opt_in_level: '',
        addresses: [{
          id: this.addressId,
          address1: el.querySelector('.address1').value,
          address2: el.querySelector('.address2').value,
          city: el.querySelector('.city').value,
          company: el.querySelector('.company').value,
          first_name: el.querySelector('.first-name').value,
          last_name: el.querySelector('.last-name').value,
          phone: el.querySelector('.phone').value,
          province: el.querySelector('.state').value,
          zip: el.querySelector('.zip').value
        }]
      }
    }
    const accepts_marketing = el.querySelector('.accepts-marketing');
    if(accepts_marketing.checked) {
      const date = new Date();
      const date_time = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}-${date.getTimezoneOffset()/60}:00`;
      data.customer.accepts_marketing = true;
      data.customer.marketing_opt_in_level = 'confirmed_opt_in';
      data.customer.accepts_marketing_updated_at = date_time;
    }
    const url = 'https://api.suavecito.com/api/shopify/retail/customer/update';
    const headers = new Headers({'Content-Type': 'application/json', 'secret': this.secret, 'customer': this.customer});

    //console.log(headers.get('secret'));
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });
    console.log(response);
    //console.log(data);
  }

  init() {
    const edit_customer_el = this.rootElement.querySelector('#EditCustomer');
    const edit_customer = M.Modal.init(edit_customer_el);
    edit_customer_el.querySelector('.close-edit-customer').addEventListener('click', () => {
      edit_customer.close();
    });
    this.rootElement.querySelector('.update-customer').addEventListener('click', (event) => {
      event.preventDefault();
      this.update();
    })
  }
}