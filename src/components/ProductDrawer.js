import BaseClass from '../system/BaseClass';
import insertDrawerContent from '../utils/insertDrawerContent';
import insertDrawerPlaceholder from '../utils/insertDrawerPlaceholder';
import ProductForm from '../components/ProductForm';
import ProductReviews from '../components/ProductReviews';
import renderSnptScript from '../utils/renderSnptScript';
import ProductReviewForm from './ProductReviewForm';

/**
 * @class ProductDrawer
 * Instance of Materialize Sidenav, modified
 * to contain an asynchronously fetched product page
 */
export default class ProductDrawer extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.state = {
      page_url: window.location.href,
      page_title: document.title
    };
    this.Instance = {};//Used for storing reference to the Materialize Sidenav instance
    this.Swiper = {};//Used for storing reference to the Swiper instance
    this.ProductForm = {};//Used for storing reference to the ProductForm instance
    this.ReviewModal = {};//Used for storing reference to the ReviewModal instance
    this.name = 'ProductDrawer';
    this.init();
  }

  async onOpenStart() {
    const product_id = event.target.dataset.id;
    const product_url = event.target.dataset.url;
    const page_title = event.target.dataset.pageTitle;
    //Used as popstate callback to close the Drawer
    //ToDo: stop browser from reloading, or abandon function and event listener
    const close = (event)=> {
      this.Instance.close();
      window.onbeforeunload = ()=> {
        alert('the page is reloading');
      }
    }
    await new Promise((resolve, reject)=> {
      insertDrawerContent(this.rootElement, product_url, {resolve: resolve, reject: reject});
    });
    history.pushState(this.state, page_title, product_url.replace('?view=stripped', ''));
    document.getElementById('canonical').href = product_url.replace('?view=stripped', '');
    //window.addEventListener('popstate', close);
    const swiper_options = {
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
    this.Swiper = new Swiper('#ProductSwiper', swiper_options);
    const form = document.getElementById('ProductDrawer').getElementsByClassName('product-form')[0];
    this.ProductForm = new ProductForm(form, {Swiper: this.Swiper});
    const review_container = this.rootElement.querySelector('.product-reviews');
    const yotpo = new ProductReviews(review_container, {product_id: product_id});
    this.ReviewModal = new ProductReviewForm(document.getElementById('ReviewForm'));
    const snpt_container = document.querySelector('.snpt-wdgt--ppg');
    const snpt_script = renderSnptScript(snpt_container.dataset.vendor);
    snpt_container.appendChild(snpt_script);
  }

  onCloseStart() {
    window.removeEventListener('popstate', close);
    document.getElementById('canonical').href = this.page_url;
    history.pushState(this.state, this.state.page_title, this.state.page_url);
  }

  onCloseEnd() {
    insertDrawerPlaceholder(this.rootElement);
    this.Swiper.destroy();
    this.ProductForm.destroy();
  }

  async init() {
    const options = {
      edge: 'right',
      draggable: false, 
      onOpenStart: ()=>this.onOpenStart(),
      onCloseStart: ()=>this.onCloseStart(),
      onCloseEnd: ()=>this.onCloseEnd(),
      preventScrolling: true
    };
    this.Instance = M.Sidenav.init(this.rootElement, options);
  }
}