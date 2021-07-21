import BaseClass from '../system/BaseClass';
import ProductForm from '../components/ProductForm';
import ProductFormCompactSubscription from '../components/ProductFormCompactSubscription';

/**
 * @class ProductTile - The card containing the product.
 * Initializes Materialize Tooltips.
 * @see {@link https://materializecss.com/tooltips.html}
 */
export default class ProductTile extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.init();
  }

  init() {
    M.Tooltip.init(this.rootElement.querySelector('.tooltipped'));
    const form = this.rootElement.querySelector('.product-form');
    const product_template = this.rootElement.dataset.template;
    if (product_template === 'subscription' || product_template === 'minoxidil') {
      new ProductFormCompactSubscription(form, {ProductTile: this.rootElement});
    } else {
      new ProductForm(form, {ProductTile: this.rootElement}); 
    }
  }
}