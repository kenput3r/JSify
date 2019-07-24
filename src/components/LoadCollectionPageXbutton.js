import BaseClass from '../system/BaseClass';

export default class LoadCollectionPageXbutton extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    // console.log(this);
    // console.log(this.rootElement);

    this.data = this.rootElement.dataset.nextPageNumber;

    this.init();
  }

  init() {
    this.rootElement.addEventListener('click', () => {
      console.log(`Next page number is ${this.data}`);
    });
  }
}