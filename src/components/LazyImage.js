import BaseClass from '../system/BaseClass';

/**
 * @class LazyImage - Initializes a lazy load image
 */

export default class LazyImage extends BaseClass {
    constructor(rootElement, args) {
        super(rootElement, args);
        this.lazyLoad = this.lazyLoad.bind(this);
        this.init();
    }

    lazyLoad() {
        if (this.active === false) {
            this.active = true;
            const lazyImage = this.rootElement;
            setTimeout(function () {
                if ((lazyImage.getBoundingClientRect().top <= window.innerHeight 
                    && lazyImage.getBoundingClientRect().bottom >= 0)
                    && getComputedStyle(lazyImage).display !== "none") {

                    let poster = lazyImage.classList.contains('lazy-poster');
                    if (poster) {
                        lazyImage.style.backgroundImage = 'url(' + lazyImage.dataset.src + ')'; 
                    } else {
                        lazyImage.src = lazyImage.dataset.src;
                    }

                    lazyImage.classList.remove("lazy-image");

                    document.removeEventListener("scroll", this.lazyLoad);
                    window.removeEventListener("resize",this.lazyLoad);
                    window.removeEventListener("orientationchange",this.lazyLoad);

                }
                this.active = false;
            }, 200);
        }
    }

    init() {
        this.active = false;
        document.addEventListener("scroll", this.lazyLoad);
        window.addEventListener("resize", this.lazyLoad);
        window.addEventListener("orientationchange", this.lazyLoad);
    }
}