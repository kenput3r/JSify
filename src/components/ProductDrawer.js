import BaseClass from '../system/BaseClass';
import initializeDrawer from '../utils/intializeDrawer';
import insertDrawerContent from '../utils/insertDrawerContent';
import insertDrawerPlaceholder from '../utils/insertDrawerPlaceholder';

export default class ProductDrawer extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.state = {
      page_url: window.location.href,
      page_title: document.title
    };
    this.Instance = {};
    this.init();
  }

  onOpenStart() {
    const product_url = event.target.dataset.url;
    const page_title = event.target.dataset.pageTitle;
    const close = ()=> this.Instance.close();
    insertDrawerContent(this.rootElement, product_url);
    history.pushState(this.state, page_title, product_url.replace('?view=stripped', ''));
    window.addEventListener('popstate', close);
  }

  onCloseStart() {
    window.removeEventListener('popstate', close);
    history.pushState(this.state, this.state.page_title, this.state.page_url);
  }

  onCloseEnd() {
    insertDrawerPlaceholder(this.rootElement);
  }

  async init() {
    const options = {
      edge: 'right', 
      onOpenStart: ()=>this.onOpenStart(),
      onCloseStart: ()=>this.onCloseStart(),
      onCloseEnd: ()=>this.onCloseEnd()
    };
    this.Instance = await new Promise((resolve, reject)=> {
      initializeDrawer('ProductDrawer', options, {resolve: resolve, reject: reject});
    });
  }
}