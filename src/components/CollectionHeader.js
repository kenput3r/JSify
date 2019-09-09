import BaseClass from '../system/BaseClass';

/**
 * @class CollectionHeader - Methods for children of the CollectionHeader.
 * Initializes an instance of Materialize FormSelect.
 * @see {@link https://materializecss.com/select.html}
 */
export default class CollectionHeader extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.filters_visible = true;
    this.init();
  }
  /**
   * @method filter - Sorts collection of products using Shopify's sort methods
   * e.g. Featured, A-Z, Z-A etc
   * Appends query params to url and reloads page. Utilizes the global Shopify object.
   * @param {string} value 
   */
  filter(value) {
    Shopify.queryParams = {};
    if (location.search.length) {
      for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
        aKeyValue = aCouples[i].split('=');
        if (aKeyValue.length > 1) {
          Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
        }
      }
    }
    Shopify.queryParams.sort_by = value;
    let search_value = Object.keys(Shopify.queryParams).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(Shopify.queryParams[k]);
    }).join('&');
    search_value = search_value.replace(/\+/g, '%20');
    location.search = search_value;
  }

  /**
   * @method filtersColumnToggle - Toggles column widths and 
   * X translation css class of the FiltersColumn
   */
  filtersColumnToggle() {
    const Toggle = this.rootElement.querySelector('.filters-column-toggle');
    const FiltersColumn = document.getElementById(Toggle.dataset.target);
    const ProductsColumn = document.getElementById(Toggle.dataset.sibling);
    Toggle.addEventListener('click', ()=> {
      if(this.filters_visible) {
        FiltersColumn.classList.remove('l3');
        FiltersColumn.classList.add('l0', 'pull-left');
        ProductsColumn.classList.remove('l9');
        this.filters_visible = false;
      }else{
        FiltersColumn.classList.add('l3');
        FiltersColumn.classList.remove('l0', 'pull-left');
        ProductsColumn.classList.add('l9');
        this.filters_visible = true;
      }
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

  positionFixCollectionMenu() {
    if(window.innerWidth < 601) {
      const scrolling_up = this.isScrollingUp();
      const Menu = this.rootElement.querySelector('#CollectionMenu');
      const menu_offset_top = Menu.offsetTop;
      let is_fixed = false;
      window.addEventListener('scroll', () => {
        if(!is_fixed && window.pageYOffset >= menu_offset_top) {
          Menu.style = 'position: fixed; top: 0; width: 100%; z-index: 995;';
          Menu.classList.add('z-depth-1');
          is_fixed = true;
        }else if(is_fixed && window.pageYOffset <= menu_offset_top) {
          Menu.removeAttribute('style');
          Menu.classList.remove('z-depth-1');
          is_fixed = false;
        }
      });
    }
  }

  init() {
    this.positionFixCollectionMenu();
    this.filtersColumnToggle();
    const select = this.rootElement.querySelector('select');
    select.addEventListener('change', (event)=> {
      this.filter(event.target.value);
    })
    const materialize_select = M.FormSelect.init(select, {classes: 'sort-by-select'});
  }
}