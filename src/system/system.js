/**
 * @class System
 * @param {object} classesObject A object containing the components class references
 */
export default class System {
    constructor(classesObject) {
        this.classesObject = classesObject;
        this.modules = document.querySelectorAll('[data-s-module]');
    }

    /**
     * @method init Execute the client/component ES6 classes
     * @returns void
     */
    init() {
        Array.from(this.modules).map(rootElement => {
            const args = rootElement.dataset.jsfyArgs
                ? JSON.parse(rootElement.dataset.jsfyArgs)
                : null;
            return new this.classesObject[rootElement.dataset.sModule](
                rootElement,
                args
            );
        });
    }
}