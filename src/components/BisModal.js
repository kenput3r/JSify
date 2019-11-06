import BaseClass from '../system/BaseClass';

export default class BisModal extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.onOpenStart = this.onOpenStart.bind(this);
    this.onCloseEnd = this.onCloseEnd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.init();
  }

  onOpenStart() {
    if(event.target.type === 'select-one') {
      this.props = event.target.options[event.target.selectedIndex].dataset;
    }else{
      this.props = event.target.dataset;
    }
    this.rootElement.querySelector('.bis-product-title').innerHTML = `${this.props.productTitle}${this.props.variantTitle ? ' - ' + this.props.variantTitle : ''}`;
    this.rootElement.querySelector('.get-bis-notification').addEventListener('click', this.handleSubmit);
  }

  handleSubmit(event) {
    event.preventDefault();
    const BIS = window.BIS;
    const email = this.rootElement.querySelector('#email').value;
    const phone = this.rootElement.querySelector('#phone').value;
    const phoneIsValid = (phone) => /^\+?[1-9]\d{1,14}$/.test(phone);
    if(phone && phoneIsValid('+'+phone)) {
      BIS.create(null, this.props.variantId, this.props.productId, {phone_number: '+'+phone});
    }else{
      alert('Please enter a valid phone number');
      return;
    }
    if(email) {
      BIS.create(email, this.props.variantId, this.props.productId);
    }
    M.toast({html: 'SUBMITTED'});
    this.modal.close();
  }

  onCloseEnd() {
    this.rootElement.querySelector('.get-bis-notification').removeEventListener('click', this.handleSubmit);
  }

  setInputFilter() {
    const textbox = this.rootElement.querySelector('#phone');
    const inputFilter = (value) => /^\d*\.?\d*$/.test(value);
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
      textbox.oldValue = "";
      textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        }
      });
    });
  }

  init() {
    const modal_options = {
      onOpenStart: this.onOpenStart,
      onCloseEnd: this.onCloseEnd
    }
    this.modal = M.Modal.init(this.rootElement, modal_options);
    this.setInputFilter();
  }
}