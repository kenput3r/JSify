import BaseClass from '../system/BaseClass';

/**
 * @class OrdersHelp - Initializes materialize Select
 * @see {@link https://materializecss.com/select.html}
 */
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