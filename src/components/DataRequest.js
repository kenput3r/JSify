import BaseClass from '../system/BaseClass';

/**
 * @class DataRequest - Initializes materialize Select
 * @see {@link https://materializecss.com/select.html}
 */
export default class DataRequest extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.init();
  }

  init() {
    const select = this.rootElement.querySelector('#ContactFormRequestType');
    M.FormSelect.init(select);
  }
}