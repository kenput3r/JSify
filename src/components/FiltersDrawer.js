import BaseClass from '../system/BaseClass';
export default class FiltersDrawer extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.init();
  }

  init() {
    const Drawer = M.Sidenav.init(this.rootElement);
  }
}