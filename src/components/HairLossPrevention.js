import BaseClass from '../system/BaseClass';

export default class HairLossPrevention extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.init();
  }
  
  /**
   * @method handleScroll
   * @param {event} event 
   */
  handleScroll(event) {
    const selector = event.target.getAttribute('data-target');
    const target = document.querySelector(selector);
    const elementPosition = target.offsetTop;
    const offsetPosition = elementPosition;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
  }
  
  /**
   * @method isScrollingUp - Returns true if invoked inside of a scroll event, when scrolling up
   * @returns boolean
   */
  isScrollingUp() {
    let scroll_top = pageYOffset;
    if(scroll_top > this.last_scroll_top) {
      this.last_scroll_top = scroll_top <= 0 ? 0 : scroll_top;
      return false;
    }else{
      this.last_scroll_top = scroll_top <= 0 ? 0 : scroll_top;
      return true;
    }
  }
  
  /**
   * @method fixTitles
   */
  fixStickyTitles() {
    
    window.addEventListener('scroll', () => {
      if (window.screen.width >= 992) {        
        const is_scrolling_up = this.isScrollingUp();
        const el_height = document.querySelector(".nav-fixed-wrapper").offsetHeight;
        const sticky_titles = this.rootElement.querySelectorAll(".sticky-title");
        if(is_scrolling_up) {
          sticky_titles.forEach(sticky => sticky.style = `top: ${el_height}px; !important`);
        } else if (!is_scrolling_up && window.pageYOffset >= el_height) {
          sticky_titles.forEach(sticky => sticky.style = `top: 0; !important`);
        }
      }
    });
  }

  init() {
    window.onload = this.rootElement.querySelectorAll('.scroll-to')
      .forEach(link => link.addEventListener("click", this.handleScroll));
    this.fixStickyTitles();
  }
  
  destroy() {
    this.rootElement.querySelectorAll('.scroll-to')
      .forEach(link => link.removeEventListener("click", this.handleScroll));
  }
}