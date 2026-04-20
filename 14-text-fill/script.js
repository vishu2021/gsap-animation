console.clear();

const links = gsap.utils.toArray("li a");

links.forEach((link) => {
  const t = gsap
    .to(link, {
      backgroundSize: "100%"
    })
    .reverse();
  link.addEventListener("mouseenter", () => t.reversed(!t.reversed()));
  link.addEventListener("mouseleave", () => t.reversed(!t.reversed()));
});