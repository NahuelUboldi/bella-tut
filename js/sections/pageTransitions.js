import { initContent } from '../main.js';
const select = (element) => document.querySelector(element);
const selectAll = (element) => document.querySelectorAll(element);

const loader = select('.loader');
const loaderInner = select('.loader .inner');
const loaderMask = select('.loader__mask');

export const pageTransitionIn = function createPageTrasitionInAnimation({
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
export const pageTransitionOut = function createPageTrasitionOutAnimation({
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
