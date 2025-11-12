import opts from './options';
import sliders from './sliders';

interface AccordionElements {
  item: HTMLElement;
  trigger: HTMLElement;
  panel: HTMLElement;
  icon: HTMLElement;
}

const setIntersectionObserver = (section: HTMLElement, callback: Function) => {
  const target = section;

  function handleIntersection(entries: any[]) {
    entries.map((entry) => {
      if (entry.isIntersecting) {
        callback(true, entry);
      } else {
        callback(false, entry);
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersection);
  observer.observe(target);
}

export interface AppInterface {
  sliders?: Object[];
  formValidations?: Object;
  setObserver: typeof setIntersectionObserver;
}

class App implements AppInterface {

  private _initScriptsEvent!: Event;
  sliders: Object[];
  formValidations: Object;
  setObserver: (section: HTMLElement, callback: Function) => void;

  constructor() {
    // Vars
    this.sliders = [];
    this.formValidations = {};
    // Funcs
    this.setObserver = setIntersectionObserver;
    // Calls
    this.addEventListeners();
    this.init();
  }

  initValidation() {
    // this.formValidations = new window.FormValidation(opts.validationOpts);
  }

  initSliders() {
    sliders.forEach((item) => item.mount());
    this.sliders = sliders;
  }

  goBackSafely() {
    const ref = document.referrer;
    const hasHistory = history.length > 1;
    const sameOrigin = ref && new URL(ref).origin === location.origin;

    if (hasHistory && sameOrigin) {
      history.back();
    } else {
      // fallback
      window.location.href = '/';
    }
  }

  initAccordion(cls = '.accordion-item') {
    const accordionItems = document.querySelectorAll<HTMLElement>(cls);
    const accordionElements: AccordionElements[] = Array.from(accordionItems).map((item) => {
      const trigger = item.querySelector<HTMLElement>('.accordion-trigger')!;
      const panel = item.querySelector<HTMLElement>('.accordion-panel')!;
      const icon = item.querySelector<HTMLElement>('.accordion-icon')!;

      return { item, trigger, panel, icon };
    });

    accordionElements.forEach(({ item, trigger, panel, icon }) => {
      trigger.addEventListener('click', () => {
        const expanded = item.getAttribute('aria-expanded') === 'true';

        accordionElements.forEach((el) => {
          el.item.setAttribute('aria-expanded', 'false');
          el.panel.style.maxHeight = '0px';
          el.icon.classList.remove('rotate-90');
        });

        if (!expanded) {
          item.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = panel.scrollHeight + 'px';
          icon.classList.add('rotate-90');
        }
      });
    });
  }

  watchBlocks(cls = '[data-watch]') {
    [...document.querySelectorAll<HTMLElement>(cls)].forEach((el) => {
      const isInView = (intersect: boolean) => {
        if (intersect) {
          setTimeout(() => el.classList.add('is-inview'), 500);
        } else if (el.dataset.hasOwnProperty('watchRepeat')) {
          setTimeout(() => el.classList.remove('is-inview'), 500);
        }
      }
      this.setObserver(el, isInView);
    });
  }

  addEventListeners() {
    // eslint-disable-next-line no-underscore-dangle
    this._initScriptsEvent = new Event('scriptsInit');

    document.addEventListener('scriptsInit', () => {
      console.info('Init scripts');
    });

    window.addEventListener('scroll', () => {

    });

    window.addEventListener('load', () => {
      document.body.classList.add('is-loaded');
      console.log(`${opts.initText}\n`);
    });

    window.addEventListener('resize', () => {

    });
  }

  init() {
    if (opts.DEBUG) {
      console.info('Debug is ON');
    }
    this.watchBlocks();
    this.initAccordion();
    // this.initValidation();
    this.initSliders();
    document.dispatchEvent(this._initScriptsEvent);
  }
}

const APP = new App();
window.APP = APP;