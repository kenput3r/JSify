import BaseClass from '../system/BaseClass';
import initializeSwiper from '../utils/initializeSwiper';

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
    initializeSwiper('#ProductSwiper', options);
  }
}