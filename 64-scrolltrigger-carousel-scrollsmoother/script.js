gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

let smoother = ScrollSmoother.create({
  smooth: 1,
  normalizeScroll: false,
});

ScrollTrigger.normalizeScroll(true);

ScrollTrigger.defaults({
  markers: false
});

this.stCases = [];

const firstElem = document.querySelector(".js_cases");
const all_panels = gsap.utils.toArray(".js_panel");
let isScrolling;


// this scrolling object just allows us to conveniently call scrolling.enable(), scrolling.disable(), and check if scrolling.enabled is true.
// some browsers (like iOS Safari) handle scrolling on a separate thread and can cause things to get out of sync (jitter/jumpy), so when we're animating the scroll position, force an update of GSAP tweens when there's a scroll event in order to maintain synchronization)
// const scrolling = {
//             enabled: true,
//             events: "scroll,wheel,touchmove,pointermove".split(","),
//             prevent: e => e.preventDefault(),
//             disable() {
//                 if (scrolling.enabled) {
//                     console.log('disable scrolling')
//                     scrolling.enabled = false;
//                     window.addEventListener("scroll", gsap.ticker.tick, {passive: true});
//                     scrolling.events.forEach((e, i) => (i ? document : window).addEventListener(e, scrolling.prevent, {passive: false}));
//                 }
//             },
//             enable() {
//                 if (!scrolling.enabled) {
//                     console.log('enable scrolling')
//                     scrolling.enabled = true;
//                     window.removeEventListener("scroll", gsap.ticker.tick);
//                     scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent));
//                 }
//             }
//         };


function goToSection(i) {
            if (!isScrolling) { // skip if a scroll tween is in progress
              isScrolling = true;
                gsap.to(smoother, {
                    scrollTop: (i+1) *innerHeight + firstElem.offsetTop, 
                    duration: 1,
                    onComplete: () => isScrolling = false,
                });
            }

        }

function backToSection(i) {
            if (!isScrolling) { // skip if a scroll tween is in progress
              isScrolling = true;
                gsap.to(smoother, {
                    scrollTop: i *innerHeight + firstElem.offsetTop,
                    duration: 1,
                    onComplete: () => isScrolling = false,
                });
            }
        }

// Create scrollTrigger for each panel
all_panels.forEach((panel, i) => {
            if(i < all_panels.length - 1) {
                const stCasesPanels = ScrollTrigger.create({
                    trigger: panel,
                    start: "top+=10px top",
                    onEnter: () => {
                        goToSection(i)
                    },
                });

                const stCasesPanelsReverse = ScrollTrigger.create({
                    trigger: panel,
                    start: "bottom bottom",
                    onEnterBack: () =>{
                        backToSection(i)
                    }
                });

                this.stCases.push(stCasesPanels);
                this.stCases.push(stCasesPanelsReverse);
            }
        });

const stCasesViewer = ScrollTrigger.create({
            trigger: ".js_viewer",
            start: "top top",
            end: function () {
                const panelsHeight = document.querySelector(".js_panels").offsetHeight;
                const panelHeight = document.querySelector(".js_panel").offsetHeight;
                const endOffset = panelsHeight - panelHeight;
                return `+=${endOffset}px`;
            },
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
        });
this.stCases.push(stCasesViewer);

all_panels.forEach((panel, i) => {
            const tl_images = gsap.timeline({
                scrollTrigger: {
                    trigger: panel,
                    scrub: true,
                    id: "images",
                    start: function () {
                        const footageOffsetTop = document.querySelector(".js_footage").offsetTop;
                        const footageOffsetHeight = document.querySelector(".js_footage").offsetHeight;
                        const footageTrigger = footageOffsetTop + footageOffsetHeight;
                        return `top ${footageTrigger}px`;
                    },
                    end: function () {
                        const footageOffsetTop = document.querySelector(".js_footage").offsetTop;
                        return `top ${footageOffsetTop}px`;
                    },
                    invalidateOnRefresh: true,
                },
            });
            this.stCases.push(tl_images);

            tl_images.addLabel("start");

            if (i > 0) {
                tl_images.to(`.c-cases__img:nth-of-type(${i})`, { duration: 0.5, yPercent: -50, ease: "none" });
            }

            tl_images.to(`.c-cases__img:nth-of-type(${i + 1})`, { y: 0, ease: "none" }, "-=.5");

            const tl_texts = gsap.timeline({
                scrollTrigger: {
                    trigger: panel,
                    scrub: true,
                    id: `texts${i}`,
                    start: function () {
                        const textOffsetTop = document.querySelector(".js_text").offsetTop;
                        const textOffsetHeight = document.querySelector(".js_text").offsetHeight;
                        const textTrigger = textOffsetTop + textOffsetHeight;
                        return `top ${textTrigger}px`;
                    },
                    end: function () {
                        const textOffsetTop = document.querySelector(".js_text").offsetTop;
                        return `top ${textOffsetTop}px`;
                    },
                    invalidateOnRefresh: true,
                },
            });
            this.stCases.push(tl_texts);

            tl_texts.addLabel("start");
            if (i > 0) {
                tl_texts.to(`.c-cases__textItem:nth-of-type(${i})`, { y: -20, autoAlpha: 0, ease: "easeInOut" });
            }
            tl_texts.to(`.c-cases__textItem:nth-of-type(${i + 1})`, { y: 0, autoAlpha: 1, ease: "easeInOut" }, "-=.25");
        });