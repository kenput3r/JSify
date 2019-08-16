import BaseClass from '../system/BaseClass';
import ProductForm from '../components/ProductForm';

export default class ProductTile extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.init();
  }

  init() {
    M.Tooltip.init(this.rootElement.querySelector('.tooltipped'));
    const form = this.rootElement.querySelector('.product-form');
    const NewProductForm = new ProductForm(form, {ProductTile: this.rootElement});
  }
}