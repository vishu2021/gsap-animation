console.clear();

const tl = gsap.timeline();
let count = gsap.utils.toArray(".selector").length;
const wrapper = document.querySelector(".wrapper");
tl.from(".selector", {
  opacity: 0,
  y: 100,
  duration: 0.5
});

const loadMore = () => {
  addItems();
  tl.clear()
    .from(".selector", {
      opacity: 0,
      y: 100,
    })
    .restart();
}

const addItems = () => {
  let newDiv = document.createElement("div");
  newDiv.className = "selector";
  
  let newH1 = document.createElement("h1");
  count = count + 1;
  newH1.textContent = count;
  newDiv.appendChild(newH1);  
  wrapper.appendChild(newDiv);
}