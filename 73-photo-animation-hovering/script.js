// Split text by lines and chars
new SplitText('[split-lines]', { type: 'lines', linesClass: "split-line" })

document.addEventListener('DOMContentLoaded', () => {
  const aboutHover = document.querySelectorAll('.about-hover');

  aboutHover.forEach((element) => {
    element.classList.add('unhover');

    element.addEventListener('mouseover', () => {
      element.classList.remove('unhover');
    });

    element.addEventListener('mouseleave', () => {
      element.classList.add('unhover');
    });
  });

  window.addEventListener('load', () => {
    gsap
      .timeline({
        defaults: {
          ease: 'none',
        },
      })
      .to(".about-subtitle", {
        opacity: 0.7,
        ease: "none",
        duration: 0.4
      }, '>0.5')
      .to(".about-text", {
        opacity: 1,
        ease: "none",
        duration: 0
      }, '<')
      .fromTo(".about-text .split-line", {
        y: '100%'
      }, {
        y: 0,
        opacity: 1,
        ease: "sine.out",
        transformOrigin: "top",
        stagger: 0.1,
        duration: 1.2
      }, '<0.4')
      .to(".about-down", {
        opacity: 1,
        ease: "sine.out",
        transformOrigin: "top",
        stagger: 0.1,
        duration: 0.4
      }, '>')
      .call(() => {
        document.querySelector('body').classList.remove('overflow-hidden');
      });
  })
});