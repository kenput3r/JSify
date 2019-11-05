import BaseClass from '../system/BaseClass';

/**
 * @class Poster - Initializes a new instance of Poster
 * with a slider, a Materialize JavaScript plugin.
 * @see {@link https://materializecss.com/media.html#slider}
 */

export default class Poster extends BaseClass {
    constructor(rootElement, args) {
        super(rootElement, args);
        this.setHeight = this.setHeight.bind(this);
        this.init();
    }

    setHeight() {
        const slider = this.rootElement.querySelector('.slider');
        const slides = this.rootElement.querySelector('.slides');
        // const nav_height = document.querySelector('.nav-fixed-wrapper').clientHeight;
        // const footer_height = document.querySelector('footer').clientHeight;
        let height;
        if (window.innerWidth > 992) {
          height = window.innerHeight;
        } else {
          height = 400;
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