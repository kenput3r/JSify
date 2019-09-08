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
    this.search_hold_focus;
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

  /**
   * @method searchRefocus - Fixes search losing focus when dropdown closes.
   * Toggles search icon boldness.
   */
  searchRefocus() {
    this.rootElement.querySelector('.search-bar').addEventListener('focusin', (event) => {
      this.search_hold_focus = true;
      setTimeout(() => {
        this.search_hold_focus = false;
      }, 150);
      this.rootElement.querySelector('li.search-icon i').classList.add('bold');
    });

    this.rootElement.querySelector('.search-bar').addEventListener('focusout', (event) => {
      this.rootElement.querySelector('li.search-icon i').classList.remove('bold');
      if(this.search_hold_focus) {
        this.rootElement.querySelector('.aa-input').focus();
        this.rootElement.querySelector('li.search-icon i').classList.add('bold');
      }
    });
  }

  init() {
    this.searchRefocus();
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