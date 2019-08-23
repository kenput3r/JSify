import BaseClass from '../system/BaseClass';

export default class ProductReviews extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.app_key = 'q7EYKyLuCq4wDQ7s0M36GkawfE2I4JDL9gg4wvGY';
    this.getReviews = this.getReviews.bind(this);
    this.generateStars = this.generateStars.bind(this);
    this.vote = this.vote.bind(this);
    this.generateCard = this.generateCard.bind(this);
    this.displayReviews = this.displayReviews.bind(this);
    this.init();
  }

  async getReviews(promise, page) {
    if(!page) page = 1;
    const headers = new Headers({'Content-Type': 'application/json'});
    const url = `https://api.yotpo.com/v1/widget/${this.app_key}/products/${this.product_id}/reviews.json?page=${page}`;
    const data = await fetch(url, {headers: headers});
    const reviews = await data.json();
    //console.log(reviews);
    return promise.resolve(reviews.response);
  }

  generateStars(score) {
    const full_stars = Math.floor(score);
    const half_stars = Math.round(score % 1);
    const empty_stars = 5 - half_stars - full_stars;
    const star_container = document.createElement('SPAN');
    for(let i = 1; i <= score; i++) {
      star_container.insertAdjacentHTML('beforeend', '<i class="material-icons">star</i>');
    }
    half_stars === 1 ? star_container.insertAdjacentHTML('beforeend', '<i class="material-icons">star_half</i>') : null;
    for(let i = 1; i <= empty_stars; i++) {
      star_container.insertAdjacentHTML('beforeend', '<i class="material-icons">star_border</i>');
    }
    return star_container;
  }

  async vote() {
    const el = event.target;
    const thumb = el.dataset.vote;
    const review_id = el.parentElement.dataset.id;
    const url = `https://api.yotpo.com/reviews/${review_id}/vote/${thumb}`;
    const headers = new Headers({'content-type': 'application/json'});
    const response = await fetch(url, {type: 'POST', headers: headers});
    const results = await response.json();
    const count = parseInt(el.dataset.count) + 1;
    el.nextSibling.innerHTML = count;
    el.removeEventListener('click', this.vote);
    const previous_vote = el.parentElement.querySelector('[data-voted')
    if(previous_vote) {
      const new_count = parseInt(previous_vote.dataset.count);
      previous_vote.nextSibling.innerHTML = new_count;
      previous_vote.setAttribute('data-voted', false);
    }
    el.setAttribute('data-voted', true);
  }

  generateCard(review, el_stars) {
    const card = document.createElement('DIV');
    card.classList.add('row');
    card.insertAdjacentHTML('beforeend', `<div class="col s12">
      <div class="card review">
        <div class="card-content">
          <span class="card-title">${review.title}</span>
          ${review.content !== review.title ? `<p>${review.content}</p>` : ''}
        </div>
        <div class="card-action">
          <div class="row">
            <div class="col color-s-yellow">${el_stars.outerHTML}</div>
            <div class="col" data-id="${review.id}">
              <i class="material-icons color-s-red vote" data-count="${review.votes_up}" data-vote="up">thumb_up</i><span class="count">${review.votes_up}</span>
              <i class="material-icons color-s-red vote" data-count="${review.votes_down}" data-vote="down">thumb_down</i><span class="count">${review.votes_down}</span></div>
            <div class="col">
            ${review.verified_buyer ? '<i class="material-icons tiny tooltipped" data-position="top" data-tooltip="Verified Buyer">verified_user</i>' : ''}
            ${review.user.display_name}
            </div>
            <div class="col">${dayjs(review.created_at).format('MMM DD, YYYY')}</div>
          </div>
        </div>
      </div>
    </div>`);
    M.Tooltip.init(card.querySelectorAll('.tooltipped'));
    return card;
  }

  viewMoreButton(next_page) {
    const button = document.createElement('DIV');
    button.classList.add('row', 'button-container');
    button.insertAdjacentHTML('beforeend', `<div class="row button-container">
      <div class="col s12 center-align">
        <button class="btn waves-effect waves-light background-s-red">View More</button>
      </div>
    </div>`);
    button.querySelector('.btn').addEventListener('click', async()=> {
      const reviews = await new Promise((resolve, reject)=>this.getReviews({resolve:resolve, reject:reject}, next_page));
      this.displayReviews(reviews);
    })
    this.rootElement.appendChild(button);
  }

  displayReviews(yotpo) {
    const total_reviews = yotpo.bottomline.total_review;
    const total_pages = Math.ceil(total_reviews / yotpo.pagination.per_page);
    const current_page = yotpo.pagination.page;
    for(let i = 0; i < yotpo.reviews.length; i++) {
      const review = yotpo.reviews[i];
      const el_stars = this.generateStars(review.score);
      const card = this.generateCard(review, el_stars);
      Array.from(card.getElementsByClassName('vote')).map(thumb=> {
        thumb.addEventListener('click', this.vote);
      });
      this.rootElement.appendChild(card);
    }
    if(current_page < total_pages) {
      const next_page = current_page + 1;
      const old_button = this.rootElement.querySelector('.button-container');
      if(old_button) this.rootElement.removeChild(old_button);
      this.viewMoreButton(next_page);
    }
    if(current_page === total_pages) {
      const old_button = this.rootElement.querySelector('.button-container');
      if(old_button) this.rootElement.removeChild(old_button);
    }
  }

  async init() {
    const reviews = await new Promise((resolve, reject)=>this.getReviews({resolve:resolve, reject:reject}));
    this.displayReviews(reviews);
  }

}