import BaseClass from '../system/BaseClass';

export default class LineItem extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.update = this.update.bind(this);
    this.init();
  }

  money(number, sign, currency) {
    number = number / 100;
    number = number.toFixed(2);
    return `${sign}${number} ${currency}`;
  }

  async update(updates) {
    const headers = new Headers({'Content-Type': 'application/json'});
    // const updates = {
    //   updates: {
    //     [key]: qty
    //   }
    // }
    try {
      const data = await fetch('/cart/update.js', {method: 'POST', headers: headers, body:JSON.stringify(updates)});
      const response = await data.json();
      if(response.message === 'Cart Error') {
        throw new error(response);
      }else{
        console.log(response);
        let original_total_price = parseInt(response.original_total_price);
        let total_discount = parseInt(response.total_discount);
        console.log(original_total_price, total_discount);
        for(let item in response.items) {
          const line_item = response.items[item];
          const dom_line_item = document.querySelector(`.line-item[data-key="${line_item.key}"`);
          console.log(dom_line_item)
          if(!dom_line_item) {
            console.log('setting alternate method')
            dom_line_item = document.querySelector(`.line-item[data-id="${line_item.variant_id}"`);
            console.log(dom_line_item)
          }

          //Update DOM Line Item pricing and quantity
          dom_line_item.querySelector('.final-line-price').innerHTML = this.money(line_item.final_line_price, '$', 'USD');
          dom_line_item.querySelector('.quantity-selector').value = line_item.quantity;

          //Calculate manual discounts
          //Original Price - Compare At Price * Line Item Qty
          if(dom_line_item.dataset.compareAtPrice) {
            const compare_at_price = parseInt(dom_line_item.dataset.compareAtPrice);
            const original_price = parseInt(line_item.original_price);
            const qty = parseInt(line_item.quantity);
            const total_compare_at_discount = (compare_at_price - original_price) * qty;
            original_total_price = original_total_price + total_compare_at_discount;
            total_discount = total_discount + total_compare_at_discount;
          }
        }
        //Update Summary
        document.querySelector('.original-total-price').innerHTML = this.money(original_total_price, '$', 'USD');
        document.querySelector('.total-discounts').innerHTML = this.money(total_discount, '-$', 'USD');
        document.querySelector('.cart-total-price').innerHTML = this.money(response.total_price, '$', 'USD');
      }
    }catch(error) {
      console.log(error);
    }
  }

  init() {
    const quantity = this.rootElement.querySelector('.quantity-selector');
    const variant = this.rootElement.querySelector('.variant-selector');

    quantity.addEventListener('change', (e)=> {
      const updates = {updates: {[this.key]: e.target.value}};
      this.update(updates);
    });

    if(variant) {
      variant.addEventListener('change', (e)=> {
        const option = e.target.options[event.target.selectedIndex].dataset;
        this.rootElement.querySelector('.final-price').innerHTML = this.money(option.price, '$', '');
        if(option.compareAtPrice) {
          this.rootElement.querySelector('.compare-at-price').innerHTML = this.money(option.compareAtPrice, '$', '');
        }
        const updates = {
          updates: {
            [this.key]: 0,
            [option.id]: quantity.value
          }
        }
        console.log(updates);
        this.rootElement.dataset.id = option.id;
        this.update(updates);
      })
    }
  }
}