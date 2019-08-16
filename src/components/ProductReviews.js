import BaseClass from '../system/BaseClass';

export default class ProductReviews extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.app_key = 'q7EYKyLuCq4wDQ7s0M36GkawfE2I4JDL9gg4wvGY';
    this.getReviews = this.getReviews.bind(this);
    this.generateStars = this.generateStars.bind(this);
    this.init();
  }

  async getReviews(promise) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const url = `https://api.yotpo.com/v1/widget/${this.app_key}/products/${this.product_id}/reviews.json?page=2`;
    const data = await fetch(url, {headers: headers});
    const reviews = await data.json();
    console.log(reviews);
    return promise.resolve(reviews.response);
  }

  generateStars(average_score, review_count) {
    if(average_score === 5) {
      console.log('5 stars');
    }else if(average_score < 5 && average_score > 4) {
      console.log('4.5 stars');
    }else if(average_score === 4) {
      console.log('4 stars');
    }else if(average_score < 4 && average_score > 3) {
      console.log('3.5 stars');
    }else if(average_score === 3) {
      console.log('3 stars');
    }else if(average_score < 3 && average_score > 2) {
      console.log( '2.5 stars');
    }else if(average_score === 2) {
      console.log('2 stars');
    }else if(average_score < 2 && average_score > 1) {
      console.log('1.5 stars');
    }else if(average_score === 1) {
      console.log('1 star');
    }else if(average_score < 1 && average_score > 0) {
      console.log('half star')
    }else if(average_score < 1 && review_count > 1) {
      console.log('zero stars');
    }else{
      console.log('no reviews yet');
    }
  }

  async init() {
    console.log('yotpo init');
    const reviews = await new Promise((resolve, reject)=>this.getReviews({resolve:resolve, reject:reject}));
    const average_score = reviews.bottomline.average_score;
    const review_count = reviews.bottomline.total_review
    this.generateStars(average_score, review_count);
  }

}