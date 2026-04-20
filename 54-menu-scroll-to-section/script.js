gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

let sections = gsap.utils.toArray(".panel");
let isScrolling;

function goToSection(i) {
  if (!isScrolling) {
    isScrolling = true;
    gsap.to(window, {
      scrollTo: { y: i * innerHeight, autoKill: false },
      duration: 0.85,
      onComplete: () => isScrolling = false
    });
  }
}

sections.forEach((eachPanel, i) => {

  ScrollTrigger.create({
    trigger: eachPanel,
    onEnter: () => goToSection(i)
  });

  ScrollTrigger.create({
    trigger: eachPanel,
    start: "bottom bottom",
    onEnterBack: () => goToSection(i)
  });
});