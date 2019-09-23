import BaseClass from '../system/BaseClass';
/**
 * @class FiltersDrawer - Initializes a Materialize Sidenav
 * @see {@link https://materializecss.com/sidenav.html}
 */
export default class FiltersDrawer extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.init();
  }

  init() {
    const options = {
      edge: 'left',
      draggable: 'false',
      preventScrolling: 'true'
    }
    const Drawer = M.Sidenav.init(this.rootElement, options);
  }
}