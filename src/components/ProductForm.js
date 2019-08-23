import BaseClass from '../system/BaseClass';

export default class ProductForm extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.state = {};
    this.changeImage = this.changeImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.init();
  }

  changeImage() {
    if(this.ProductTile) {
      if(this.state.image !== 'no-image') {
        this.ProductTile.querySelector('.product-image').src = this.state.image;
      }
    }else if(this.Swiper) {
      const el = document.getElementById(this.Swiper.$el[0].id);
      const images = Array.from(el.getElementsByClassName('swiper-image'));
      for(let i = 0; i < images.length; i++) {
        let image = images[i];
        if(image.dataset.src === this.state.image) {
          let index = parseInt(image.dataset.index);
          this.Swiper.slideTo(index);
          break;
        }
      }
    }
  }

  handleChange(event) {
    this.state = event.target.options[event.target.selectedIndex].dataset;
    const quantity_selector = this.rootElement.querySelector('.quantity-selector');
    const options = quantity_selector.querySelectorAll('option');
    const inventory_quantity = parseInt(this.state.inventoryQuantity);
    if(inventory_quantity < 30 && options.length > inventory_quantity) {
      options.forEach(option=> {
        if(parseInt(option.value) > parseInt(this.state.inventoryQuantity)) {
          quantity_selector.removeChild(option);
        }
      })
    }else if(options.length < inventory_quantity && options.length < 30) {
      for(let i = options.length+1; i <= inventory_quantity && i <= 30; i++) {
        const new_option = document.createElement('option');
        new_option.value = i;
        new_option.innerHTML = i;
        quantity_selector.appendChild(new_option);
      }
    }
    this.rootElement.querySelector('.product-price').innerHTML = this.state.price;
    this.changeImage();
  }

  async handleSubmit(event) {
    event.preventDefault();
    const quantity = this.rootElement.querySelector('.quantity-selector').value;
    const headers = new Headers({'Content-Type': 'application/json'});
    const product = {quantity: parseInt(quantity), id: parseInt(this.state.id)};
    const data = await fetch('/cart/add.js', {method: 'POST', headers: headers, body:JSON.stringify(product)});
    const response = await data.json();
    if(!response.key) {
      console.log(response);
    }else{
      M.toast({html: 'ADDED TO CART'});
      event.target.innerHTML = 'ADDED';
      setTimeout(()=> {
        event.target.innerHTML = 'ADD TO CART'
      }, 3000)
    }
  }

  init() {
    this.state = this.rootElement.dataset;
    if(this.state.hasVariants) {
      this.rootElement.querySelector('.variant-selector').addEventListener('change', this.handleChange);

    }
    if(this.state.available) {
      this.rootElement.querySelector('.add-to-cart').addEventListener('click', this.handleSubmit);
    }
  }

  destroy() {
    if(this.state.hasVariants) {
      this.rootElement.querySelector('.variant-selector').removeEventListener('change', this.handleChange);
    }
    
    if(this.state.available) {
      this.rootElement.querySelector('.add-to-cart').removeEventListener('click', this.handleSubmit);
    }
  }
}