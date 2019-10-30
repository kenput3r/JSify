import BaseClass from '../system/BaseClass';

/**
 * @class PosterCollection - Initializes a new instance of PosterCollection
 * with a slider, a Materialize JavaScript plugin.
 * @see {@link https://materializecss.com/media.html#slider}
 */

export default class PosterCollection extends BaseClass {
    constructor(rootElement, args) {
        super(rootElement, args);
        this.setHeight = this.setHeight.bind(this);
        this.init();
    }

    setHeight() {
        const slider = this.rootElement.querySelector('.slider');
        const slides = this.rootElement.querySelector('.slides');
        const products = this.rootElement.querySelector('.products');
        let height;
        if (window.innerWidth > 992) {
            // height = products container height - padding
            height = products.clientHeight - 12;
        } else {
            height = window.innerHeight;
        }

        slider.style.height = height + 'px';
        slides.style.height = height + 'px';
    }

    init() {
        const slider_options = {
            indicators: false,
            // height: 400,
            duration: 500,
            interval: 6000
        }
        const slider = this.rootElement.querySelector('.slider');
        this.MSlider = M.Slider.init(slider, slider_options);
        this.setHeight();
        window.addEventListener("resize", this.setHeight);
    }
}