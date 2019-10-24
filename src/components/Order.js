import BaseClass from '../system/BaseClass';

export default class Order extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);

    this.init();
  }

  init() {
    const collapsible_elems = this.rootElement.querySelectorAll('.collapsible');
    const collapsibles = M.Collapsible.init(collapsible_elems);
  }
}