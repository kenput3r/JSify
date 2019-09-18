import BaseClass from '../system/BaseClass';

export default class CollectionTemplateCarousel extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.Carousel;
    this.initializeCarousel = this.initializeCarousel.bind(this);
    this.init();
  }

  initializeCarousel() {
    const carousel_options = {
      fullWidth: true,
      indicators: true
    }
    const container = document.getElementById('CollectionTemplateCarousel');
    this.Carousel = M.Carousel.init(container, carousel_options);
    const left_trigger = container.querySelector('.left-trigger');
    const right_trigger = container.querySelector('.right-trigger');
    left_trigger.addEventListener('click', () => this.Carousel.prev());
    right_trigger.addEventListener('click', () => {
      this.Carousel.next()
      console.log('clicked right trigger');
    });
  }

  init() {
    this.initializeCarousel();
    window.addEventListener('shopify:block:select', (event) => {
      if(event.target.dataset.collectionCarousel) {
        const index = new Number(event.target.dataset.index);
        this.Carousel.set(index);
      }
    });
    window.addEventListener('shopify:section:unload', (event) => {
      console.log(event);
      if(event.detail.sectionId.includes('CollectionTemplateCarousel')) {
        this.Carousel.destroy();
        this.Carousel = null;
      }
    });
    window.addEventListener('shopify:section:load', (event) => {
      if(event.detail.sectionId.includes('CollectionTemplateCarousel')) {
        this.initializeCarousel();
      }
    });
  }
}