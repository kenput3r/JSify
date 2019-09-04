import BaseClass from '../system/BaseClass';
export default class FiltersColumnToggle extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.visible = true;
    this.init();
  }

  init() {
    const FiltersColumn = document.getElementById(this.rootElement.dataset.target);
    const ProductsColumn = document.getElementById(this.rootElement.dataset.sibling);
    this.rootElement.addEventListener('click', ()=> {
      if(this.visible) {
        FiltersColumn.classList.remove('l3');
        FiltersColumn.classList.add('l0', 'pull-left');
        ProductsColumn.classList.remove('l9');
        this.visible = false;
      }else{
        FiltersColumn.classList.add('l3');
        FiltersColumn.classList.remove('l0', 'pull-left');
        ProductsColumn.classList.add('l9');
        this.visible = true;
      }
    });
  }
}