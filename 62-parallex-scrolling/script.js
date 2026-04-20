const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#parent",
    markers: true,
    start: "50% 50%",
    end: "150% 50%",
    scrub: 2,
    pin: true,
    markers: true,
  }
});
tl.to(
  "#center",
  {
    height: "100vh"
  },
  "a"
)
  .to(
    "#top-el",
    {
      top: "-50%"
    },
    "a"
  )
  .to(
    "#bottom",
    {
      bottom: "-50%"
    },
    "a"
  )
  .to(
    "#top-title",
    {
      top: "60%"
    },
    "a"
  )
  .to(
    "#bottom-title",
    {
      bottom: "-30%"
    },
    "a"
  )
  .to(
    "#center-h1",
    {
      top: "-30%"
    },
    "a"
  )
  .to("#content", {
    delay: -0.2,
    marginTop: "0%"
  });

ScrollTrigger.refresh();