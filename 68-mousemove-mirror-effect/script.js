// Split text by lines and chars
new SplitText('[split-lines]', { type: 'lines', linesClass: "split-line" })
new SplitText('[split-chars]', { type: 'lines chars', linesClass: "split-line", charsClass: "split-char" })

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    // cursor animaton
    const cursor = document.querySelector('.cursor');
    const banner = document.querySelector('.banner');

    document.addEventListener('mousedown', function () {
      cursor.classList.add('click');
    });

    document.addEventListener('mouseup', function () {
      cursor.classList.remove('click');
    });

    document.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
    });

    // mirror animation
    let mirrorElements = document.querySelectorAll('.mirror-wrapp.active');

    let cursorDirection = 1;
    let cursorDirectionCurrent = 1;

    function animateMirror(e) {
      let procentLight = Math.min((Math.max(((Math.floor(e.clientX / window.innerWidth * 100) - 20) * 2), 0) - 100), 0);

      gsap
        .timeline({
          defaults: {
            ease: "power1.out"
          },
        })
        .to(".mirror-over", {
          duration: 1,
          x: e.clientX / 7,
          stagger: e.movementX < 0 ? -0.2 : 0.2,
          ease: "power1.out"
        })
        .to(".mirror-over", {
          duration: 0.5,
          alpha: .9,
          stagger: e.movementX < 0 ? -0.17 : 0.17,
          ease: "power1.out"
        }, '<')
        .to(".mirror-over", {
          duration: 0.5,
          alpha: 1,
          stagger: e.movementX < 0 ? -0.2 : 0.2,
          ease: "power1.out"
        }, '<0.5')
        .to(".mirror-img__left .mirror-light", {
          duration: 0.7,
          x: procentLight,
          stagger: e.movementX < 0 ? -0.1 : 0.1,
        }, '<-0.2')
        .to(".mirror-img__right .mirror-light", {
          duration: 0.7,
          x: -procentLight,
          stagger: e.movementX < 0 ? -0.1 : 0.1,
        }, '<-0.2');
    }

    function setWidthMirror() {
      mirrorElements.forEach((mirror) => {
        let widthMirror = mirror.offsetWidth + 'px';
        mirror.querySelectorAll('img').forEach((mirrorImg) => {
          mirrorImg.style.width = widthMirror;
        });
      });
    }

    setWidthMirror();

    // resize window
    window.addEventListener('resize', () => {
      setWidthMirror();
    });

    // open collection
    banner.addEventListener('click', () => {
      if (!document.getElementById('hero').classList.contains('full')) {
        document.getElementById('hero').classList.add('full');
        document.getElementById('bottom-info').classList.add('scroll');
        cursor.classList.remove('watch');

        gsap
          .timeline({
            defaults: {
              ease: 'none',
            },
            onComplete: () => {
              document.querySelector('.hero-close').classList.add('active');
            }
          })
          .to(".wonderland-descr .split-line", {
            scaleY: 0,
            alpha: 0,
            ease: "sine.in",
            transformOrigin: "top",
            duration: 0.8
          }, '<')
          .to(".wonderland-full", {
            scaleY: 0,
            alpha: 0,
            ease: "sine.in",
            transformOrigin: "top",
            duration: 0.8
          }, '<')
          .to(".mirror-over", {
            duration: 2,
            x: 0,
            alpha: 1,
            ease: "power1.out"
          }, '<')
          .call(() => {
            document.getElementById('hero').querySelector('.mirror-wrapp').classList.add('active');
            mirrorElements = document.querySelectorAll('.mirror-wrapp.active');
            mirrorElements.forEach((mirrorElement) => {
              mirrorElement.addEventListener('mousemove', animateMirror, true);
            });
          });
      }
    });

    // close collection
    document.querySelector('.hero-close').addEventListener('click', (event) => {
      event.stopPropagation();
      document.getElementById('hero').classList.remove('full');
      document.getElementById('bottom-info').classList.remove('scroll');

      mirrorElements.forEach((mirrorElement) => {
        mirrorElement.removeEventListener('mousemove', animateMirror, true);
        mirrorElement.classList.remove('active');
      });
      
      document.querySelector('.hero-close').classList.remove('active');

      gsap
        .timeline({
          defaults: {
            ease: 'none',
          },
          onComplete: () => {
            document.getElementById('hero').querySelector('.mirror-wrapp').classList.remove('active');
          }
        })
        .to(".mirror-over", {
          duration: 2,
          x: '-10%',
          alpha: .7,
          overwrite: true,
          ease: "power1.out"
        }, '<')
        .to(".wonderland-descr .split-line", {
          scaleY: 1,
          alpha: 1,
          ease: "sine.in",
          transformOrigin: "top",
          duration: 0.5
        }, '<+0.5')
        .to(".wonderland-full", {
          scaleY: 1,
          alpha: 1,
          ease: "sine.in",
          transformOrigin: "top",
          duration: 0.5
        }, '<')
        .to(".mirror-img__left .mirror-light", {
          duration: 0.7,
          x: '-100%',
          stagger: 0.1,
        }, '<')
        .to(".mirror-img__right .mirror-light", {
          duration: 0.7,
          x: '100%',
          stagger: 0.1,
        }, '<');
    });

    banner.addEventListener('mouseenter', () => {
      if (!document.getElementById('hero').classList.contains('full')) {
        cursor.classList.add('watch');
        gsap.to(".wonderland-full", {
          alpha: 0,
          ease: "sine.in",
          duration: 0.4,
        });
      }
    });

    banner.addEventListener('mouseleave', () => {
      cursor.classList.remove('watch');
      gsap.to(".wonderland-full", {
        alpha: 1,
        ease: "sine.in",
        duration: 0.4,
      });
    });
  });
});