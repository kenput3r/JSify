import BaseClass from '../system/BaseClass';
export default class FiltersColumn extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.fixed_bottom = false;
    this.fixed_top = false;
    this.absolute_top = false;
    this.lastScrollTop = window.pageYOffset;
    this.sibling = document.getElementById('Products');
    this.init();
  }

  scrollingUp() {
    let scroll_top = pageYOffset;
    if(scroll_top > this.lastScrollTop) {
      this.lastScrollTop = scroll_top <= 0 ? 0 : scroll_top;
      return false;
    }else{
      this.lastScrollTop = scroll_top <= 0 ? 0 : scroll_top;
      return true;
    }
  }

  offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

  fixColumn() {
    const column = this.rootElement.querySelector('.list-wrapper');
    const bottom_marker = column.querySelector('.bottom-marker');
    const top_marker = column.querySelector('.top-marker');
    const outer_top_marker = this.rootElement.querySelector('.outer-top-marker');
    const outer_top_marker_offset = this.offset(outer_top_marker);
    if(column.offsetHeight < window.innerHeight) {
      window.addEventListener('scroll', (event) => {
        const column_offset = this.offset(column);
        const scrolling_up = this.scrollingUp();
        if(!this.fixed_top && window.pageYOffset >= column_offset.top) {
          column.setAttribute('style', 'position:fixed; top:0');
          this.fixed_top = true;
        }else if(this.fixed_top && window.pageYOffset <= column_offset.top && scrolling_up) {
          column.setAttribute('style', '');
          this.fixed_top = false;
        }
      });
    }else {
      window.addEventListener('scroll', (event) => {
        const yPosition = window.pageYOffset + window.innerHeight;
        const scrolling_up = this.scrollingUp();
        const column_offset = this.offset(column);
        const bottom_marker_offset = this.offset(bottom_marker);
        //Handle fixing to bottom
        if(yPosition >= bottom_marker_offset.top && !this.absolute_top 
          && !this.fixed_bottom && !this.fixed_top && !scrolling_up) {
          if(column.offsetHeight < this.sibling.offsetHeight) {
          column.setAttribute('style', 'position:fixed; bottom:0');
          this.fixed_bottom = true;
          this.fixed_top = false;
          this.absolute_top = false;
          }
        //Scroll up with body from fixed at bottom
        }else if(this.fixed_bottom && scrolling_up && !this.absolute_top) {
          const difference = column.offsetHeight - window.innerHeight;
          const abs_pos = window.pageYOffset - difference;
          column.setAttribute('style', `position:absolute; top:${abs_pos}px;`);
          this.absolute_top = true;
          this.fixed_bottom = false;
          this.fixed_top = false;
        //Handle fixing to top
        }else if(this.absolute_top && scrolling_up && !this.fixed_top 
          && window.pageYOffset <= column_offset.top) {
          column.setAttribute('style', 'position:fixed; top:0');
          this.fixed_top = true;
          this.absolute_top = false;
          this.fixed_bottom = false;
        //Scroll down with body from fixed at top
        }else if(this.fixed_top && !scrolling_up){
          const abs_pos = window.pageYOffset;
          column.setAttribute('style', `position:absolute; top:${abs_pos}px;`);
          this.absolute_top = true;
          this.fixed_top = false;
          this.fixed_bottom = false;
        //Release Fixed Top
        }else if(this.fixed_top && window.pageYOffset <= outer_top_marker_offset.top) {
          column.setAttribute('style', ``);
          this.fixed_top = false;
          this.absolute_top = false;
          this.fixed_bottom = false;
        }
      });
    }
  }

  init() {
    this.fixColumn();
  }
}