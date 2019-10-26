import BaseClass from '../system/BaseClass';

export default class AddressForm extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.update = this.update.bind(this);
    this.init();
  }

  async delete() {
    const url = 'https://api.suavecito.com/api/shopify/retail/customer/address/delete';
    const headers = new Headers({'Content-Type': 'application/json', 'secret': this.secret, 'customer': this.customer});
    console.log(this.customer, this.secret);
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({id: this.addressId, customer: this.customer})
    });
    if(response.status === 200) {
      this.rootElement.closest('.form-container').style = "overflow: hidden";
      this.rootElement.closest('.form-container').classList.add('scale-out');
      M.toast({html: 'SUCCESSFULLY DELETED'});
      let current_height = this.rootElement.closest('.form-container').offsetHeight;
      while(current_height > 0) {
        current_height = current_height - 1;
        setTimeout(() => {
          this.rootElement.closest('.form-container').style.height = `${current_height}px`
        }, 100);
      }
    }else{
      M.toast({html: 'ERROR SAVING CHANGES'});
    }
  }

  async makeDefault() {
    const url = 'https://api.suavecito.com/api/shopify/retail/customer/address/default';
    const headers = new Headers({'Content-Type': 'application/json', 'secret': this.secret, 'customer': this.customer});
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({id: this.addressId, customer: this.customer})
    });
    if(response.status === 200) {
      window.location.reload();
    }else{
      M.toast({html: 'ERROR SAVING CHANGES'});
    }
  }

  async update() {
    const el = this.rootElement;
    const data = {
      customer: {
        id: this.customer,
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
    const url = 'https://api.suavecito.com/api/shopify/retail/customer/update';
    const headers = new Headers({'Content-Type': 'application/json', 'secret': this.secret, 'customer': this.customer});
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });
    if(response.status === 200) {
      M.toast({html: 'SUCCESSFULLY UPDATED'});
    }else{
      M.toast({html: 'ERROR SAVING CHANGES'});
    }
  }

  init() {
    this.rootElement.querySelector('button.update').addEventListener('click', (event) => {
      event.preventDefault();
      this.update();
    });
    this.rootElement.querySelector('button.delete').addEventListener('click', (event) => {
      event.preventDefault();
      this.delete();
    });
    const make_default = this.rootElement.querySelector('button.make-default');
    if(make_default) {
      make_default.addEventListener('click', (event) => {
        event.preventDefault();
        this.makeDefault();
      });
    }
  }
}