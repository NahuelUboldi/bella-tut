const allLinks = gsap.utils.toArray('.portfolio__categories a');
const pageBackground = document.querySelector('.fill-background');
const largeImage = document.querySelector('.portfolio__image--l');
const smallImage = document.querySelector('.portfolio__image--s');
const lInside = document.querySelector('.portfolio__image--l .image_inside');
const sInside = document.querySelector('.portfolio__image--s .image_inside');

const createPortfolioMove = function createPortfolioMouseMoveAnimation(e) {
  const { clientY, clientX } = e;
  const containerHeight = document.querySelector(
    '.portfolio__categories'
  ).clientHeight;
  const containerWidth = document.querySelector(
    '.portfolio__categories'
  ).clientWidth;

  const tl = gsap.timeline();

  tl.to(
    largeImage,
    {
      duration: 1.2,
      y: -(containerHeight - clientY) / 6,
      x: -(containerWidth - clientX) / 12,
      ease: 'Power3.out',
    },
    0
  ).to(
    smallImage,
    {
      duration: 1.5,
      y: -(containerHeight - clientY) / 3,
      x: -(containerWidth - clientX) / 12,
      ease: 'Power3.out',
    },
    0
  );
  return tl;
};

const createPortfolioHover = function createPorfolioHoverAnimation(e) {
  if (e.type === 'mouseenter') {
    const { color, imagelarge, imagesmall } = e.target.dataset;
    const allSiblings = allLinks.filter((item) => item !== e.target);

    const tl = gsap.timeline();
    tl.set(lInside, { backgroundImage: `url(${imagelarge})` })
      .set(sInside, {
        backgroundImage: `url(${imagesmall})`,
      })
      .to([largeImage, smallImage], { duration: 1, autoAlpha: 1 })
      .to(allSiblings, { color: '#fff', autoAlpha: 0.2 }, 0)
      .to(e.target, { color: '#fff', autoAlpha: 1 }, 0)
      .to(pageBackground, { backgroundColor: color, ease: 'none' }, 0);
    return tl;
  }
  if (e.type == 'mouseleave') {
    const tl = gsap.timeline();
    tl.to([largeImage, smallImage], { duration: 1, autoAlpha: 0 }, 0)
      .to(allLinks, { color: '#000', autoAlpha: 1 }, 0)
      .to(pageBackground, { backgroundColor: '#acb7ab', ease: 'none' }, 0);
    return tl;
  }
};

const initPortfolioHover = function initializeThePortfolioHoverAnimation() {
  allLinks.forEach((link) => {
    link.addEventListener('mouseenter', createPortfolioHover);
    link.addEventListener('mouseleave', createPortfolioHover);
    link.addEventListener('mousemove', createPortfolioMove);
  });
};

export default initPortfolioHover;
