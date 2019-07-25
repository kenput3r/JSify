import BaseClass from '../system/BaseClass';
import getCollectionPageX from '../utils/getCollectionPage';

export default class LoadCollectionPageXbutton extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);

    this.collection = document.querySelector('[data-collection]').dataset;

    this.init();
  }

  init() {
    this.rootElement.addEventListener('click', () => {
      console.log(this.collection);
      console.log(this.collection.currentPage);
      getCollectionPageX(this.collection.url, 2);
    });
  }
}