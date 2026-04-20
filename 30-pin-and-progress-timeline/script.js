// SECTION 1
let section = document.querySelector("#main-container");
console.clear();
let boxes = document.querySelectorAll(".box");

ScrollSmoother.create({
  smooth: 2
})

// PINNING TL
let sec1Pin = gsap.timeline({
  scrollTrigger: {
    trigger: section,
    start: "top top+=1%",
    end: "+=1200%",
    pin: true,
    anticipatePin: 1,
    scrub: 2,
    //markers: true
  },
  ease: "none"
});

sec1Pin.fromTo(boxes[4], { xPercent: -200 }, { xPercent: 300 });



let isAnimating_2 = false;

let sec1Step_2 = gsap.timeline({
  onStart: () => {
    isAnimating_2 = true;
  },
  onComplete: () => {
    isAnimating_2 = false;
  },
  scrollTrigger: {
    trigger: section,
    start: () => sec1Pin.scrollTrigger.start + section.offsetHeight * 1.5,
    end: "+=1",
    fastScrollEnd: true,
    preventOverlaps: true,
    onEnter: self => console.log("onEnter"),
    markers: true,
    toggleActions: "play none none reverse"
  }
});

sec1Step_2
  .from(boxes[1], { duration: 1, opacity: 1, xPercent: -50 })
  .to(boxes[1], { duration: 1, opacity: 1, xPercent: 50 })
  .from(boxes[2], { duration: 1, opacity: 1, xPercent: -50 })
  .to(boxes[2], { duration: 1, opacity: 1, xPercent: 50 })
  .from(boxes[3], { duration: 1, opacity: 1, xPercent: -50 })
  .to(boxes[3], { duration: 1, opacity: 1, xPercent: 50 });