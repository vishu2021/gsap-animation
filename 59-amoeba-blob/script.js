let radius = 8;

gsap.fromTo(
  ".blob",
  4,
  {
    attr: (i) => {
      var r = i * 90;
      return {
        transform:
          "rotate(" + r + ") translate(" + radius + ",0.1) rotate(" + -r + ")"
      };
    }
  },
  {
    attr: (i) => {
      console.log(i);
      var r = i * 90 + 360;
      return {
        transform:
          "rotate(" + r + ") translate(" + radius + ",0.1) rotate(" + -r + ")"
      };
    },
    stagger: 0.1,
    ease: "none",
    repeat: -1
  }
);