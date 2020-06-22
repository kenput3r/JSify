import BaseClass from '../system/BaseClass';

export default class CookieBanner extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.init();
  }

  init() {
    console.log('CookieBanner initialized')
  }
}