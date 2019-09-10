import BaseClass from '../system/BaseClass';

/**
 * @class MobileSearch - Methods surounding the mobile search view
 */
export default class MobileSearch extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.onOpenEnd = this.onOpenEnd.bind(this);
    this.onCloseStart = this.onCloseStart.bind(this);
    this.scrollY = 0;
    this.init();
  }

  /**
   * @method onOpenEnd - Modifies body style props after the modal
   * has finished opening. *Fix for mobile safari.
   */
  onOpenEnd() {
    document.body.style.position = 'fixed';
    document.body.style.height = '100vh';
    document.body.style.top = `-${this.scrollY}px`;

  }

  /**
   * @method onCloseStart - Modifies body props and sets window
   * scroll position while the modal is closing. *Fix for mobile safari.
   */
  onCloseStart() {
    const top = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(top || '0') * -1);
  }

  /**
   * @method setScrollY - Sets the instance variable scrollY
   * to the current pageYOffset.
   */
  setScrollY() {
    window.addEventListener('scroll', () => {
      this.scrollY = window.pageYOffset;
    })
  }

  init() {
    this.setScrollY();
    const modal_options = {
      onOpenEnd: this.onOpenEnd,
      onCloseStart: this.onCloseStart
    }
    const modal = M.Modal.init(this.rootElement, modal_options);
  }
}