import BaseClass from '../system/BaseClass';
import getCollectionPageX from '../utils/getCollectionPage';
import ProductTile from '../components/ProductTile';

/**
 * @class LoadCollectionPageXbutton
 * Fetches a collection page
 */
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

      let page_title = this.collection.pageTitle+' | Page '+next_page;
      let collection_url = 'https://'+this.collection.url+'?view=products&page='+next_page;

      //Fetch collection page and insert it into the tile container
      try {
        let elements = await new Promise((resolve, reject) => getCollectionPageX(collection_url, {resolve: resolve, reject: reject}));
        document.getElementById('Products').querySelector('.tile-container').insertAdjacentHTML('beforeend', elements);
        history.pushState(this.state_object, page_title, collection_url.replace('view=products&', ''));
        this.collection.currentPage = next_page;
        //Hide the button if there are no more pages to fetch
        if(parseInt(this.collection.currentPage) === parseInt(this.ending_page)) {
          this.rootElement.classList.add('hide');
        }
      }catch(error) {
        console.log(error);
      }

    });
  }
}