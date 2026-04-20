let introSplit = new SplitText("#intro", {type: "words"}),
    tl = gsap.timeline({ defaults: { ease: "none" } }),
    fadeDuration = 0.6,
    stagger = 0.07,
    unscrambleDuration = 1,
    scrambleStagger = (introSplit.words.length * stagger + fadeDuration + unscrambleDuration) / introSplit.words.length;

introSplit.words.forEach((word, i) => {
  tl.from(word, {
    y: 70, 
    duration: fadeDuration,
    ease: "power4"
  }, i * stagger)
  .from(word, {
    opacity: 0,
    duration: fadeDuration,
    ease: "none",
  }, i * stagger)
  .to(word, {
    duration: i * stagger + fadeDuration + unscrambleDuration,
    scrambleText: {
      text: word.innerText,
      revealDelay: i * scrambleStagger,
      chars: "lowerCase"
    }
  }, 0);
});

tl.from("#gsap", {
  y: 70,
  duration: fadeDuration,
  ease: "power4"
}, "+=1")
.from("#gsap", {
  opacity: 0,
  duration: fadeDuration,
  ease: "none"
}, "<")
.to("#gsap", {
  duration: fadeDuration + unscrambleDuration,
  scrambleText: {
    text: "{original}",
    revealDelay: fadeDuration,
    chars: "lowerCase"
  }
}, "<")


// tl.to("#intro", {
//   duration:2,
//   scrambleText: {
//     revealDelay:0.5, tweenLength:false,
//     text: "How far will you take it?",
//     delimiter: " ",
//   }
// }).to("#gsap", {
//   duration:1,
//   scrambleText: {
//     revealDelay:0.5, tweenLength:false,
//     text: "gsap.com",
//     newClass: "green",
//   }
// });