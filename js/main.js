gsap.registerPlugin(ScrollTrigger);
//nav
const initNavigation = function initializeTheNavigationAnimations() {
  const mainNavLinks = gsap.utils.toArray('.main-nav a');
  const mainNavLinksRev = gsap.utils.toArray('.main-nav a').reverse();

  mainNavLinks.forEach((link) => {
    link.addEventListener('mouseleave', (e) => {
      link.classList.add('animate-out');
      setTimeout(() => {
        link.classList.remove('animate-out');
      }, 300);
    });
  });

  const navAnimation = function createNavLinksAnimation(direction) {
    const scrollingDown = direction === 1;
    const links = scrollingDown ? mainNavLinks : mainNavLinksRev;
    return gsap.to(links, {
      duration: 0.3,
      stagger: 0.05,
      autoAlpha: () => (scrollingDown ? 0 : 1),
      y: () => (scrollingDown ? 20 : 0),
      ease: 'Power4.out',
    });
  };
  ScrollTrigger.create({
    start: 100,
    end: 'bottom bottom-=20',
    toggleClass: {
      targets: 'body',
      className: 'has-scrolled',
    },
    onEnter: ({ direction }) => navAnimation(direction),
    onLeaveBack: ({ direction }) => navAnimation(direction),
  });
};
//header
const moveImagesAnimation = function createTheMoveImagesEffect(
  xPos,
  yPos,
  images
) {
  const modifier = (index) => index * 1.2 + 0.5;

  images.forEach((image, index) => {
    gsap.to(image, {
      duration: 1.2,
      x: xPos * 20 * modifier(index),
      y: yPos * 30 * modifier(index),
      rotationY: xPos * 40,
      rotationX: yPos * 10,
    });
  });
};

const moveImages = function moveTheImagesInTheHeader(e) {
  const { offsetX, offsetY, target } = e;
  const { clientWidth, clientHeight } = target;

  const xPos = offsetX / clientWidth - 0.5;
  const yPos = offsetY / clientHeight - 0.5;

  const leftImages = gsap.utils.toArray('.hg__left .hg__image');
  const rightImages = gsap.utils.toArray('.hg__right .hg__image');

  moveImagesAnimation(xPos, yPos, leftImages);
  moveImagesAnimation(xPos, yPos, rightImages);

  gsap.to('.decor__circle', {
    duration: 1.7,
    x: 100 * xPos,
    y: 120 * yPos,
    ease: 'Power4.out',
  });
};
const initHeaderTilt = function initializeTheImgHeaderTiltAnimation() {
  document.querySelector('header').addEventListener('mousemove', moveImages);
};
//reveal gallery
const createHoverReveal = function createTheHoverRevealAnimation(e) {
  const { mask, imageBlock } = e.target;
  let tl = gsap.timeline({
    defaults: {
      duration: 0.7,
      ease: 'Power4.out',
    },
  });

  if (e.type === 'mouseenter') {
    tl.to([mask, imageBlock], { yPercent: 0 });
  }
  if (e.type === 'mouseleave') {
    tl.to(mask, { yPercent: 100 }).to(imageBlock, { yPercent: -101 }, 0);
  }
  return tl;
};

const initHoverReveal = function initializeTheGalleryRevealOnHover() {
  const sections = document.querySelectorAll('.rg__column');
  sections.forEach((section) => {
    section.imageBlock = section.querySelector('.rg__image');
    section.mask = section.querySelector('.rg__image--mask');

    //reset the original position
    gsap.set(section.imageBlock, { yPercent: -101 });
    gsap.set(section.mask, { yPercent: 100 });

    //add event listeners to each section
    section.addEventListener('mouseenter', createHoverReveal);
    section.addEventListener('mouseleave', createHoverReveal);
  });
};

const init = function initializeTheCode() {
  initNavigation();
  initHeaderTilt();
  initHoverReveal();
};

window.addEventListener('load', () => init());
