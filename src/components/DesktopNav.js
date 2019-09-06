import BaseClass from '../system/BaseClass';
/**
 * @class DesktopNav - Methods for the Desktop Navigation. Utilizes
 * the Materialize Dropdown.
 * @see {@link https://materializecss.com/dropdown.html}
 */
export default class DesktopNav extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.init();
  }

  init() {
    const triggers = this.rootElement.querySelectorAll('.dropdown-trigger');
    const dropdown_options = {
      constrainWidth: false,
      coverTrigger: false,
      container: '.nav-wrapper'
    }
    const dropdowns = M.Dropdown.init(triggers, dropdown_options);
  }
}