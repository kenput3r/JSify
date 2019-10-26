import BaseClass from '../system/BaseClass';
import getCollectionPage from '../utils/getCollectionPage';
import ProductTile from './ProductTile';

export default class SideScroll extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.last_tile;
    this.loading = false;
    this.page = 1;

    this.init();
  }

  getLastTile() {
    const tiles = this.rootElement.querySelectorAll('.product-tile');
    return tiles[tiles.length - 1];
  }

  init() {
    this.last_tile = this.getLastTile();
    const url = this.url+'?view=sideScrollProducts&page=';
    this.rootElement.addEventListener('scroll', async(event) => {
      if(this.page <= this.pages) {
        const scroll_left = event.target.scrollLeft;
        if(this.last_tile.offsetLeft - window.innerWidth - scroll_left <= 600 && !this.loading) {
          this.loading = true;
          const elements = await new Promise((resolve, reject) => getCollectionPage(`${url}${this.page}`, {resolve: resolve, reject: reject}));
          this.rootElement.insertAdjacentHTML('beforeend', elements);
          const new_tiles = document.querySelectorAll(`.product-tile-page-${this.page}`);
          for(let tile of new_tiles) {
            new ProductTile(tile);
          }
          this.page = this.page + 1;
          this.loading = false;
          this.last_tile = this.getLastTile();
        }
      }
    })
  }
}