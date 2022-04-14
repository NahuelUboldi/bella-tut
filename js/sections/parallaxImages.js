const initParallaxImages = function initializeTheParallaxImagesEffect() {
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

export default initParallaxImages;
