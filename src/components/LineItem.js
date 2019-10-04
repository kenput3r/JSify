import BaseClass from '../system/BaseClass';

export default class LineItem extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);

    this.init();
  }

  init() {
    const quantity = this.rootElement.querySelector('.quantity-selector');
    const variant = this.rootElement.querySelector('.variant-selector');

    quantity.addEventListener('change', ()=> {
      console.log('quantity changed');
    });

    if(variant) {
      variant.addEventListener('change', ()=> {
        console.log('variant changed');
      })
    }
  }
}