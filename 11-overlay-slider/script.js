const slides = gsap.utils.toArray('.slide');
const bgColors = [
  ['#be8e7a', '#ce9c3f', '#52190f', '#de4372'],
  ['#bd54ca', '#ce3f79', '#502f75', '#bd54ca'],
  ['#7abe7a', '#226bc3', '#226bc3', '#226bc3'],
];

let tl = gsap.timeline({repeat: -1, yoyo: true})

slides.forEach((slide, slideIndex) => {
  tl.to(slide, {
    keyframes: {
      backgroundColor: [gsap.getProperty(slide, "backgroundColor"), ...bgColors[slideIndex]],
      easeEach: "none"
    },
    duration: 3
  }, 2 * slideIndex);
  if(slideIndex !== slides.length - 1) {
    tl.to(slide, {
      clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
      duration: 3,
      ease: 'sine.inOut',
    }, slideIndex * 3 + 0.5);
  }
})




// let theBGColorTL = gsap.timeline();
// let theSlideTL = gsap.timeline();
  
// slides.forEach((slide, slideIndex) => {
//   bgColors[slideIndex].forEach((colorVal, colorValIndex) => {
//      theBGColorTL.to(slide, {
//        duration: 1.4,
//        backgroundColor: colorVal,
//        ease: 'none',
//        }, '-=' + 0.5 * (colorValIndex));
//     });
//     if(slideIndex === slides.length - 1) {
//         return;
//     } else{
//       theSlideTL.to(slides[slideIndex], {
//         clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
//         duration: 3,
//         ease: 'sine.inOut',
//       }, '<+=' + 4 * (slideIndex));
//     }     
// });

// let masterTL = gsap.timeline({repeat: 1, yoyo: true})
// masterTL.add(theBGColorTL, 0);
// masterTL.add(theSlideTL, 0);