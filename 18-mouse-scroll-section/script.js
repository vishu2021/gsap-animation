let cont = document.querySelector(".img-carousel");
gsap.to("img", {
  ease: "none",
  x: () => -(cont.scrollWidth - window.innerWidth),
  scrollTrigger: {
    trigger: cont,
    pin: cont,
    start: "center center",
    end: () => "+=" + (cont.scrollWidth - window.innerWidth),
    scrub: 1,
    invalidateOnRefresh: true,
    markers: true
  }
});

/**
gsap.utils.toArray(".img-carousel").forEach((img, index) => {
  console.log(-(window.innerWidth + img.clientWidth));

  gsap.fromTo(
    img,
    { translateX: 0 },
    {
      translateX: -100, //Scroll all the way to the right, but keep last image in the viewport on the right side!
      scrollTrigger: {
        trigger: img,
        start: "top+=100px center",
        end: "bottom+=100px center",
        scrub: 5,
        pin: false,
        markers: true
      }
    }
  );
});
**/