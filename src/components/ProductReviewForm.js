import BaseClass from '../system/BaseClass';

export default class ProductReviewForm extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.handleStarSelect = this.handleStarSelect.bind(this);
    this.ReviewModal = {};
    this.star_rating = 0;
    this.product = {};
    this.submitReview = this.submitReview.bind(this);
    this.init();
  }

  handleStarSelect() {
    if(event.target.classList.contains('star')) {
      const rating = event.target.dataset.number;
      const active_class = '.stars-'+rating;
      this.rootElement.querySelector('.active-stars').classList.remove('active-stars');
      this.rootElement.querySelector(active_class).classList.add('active-stars');
      this.star_rating = rating;
    }
  }

  submitReview() {
    const headers = new Headers({'content-type': 'application/json'});
    const url = 'https://api.yotpo.com/v1/widget/reviews';
    const review = {
      'appkey': 'q7EYKyLuCq4wDQ7s0M36GkawfE2I4JDL9gg4wvGY',
      'domain': 'https://suavecito.com',
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
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(review)
    }).then(response=>{
      response.json().then(json=>console.log(json));
    })
  }

  init() {
    this.product = document.querySelector('[data-product-info]').dataset;
    this.ReviewModal = M.Modal.init(this.rootElement);
    this.rootElement.addEventListener('mouseover', this.handleStarSelect);
    this.rootElement.addEventListener('click', this.handleStarSelect);
    this.rootElement.querySelector('.submit').addEventListener('click', this.submitReview);
  }

  destroy() {
    this.product = {}
    this.ReviewModal.destroy();
    this.rootElement.removeEventListener('mouseover', this.handleStarSelect);
    this.rootElement.removeEventListener('click', this.handleStarSelect);
    this.rootElement.querySelector('.submit').removeEventListener('click', this.submitReview);
  }
}