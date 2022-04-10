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
const moveImages = function moveTheImagesInTheHeader(e) {
  const { offsetX, offsetY, target } = e;
  const { clientWidth, clientHeight } = target;
  console.log(offsetX, offsetY, clientWidth, clientHeight);
};
const initHeaderTilt = function initializeTheImgHeaderTiltAnimation() {
  document.querySelector('header').addEventListener('mousemove', moveImages);
};

const init = function initializeTheCode() {
  initNavigation();
  initHeaderTilt();
};

window.addEventListener('load', () => init());
