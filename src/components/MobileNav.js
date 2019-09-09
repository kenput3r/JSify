import BaseClass from '../system/BaseClass';

/**
 * @class MobileNav - Methods for the mobile navigation
 */
export default class MobileNav extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.height = this.rootElement.offsetHeight;
    this.parent = this.rootElement.parentElement;
    this.last_scroll_top = window.pageYOffset;
    this.scroll_change = 0;
    this.in_view = true;
    this.init();
  }

  /**
   * @method scrollingUp - Returns true if invoked inside of a scroll event, when scrolling up
   * @returns boolean
   */
  scrollingUp() {
    let scroll_top = window.pageYOffset;
    if(scroll_top > this.last_scroll_top) {
      this.last_scroll_top = scroll_top <= 0 ? 0 : scroll_top;
      return false;
    }else{
      this.last_scroll_top = scroll_top <= 0 ? 0 : scroll_top;
      return true;
    }
  }

  /**
   * @method changePosition - Slides the nav in and out of view.
   */
  changePosition() {
    window.addEventListener('scroll', () => {
      const scrolling_up = this.scrollingUp();
      //scrolling down
      if(!scrolling_up  && this.in_view) {
        if(!this.scroll_change) {
          this.scroll_change = window.pageYOffset;
        }
        if(Math.abs(window.pageYOffset - this.scroll_change > 50)) {
          this.parent.style = `transform: translateY(${this.height}px)`;
          this.in_view = false;
          this.scroll_change = 0;
        }
      }else if(scrolling_up && !this.in_view) {
        this.parent.style = 'tranform: translateY(0)';
        this.in_view = true;
      }
    });
  }

  /**
   * @method addCloseTriggers - Toggles open/close behavior of triggers.
   */
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
    this.changePosition();
  }
}