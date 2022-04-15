export const initParallaxImages = function initializeTheParallaxImagesEffect() {
  gsap.utils.toArray('.with-parallax').forEach((section) => {
    const image = section.querySelector('img');
    gsap.to(image, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        scrub: true,
      },
    });
  });
};
export const initPinSteps = function initializeThePinNavigationEffect() {
  ScrollTrigger.create({
    trigger: '.fixed-nav',
    start: 'top center',
    endTrigger: '#stage4',
    end: 'center center',
    pin: true,
    pinReparent: true,
  });

  const updateBodyColor = (color) => {
    // return gsap.to('.fill-background', {
    //   backgroundColor: color,
    //   ease: 'none',
    // });
    document.documentElement.style.setProperty('--bcg-fill-color', color);
  };

  const getVh = () => {
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    return vh;
  };

  gsap.utils.toArray('.stage').forEach((stage, index) => {
    const navLinks = gsap.utils.toArray('.fixed-nav li');
    ScrollTrigger.create({
      trigger: stage,
      start: 'top center',
      end: () => `+=${stage.clientHeight + getVh() / 10}`,
      toggleClass: {
        targets: navLinks[index],
        className: 'is-active',
      },
      onEnter: () => updateBodyColor(stage.dataset.color),
      onEnterBack: () => updateBodyColor(stage.dataset.color),
    });
  });
};

let bodyScrollBar;
export const initScrollTo = function initializeTheScrollToFunctionality() {
  gsap.utils.toArray('.fixed-nav a').forEach((link) => {
    const target = link.getAttribute('href');
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // gsap way doesn't work with smoothscrolling
      // gsap.to(window, { duration: 1.5, scrollTo: target, ease: 'Power2.out' });

      //smooth-scrollbar scrollintoview way
      bodyScrollBar.scrollIntoView(document.querySelector(target), {
        damping: 0.07,
        offsetTop: 100,
      });
    });
  });
};

export const initSmoothScrollbar = function initializeSmoothScrollbarlibrary() {
  bodyScrollBar = Scrollbar.init(document.querySelector('#viewport'), {
    damping: 0.07,
  });

  //remove horizontal scrollbar
  bodyScrollBar.track.xAxis.element.remove();

  // Tell ScrollTrigger to use these proxy getter/setter methods for the "body" element:
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        bodyScrollBar.scrollTop = value; // setter
      }
      return bodyScrollBar.scrollTop; // getter
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  // when the smooth scroller updates, tell ScrollTrigger to update() too:
  bodyScrollBar.addListener(ScrollTrigger.update);
};
