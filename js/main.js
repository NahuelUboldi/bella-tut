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
};
const initHeaderTilt = function initializeTheImgHeaderTiltAnimation() {
  document.querySelector('header').addEventListener('mousemove', moveImages);
};

const init = function initializeTheCode() {
  initNavigation();
  initHeaderTilt();
};

window.addEventListener('load', () => init());
