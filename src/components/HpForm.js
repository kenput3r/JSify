import BaseClass from '../system/BaseClass';

/**
 * @class HpForm - Honeypot Form
 * prevent spam with a honeypot
 */

export default class HpForm extends BaseClass {
  constructor(rootElement, args) {
    super(rootElement, args);
    this.init();
  }

  init() {
    console.log('bot watcher init')
    const Form = this.rootElement.querySelector('form');
    const honeypot_input = this.rootElement.querySelector('.nogo input');
    Form.addEventListener('submit', event => {
      if(honeypot_input.value && honeypot_input.value !== '') {
        event.preventDefault();
        console.log('nope');
      }
    });
  }
}