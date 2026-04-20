console.clear();

gsap.set("img", { scale: 0.3, rotation: 20 });

gsap.to("img", { scale: 1, rotation: 0,  repeat: -1, repeatDelay: 1, yoyo: true });