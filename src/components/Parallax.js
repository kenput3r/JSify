import BaseClass from '../system/BaseClass';

export default class Parallax extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.init();
  }

  init() {
    const elems = this.rootElement.querySelectorAll('.parallax');
    const sections = M.Parallax.init(elems);
  }
}