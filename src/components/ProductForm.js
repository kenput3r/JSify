import BaseClass from '../system/BaseClass';

/**
 * @class ProductForm - Methods pertaining to the product form found in the
 * ProductDrawer and on the Product page. Uses Materialize
 * Toasts.
 * @see {@link https://materializecss.com/toasts.html}
 */
export default class ProductForm extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.state = {};
    this.changeImage = this.changeImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.init();
  }

  /**
   * @method changeImage - Changes the image to the selected variant image
   */
  changeImage() {
    if(this.ProductTile) {
      if(this.state.image !== 'no-image') {
        this.ProductTile.querySelector('.product-image').src = this.state.image;
      }
    }else if(this.Carousel) {
      const images = Array.from(this.Carousel.rootElement.querySelectorAll('.carousel-image'));
      for(let i = 0; i < images.length; i++) {
        if(images[i].dataset.src === this.state.image) {
          this.Carousel.set(i);
        }
      }
    }else if(document.querySelector('#Product')) {
      const carousel_container = document.querySelector('.carousel-slider');
      const Carousel = M.Carousel.getInstance(carousel_container);
      const images = Array.from(carousel_container.querySelectorAll('.carousel-image'));
      for(let i = 0; i < images.length; i++) {
        if(images[i].dataset.src === this.state.image) {
          Carousel.set(i);
        }
      }
    }
  }

  /**
   * @method handleChange - Updates state to selected variant data
   * and invokes changeImage()
   * @param event event
   */
  handleChange(event) {
    this.state = event.target.options[event.target.selectedIndex].dataset;
    const quantity_selector = this.rootElement.querySelector('.quantity-selector');
    const options = quantity_selector.querySelectorAll('option');
    const inventory_quantity = parseInt(this.state.inventoryQuantity);
    //Removes options with a value greater than the available inventory
    if(inventory_quantity < 30 && options.length > inventory_quantity) {
      options.forEach(option=> {
        if(parseInt(option.value) > parseInt(this.state.inventoryQuantity)) {
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
    this.rootElement.querySelector('.product-price').innerHTML = this.state.price;
    this.rootElement.querySelector('.compare-price').innerHTML = this.state.comparePrice;
    this.changeImage();
    if(this.state.disableAddToCart) {
      this.rootElement.querySelector('button.add-to-cart').classList.add('disabled');
      const bis_modal = M.Modal.getInstance(document.querySelector('#BisModal'));
      bis_modal.open(); 
    }else{
      this.rootElement.querySelector('button.add-to-cart').classList.remove('disabled');
    }
  }
  /**
   * @method handleSubmit - Adds selected product and quantity to cart
   * @param {event} event 
   */
  async handleSubmit(event) {
    event.preventDefault();
    const quantity = this.rootElement.querySelector('.quantity-selector').value;
    const headers = new Headers({'Content-Type': 'application/json'});
    const product = {quantity: parseInt(quantity), id: parseInt(this.state.id)};
    try {
      const data = await fetch('/cart/add.js', {method: 'POST', headers: headers, body:JSON.stringify(product)});
      const response = await data.json();
      if(!response.key) {
        throw new error(response);
      }else{
        M.toast({html: 'ADDED TO CART'});
        event.target.innerHTML = 'ADDED';
        setTimeout(()=> {
          event.target.innerHTML = 'ADD TO CART'
        }, 3000)
      }
    }catch(error) {
      M.toast({html: 'ERROR - PLEASE TRY AGAIN'});
      event.target.innerHTML = 'ERROR';
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