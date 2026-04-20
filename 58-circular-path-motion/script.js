gsap.registerPlugin(MotionPathPlugin);
  
gsap.to('#pin-arc', {
    duration: 5,
    repeat: 12,
    repeatDelay: 3,
    ease: 'power1.inOut',
    motionPath: {
      path: '#path',
      align: '#path',
      autoRotate: 125,
      alignOrigin: [0.5, 0.5],
    },
  });

gsap.to('#pin-rect', {
    duration: 5,
    repeat: 12,
    repeatDelay: 3,
    ease: 'power1.inOut',
    // rotate: '10deg',
    motionPath: {
      path: '#path',
      align: '#path',
      autoRotate: true,
      alignOrigin: [0.5, 0.5],
    },
  });