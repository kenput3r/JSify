import BaseClass from '../system/BaseClass';
import ProductReview from './ProductReview';

export default class ProductReviews extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.app_key = 'q7EYKyLuCq4wDQ7s0M36GkawfE2I4JDL9gg4wvGY';
    this.getReviews = this.getReviews.bind(this);
    this.generateStars = this.generateStars.bind(this);
    this.displayReviews = this.displayReviews.bind(this);
    this.init();
  }

  async getReviews(promise, page) {
    if(!page) page = 1;
    const headers = new Headers({'Content-Type': 'application/json'});
    const url = `https://api.yotpo.com/v1/widget/${this.app_key}/products/${this.product_id}/reviews.json?page=${page}`;
    const data = await fetch(url, {headers: headers});
    const reviews = await data.json();
    console.log(reviews);
    return promise.resolve(reviews.response);
  }

  generateStars(average_score, review_count) {
    const full_stars = Math.floor(average_score);
    const half_stars = Math.round(average_score % 1);
    const empty_stars = 5 - half_stars - full_stars;
    const star_container = document.createElement('SPAN');
    for(let i = 1; i <= average_score; i++) {
      star_container.insertAdjacentHTML('beforeend', '<i class="material-icons">star</i>');
    }
    half_stars === 1 ? star_container.insertAdjacentHTML('beforeend', '<i class="material-icons">star_half</i>') : null;
    for(let i = 1; i <= empty_stars; i++) {
      star_container.insertAdjacentHTML('beforeend', '<i class="material-icons">star_border</i>');
    }
    this.rootElement.appendChild(star_container);
  }

  displayReviews(yotpo) {
    const total_reviews = yotpo.bottomline.total_review;
    const total_pages = Math.ceil(total_reviews / yotpo.pagination.per_page);
    const current_page = yotpo.pagination.page;
    for(let i = 0; i < yotpo.reviews.length; i++) {
      const review = yotpo.reviews[i];
      //const div = document.createElement('DIV');
      //div.insertAdjacentHTML('beforeend', `<p>${review.content}</p>`);
      const card = new ProductReview(this.rootElement, {review: review});
      //div.insertAdjacentHTML('beforeend', card)
      console.log(card);
      this.rootElement.appendChild(card.card);
    }
    if(current_page < total_pages) {
      console.log(`There are ${total_pages - current_page} pages remaining`);
    }
  }

  async init() {
    console.log('yotpo init');
    const reviews = await new Promise((resolve, reject)=>this.getReviews({resolve:resolve, reject:reject}));
    this.displayReviews(reviews);
    const average_score = reviews.bottomline.average_score;
    const review_count = reviews.bottomline.total_review
    this.generateStars(average_score, review_count);
  }

}