import BaseClass from '../system/BaseClass';

export default class OrdersHelp extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.init();
  }

  init() {
    const select = this.rootElement.querySelector('#ContactFormOrderNumber');
    M.FormSelect.init(select);
  }
}