gsap.registerPlugin(ScrollTrigger);
import initNavigation from './sections/nav.js';
import initHeaderTilt from './sections/header.js';
import handleWidthChange from './sections/revealGallery.js';
import initPortfolioHover from './sections/portfolio.js';

const mq = window.matchMedia('(min-width: 768px');
mq.addEventListener('change', handleWidthChange);

const init = function initializeTheCode() {
  initNavigation();
  initHeaderTilt();
  handleWidthChange(mq);
  initPortfolioHover();
};

window.addEventListener('load', () => init());
