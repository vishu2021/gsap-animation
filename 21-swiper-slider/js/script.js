var productSwiper = new Swiper(".productSwiper", {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 0,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});

let lightboxIsOpen = false;
jQuery(".productSwiper .swiper-slide").click(function() {
    if(lightboxIsOpen) {
        gsap.to(".productSwiper", {
            delay: 0.1,
            duration: 3,
            width: "100%",
            height: "100%",
            x: 0,
            y: 0,
            borderRadius: 15,
            zIndex: 1,
            ease: "power3.inOut"
        })
        lightboxIsOpen = false
    } else {
        gsap.to(".productSwiper", {
            delay: 0.1,
            duration: 3,
            width: "100vw",
            height: "100vh",
            x: document.querySelector(".productSwiper").getBoundingClientRect().left * -1,
            y: document.querySelector(".productSwiper").getBoundingClientRect().top * -1,
            borderRadius: 0,
            zIndex: 99999999,
            ease: "power3.inOut"
        })
        lightboxIsOpen = true
    }
   
})