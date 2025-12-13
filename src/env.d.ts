declare var APP: class;
declare var ModalApi: Array | Object;
declare module '*.astro' {
  import type { AstroComponentFactory } from 'astro';
  const component: AstroComponentFactory;
  export default component;
}