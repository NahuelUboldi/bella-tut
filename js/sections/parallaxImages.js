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

export const initScrollTo = function initializeTheScrollToFunctionality() {
  gsap.utils.toArray('.fixed-nav a').forEach((link) => {
    const target = link.getAttribute('href');
    link.addEventListener('click', (e) => {
      e.preventDefault();
      gsap.to(window, { duration: 1.5, scrollTo: target, ease: 'Power2.out' });
    });
  });
};
