import BaseClass from '../system/BaseClass';

/**
 * @class ProductReviewForm
 * Collects and submits YotPo reviews
 */
export default class ProductReviewForm extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.handleStarSelect = this.handleStarSelect.bind(this);
    this.handleStarMouseOver = this.handleStarMouseOver.bind(this);
    this.handleStarMouseOut = this.handleStarMouseOut.bind(this);
    this.destroy = this.destroy.bind(this);
    this.onOpenStart = this.onOpenStart.bind(this);
    this.onCloseEnd = this.onCloseEnd.bind(this);
    this.ReviewModal = {};
    this.star_rating = 0;
    this.product = {};
    this.is_customer = this.rootElement.dataset.isCustomer;
    this.submitReview = this.submitReview.bind(this);
    this.init();
  }

  /**
   * @method handleStarSelect
   * Sets the stars active class
   * and stores the star rating
   */
  handleStarSelect() {
    if(event.target.classList.contains('star')) {
      const rating = event.target.dataset.number;
      const active_class = '.stars-'+rating;
      this.rootElement.querySelector('.active-stars').classList.remove('active-stars');
      this.rootElement.querySelector(active_class).classList.add('active-stars');
      this.star_rating = rating;
    }
  }

  /**
   * @method handleStarMouseOver
   * Lights up the stars on hover
   */
  handleStarMouseOver() {
    if(event.target.classList.contains('star')) {
      const rating = event.target.dataset.number;
      const active_class = '.stars-'+rating;
      this.rootElement.querySelector('.active-stars').classList.remove('active-stars');
      this.rootElement.querySelector(active_class).classList.add('active-stars');
    }
  }

  /**
   * @method handleStarMouseOut
   * Reverts star ligting to current star rating selection
   */
  handleStarMouseOut() {
    if(event.target.classList.contains('star')) {
      const rating = this.star_rating;
      const active_class = '.stars-'+rating;
      this.rootElement.querySelector('.active-stars').classList.remove('active-stars');
      this.rootElement.querySelector(active_class).classList.add('active-stars');
    }
  }

  onOpenStart() {
    if(this.is_customer) {
      this.product = document.querySelector('[data-product-info]').dataset;
      this.rootElement.addEventListener('mouseover', this.handleStarMouseOver);
      this.rootElement.addEventListener('mouseout', this.handleStarMouseOut);
      this.rootElement.addEventListener('click', this.handleStarSelect);
      this.rootElement.querySelector('.submit').addEventListener('click', this.submitReview);
    }
  }

  onCloseEnd() {
    this.destroy();
  }

  /**
   * @method submitReview
   * Post review to YotPo
   */
  async submitReview() {
    const headers = new Headers({'content-type': 'application/json'});
    const url = 'https://api.suavecito.com/api/shopify/retail/yotpo/';
    const review = {
      'domain': 'https://www.suavecito.com',
      'sku': this.product.id,
      'product_title': this.product.title,
      'product_url': this.product.url,
      'product_image_url': this.product.image,
      'display_name': this.rootElement.querySelector('#name').value,
      'email': this.rootElement.querySelector('#email').value,
      'review_content': this.rootElement.querySelector('#review-content').value,
      'review_title': this.rootElement.querySelector('#title').value,
      'review_score': this.star_rating
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(review)
      });
      if(!response.ok) { 
        throw new error(response)
      }else{ 
        this.ReviewModal.close();
      }
    }catch(error) {
      console.log(error);
    }
  }

  init() {
    const modal_options = {onOpenStart: this.onOpenStart, onCloseEnd: this.onCloseEnd};
    this.ReviewModal = M.Modal.init(this.rootElement, modal_options);
  }

  destroy() {
    if(this.is_customer) {
      this.product = {}
      this.rootElement.removeEventListener('mouseover', this.handleStarMouseOver);
      this.rootElement.removeEventListener('mouseout', this.handleStarMouseOut);
      this.rootElement.removeEventListener('click', this.handleStarSelect);
      this.rootElement.querySelector('.submit').removeEventListener('click', this.submitReview);
    }
  }
}