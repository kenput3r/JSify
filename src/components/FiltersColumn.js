import BaseClass from '../system/BaseClass';
export default class FiltersColumn extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.fixed_bottom = false;
    this.fixed_top = false;
    this.absolute_top = false;
    this.last_scroll_top = window.pageYOffset;
    this.sibling = document.querySelector('[data-column-sibling]');
    this.scroll_change = false;
    this.init();
  }
  /**
   * Returns true if invoked inside of a scroll event, when scrolling up
   */
  scrollingUp() {
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
   * Returns an object containing el's top and left offset
   * @param {element} el 
   */
  offset(el) {
    const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

  /**
   * Dynamically fixes position and re-enables scrolling
   */
  fixColumn() {
    const column = this.rootElement.querySelector('.inner-wrapper');
    const bottom_marker = column.querySelector('.bottom-marker');
    const outer_top_marker = this.rootElement.querySelector('.outer-top-marker');
    const outer_top_marker_offset = this.offset(outer_top_marker);
    //Handles case when column is shorter than sibling
    if(column.offsetHeight < window.innerHeight) {
      window.addEventListener('scroll', (event) => {
        const column_offset = this.offset(column);
        const scrolling_up = this.scrollingUp();
        //Handle fixing to top
        if(!this.fixed_top && window.pageYOffset >= column_offset.top) {
          column.setAttribute('style', 'position:fixed; top:0');
          this.fixed_top = true;
        //Handle releasing fixed position
        }else if(this.fixed_top && window.pageYOffset <= outer_top_marker_offset.top && scrolling_up) {
          column.setAttribute('style', '');
          this.fixed_top = false;
        }
      });
    //Handles case when column is taller than sibling
    }else{
      window.addEventListener('scroll', (event) => {
        const yPosition = window.pageYOffset + window.innerHeight;
        const scrolling_up = this.scrollingUp();
        const column_offset = this.offset(column);
        const bottom_marker_offset = this.offset(bottom_marker);
        //Handle fixing to bottom
        if(yPosition >= bottom_marker_offset.top 
          && !this.fixed_bottom && !this.fixed_top && !scrolling_up
          && column.offsetHeight < this.sibling.offsetHeight) {
          column.setAttribute('style', 'position:fixed; bottom:0');
          this.fixed_bottom = true;
          this.fixed_top = false;
          this.absolute_top = false;
          this.scroll_change = false;
        //Scroll up with body from fixed bottom position
        }else if(this.fixed_bottom && scrolling_up && !this.absolute_top) {
          //Handle rubberbanding at bottom of page
          if(!this.scroll_change) {
            this.scroll_change = window.pageYOffset;
          }
          //Initiates after change of 50 to handle rubberbanding
          if(Math.abs(this.scroll_change - window.pageYOffset > 50)) {
            const difference = column.offsetHeight - window.innerHeight;
            const abs_pos = window.pageYOffset - difference;
            column.setAttribute('style', `position:absolute; top:${abs_pos}px;`);
            this.absolute_top = true;
            this.fixed_bottom = false;
            this.fixed_top = false;
          }
        //Handle fixing position to top
        }else if(this.absolute_top && scrolling_up && !this.fixed_top 
          && window.pageYOffset <= column_offset.top) {
          column.setAttribute('style', 'position:fixed; top:0');
          this.fixed_top = true;
          this.absolute_top = false;
          this.fixed_bottom = false;
          this.scroll_change = false;
        //Scroll down with body from fixed top position
        }else if(this.fixed_top && !scrolling_up){
          const abs_pos = window.pageYOffset;
          column.setAttribute('style', `position:absolute; top:${abs_pos}px;`);
          this.absolute_top = true;
          this.fixed_top = false;
          this.fixed_bottom = false;
          this.scroll_change = false;
        //Release fixed top position
        }else if(this.fixed_top && window.pageYOffset <= outer_top_marker_offset.top) {
          column.setAttribute('style', ``);
          this.fixed_top = false;
          this.absolute_top = false;
          this.fixed_bottom = false;
          this.scroll_change = false;
        }
      });
    }
  }

  init() {
    this.fixColumn();
  }
}