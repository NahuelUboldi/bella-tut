//reveal gallery
const getTextHeight = (textCopy) => textCopy.clientHeight;

const createHoverReveal = function createTheHoverRevealAnimation(e) {
  const { mask, imageBlock, text, textCopy, textMask, textP, image } = e.target;
  let tl = gsap.timeline({
    defaults: {
      duration: 0.7,
      ease: 'Power4.out',
    },
  });

  if (e.type === 'mouseenter') {
    tl.to([mask, imageBlock, textP, textMask], { yPercent: 0 })
      .to(text, { y: () => -getTextHeight(textCopy) / 2 }, 0)
      .to(image, { duration: 1.1, scale: 1 }, 0);
  }
  if (e.type === 'mouseleave') {
    tl.to([mask, textP], { yPercent: 100 })
      .to([imageBlock, textMask], { yPercent: -101 }, 0)
      .to(text, { y: 0 }, 0)
      .to(image, { duration: 1.1, scale: 1.2 }, 0);
  }
  return tl;
};

const sections = document.querySelectorAll('.rg__column');
const initHoverReveal = function initializeTheGalleryRevealOnHover() {
  sections.forEach((section) => {
    section.imageBlock = section.querySelector('.rg__image');
    section.image = section.querySelector('.rg__image img');
    section.mask = section.querySelector('.rg__image--mask');
    section.text = section.querySelector('.rg__text');
    section.textCopy = section.querySelector('.rg__text--copy');
    section.textMask = section.querySelector('.rg__text--mask');
    section.textP = section.querySelector('.rg__text--copy p');

    //reset the original position
    gsap.set([section.imageBlock, section.textMask], { yPercent: -101 });
    gsap.set([section.mask, section.textP], { yPercent: 100 });
    gsap.set(section.image, { scale: 1.2 });

    //add event listeners to each section
    section.addEventListener('mouseenter', createHoverReveal);
    section.addEventListener('mouseleave', createHoverReveal);
  });
};

//js media queries

const resetProps = function resetThePropsOfGsapElements(elements) {
  gsap.killTweensOf('*');
  if (elements.length) {
    elements.forEach((el) => {
      el && gsap.set(el, { clearProps: 'all' });
    });
  }
};

const handleWidthChange = function handleWindowWidthChange(mq) {
  if (mq.matches) {
    initHoverReveal();
  } else {
    //remove event listener for each section
    sections.forEach((section) => {
      section.removeEventListener('mouseenter', createHoverReveal);
      section.removeEventListener('mouseleave', createHoverReveal);

      const { mask, imageBlock, text, textCopy, textMask, textP, image } =
        section;
      resetProps([mask, imageBlock, text, textCopy, textMask, textP, image]);
    });
  }
};
export default handleWidthChange;
