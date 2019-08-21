import BaseClass from '../system/BaseClass';

export default class ProductReview extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.card;
    this.init();
  }

  init() {
    console.log('review initialized');
    const div = document.createElement('DIV');
    div.classList.add('row');
    div.insertAdjacentHTML('beforeend', `<div class="col s12 m6">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title">${this.review.title}</span>
        <p>${this.review.content}</p>
      </div>
      <div class="card-action">
        ${this.review.display_name}
      </div>
    </div>
  </div>`);
    this.card = div;
  }
}