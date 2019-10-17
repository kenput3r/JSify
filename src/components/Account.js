import BaseClass from '../system/BaseClass';

export default class Account extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.update = this.update.bind(this);
    this.init();
  }

  async update(modal) {
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
    const date = new Date();
    const date_time = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}-${date.getTimezoneOffset()/60}:00`;
    if(accepts_marketing.checked) {
      data.customer.accepts_marketing = true;
      data.customer.marketing_opt_in_level = 'confirmed_opt_in';
      data.customer.accepts_marketing_updated_at = date_time;
    }else{
      data.customer.accepts_marketing = false;
      data.customer.marketing_opt_in_level = null;
      data.customer.accepts_marketing_updated_at = date_time;
    }
    const url = 'https://api.suavecito.com/api/shopify/retail/customer/update';
    const headers = new Headers({'Content-Type': 'application/json', 'secret': this.secret, 'customer': this.customer});
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });
    const res_json = await response.json();
    const customer = res_json.customer;
    if(response.status == 200) {
      modal.close();
      M.toast({html: 'Successfully updated info'});
      const customer_info = this.rootElement.querySelector('.customer-info');
      customer_info.querySelector('.name').innerHTML = customer.first_name + ' ' + customer.last_name;
      customer_info.querySelector('.email').innerHTML = customer.email;
      customer_info.querySelector('.phone').innerHTML = customer.phone;
      if(customer.default_address.company && customer.default_address.company !== '') {
        customer_info.querySelector('.company').classList.remove('hide');
      }else{
        customer_info.querySelector('.company').classList.add('hide');
      }
      customer_info.querySelector('.company').innerHTML = customer.default_address.company;
      customer_info.querySelector('.address1').innerHTML = customer.default_address.address1;
      customer_info.querySelector('.address2').innerHTML = customer.default_address.address2;
      if(customer.default_address.address2 && customer.default_address.address2 !== '') {
        customer_info.querySelector('.address2').classList.remove('hide');
      }else{
        customer_info.querySelector('.address2').classList.add('hide');
      }
      customer_info.querySelector('.city-state-zip').innerHTML = customer.default_address.city + ', ' + customer.default_address.province + ' ' + customer.default_address.zip;
      if(customer.accepts_marketing) {
        customer_info.querySelector('.accepts-true').classList.remove('hide');
        customer_info.querySelector('.accepts-false').classList.add('hide');
      }else{
        customer_info.querySelector('.accepts-true').classList.add('hide');
        customer_info.querySelector('.accepts-false').classList.remove('hide');
      }
    }else{
      console.log(error);
      M.toast({html: 'ERROR SAVING CHANGES'});
    }
  }

  init() {
    const edit_customer_el = this.rootElement.querySelector('#EditCustomer');
    const edit_customer = M.Modal.init(edit_customer_el);
    edit_customer_el.querySelector('.close-edit-customer').addEventListener('click', () => {
      edit_customer.close();
    });
    this.rootElement.querySelector('.update-customer').addEventListener('click', (event) => {
      event.preventDefault();
      this.update(edit_customer);
    })
  }
}