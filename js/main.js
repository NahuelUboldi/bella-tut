gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
import initNavigation from './sections/nav.js';
import initHeaderTilt from './sections/header.js';
import handleWidthChange from './sections/revealGallery.js';
import initPortfolioHover from './sections/portfolio.js';
import {
  initParallaxImages,
  initPinSteps,
  initScrollTo,
} from './sections/parallaxImages.js';

const mq = window.matchMedia('(min-width: 768px');
mq.addEventListener('change', handleWidthChange);

const init = function initializeTheCode() {
  initNavigation();
  initHeaderTilt();
  handleWidthChange(mq);
  initPortfolioHover();
  initParallaxImages();
  initPinSteps();
  initScrollTo();
};

window.addEventListener('load', () => init());
