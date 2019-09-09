import BaseClass from '../system/BaseClass';

/**
 * @class MobileNav - Methods for the mobile navigation
 */
export default class MobileNav extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.init();
  }

  addCloseTriggers() {
    const triggers = this.rootElement.querySelectorAll('[data-closes]');
    Array.from(triggers).map(trigger => {
      const target_el = document.getElementById(trigger.dataset.closes);
      trigger.addEventListener('click', (event) => {
      const drawer = M.Sidenav.getInstance(target_el);
        if(drawer.isOpen) {
          event.stopImmediatePropagation();
          drawer.close();
        }
      });
    });
  }

  init() {
    this.addCloseTriggers();
  }
}