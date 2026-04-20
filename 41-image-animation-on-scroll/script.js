gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, DrawSVGPlugin);

const tl2 = gsap.timeline();

gsap.from(".zoom h1", {
  rotateX: 90,
  duration: 1
});
gsap.from(
  ".subHeader",
  {
    rotateX: 90,
    duration: 1
  },
  "<+=1"
);

const tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: "#scrollAnimation",
    start: "-100px top",
    end: "bottom 90%",
    scrub: 3,
    pin: "#svgDiv",
    pinSpacing: false,
    markers: true
  }
});

tl1
  .to(".zoom h1, .zoom .paragraph", {
    rotateX: 90,
    duration: 2
  })
  .from(".myPath", {
    drawSVG: 1,
    duration: 50
  })
  .to(
    "#svgDiv",
    {
      xPercent: -80,
      yPercent: -10,
      duration: 3
    },
    "<+=1"
  )
  .to(
    ".fadeIn-top-table",
    {
      opacity: 1,
      duration: 4
    },
    "<+=2"
  )
  .from(
    ".fadeIn-top-table .water-color",
    {
      opacity: 0,
      duration: 4,
      x: -20
    },
    "<"
  )
  .to(
    "#svgDiv",
    {
      yPercent: -47,
      xPercent: -115,
      duration: 6
    },
    "<+=7"
  )
  .to(
    ".fadeIn-stool",
    {
      opacity: 1,
      duration: 4,
      x: 20
    },
    "<+=4"
  )
  .to(
    "#svgDiv",
    {
      yPercent: -90,
      xPercent: -120,
      duration: 6
    },
    "<+=6"
  )
  .to(
    ".fadeIn-bottom-table",
    {
      opacity: 1,
      duration: 4,
      x: 20
    },
    "<+=6"
  );