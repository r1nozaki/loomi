import Lenis from 'lenis';

export const lenis = new Lenis();

const raf = time => {
  lenis.raf(time);
  requestAnimationFrame(raf);
};

requestAnimationFrame(raf);
