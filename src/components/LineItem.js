import BaseClass from '../system/BaseClass';

export default class LineItem extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.update = this.update.bind(this);
    this.init();
  }

  /**
   * @method money - Returns a decimal value with a precision of 2 ($9.99)
   * @param {Number} number - The integer to be converted to a currency
   * @param {string} sign - Dollar sign or empty string for positive, - or -$ for negative
   * @param {*} currency - USD, CA etc or empty string
   */
  money(number, sign, currency) {
    number = number / 100;
    number = number.toFixed(2);
    return `${sign}${number} ${currency}`;
  }

  /**
   * @method updateQuantitySelector - Adds or removes quantity select options
   * @param {Number} inventory_quantity - The variants availible inventory quantity
   * @param {Element} quantity_selector - The Select element
   */
  updateQuantitySelector(inventory_quantity, quantity_selector) {
    inventory_quantity = parseInt(inventory_quantity);
    const options = quantity_selector.querySelectorAll('option');
    //Removes options with a value greater than the available inventory
    if(inventory_quantity < 30 && options.length > inventory_quantity) {
      options.forEach(option=> {
        if(parseInt(option.value) > inventory_quantity) {
          quantity_selector.removeChild(option);
        }
      })
    //Adds options with inventory values up to 30
    }else if(options.length < inventory_quantity && options.length < 30) {
      for(let i = options.length+1; i <= inventory_quantity && i <= 30; i++) {
        const new_option = document.createElement('option');
        new_option.value = i;
        new_option.innerHTML = i;
        quantity_selector.appendChild(new_option);
      }
    }
  }

  /**
   * @method update - Updates the cart object and displayed Summary
   * @param {object} updates - {updates: key/id: qty}
   */
  async update(updates) {
    const headers = new Headers({'Content-Type': 'application/json'});
    try {
      //post updates to cart and retreive response
      const data = await fetch('/cart/update.js', {method: 'POST', headers: headers, body:JSON.stringify(updates)});
      const response = await data.json();
      
      //Throw error if errors
      if(response.message === 'Cart Error') {
        throw new error(response);
      //Update Summary, instance variables, and DOM data attributes
      }else{
        let original_total_price = parseInt(response.original_total_price);
        let total_discount = parseInt(response.total_discount);
        for(let item in response.items) {
          const line_item = response.items[item];
          const dom_line_item = document.querySelector(`.line-item[data-key="${line_item.key}"`);
          //Select .line-item by variant id because the key is no longer valid
          if(!dom_line_item) {
            dom_line_item = document.querySelector(`.line-item[data-id="${line_item.variant_id}"`);
            this.key = line_item.key;
            dom_line_item.dataset.key = line_item.key;
          }

          //Update DOM Line Item pricing and quantity
          if(!dom_line_item.dataset.itemError) {
            dom_line_item.querySelector('.final-line-price').innerHTML = this.money(line_item.final_line_price, '$', 'USD');
            dom_line_item.querySelector('.quantity-selector').value = line_item.quantity;
          }

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
        if(!document.querySelector('.summary-sticky').dataset.hasErrors) {
          document.querySelector('.original-total-price').innerHTML = this.money(original_total_price, '$', 'USD');
          document.querySelector('.total-discounts').innerHTML = this.money(total_discount, '-$', 'USD');
          document.querySelector('.cart-total-price').innerHTML = this.money(response.total_price, '$', 'USD');
        }
      }
    }catch(error) {
      console.log(error);
    }
  }

  init() {
    const quantity = this.rootElement.querySelector('.quantity-selector');
    const variant = this.rootElement.querySelector('.variant-selector');

    if(quantity) {
      quantity.addEventListener('change', (e)=> {
        const updates = {updates: {[this.key]: e.target.value}};
        this.update(updates);
      });
    }

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
        this.rootElement.dataset.id = option.id;
        this.updateQuantitySelector(option.inventoryQuantity, this.rootElement.querySelector('.quantity-selector'));
        this.update(updates);
      })
    }
  }
}