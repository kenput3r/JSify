import BaseClass from '../system/BaseClass';

export default class MobileBrandCarousel extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.init();
  }

  init() {
    const options = {
      dist: -200, 
      numVisible: 5, 
      shift: -150,
      indicators: true
    }
    this.carousel = M.Carousel.init(this.rootElement, options);
  }
}