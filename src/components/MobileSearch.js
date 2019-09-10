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

  onOpenEnd() {
    // const algolia_dropdowns = Array.from(document.querySelectorAll('.algolia-autocomplete'));
    // const max_height = window.innerHeight - this.rootElement.querySelector('.modal-content').offsetHeight;
    // algolia_dropdowns.map(dropdown => {
    //   dropdown.style.height = max_height;
    //   dropdown.style.maxHeight = max_height;
    // });
    document.body.style.position = 'fixed';
    document.body.style.height = '100vh';
    document.body.style.top = `-${this.scrollY}px`;

  }

  onCloseStart() {
    const top = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(top || '0') * -1);
  }

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