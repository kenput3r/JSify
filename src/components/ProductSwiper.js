import BaseClass from '../system/BaseClass';

/**
 * @class ProductSwiper - Initializes a new image Swiper
 * @see {@link https://idangero.us/swiper/}
 */
export default class ProductSwiper extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.init();
  }

  init() {
    const options = {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true
      },
    }
    const swiper = new Swiper(this.rootElement, options);
  }
}