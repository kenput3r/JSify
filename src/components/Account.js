import BaseClass from '../system/BaseClass';

export default class Account extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);

    this.init();
  }

  init() {
    const model_el = this.rootElement.querySelectorAll('#EditCustomer');
    const modal = M.Modal.init(model_el);
  }
}