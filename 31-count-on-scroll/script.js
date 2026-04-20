console.clear();

var startCount = 0,
    num = {var:startCount};

gsap.timeline({
    scrollTrigger: {
      trigger: "#numbers",
      pin: true,  
      start: "top top",
      end: "+=3000", 
      scrub: true, 
      }
  })
  .to(num, {var: 1000, duration: 5, ease:"none", onUpdate:changeNumber})
  .to({}, {duration:2})

function changeNumber() {
  numbers.innerHTML = (num.var).toFixed();
}