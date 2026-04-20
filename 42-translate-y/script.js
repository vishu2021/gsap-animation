"use strict";
console.clear();
const clipContainer = document.querySelector(".clip-container");
const myVideo = document.getElementById("myVideo");
let hero = gsap.timeline({
    paused: true
});
myVideo.addEventListener("loadedmetadata", () => {
    hero.to(clipContainer, {
        clipPath: "polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)"
    });
    hero.to(clipContainer, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
    });
    gsap.set(".hero", { opacity: 1 });
    hero.play();
});