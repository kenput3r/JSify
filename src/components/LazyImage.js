import BaseClass from '../system/BaseClass';

/**
 * @class LazyImage - Initializes a lazy load image
 */

export default class LazyImage extends BaseClass {
    constructor(rootElement, args) {
        super(rootElement, args);
        this.active = false;
        this.lazyLoad = this.lazyLoad.bind(this);
        this.observeAndLazyLoad = this.observeAndLazyLoad.bind(this);
        this.init();
    }

    lazyLoad() {
      if (this.active === false) {
        const lazyImage = this.rootElement;
        setTimeout(() => {
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
              this.active = true;
              document.removeEventListener("scroll", this.lazyLoad);
              window.removeEventListener("resize", this.lazyLoad);
              window.removeEventListener("orientationchange", this.lazyLoad);   
            }
          }, 200);
      }
    }

    observeAndLazyLoad(image) {
      let image_src = image.dataset.src;
      if(window.innerWidth < 700 && image.dataset.srcSmall) {
        image_src = image.dataset.srcSmall;
      }
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if(entry.isIntersecting) {
            if(image.classList.contains('lazy-poster')) {
              const background_image = new Image();
              background_image.onload = function() {
                image.style.backgroundImage = `url(${this.src}`;
              }
              background_image.src = image_src;
            }else{
              image.src = image.dataset.src;
            }
            imageObserver.unobserve(entry.target);
          }
        })
      });
      imageObserver.observe(image);
    }

    init() {
      if("IntersectionObserver" in window) {
        this.observeAndLazyLoad(this.rootElement);
      }else{
        this.lazyLoad();
        document.addEventListener("scroll", this.lazyLoad);
        window.addEventListener("resize", this.lazyLoad);
        window.addEventListener("orientationchange", this.lazyLoad);
      }
    }
}