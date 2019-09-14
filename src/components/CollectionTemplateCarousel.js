import BaseClass from '../system/BaseClass';

export default class CollectionTemplateCarousel extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.init();
  }

  init() {
    const carousel_options = {
      fullWidth: true,
      indicators: true
    }
    const Carousel = M.Carousel.init(this.rootElement, carousel_options);
    const left_trigger = this.rootElement.querySelector('.left-trigger');
    const right_trigger = this.rootElement.querySelector('.right-trigger');
    left_trigger.addEventListener('click', () => Carousel.prev());
    right_trigger.addEventListener('click', () => Carousel.next());
  }
}