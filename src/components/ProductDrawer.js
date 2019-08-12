import BaseClass from '../system/BaseClass';
import initializeDrawer from '../utils/initializeDrawer';
import insertDrawerContent from '../utils/insertDrawerContent';
import insertDrawerPlaceholder from '../utils/insertDrawerPlaceholder';
import initializeSwiper from '../utils/initializeSwiper';
import initializeSelect from '../utils/initializeSelect';

export default class ProductDrawer extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.state = {
      page_url: window.location.href,
      page_title: document.title
    };
    this.Instance = {};
    this.init();
  }

  async onOpenStart() {
    const product_url = event.target.dataset.url;
    const page_title = event.target.dataset.pageTitle;
    const close = ()=> this.Instance.close();
    await new Promise((resolve, reject)=> {
      insertDrawerContent(this.rootElement, product_url, {resolve: resolve, reject: reject});
    });
    history.pushState(this.state, page_title, product_url.replace('?view=stripped', ''));
    window.addEventListener('popstate', close);
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
    initializeSelect('.product-option');
  }

  onCloseStart() {
    window.removeEventListener('popstate', close);
    history.pushState(this.state, this.state.page_title, this.state.page_url);
  }

  onCloseEnd() {
    insertDrawerPlaceholder(this.rootElement);
  }

  async init() {
    const options = {
      edge: 'right', 
      onOpenStart: ()=>this.onOpenStart(),
      onCloseStart: ()=>this.onCloseStart(),
      onCloseEnd: ()=>this.onCloseEnd()
    };
    this.Instance = await new Promise((resolve, reject)=> {
      initializeDrawer('ProductDrawer', options, {resolve: resolve, reject: reject});
    });
  }
}