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
// import initLoader from './sections/loader.js';
// import initPageTransitions from './sections/pageTransitions.js';
// import {
//   pageTransitionIn,
//   pageTransitionOut,
// } from './sections/pageTransitions.js';

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const select = (element) => document.querySelector(element);
const selectAll = (element) => document.querySelectorAll(element);

const loader = select('.loader');
const loaderInner = select('.loader .inner');
const progressBar = select('.loader .progress');

gsap.set(loader, { autoAlpha: 1 });

gsap.set(loaderInner, { scaleY: 0.005, transformOrigin: 'bottom' });

const progressTween = gsap.to(progressBar, {
  paused: true,
  scaleX: 0,
  ease: 'none',
  transformOrigin: 'right',
});

let loadedImagesCount = 0,
  imageCount;
const container = select('#main');

const imgLoad = imagesLoaded(container);
imageCount = imgLoad.images.length;

updateProgress(0);

imgLoad.on('progress', function () {
  loadedImagesCount++;
  updateProgress(loadedImagesCount);
});

function updateProgress(value) {
  gsap.to(progressTween, {
    progress: value / imageCount,
    duration: 0.3,
    ease: 'power1.out',
  });
}
imgLoad.on('done', function (instance) {
  gsap.set(progressBar, { autoAlpha: 0, onComplete: initPageTransitions });
});

const initLoader = function initializeTheLoaderAnimation() {
  const image = select('.loader__image img');
  const mask = select('.loader__image--mask');
  const line1 = select('.loader__title--mask:nth-child(1) span');
  const line2 = select('.loader__title--mask:nth-child(2) span');
  const lines = selectAll('.loader__title--mask');
  const loaderContent = select('.loader__content');

  const tlLoaderIn = gsap.timeline({
    defaults: { duration: 1.1, ease: 'power2.out' },
    onComplete: () => initContent(),
  });
  tlLoaderIn
    .set(loaderContent, { autoAlpha: 1 })
    .to(loaderInner, {
      scaleY: 1,
      transformOrigin: 'bottom',
      ease: 'power1.inOut',
    })
    .addLabel('revealImage')
    .from(mask, { yPercent: 100 }, 'revealImage-=0.6')
    .from(image, { yPercent: -50 }, 'revealImage-=0.6')
    .from([line1, line2], { yPercent: 100, stagger: 0.1 }, 'revealImage-=0.4');

  const tlLoaderOut = gsap.timeline({
    defaults: { duration: 1.2, ease: 'power2.inOut' },
    delay: 1,
  });
  tlLoaderOut
    .to(lines, { yPercent: -500, stagger: 0.2 }, 0)
    .to([loader, loaderContent], { yPercent: -100 }, 0.2)
    .from('#main', { y: 150 }, 0.2);

  const tlLoader = gsap.timeline();
  tlLoader.add(tlLoaderIn).add(tlLoaderOut);
};

//!!!!!!!!!!!!!!!!!!!!!!!

// const loader = select('.loader');
// const loaderInner = select('.loader .inner');
const loaderMask = select('.loader__mask');

const pageTransitionIn = function createPageTrasitionInAnimation({
  container,
}) {
  const tl = gsap.timeline({
    defaults: {
      duration: 0.8,
      ease: 'power1.inOut',
    },
  });
  tl.set(loaderInner, { autoAlpha: 0 })
    .fromTo(loader, { yPercent: -100 }, { yPercent: 0 }, 0)
    .fromTo(loaderMask, { yPercent: 80 }, { yPercent: 0 }, 0)
    .to(container, { y: 150 }, 0);
  return tl;
};
const pageTransitionOut = function createPageTrasitionOutAnimation({
  container,
}) {
  const tl = gsap.timeline({
    defaults: {
      duration: 0.8,
      ease: 'power1.inOut',
    },
    onComplete: () => initContent(),
  });
  tl.to(loader, { yPercent: 100 }, 0)
    .to(loaderMask, { yPercent: -80 }, 0)
    .from(container, { y: -150 }, 0);
  return tl;
};

const initPageTransitions =
  function initializeThePageTransitionsBarbaAnimations() {
    // do something before the transition starts
    barba.hooks.before(() => {
      document.querySelector('html').classList.add('is-transitioning');
    });
    // do something after the transition finishes
    barba.hooks.after(() => {
      document.querySelector('html').classList.remove('is-transitioning');
    });
    // scroll to the top of the page
    barba.hooks.enter(() => {
      window.scrollTo(0, 0);
    });

    barba.init({
      transitions: [
        {
          once() {
            initLoader();
          },
          async leave({ current }) {
            await pageTransitionIn(current);
          },
          enter({ next }) {
            pageTransitionOut(next);
          },
        },
      ],
    });
  };

const mq = window.matchMedia('(min-width: 768px');
mq.addEventListener('change', handleWidthChange);

const initContent = function initializeTheCode() {
  select('body').classList.remove('is-loading');
  initSmoothScrollbar();
  initNavigation();
  initHeaderTilt();
  handleWidthChange(mq);
  initPortfolioHover();
  initParallaxImages();
  initPinSteps(); //fix the scrollbar
  initScrollTo();
};

// window.addEventListener('load', () => init());
