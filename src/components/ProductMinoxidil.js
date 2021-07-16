import BaseClass from "../system/BaseClass";

/**
 * @class ProductForm - Methods pertaining to the product form found in the
 * ProductDrawer and on the Product page. Uses Materialize
 * Toasts.
 * @see {@link https://materializecss.com/toasts.html}
 */
export default class ProductMinoxidil extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIncludedChange = this.handleIncludedChange.bind(this);
    this.calculateBuildTotal = this.calculateBuildTotal.bind(this);
    this.init();
  }
  
  calculateBuildTotal() {
    const build_price_total = this.rootElement.querySelector('.build-total-price');
    const included_items = this.rootElement.querySelectorAll("input[type=checkbox]");
    let new_total = 0;
    included_items.forEach(item => {
      if (item.checked) {        
        const price = parseInt(item.dataset.price);
        new_total += price;
      }
    });
    build_price_total.dataset.price = new_total;
    build_price_total.innerHTML = `$${(new_total / 100).toFixed(2)} USD`;
  }
  
  handleIncludedPriceChange() {
    const included = this.rootElement.querySelectorAll("input[type=checkbox]");
    included.forEach(checkbox => {
      // Select the node that will be observed for mutations
      const targetNode = checkbox;
      // Options for the observer (which mutations to observe)
      const config = { attributes: true };
      // Callback function to execute when mutations are observed
      const callback = (mutationsList, observer) => {
          // Use traditional 'for loops' for IE 11
          for(const mutation of mutationsList) {
              if (mutation.type === 'attributes') {
                if (mutation.attributeName === 'data-price') {  
                  this.calculateBuildTotal();
                }
              }
          }
      };
      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(callback);
  
      // Start observing the target node for configured mutations
      observer.observe(targetNode, config);
    });
  }

  handleIncludedChange(event) {
    this.calculateBuildTotal();
  }
  
  /**
   * @method handleSubmit - Adds selected product and quantity to cart
   * @param {event} event
   */
  async handleSubmit(event) {
    event.preventDefault();
    const included_items = this.rootElement.querySelectorAll("input[type=checkbox]");
    let products = [];
    included_items.forEach(item => {
      if (item.checked) {        
        const line = {
          id: parseInt(item.dataset.id),
          quantity: 1,
        }
        if (item.dataset.sellingPlan !== '' && item.dataset.sellingPlan !== null) {
          line.selling_plan = parseInt(item.dataset.sellingPlan);
        }
        products.push(line);
      }
    });
    
    const headers = new Headers({ "Content-Type": "application/json" });
    
    try {
      const data = await fetch("/cart/add.js", {
        method: "POST",
        credentials: "same-origin",
        headers: headers,
        body: JSON.stringify({ items: products }),
      });
      const response = await data.json();
      if (!response.items[0].key) {
        throw new error(response);
      } else {
        M.toast({ html: "ADDED TO CART" });
        const original_button_text = event.target.innerText;
        event.target.innerText = "ADDED";
        setTimeout(() => {
          event.target.innerText = original_button_text;
        }, 3000);
      }
    } catch (error) {
      M.toast({ html: "ERROR - PLEASE TRY AGAIN" });
      const original_button_text = event.target.innerText;
      event.target.innerText = "ERROR";
      setTimeout(() => {
        event.target.innerText = original_button_text;
      }, 3000);
    }
  }

  init() {
    this.state = this.rootElement.dataset;
    if (this.state.available) {
      this.rootElement
        .querySelector(".add-to-cart")
        .addEventListener("click", this.handleSubmit);
    }
    M.Tooltip.init(this.rootElement.querySelector(".tooltipped"));
    const included = this.rootElement.querySelectorAll("input[type=checkbox]");
    included.forEach(checkbox => {
      checkbox.addEventListener("change", this.handleIncludedChange);
    });
    this.handleIncludedPriceChange();
    // set height of subscription cards
    const product_cards = this.rootElement.querySelectorAll(".product-card");
    let max_height = 0;
    product_cards.forEach(card => {
      if (card.offsetHeight > max_height) {
        max_height = card.offsetHeight;
      }
    });
    product_cards.forEach(card => {
      card.style.height = `${max_height}px`;
    });
  }

  destroy() {
    if (this.state.available) {
      this.rootElement
        .querySelector(".add-to-cart")
        .removeEventListener("click", this.handleSubmit);
    }
    const included = this.rootElement.querySelectorAll("input[type=checkbox]");
    included.forEach(checkbox => {
      checkbox.removeEventListener("change", this.handleIncludedChange);
    });
  }
}
