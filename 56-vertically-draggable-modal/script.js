console.clear();

gsap.registerPlugin(Draggable);

// Set up draggable modal
Draggable.create(".modal-card", {
  type: "y",
  inertia: false,
  trigger: ".compact-menu-header",
  onDragEnd: function () {
    var threshold = window.innerHeight * 0.45;

    if (Math.abs(this.y) > threshold) {
      document.querySelector(".modal-container").classList.remove("open");
      body.classList.remove("modal-is-open");
      gsap.set(".modal-card", { y: 0 }); // Reset the position of the modal
    } else {
      gsap.to(this.target, {
        y: 0,
        duration: 0.2,
        ease: "elastic.out(0.5,0.4)"
      });
    }
  }
});
let body = document.querySelector('body');
let closeModalButton = document.getElementById("closeModal");
let modalContainer = document.getElementById("modalContainer");
let openModalButton = document.getElementById("openModal"); 
closeModalButton.addEventListener("click", function(){
  modalContainer.classList.remove("open");
  body.classList.remove("modal-is-open");
});
openModalButton.addEventListener("click", function(){
  modalContainer.classList.add("open");
  body.classList.add("modal-is-open");
});
