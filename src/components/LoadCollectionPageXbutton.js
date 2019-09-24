import BaseClass from '../system/BaseClass';
import getCollectionPageX from '../utils/getCollectionPage';
import ProductTile from './ProductTile';

/**
 * @class LoadCollectionPageXbutton - Fetches a collection page
 */
export default class LoadCollectionPageXbutton extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.collection = document.querySelector('[data-collection]').dataset;
    this.starting_page = parseInt(this.collection.currentPage);
    this.ending_page = this.starting_page === 1 ? parseInt(this.collection.pages) : this.starting_page - 1;
    this.state_object = {};
    this.loading = false;
    this.loadPage = this.loadPage.bind(this);
    this.observeAndLoad = this.observeAndLoad.bind(this);
    this.init();
  }

  async loadPage() {
    //Conditionally set the next collection page to get
    let next_page;
    //If paging started on page 1 and there are more pages to fetch
    if(this.starting_page === 1 && parseInt(this.collection.currentPage) !== this.ending_page) {
      next_page = parseInt(this.collection.currentPage) + 1;
    //If paging started on a page other than one, and there are more pages to fetch
    }else if(this.starting_page !== 1 && parseInt(this.collection.currentPage) !== this.ending_page) {
      //If we are on the highest number of pages
      if(parseInt(this.collection.currentPage) === parseInt(this.collection.pages)) {
        next_page = 1;
      }else{
        next_page = parseInt(this.collection.currentPage) + 1;
      }
    }
    const template = this.rootElement.dataset.template ? this.rootElement.dataset.template : 'products';
    let collection_url = `https://${this.collection.url}?view=${template}&page=${next_page}`;

    //Fetch collection page and insert it into the tile container
    try {
      const loader = document.querySelector('.loading-more-products');
      loader.classList.remove('hide');
      this.rootElement.classList.add('hide');
      const elements = await new Promise((resolve, reject) => getCollectionPageX(collection_url, {resolve: resolve, reject: reject}));
      document.getElementById('Products').querySelector('.tile-container').insertAdjacentHTML('beforeend', elements);
      this.collection.currentPage = next_page;
      loader.classList.add('hide');
      //Initialize the new elements as ProductTiles
      const new_tiles = document.querySelectorAll(`.product-tile-page-${this.collection.currentPage}`);
      for(let tile of new_tiles) {
        new ProductTile(tile);
      }
      //Hide the button if there are no more pages to fetch
      if(parseInt(this.collection.currentPage) !== parseInt(this.ending_page)) {
        window.addEventListener('scroll', this.observeAndLoad);
        this.loading = false;
        this.rootElement.classList.remove('hide');
      }
    }catch(error) {
      console.log(error);
    }
  }

  /**
   * @method observeAndLoad - invokes loadPage once 800px from bottom
   * of document
   */
  observeAndLoad() {
    const body_height = document.body.offsetHeight;
    const window_height = window.innerHeight;
    const scrollY = window.pageYOffset;
    const trigger = scrollY >= body_height - window_height - 800;
    if(document.readyState === 'complete' && trigger && !this.loading) {
      this.loading = true;
      window.removeEventListener('scroll', this.observeAndLoad, true);
      this.loadPage();
    }
  }

  init() {
    window.addEventListener('scroll', this.observeAndLoad, true);
    this.rootElement.addEventListener('click', this.loadPage);
  }
}