const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

//gsap.to()... infinity and beyond!

//To learn more about using GreenSock's bonus plugins for free on CodePen visit: https://gsap.com/trial

let clipValue = {
  one: 0,
  two: 0,
  three: 50
};
const videoPinTl = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".video-wrapper",
      start: `center center`,
      end: "+=1000",
      pin: true,
      scrub: true
    }
  })
  .to(
    clipValue,
    {
      duration: 1,
      one: 46,
      two: 34,
      three: 140,
      snap: {
        one: 1,
        two: 1,
        three: 1
      },
      onUpdate: () => {
        console.log(
          `inset(${clipValue.one}% ${clipValue.two}% round ${clipValue.three}px)`
        );
        gsap.set("video", {
          clipPath: `inset(${clipValue.one}% ${clipValue.two}% round ${clipValue.three}px)`
        });
      }
    },
    "<"
  );