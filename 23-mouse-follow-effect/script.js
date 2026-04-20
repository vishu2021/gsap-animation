console.clear();

gsap.registerPlugin(ScrollTrigger);

const wrapper = document.querySelector(".wrapper");
const box = document.querySelector(".box");
const xTo = gsap.quickTo(".box", "x", { duration: 0.6, ease: "power3" });
const getWidth = () => box.getBoundingClientRect().width;
const clamper = gsap.utils.clamp(50, window.innerWidth - getWidth() - 50);

xTo((window.innerWidth - getWidth()) / 2);

window.addEventListener("mousemove", (e) => {
  xTo(
    gsap.utils.clamp(
      50,
      window.innerWidth - getWidth() - 50,
      e.pageX - getWidth() / 2
    )
  );
});

gsap.to(box, {
  width: window.innerWidth - 100,
  height: window.innerHeight - 100,
  scrollTrigger: {
    trigger: wrapper,
    start: "top 50%",
    end: "bottom 25%",
    scrub: true,
    markers: {
      startColor: "white",
      endColor: "white",
      fontWeight: "600"
    }
  }
});