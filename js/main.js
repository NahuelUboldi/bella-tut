gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
import initNavigation from './sections/nav.js';
import initHeaderTilt from './sections/header.js';
import handleWidthChange from './sections/revealGallery.js';
import initPortfolioHover from './sections/portfolio.js';
import {
  initSmoothScrollbar,
  initParallaxImages,
  initPinSteps,
  initScrollTo,
} from './sections/parallaxImages.js';

const mq = window.matchMedia('(min-width: 768px');
mq.addEventListener('change', handleWidthChange);

const init = function initializeTheCode() {
  initSmoothScrollbar();
  initNavigation();
  initHeaderTilt();
  handleWidthChange(mq);
  initPortfolioHover();
  initParallaxImages();
  initPinSteps(); //fix the scrollbar
  initScrollTo();
};

window.addEventListener('load', () => init());
