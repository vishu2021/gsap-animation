console.clear(); // Start with a clean console on refesh 
gsap.registerPlugin(Flip);

const image1Full = document.querySelector(".articleImage1Full");
const image1thumbnail = document.querySelector(".articleImage1");

document.addEventListener("click", () => {
  const state1 = Flip.getState(".articleImage1, .articleImage1Full");

  image1Full.classList.toggle("active");
  image1thumbnail.classList.toggle("active");

	Flip.from(state1, {
		duration: 0.6,
    fade: true,
    absolute: true,
    toggleClass: "flipping",
		ease: "power1.inOut",
	});
  
});