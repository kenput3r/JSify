import BaseClass from "../system/BaseClass";

/**
 * @class ProductForm - Methods pertaining to the product form found in the
 * ProductDrawer and on the Product page. Uses Materialize
 * Toasts.
 * @see {@link https://materializecss.com/toasts.html}
 */
export default class ProductFormBuildRegimen extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.state = {};
    this.isBogo = this.rootElement.dataset.isBogo;
    this.handleChange = this.handleChange.bind(this);
    this.handlePurchaseOptionChange = this.handlePurchaseOptionChange.bind(this);
    this.handleSellingPlanChange = this.handleSellingPlanChange.bind(this);
    this.init();
  }

  /**
   * @method handleChange - Updates state to selected variant data
   * and invokes changeImage()
   * @param event event
   */
  handleChange(event) {
    this.state = event.target.options[event.target.selectedIndex].dataset;
    this.rootElement.querySelector(
      ".product-price"
    ).innerHTML = this.state.price;
    if (this.state.comparePrice.replace(/[^0-9.-]+/g,"") > this.state.price.replace(/[^0-9.-]+/g,"")) {       
      this.rootElement.querySelector(
        ".compare-price"
      ).innerHTML = this.state.comparePrice;
    } else {
      this.rootElement.querySelector(
        ".compare-price"
      ).innerHTML = "";
    }
    // trigger change purchase option
    const purchase_options = this.rootElement.querySelectorAll("input[type=radio][name=purchase_option]");
    if (purchase_options.length > 0) {      
      purchase_options[0].checked = true;
      purchase_options[0].dispatchEvent(new Event('change'));
    }
  }
  
  /**
   * @method handleSellingPlanChange
   * @param {event} event 
   */
  handleSellingPlanChange(event) {
    const value = event.target.value;
    this.state = event.target.options[event.target.selectedIndex].dataset;
    this.rootElement.querySelector(
      ".product-price"
    ).innerHTML = this.state.price;
    if (this.state.comparePrice.replace(/[^0-9.-]+/g,"") > this.state.price.replace(/[^0-9.-]+/g,"")) {      
      this.rootElement.querySelector(
        ".compare-price"
      ).innerHTML = this.state.comparePrice;
    } else {
      this.rootElement.querySelector(
        ".compare-price"
      ).innerHTML = "";
    }

    this.state.sellingPlan = value;
    // add data to checkbox
    const include = this.rootElement.querySelector("input[type=checkbox]");
    include.dataset.price = this.state.priceNumber;
    include.dataset.sellingPlan = this.state.sellingPlan;
    include.dataset.id = this.state.id;
  }

  /**
   * @method handlePurchaseOptionChange
   * @param {event} event 
   */
  handlePurchaseOptionChange(event) {
    const value = event.target.value;
    const selling_plans = this.rootElement.querySelector(".selling-plans");
    const variant_selector = this.rootElement.querySelector(".variant-selector");
    if (value === "one-time") {
      this.state = this.rootElement.dataset;
      selling_plans.style.display = "none";
      if (variant_selector)  variant_selector.style.display = "block";
      this.state.sellingPlan = null;
    } else {
      // subscribe & save
      selling_plans.style.display = "block";
      if (variant_selector) variant_selector.style.display = "none";
      const first_available_option = this.rootElement.querySelector('option[data-disabled="enabled"]');
      if (first_available_option) first_available_option.selected = true;
      this.state = first_available_option.dataset;
    }
    // change pricing
    this.rootElement.querySelector(
      ".product-price"
    ).innerHTML = this.state.price;
    if (this.state.comparePrice.replace(/[^0-9.-]+/g,"") > this.state.price.replace(/[^0-9.-]+/g,"")) {      
      this.rootElement.querySelector(
        ".compare-price"
      ).innerHTML = this.state.comparePrice;
    } else {
      this.rootElement.querySelector(
        ".compare-price"
      ).innerHTML = "";
    }
    // add data to checkbox
    const include = this.rootElement.querySelector("input[type=checkbox]");
    include.dataset.price = this.state.priceNumber;
    include.dataset.sellingPlan = this.state.sellingPlan;
    include.dataset.id = this.state.id;
    this.state.purchaseOption = value;
  }

  init() {
    this.state = this.rootElement.dataset;
    if (this.state.hasVariants) {
      this.rootElement
        .querySelector(".variant-selector")
        .addEventListener("change", this.handleChange);
    }
    M.Tooltip.init(this.rootElement.querySelector('.tooltipped'));
    const include = this.rootElement.querySelector("input[type=checkbox]");
    include.dataset.price = this.state.priceNumber;
    // Purchase Options
    const purchase_options = this.rootElement
      .querySelectorAll("input[type=radio][name=purchase_option]");
    if (purchase_options.length > 0) {      
      purchase_options.forEach(option => {
        option.addEventListener("change", this.handlePurchaseOptionChange);
      });
      purchase_options[0].dispatchEvent(new Event('change'));
    }
    const selling_plans = this.rootElement
      .querySelectorAll(".selling-plans");
    if (selling_plans.length > 0) {      
      selling_plans.forEach(selector => {
        selector.addEventListener("change", this.handleSellingPlanChange);
      });
    }
  }

  destroy() {
    if (this.state.hasVariants) {
      this.rootElement
        .querySelector(".variant-selector")
        .removeEventListener("change", this.handleChange);
    }
  }
}
