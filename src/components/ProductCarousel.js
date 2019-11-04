import BaseClass from '../system/BaseClass';
import LazyImage from './LazyImage';

/**
 * @class ProductCarousel - Initializes a new instance of ProductCarousel,
 * a Materialize Javascript plugin.
 * @see {@link https://materializecss.com/carousel.html}
 */

 export default class ProductCarousel extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.modalOnOpenStart = this.modalOnOpenStart.bind(this);
    this.init();
  }

  /**
   * @method modalOnOpenStart - Load the smaller image, blurred, then load the larger image
   * once it is ready.
   */
  modalOnOpenStart() {
    const fullSrc = event.target.dataset.fullSrc;
    const smallSrc = event.target.dataset.smallSrc;
    const alt = event.target.getAttribute('alt');
    const div = document.querySelector('.modal-image');
    div.innerHTML = `<img src="${smallSrc} alt="${alt} class="responsive-img preview" />`;
    const fullImage = new Image();
    fullImage.src = fullSrc;
    fullImage.alt = alt;
    fullImage.className = 'responsive-img';
    if(fullImage.complete) { 
    div.innerHTML = '';
    div.appendChild(fullImage);
    }else{ 
      fullImage.onload = () => {
        div.innerHTML = '';
        div.appendChild(fullImage);
      }
    }
  }

  /**
   * @method setTriggers - Change carousel image to selected index
   * @param {*} Carousel 
   */
  setTriggers(Carousel) {
    const thumbnails = this.rootElement.querySelector('.thumbnails');
    thumbnails.addEventListener('click', (event) => {
      const target = event.target;
      if(target.dataset.trigger) {
        Carousel.set(target.dataset.index);
      };
    });
  }

  init() {
    const featured_image = this.rootElement.querySelector('.carousel-image');
    const carousel_container = this.rootElement.querySelector('.carousel');
    featured_image.addEventListener('load', (event) => {
      if(!carousel_container.style.height) {
        carousel_container.style.height = featured_image.offsetHeight+'px';
      }
    });
    const carousel_options = {
      fullWidth: true,
      indicators: true
    }
    this.MCarousel = M.Carousel.init(carousel_container, carousel_options);
    this.setTriggers(this.MCarousel);
    const images = this.rootElement.querySelectorAll('.carousel-image');
    images.forEach((image) => {
      new LazyImage(image);
    });
    if(window.innerWidth > 601) {
      const modal_container = document.querySelector('#ProductImageModal');
      const modal_options = {
        onOpenStart: this.modalOnOpenStart
      }
      const Modal = M.Modal.init(modal_container, modal_options);
    }
  }
}