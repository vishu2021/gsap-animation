let valueObj = {
        newX: 0
    },
    xTo = gsap.quickTo(".touch-me", "x"),
    clamp;

function onResize() {
    const distance = (gsap.getProperty(".container", "width") - document.querySelector(".touch-me").offsetWidth) / 2;
    clamp = gsap.utils.clamp(-distance, distance);
}
onResize();
window.addEventListener("resize", onResize);

function syncX() {
    valueObj.newX = this.x;
}
const draggable = Draggable.create(".touch-me", {
    type: "x",
    bounds: ".container",
    inertia: true,
    onPress() {
        xTo.tween.invalidate().pause();
    },
    onDrag: syncX,
    onThrowUpdate: syncX
})[0];

Observer.create({
    type: "wheel",
    target: ".container",
    onChange(self) {
        valueObj.newX = clamp(valueObj.newX + self.deltaY * 2);
        if (xTo.tween.paused()) {
            // if it's paused, we must have recently dragged, so kill any inertia tweens.
            draggable.tween && draggable.tween.kill();
        }
        xTo(valueObj.newX);
    }
});