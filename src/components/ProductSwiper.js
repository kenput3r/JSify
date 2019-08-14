import BaseClass from '../system/BaseClass';

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