gsap.registerPlugin(CustomEase, ScrollTrigger, SplitText);

const heroSection = document.querySelector('.hero');
const parallaxTree = document.querySelector('.parallax-tree');
const parallaxCastle = document.querySelector('.parallax-castle');
const parallaxMountains = document.querySelector('.parallax-mountains');

const headerText = document.querySelector('.js-header-text');
const headerMenu = document.querySelector('.js-header-menu');
const subtitle = document.querySelector('.js-anim-subtitle');
const title = document.querySelector('.js-anim-title');
const desc = document.querySelector('.js-anim-desc');

const parallaxEase = CustomEase.create('parallax-ease-in', '0.51, 0.00, 0.45, 1.00');
const customEase = CustomEase.create('custom-ease-in', '0.17, 0.17, 0.51, 1.00');
const fourtyFrames = 1.3333333;
const oneFrame = 0.0166666;
const fourFrames = 0.133333;

const titleLines = new SplitText(title, { type: "lines" }).lines;
const descChars = new SplitText(desc, { type: "lines, chars" }).lines;

gsap.set(parallaxTree, { y: '1.4rem' });
gsap.set(parallaxCastle, { y: '2.8rem' });
gsap.set(parallaxMountains, { y: '4.2rem' });

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: heroSection,
    start: 'top top',
    end: 'bottom bottom-=15%',
    scrub: 1,
  },
});

const parallaxBase = { overwrite: true, ease: parallaxEase };

tl
  .to(parallaxTree, { y: 0, ...parallaxBase }, 0)
  .to(parallaxCastle, { y: 0, ...parallaxBase }, 0)
  .to(parallaxMountains, { y: 0, ...parallaxBase }, 0);

const showElements = () => {
  const timeline = gsap.timeline();
  
  const base = { duration: fourtyFrames, ease: customEase };
  
  timeline
        .fromTo(headerText, { autoAlpha: 0, y: '0.5rem' }, { autoAlpha: 1, y: 0, ...base}, 0)
        .fromTo(headerMenu, { autoAlpha: 0, y: '0.5rem' }, { autoAlpha: 1, y: 0, ...base}, fourFrames)
        .fromTo(subtitle, { autoAlpha: 0, y: '0.5rem' }, { autoAlpha: 1, y: 0, ...base}, fourFrames * 2)
        .fromTo(titleLines, { autoAlpha: 0, y: '0.5rem' }, { autoAlpha: 1, y: 0, ...base, stagger: fourFrames }, fourFrames * 3)
        .fromTo(descChars, { autoAlpha: 0, y: '0.5rem' }, { autoAlpha: 1, y: 0, ...base, stagger: fourFrames / 2 }, fourFrames * 3);
  
  return timeline;
}


document.addEventListener('DOMContentLoaded', () => {
  showElements();
});