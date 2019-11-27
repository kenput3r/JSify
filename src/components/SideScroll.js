import BaseClass from '../system/BaseClass';
import getCollectionPage from '../utils/getCollectionPage';
import ProductTile from './ProductTile';
import LazyImage from './LazyImage';

export default class SideScroll extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.last_tile;
    this.loading = false;
    this.page = 1;
    this.toggleLoader = this.toggleLoader.bind(this);
    this.init();
  }

  getLastTile() {
    const tiles = this.rootElement.querySelectorAll('.product-tile');
    return tiles[tiles.length - 1];
  }

  toggleLoader() {
    if(this.loading) {
      const height = this.rootElement.querySelector('.side-scroll-card').offsetHeight;
      const width = this.rootElement.querySelector('.side-scroll-card').offsetWidth;
      const loader = `<div class="side-scroll-card pre-loader-card valign-wrapper" style="width:${width}px; height:${height}px">
      <div class="preloader-wrapper active" style="margin-left:auto; margin-right:auto">
        <div class="spinner-layer spinner-red-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>`;
    this.rootElement.insertAdjacentHTML('beforeend', loader);
    }else{
      const loader = this.rootElement.querySelector('.pre-loader-card');
      loader.parentNode.removeChild(loader);
    }
  }

  init() {
    this.totalProducts = parseInt(this.totalProducts);
    this.pages = Math.ceil(this.totalProducts / 24);
    if(this.totalProducts > 6 && this.pages === 0) {
      this.pages = 1;
    }
    this.last_tile = this.getLastTile();
    const url = this.url+'?view=sideScrollProducts&page=';
    this.rootElement.addEventListener('scroll', async(event) => {
      if(this.page <= this.pages) {
        const scroll_left = event.target.scrollLeft;
        if(this.last_tile.offsetLeft - window.innerWidth - scroll_left <= 600 && !this.loading) {
          this.loading = true;
          this.toggleLoader();
          const elements = await new Promise((resolve, reject) => getCollectionPage(`${url}${this.page}`, {resolve: resolve, reject: reject}));
          this.rootElement.insertAdjacentHTML('beforeend', elements);
          const new_tiles = document.querySelectorAll(`.product-tile-page-${this.page}`);
          for(let tile of new_tiles) {
            const lazy_image = tile.querySelector('.product-image');
            new LazyImage(lazy_image);
            new ProductTile(tile);
          }
          this.page = this.page + 1;
          this.loading = false;
          this.toggleLoader();
          this.last_tile = this.getLastTile();
        }
      }
    })
  }
}