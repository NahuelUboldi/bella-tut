import initPageTransitions from './pageTransitions';

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
    onComplete: () => select('body').classList.remove('is-loading'),
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

export default initLoader;
