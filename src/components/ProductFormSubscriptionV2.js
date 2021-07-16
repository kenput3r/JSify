import BaseClass from "../system/BaseClass";

/**
 * @class ProductForm - Methods pertaining to the product form found in the
 * ProductDrawer and on the Product page. Uses Materialize
 * Toasts.
 * @see {@link https://materializecss.com/toasts.html}
 */
export default class ProductForm extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.state = {};
    this.isBogo = this.rootElement.dataset.isBogo;
    this.changeImage = this.changeImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePurchaseOptionChange = this.handlePurchaseOptionChange.bind(this);
    this.handleSellingPlanChange = this.handleSellingPlanChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.init();
  }

  /**
   * @method changeImage - Changes the image to the selected variant image
   */
  changeImage() {
    if (this.ProductTile) {
      if (this.state.image !== "no-image") {
        this.ProductTile.querySelector(".product-image").src = this.state.image;
      }
    } else if (this.Carousel) {
      const images = Array.from(
        this.Carousel.rootElement.querySelectorAll(".carousel-image")
      );
      for (let i = 0; i < images.length; i++) {
        if (images[i].dataset.src === this.state.image) {
          this.Carousel.set(i);
        }
      }
    } else if (document.querySelector("#Product")) {
      const carousel_container = document.querySelector(".carousel-slider");
      const Carousel = M.Carousel.getInstance(carousel_container);
      const images = Array.from(
        carousel_container.querySelectorAll(".carousel-image")
      );
      for (let i = 0; i < images.length; i++) {
        if (images[i].dataset.src === this.state.image) {
          Carousel.set(i);
        }
      }
    }
  }

  /**
   * @method handleChange - Updates state to selected variant data
   * and invokes changeImage()
   * @param event event
   */
  handleChange(event) {
    this.state = event.target.options[event.target.selectedIndex].dataset;
    const quantity_selector = this.rootElement.querySelector(
      ".quantity-selector"
    );
    const options = quantity_selector.querySelectorAll("option");
    const inventory_quantity = parseInt(this.state.inventoryQuantity);
    //Removes options with a value greater than the available inventory
    if (inventory_quantity < 30 && options.length > inventory_quantity) {
      options.forEach((option) => {
        if (parseInt(option.value) > parseInt(this.state.inventoryQuantity)) {
          quantity_selector.removeChild(option);
        }
      });
      //Adds options with inventory values up to 30
    } else if (options.length < inventory_quantity && options.length < 30) {
      if (this.isBogo) {
        for (
          let i = (options.length + 1) * 2;
          i <= inventory_quantity && i <= 30;
          i++
        ) {
          if (i % 2 === 0) {
            const new_option = document.createElement("option");
            new_option.value = i;
            new_option.innerHTML = i;
            quantity_selector.appendChild(new_option);
          }
        }
      } else {
        for (
          let i = options.length + 1;
          i <= inventory_quantity && i <= 30;
          i++
        ) {
          const new_option = document.createElement("option");
          new_option.value = i;
          new_option.innerHTML = i;
          quantity_selector.appendChild(new_option);
        }
      }
    }
    this.rootElement.querySelector(
      ".product-price"
    ).innerHTML = this.state.price;
    this.rootElement.querySelector(
      ".compare-price"
    ).innerHTML = this.state.comparePrice;
    this.changeImage();
    if (this.state.disableAddToCart) {
      this.rootElement
        .querySelector("button.add-to-cart")
        .classList.add("disabled");
      const bis_modal = M.Modal.getInstance(
        document.querySelector("#BisModal")
      );
      bis_modal.open();
    } else {
      this.rootElement
        .querySelector("button.add-to-cart")
        .classList.remove("disabled");
    }
    // trigger change purchase option
    const purchase_options = this.rootElement.querySelectorAll("input[type=radio][name=purchase_option]");
    purchase_options[0].checked = true;
    purchase_options[0].dispatchEvent(new Event('change'));
  }
  
  handleSellingPlanChange(event) {
    const value = event.target.value;
    let discounted_price = this.state[`sellingPlan-${value}`];
    discounted_price = parseInt(discounted_price) / 100;
    discounted_price = `$${discounted_price.toFixed(2)}`;
    this.rootElement.querySelector(
      ".product-price"
    ).innerHTML = discounted_price;
    this.rootElement.querySelector(
      ".compare-price"
    ).innerHTML = this.state.price;
    this.state.sellingPlan = value;
  }

  handlePurchaseOptionChange(event) {
    const value = event.target.value;
    const selling_plans = this.rootElement.querySelector(".selling-plans");
    const price = this.rootElement.querySelector(".product-price");
    const compare_at_price = this.rootElement.querySelector(".compare-price");
    const quantity_selector = this.rootElement.querySelector(".quantity-selector");
    if (value === "one-time") {
      quantity_selector.disabled = false;
      selling_plans.querySelectorAll("select").forEach(selector => {
        selector.style.display = "none";
      });
      this.state.sellingPlan = null;
      // change price to default
      price.innerHTML = this.state.price;
      compare_at_price.innerHTML = this.comparePrice;
    } else {
      // subscribe & save
      const selling_plan_selector = this.rootElement.querySelector(`.${value}`);
      if (selling_plan_selector) {
        if (selling_plan_selector.style.display === "none") {
          selling_plan_selector.style.display = "block";
          selling_plan_selector.options[0].selected = true;
          this.state.sellingPlan = selling_plan_selector.options[0].value;
          let discounted_price = this.state[`sellingPlan-${selling_plan_selector.value}`];
          discounted_price = parseInt(discounted_price) / 100;
          discounted_price = `$${discounted_price.toFixed(2)}`;
          price.innerHTML = discounted_price;
          compare_at_price.innerHTML = this.state.price;
        } else {
          selling_plan_selector.style.display = "none";
        }
        selling_plans.querySelectorAll(`select:not(.${value})`).forEach(selector => {
          selector.style.display = "none";
        });
      }
      // disable quantity selector
      quantity_selector.selectedIndex = 0;
      quantity_selector.dispatchEvent(new Event('change'));
      quantity_selector.disabled = true;
    }
    this.state.purchaseOption = value;
  }
  
  /**
   * @method handleSubmit - Adds selected product and quantity to cart
   * @param {event} event
   */
  async handleSubmit(event) {
    event.preventDefault();
    const quantity = this.rootElement.querySelector(".quantity-selector").value;
    const headers = new Headers({ "Content-Type": "application/json" });
    const product = {
      quantity: parseInt(quantity),
      id: parseInt(this.state.id),
    };
    if (this.state.estimatedShipDate.length) {
      product["properties"] = {
        "Estimated Ship Date": this.state.estimatedShipDate,
      };
    }
    if (this.state.purchaseOption !== "one-time") {
      product["selling_plan"] = parseInt(this.state.sellingPlan);
    }
    
    try {
      const data = await fetch("/cart/add.js", {
        method: "POST",
        credentials: "same-origin",
        headers: headers,
        body: JSON.stringify(product),
      });
      const response = await data.json();
      if (!response.key) {
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
    if (this.state.hasVariants) {
      this.rootElement
        .querySelector(".variant-selector")
        .addEventListener("change", this.handleChange);
    }
    if (this.state.available) {
      this.rootElement
        .querySelector(".add-to-cart")
        .addEventListener("click", this.handleSubmit);
    }
    M.Tooltip.init(this.rootElement.querySelector('.tooltipped'));
    // Purchase Options
    const purchase_options = this.rootElement
      .querySelectorAll("input[type=radio][name=purchase_option]");
    purchase_options.forEach(option => {
      option.addEventListener("change", this.handlePurchaseOptionChange);
    });
    const selling_plan_selectors = this.rootElement
      .querySelectorAll(".selling-plan-selector");
    selling_plan_selectors.forEach(selector => {
      selector.addEventListener("change", this.handleSellingPlanChange);
    });
    purchase_options[0].dispatchEvent(new Event('change'));
  }

  destroy() {
    if (this.state.hasVariants) {
      this.rootElement
        .querySelector(".variant-selector")
        .removeEventListener("change", this.handleChange);
    }

    if (this.state.available) {
      this.rootElement
        .querySelector(".add-to-cart")
        .removeEventListener("click", this.handleSubmit);
    }
    
    // Purchase Options
    this.rootElement
      .querySelectorAll("input[type=radio][name=purchase_option]")
      .forEach(option => {
        option.removeEventListener("change", this.handlePurchaseOptionChange);
      });
    this.rootElement
      .querySelectorAll(".selling-plan-selector")
      .forEach(selector => {
        selector.removeEventListener("change", this.handleSellingPlanChange);
      });
  }
}
