let oArray = gsap.utils.toArray(".o"),
    ballArray = gsap.utils.toArray(".ball");

function animateRandom() {
  let index = gsap.utils.random(0, oArray.length - 1, 1),
      tl = gsap.timeline({
        repeat: 1, 
        yoyo: true,
        onComplete: () => gsap.delayedCall(1, animateRandom)
      });
  tl.to(oArray[index], {fontSize: 0, duration: 3})
    .to(ballArray[index], {width: 60, height: 60, duration: 3, autoRound: false})
}
animateRandom();