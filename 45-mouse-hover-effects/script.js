gsap.registerEffect({
    name: "fade",
    defaults: {duration: 2},
    effect: (targets, config) => {
        return gsap.to(targets, {duration: config.duration, opacity: 0});
    }
});

gsap.registerEffect({
    name: "rot",
    defaults: {duration: 2},
    effect: (targets, config) => {
        return gsap.to(targets, {duration: config.duration, x: config.x, rotation: (i, target) => target.rot += 180});
    }
});



var node;
 function WinLoad() {
    node = document.getElementById('t1');
    node.innerHTML='Found you';
}
window.onload = WinLoad;

document.querySelectorAll(".box")
    .forEach(function(x) {
  x.rot = 0;
    x.addEventListener("mouseenter", function() {
        if (node){
            node.innerHTML = x.className;
            if (x.classList.contains('green')){
                x.anim = gsap.effects.fade(x);
            }
            else {
                x.anim = gsap.effects.rot(x, { x: 0 });
            }
        }
    });
});