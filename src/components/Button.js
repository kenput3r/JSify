import BaseClass from '../system/BaseClass';

export default class Button extends BaseClass {
    constructor(rootElement, args) {
        super(rootElement, args);

        this.span = this.rootElement.querySelector('span');

        this.data = this.rootElement.dataset.number;

        this.init();
    }

    init() {
        this.rootElement.addEventListener('click', () => {
            console.log(`Button: ${this.data}`);
        });
    }
}