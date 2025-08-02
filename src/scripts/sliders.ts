import Splide from '@splidejs/splide';
import options from './options';

// Sliders
const sliders: Splide[] = [];

[...document.querySelectorAll('[data-splide]')].forEach((slider): void => {
  // Fix custom interval to first slide
  const splide = new Splide(slider as HTMLElement, options.sliders.base);

  sliders.push(splide);
});

export default sliders;
