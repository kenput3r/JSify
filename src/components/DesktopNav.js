import BaseClass from '../system/BaseClass';
/**
 * @class DesktopNav - Methods for the Desktop Navigation. Utilizes
 * the Materialize Dropdown.
 * @see {@link https://materializecss.com/dropdown.html}
 */
export default class DesktopNav extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.active_trigger;
    this.init();
  }

  /**
   * @method onOpenEnd - Adds active class to trigger
   * @param {EventTarget} trigger 
   */
  onOpenStart(trigger) {
    trigger.classList.add('active');
  }

  /**
   * @method onCloseStart - Removes active class from trigger
   * @param {EventTarget} trigger
   */
  onCloseStart(trigger) {
    trigger.classList.remove('active');
  }

  init() {
    const triggers = this.rootElement.querySelectorAll('.dropdown-trigger');
    const dropdown_options = {
      constrainWidth: false,
      coverTrigger: false,
      container: '.nav-wrapper',
      onOpenStart: this.onOpenStart,
      onCloseStart: this.onCloseStart
    }
    const dropdowns = M.Dropdown.init(triggers, dropdown_options);
  }
}