import BaseClass from '../system/BaseClass';
export default class CollectionHeader extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.init();
  }

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

  init() {
    const select = this.rootElement.querySelector('select');
    select.addEventListener('change', (event)=> {
      this.filter(event.target.value);
    })
    const materialize_select = M.FormSelect.init(select, {classes: 'sort-by-select'});
  }
}