// Split text by lines and chars
new SplitText('[split-lines]', { type: 'lines', linesClass: "split-line" })
new SplitText('[split-chars]', { type: 'lines chars', linesClass: "split-line", charsClass: "split-char" })

document.addEventListener('DOMContentLoaded', () => {

  window.addEventListener('load', () => {
    gsap
      .timeline({
        defaults: {
          ease: 'none',
        },
      })
      .fromTo(".header-item", {
        scaleY: 0,
        opacity: 0
      }, {
        scaleY: 1,
        opacity: 1,
        ease: "sine.out",
        transformOrigin: "top",
        stagger: 0.1,
        duration: 0.4
      },)
      .to(".header-slogan", {
        opacity: 1,
        duration: 0
      }, '<')
      .fromTo(".header-slogan .split-line", {
        scaleY: 0,
        opacity: 0
      }, {
        scaleY: 1,
        opacity: 1,
        ease: "sine.out",
        transformOrigin: "top",
        stagger: 0.05,
        duration: 0.4
      }, '<0.2')
      .fromTo(".header-menu", {
        scaleY: 0,
        opacity: 0
      }, {
        scaleY: 1,
        opacity: 1,
        ease: "sine.out",
        transformOrigin: "top",
        stagger: 0.1,
        duration: 0.4
      }, '<0.2')
      .to(".hero", {
        opacity: 1,
        duration: 0
      }, '<')
      .fromTo(".hero-title .split-char", {
        scaleY: 0,
        opacity: 0
      }, {
        scaleY: 1,
        opacity: 1,
        ease: "sine.out",
        transformOrigin: "top",
        stagger: 0.03,
        duration: 0.8
      }, '<')
      .fromTo(".hero-img img", {
        opacity: 0
      }, {
        opacity: 1,
        ease: "sine.out",
        transformOrigin: "top",
        duration: 0.8
      }, '<0.3')
      .fromTo(".hero-date", {
        opacity: 0
      }, {
        opacity: 1,
        ease: "sine.out",
        transformOrigin: "top",
        duration: 0.4
      }, '<0.3')
      .to(".make", {
        opacity: 1,
        duration: 0
      }, '<')
      .call(() => {
        document.querySelector('body').classList.remove('overflow-hidden');
      })
  })

  gsap
    .timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top+=10%",
        pin: true,
        scrub: true,
      },
    })
    .to('.hero-img', {
      height: 0,
      duration: 0.8
    }, '<')
    .to('.hero-img img', {
      y: '-40%',
      duration: 0.8
    }, '<')
    .to('.hero-title', {
      y: '-10%',
      duration: 0.8,
      ease: "sine.out",
    }, '<')
    .fromTo(".hero-title .split-char", {
      scaleY: 1,
      opacity: 1
    }, {
      scaleY: 0,
      opacity: 0,
      ease: "sine.in",
      transformOrigin: "top",
      stagger: 0.03,
      duration: 0.5
    }, '<')
    .to('.hero-title-rect', {
      height: 0,
      duration: 0.8,
      ease: "sine.in",
    }, '<')
    .to('.hero-date', {
      opacity: 0,
      duration: 0.4
    }, '<0.4')
    .to('.hero-title-rect .radius-top', {
      scaleY: 0,
      transformOrigin: "top",
      duration: 0.095
    }, '<0.25')
    .to('.hero-title-rect', {
      borderRadius: 0,
      duration: 0.15
    }, '<');

  gsap
    .timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        trigger: ".make",
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: true,
      }
    })
    .fromTo(".make-subtitle, .make-text .split-line", {
      scaleY: 1,
      opacity: 1
    }, {
      scaleY: 0,
      opacity: 0,
      ease: "sine.in",
      transformOrigin: "top",
      stagger: 0.05,
      duration: 0.5
    }, '<')
    .fromTo(".gallery-main", {
      width: 0
    }, {
      width: '100%',
      ease: "none",
      duration: 0.5
    })
    .fromTo(".gallery-main .radius", {
      width: 0,
      height: 0
    }, {
      width: '10px',
      height: '10px',
      ease: "none",
      duration: 0.05
    }, '<')
});