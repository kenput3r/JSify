import BaseClass from '../system/BaseClass';
export default class FiltersColumn extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.bottom = this.rootElement.querySelector('.bottom-marker').offsetTop;
    this.top = this.rootElement.querySelector('.top-marker').offsetTop;
    this.fixed_bottom = false;
    this.fixed_top = false;
    this.absolute_top = false;
    this.lastScrollTop = window.pageYOffset;
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

  fixColumn() {
    const column = this.rootElement.querySelector('.list-wrapper');
    const bottom_marker = column.querySelector('.bottom-marker');
    const top_marker = column.querySelector('.top-marker');
    window.addEventListener('scroll', (event) => {
      let yPosition = window.pageYOffset + window.innerHeight;
      let scrolling_up = this.scrollingUp();
      //Handle fixing to bottom
      if(yPosition >= bottom_marker.offsetTop && !this.absolute_top && !this.fixed_bottom && !this.fixed_top && !scrolling_up) {
        column.setAttribute('style', 'position:fixed; bottom:0');
        this.fixed_bottom = true;
      //Scroll up with body from fixed at bottom
      }else if(this.fixed_bottom && scrolling_up && !this.absolute_top) {
        const difference = column.scrollHeight - window.innerHeight;
        const abs_pos = window.pageYOffset - difference;
        column.setAttribute('style', `position:absolute; top:${abs_pos}px;`);
        this.absolute_top = true;
        this.fixed_bottom = false;
      //Handle fixing to top
      }else if(this.absolute_top && scrolling_up && !this.fixed_top && window.pageYOffset <= column.offsetTop) {
        column.setAttribute('style', 'position:fixed; top:0');
        this.fixed_top = true;
        this.absolute_top = false;
        this.fixed_bottom = false;
      //Scroll down with body from fixed at top
      }else if(this.fixed_top && !scrolling_up && !this.absolute_top){
        const abs_pos = window.pageYOffset;
        column.setAttribute('style', `position:absolute; top:${abs_pos}px;`);
        this.absolute_top = true;
        this.fixed_top = false;
      }else if(this.fixed_top && window.pageYOffset <= top_marker.offsetTop) {
        column.setAttribute('style', ``);
        this.fixed_top = false;
      //Handle fixing to bottom from absolute position
      }else if(this.absolute_top) {
        console.log(yPosition, bottom_marker.offsetTop)
      }
    })
  }

  init() {
    console.log('FiltersColumn Initialized');
    this.fixColumn();
  }
}