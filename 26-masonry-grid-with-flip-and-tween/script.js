console.clear();

gsap.registerPlugin(Flip);

const allItems = document.querySelectorAll(".item");
let visible = false;

function resizeGridItem(item) {
  grid = document.getElementsByClassName("grid")[0];
  rowHeight = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
  );
  rowGap = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
  );
  rowSpan = Math.ceil(
    (item.querySelector(".content").getBoundingClientRect().height + rowGap) /
      (rowHeight + rowGap)
  );
  item.style.gridRowEnd = "span " + rowSpan;
}

function resizeAllGridItems() {
  for (x = 0; x < allItems.length; x++) {
    resizeGridItem(allItems[x]);
  }
}

function resizeInstance(instance) {
  item = instance.elements[0];
  resizeGridItem(item);
}

window.onload = resizeAllGridItems();
window.addEventListener("resize", resizeAllGridItems);

function showDetails(item){
   
   const textWrapper = item.querySelector(".text-wrapper");
   const text = textWrapper.querySelector("p");
   if (textWrapper) {
     const state = Flip.getState([".content", textWrapper]);
     textWrapper.classList.toggle("visible");
          
     resizeAllGridItems();
     
     const tl = Flip.from(state, {
        duration: 0.5,
        absolute: true,
        delay: visible ? 0.15 : 0,
      });
      tl.to(text, {autoAlpha: visible ? 0 : 1, }, visible ? 0 : 0.3);
     visible = !visible;
   }
}


allItems.forEach((item) => {
  imagesLoaded(item, resizeInstance);
  item.addEventListener("click", () => showDetails(item));
});