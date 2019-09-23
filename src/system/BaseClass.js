/**
 * @class BaseClass
 * @param {node} rootElement Root entry point for the component, the highest html element wrapper => The html element that has the "data-lithium-module" attribute
 * @param {object} args Arguments/options to passed to component constructor => "data-lithium-args" attribute
 */
export default class BaseClass {
    constructor(rootElement, args) {
        // Automate setting of properties through component "super" call
        this.setRootElement(rootElement);
        this.setProps(args);
    }

    /**
     * @method emit Dispatch custom events from the rootElement
     * @param {node} element HTML node to fire the event on
     * @param {string} eventName Name of the custom event
     * @param {object} args Data object to passed through the custom event => accessed on the listener at "event.detail"
     * @returns void
     */
    emit(element, eventName, args) {
        element.dispatchEvent(
            new CustomEvent(eventName, {
                detail: args,
            })
        );

        // TODO: look at class-methods-use-this linting rule
        // satisfy linting => class-methods-use-this
        return this;
    }

    /**
     * @method setProps Set the properties of the args object
     * @param {object} args Args/options for the "data-lithium-args" attribute
     * @returns void - TODO: Note returns true for the linter
     */
    setProps(args) {
        if (!args  && !this.rootElement.dataset) return false;
        if (this.rootElement.dataset) {
          const dataset = this.rootElement.dataset;
          Object.keys(dataset).forEach(key => {
            this[key] = dataset[key] || null;
          })
        }
        if(args) {
          Object.keys(args).forEach(key => {
              this[key] = args[key] || null;
          });
        }

        // TODO: satisfy linter consistent returns -- revisit
        return true;
    }

    /**
     * @method setRootElement The the rootElement property
     * @param {node} rootElement Root entry point element from "data-lithium-module" attribute
     * @returns void
     */
    setRootElement(rootElement) {
        if (!rootElement) {
            throw new Error('Each constructor needs a root entry DOM node');
        }

        this.rootElement = rootElement;
    }
}