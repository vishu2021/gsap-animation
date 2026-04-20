let isCircle = true;
const svgElement = document.getElementById("svg2");
const navMenu = document.getElementById("navMenu"); // Get the navigation menu element

const doFlip = () => {
  const state = Flip.getState(svgElement, { props: "transform" });
  svgElement.classList.toggle("active-svg");
  Flip.from(state);
};

document.getElementById("svg2").addEventListener("click", function () {
  if (isCircle) {
    const tl = gsap.timeline();

    tl.to("#circle", {
      duration: 0.5,
      morphSVG: "#intermediate",
      ease: "power1.inOut"
    }).to("#circle", {
      duration: 0.5,
      morphSVG: "#menu",
      ease: "power1.inOut",
      onComplete: function () {
        doFlip();
        navMenu.style.display = "block"; // Show the navigation menu
      }
    });
  } else {
    navMenu.style.display = "none"; // Hide the navigation menu before starting the reverse animation
    gsap.to("#circle", {
      duration: 1,
      morphSVG: "#circle",
      ease: "power1.inOut",
      onComplete: doFlip
    });
  }

  isCircle = !isCircle;
});