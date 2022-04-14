gsap.registerPlugin(ScrollTrigger);
import initNavigation from './sections/nav.js';
import initHeaderTilt from './sections/header.js';
import handleWidthChange from './sections/revealGallery.js';
import initPortfolioHover from './sections/portfolio.js';
import initParallaxImages from './sections/parallaxImages.js';

const mq = window.matchMedia('(min-width: 768px');
mq.addEventListener('change', handleWidthChange);

const init = function initializeTheCode() {
  initNavigation();
  initHeaderTilt();
  handleWidthChange(mq);
  initPortfolioHover();
  initParallaxImages();
};

window.addEventListener('load', () => init());
