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
export default initHeaderTilt;
