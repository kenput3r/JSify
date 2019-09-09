import BaseClass from '../system/BaseClass';

/**
 * @class MobileMenu - Methods surrounding the mobile menu.
 */
export default class MobileMenu extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.init();
  }

  /**
   * @method collapsibleOpenStart - Functions to run when the collapsible
   * instance is opened. Swaps drop arrow icon.
   * @param {node} event_target 
   */
  collapsibleOpenStart(event_target) {
    event_target.querySelector('.material-icons').innerHTML = 'arrow_drop_up';
  }

  /**
   * @method collapsibleCloseStart - Functions to run when the collapsible
   * instance is closed. Swaps drop arrow icon.
   * @param {node} event_target 
   */
  collapsibleCloseStart(event_target) {
    event_target.querySelector('.material-icons').innerHTML = 'arrow_drop_down';
  }

  init() {
    const collapsible_options = {
      accordion: false,
      onOpenStart: this.collapsibleOpenStart,
      onCloseStart: this.collapsibleCloseStart
    };
    const collapsibles = this.rootElement.querySelectorAll('.collapsible');
    const collapsible_instances = M.Collapsible.init(collapsibles, collapsible_options);
    const menu_options = {
      edge: 'right'
    }
    const menu = M.Sidenav.init(this.rootElement, menu_options);
  }
}