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
    this.includedCount = 1;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIncludedChange = this.handleIncludedChange.bind(this);
    this.calculateBuildTotal = this.calculateBuildTotal.bind(this);
    this.handleDisplayBuildTotals = this.handleDisplayBuildTotals.bind(this);
    this.handleDisplayMore = this.handleDisplayMore.bind(this);
    this.modalOnOpenStart = this.modalOnOpenStart.bind(this);
    this.init();
  }
  
  /**
   * @method calculateBuildtotal - Calculates the build total cost.
   */
  calculateBuildTotal() {
    const build_price_total = this.rootElement.querySelector('.build-total-price');
    const included_items = this.rootElement.querySelectorAll("input.include[type=checkbox]");
    if (included_items.length > 0) {      
      let new_total = 0;
      included_items.forEach((item, index) => {
        if (item.checked) {        
          const price = parseInt(item.dataset.price);
          new_total += price;
        }
      });
      build_price_total.dataset.price = new_total;
      build_price_total.innerHTML = `$${(new_total / 100).toFixed(2)} USD`;
    }
  }
  
  /**
   * @method handleIncludedPriceChange - Triggers price recalculation.
   */
  handleIncludedPriceChange() {
    const included = this.rootElement.querySelectorAll("input.include[type=checkbox]");
    if (included.length > 0) {      
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
  }

  /**
   * @method handleIncludedChange - Calls calculateBuildTotal
   * @param {event} event 
   */
  handleIncludedChange(event) {
    this.calculateBuildTotal();
    this.handleDisplayBuildTotals(event);
  }
  
  /**
   * @method handleSubmit - Adds selected product and quantity to cart
   * @param {event} event
   */
  async handleSubmit(event) {
    event.preventDefault();
    const included_items = this.rootElement.querySelectorAll("input.include[type=checkbox]");
    if (included_items.length > 0) {
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
        // remove sticky totals
        this.rootElement.querySelector(".build-totals").classList.remove("sticky-totals");
        included_items.forEach((item, index) => {
          // if (index !== 0) item.checked = false;
          item.checked = false;
          item.disabled = false;
        });
        this.includedCount = 1;
        this.calculateBuildTotal();
      } catch (error) {
        M.toast({ html: "ERROR - PLEASE TRY AGAIN" });
        const original_button_text = event.target.innerText;
        event.target.innerText = "ERROR";
        setTimeout(() => {
          event.target.innerText = original_button_text;
        }, 3000);
      }
    }
  }
  
  /**
   * @method handleScrollToBuild
   * @param {event} event 
   */
  handleScrollToBuild(event) {
    const selector = event.target.getAttribute('data-target');
    const target = document.querySelector(selector);
    const elementPosition = target.offsetTop;
    const offsetPosition = elementPosition;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
  }
  
  /**
   * @method handleDisplayBuildTotals
   * @param {event} event 
   */
  handleDisplayBuildTotals(event) {
    const build_total = this.rootElement.querySelector(".build-totals");
    const included = this.rootElement.querySelectorAll("input.include[type=checkbox]");
    if (included.length > 0) {      
      const trigger = included[included.length - 1];
      // show
      if (event.target.checked) {
        this.includedCount += 1;
        if (window.pageYOffset < trigger.offsetTop - window.innerHeight) {
          build_total.classList.add("sticky-totals");
        }
      } else {
        this.includedCount -= 1;
      }
      // hide
      if (this.includedCount === 1) {
        build_total.classList.remove("sticky-totals");
      }
    }
  }
  
  /**
   * @method handleHideBuildTotals
   */
  handleHideBuildTotals() {
    const build_total = this.rootElement.querySelector(".build-totals");
    const included = this.rootElement.querySelectorAll("input.include[type=checkbox]");
    if (included.length > 0) {      
      const trigger = included[included.length - 1];
      window.addEventListener("scroll", () => {
        if (window.pageYOffset >= trigger.offsetTop - window.innerHeight) {
          build_total.classList.remove("sticky-totals");
        }
        if (this.includedCount >= 2 && window.pageYOffset < trigger.offsetTop - window.innerHeight) {
          build_total.classList.add("sticky-totals");
        }
      });
    }
  }
  
  /**
   * @method handleDisplayMore
   */
  handleDisplayMore() {
    const more_info = this.rootElement.querySelector(".more-info");
    if (more_info) {      
      if (more_info.classList.contains("expanded")) {
        more_info.classList.remove("expanded");
      } else {
        more_info.classList.add("expanded");
      }
    }
  }
  
  /**
   * @method modalOnOpenStart - Load the smaller image, blurred, then load the larger image
   * once it is ready.
   */
  modalOnOpenStart() {
    const fullSrc = event.target.dataset.fullSrc;
    const smallSrc = event.target.dataset.smallSrc;
    const alt = event.target.getAttribute('alt');
    const div = document.querySelector('.modal-image');
    div.innerHTML = `<img src="${smallSrc} alt="${alt} class="responsive-img preview" />`;
    const fullImage = new Image();
    fullImage.src = fullSrc;
    fullImage.alt = alt;
    fullImage.className = 'responsive-img';
    if(fullImage.complete) { 
    div.innerHTML = '';
    div.appendChild(fullImage);
    }else{ 
      fullImage.onload = () => {
        div.innerHTML = '';
        div.appendChild(fullImage);
      }
    }
  }

  init() {
    this.state = this.rootElement.dataset;
    if (this.state.available) {
      // this.rootElement
      //   .querySelector(".add-to-cart")
      //   .addEventListener("click", this.handleSubmit);
      const add_to_cart_btns = this.rootElement
        .querySelectorAll(".add-to-cart");
      if (add_to_cart_btns.length > 0) {        
        add_to_cart_btns.forEach(btn => {
          btn.addEventListener("click", this.handleSubmit);
        });
      }
    }
    M.Tooltip.init(this.rootElement.querySelector(".tooltipped"));
    const included = this.rootElement.querySelectorAll("input.include[type=checkbox]");
    if (included.length > 0) {      
      included.forEach(checkbox => {
        checkbox.addEventListener("change", this.handleIncludedChange);
      });
    }
    this.handleIncludedPriceChange();
    // scroll
    const scroll_trigger = this.rootElement.querySelector('.scroll');
    if (scroll_trigger) {
      scroll_trigger.addEventListener("click", this.handleScrollToBuild);
    }
    this.handleHideBuildTotals();
    // display more info
    const display_more = this.rootElement.querySelector(".display-more");
    if (display_more) {
      display_more.addEventListener("click", this.handleDisplayMore);
    }
    // image modal
    if(window.innerWidth > 601) {
      const modal_container = document.querySelector('#ProductImageModal');
      const modal_options = {
        onOpenStart: this.modalOnOpenStart
      }
      const Modal = M.Modal.init(modal_container, modal_options);
    }
  }

  destroy() {
    if (this.state.available) {
      // this.rootElement
      //   .querySelector(".add-to-cart")
      //   .removeEventListener("click", this.handleSubmit);
      const add_to_cart_btns = this.rootElement
        .querySelectorAll(".add-to-cart");
      if (add_to_cart_btns.length > 0) {        
        add_to_cart_btns.forEach(btn => {
          btn.removeEventListener("click", this.handleSubmit);
        });
      }
    }
    const included = this.rootElement.querySelectorAll("input.include[type=checkbox]");
    if (included.length > 0) {      
      included.forEach(checkbox => {
        checkbox.removeEventListener("change", this.handleIncludedChange);
      });
    }
  }
}
