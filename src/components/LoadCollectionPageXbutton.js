import BaseClass from '../system/BaseClass';
import getCollectionPageX from '../utils/getCollectionPage';
import ProductTile from '../components/ProductTile';

export default class LoadCollectionPageXbutton extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);

    this.collection = document.querySelector('[data-collection]').dataset;
    this.starting_page = parseInt(this.collection.currentPage);
    this.ending_page = this.starting_page === 1 ? parseInt(this.collection.pages) : this.starting_page - 1;
    this.state_object = {};

    this.init();
  }

  init() {
    this.rootElement.addEventListener('click', async () => {
      let next_page;

      if(this.starting_page === 1 && parseInt(this.collection.currentPage) !== this.ending_page) {
        next_page = parseInt(this.collection.currentPage) + 1;
      }else if(this.starting_page !== 1 && parseInt(this.collection.currentPage) !== this.ending_page) {
        if(parseInt(this.collection.currentPage) === parseInt(this.collection.pages)) {
          next_page = 1;
        }else{
          next_page = parseInt(this.collection.currentPage) + 1;
        }
      }else{
        return;
      }

      let page_title = this.collection.pageTitle+' | Page '+next_page;
      let collection_url = 'https://'+this.collection.url+'?view=products&page='+next_page;

      try {
        let elements = await new Promise((resolve, reject)=> getCollectionPageX(collection_url, {resolve: resolve, reject: reject}));
        document.getElementById('Products').insertAdjacentHTML('beforeend', elements);
        history.pushState(this.state_object, page_title, collection_url.replace('view=products&', ''));
        this.collection.currentPage = next_page;
        if(parseInt(this.collection.currentPage) === parseInt(this.ending_page)) {
          this.rootElement.classList.add('hide');
        }
        const tiles = Array.from(document.querySelectorAll(`.product-tile-page-${next_page}`));
        tiles.map(tile=> {
          return new ProductTile(tile);
        });
      }catch(error) {
        console.log(error);
      }

    });
  }
}