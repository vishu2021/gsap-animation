"use strict";
gsap.registerPlugin(CustomEase, SplitText, ScrollTrigger);
const customEaseIn = CustomEase.create('custom-ease-in', '0.47, 0.00, 0.49, 1.00');
const customEaseIn2 = CustomEase.create('custom-ease-in-2', '0.17, 0.17, 0.34, 1.00');
const columnWidth = 30;
const createColumns = (el) => {
    const columns = Math.ceil(el.offsetWidth / columnWidth);
    for (let i = 1; i <= columns; i++) {
        const div = document.createElement("div");
        const divBg = document.createElement("div");
        div.classList.add('col');
        divBg.classList.add('col__bg');
        div.appendChild(divBg);
        el.appendChild(div);
        gsap.set(div, { width: columnWidth });
    }
};
const createScrollTrigger = (el, activate) => {
    ScrollTrigger.create({
        trigger: el,
        start: 'top bottom-=10%',
        end: 'bottom top-=10%',
        scrub: true,
        onEnter: () => activate(),
        onEnterBack: () => activate(),
        onUpdate: () => activate(),
    });
};
const activateTimeline = (tl) => {
    tl.play();
};
const heroSectionPhotoBlocks = document.querySelector('.hero .photo-block');
const timberSectionPhotoBlocks = document.querySelectorAll('.timber .photo-block');
const timberSectionTextLines = new SplitText(document.querySelector('.timber .text-block p'), { type: 'lines' }).lines;
const heroSubtitle = document.querySelector('.hero .title-block .sub-title');
const heroTitleLines = new SplitText(document.querySelector('.hero .title-block .title-h1'), { type: 'lines' }).lines;
const heroDescLines = new SplitText(document.querySelector('.hero .text-block .desc-1'), { type: 'lines' }).lines;
const heroItemsText = document.querySelectorAll('.hero .js-anim-item-text');
const heroDescSubtitle = document.querySelector('.hero .text-block .right-container .sub-desc');
const timberSectionTimeline = gsap.timeline({ paused: true });
const heroSectionFirstTimeline = gsap.timeline({ paused: true });
const heroSectionSecondTimeline = gsap.timeline({ paused: true });
document.addEventListener('DOMContentLoaded', () => {
    gsap.set([
        heroSubtitle,
        heroTitleLines,
    ], { autoAlpha: 0, y: 50 });
    heroSectionSecondTimeline
        .fromTo(heroItemsText, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.833, ease: customEaseIn2, stagger: 0.0666 }, 0)
        .fromTo(heroDescSubtitle, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.833, ease: customEaseIn2 }, 0.0666)
        .fromTo(heroDescLines, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.833, ease: customEaseIn2, stagger: 0.0666 }, 0.0666);
    timberSectionPhotoBlocks.forEach((el, index) => {
        createColumns(el);
        const photo = el.querySelector('.photo');
        gsap.set(photo, { autoAlpha: 1 });
        const cols = el.querySelectorAll('.col__bg');
        const delay = index * 0.1;
        timberSectionTimeline
            .to(cols, { width: 0, duration: 1, ease: customEaseIn }, delay)
            .to(photo, { top: index === 1 ? -100 : -210, duration: 1.33333, ease: customEaseIn2 }, delay);
    });
    timberSectionTimeline.fromTo(timberSectionTextLines, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.833, ease: customEaseIn2, stagger: 0.066666 }, 0.3666);
    createScrollTrigger('.hero .text-block', () => activateTimeline(heroSectionSecondTimeline));
    createScrollTrigger('.timber', () => activateTimeline(timberSectionTimeline));
    window.addEventListener('load', async () => {
        createColumns(heroSectionPhotoBlocks);
        const heroPhoto = heroSectionPhotoBlocks.querySelector('.photo');
        const heroImageCols = heroSectionPhotoBlocks.querySelectorAll('.col__bg');
        gsap.to(heroImageCols, { width: 0, duration: 1, ease: customEaseIn }, 0.2);
        gsap.to(heroPhoto, { top: '-20%', duration: 1.33333, ease: customEaseIn2 }, 0.3);
        gsap.to(heroSubtitle, { autoAlpha: 1, y: 0, duration: 0.833, ease: customEaseIn2 }, 0.2);
        gsap.to(heroTitleLines, { autoAlpha: 1, y: 0, duration: 0.833, ease: customEaseIn2, stagger: 0.066666 }, 0.26666);
    });
});