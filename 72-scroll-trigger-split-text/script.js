gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother, CustomEase, Observer);

CustomEase.create('preloaderEase', '0.48,0.00,0.83,0.83');
CustomEase.create('headerEase', '0.17,0.17,0.52,1.00');
CustomEase.create('titleEase', '0.17,0.17,0.49,1.00');
CustomEase.create('titleEaseHide', '0.55,0.00,0.83,0.83');

window.addEventListener('load', function() {
  function initSplitText(elements) {
    const textWrappers = document.querySelectorAll(elements);
    if (!textWrappers.length) return false
    const splitElement = new SplitText(elements, { type: 'lines', linesClass: 'fade-overflow' });

    textWrappers.forEach(textWrapper => {
      textWrapper.querySelectorAll('.fade-overflow').forEach((letterWrapp) => {
        let letter = letterWrapp.innerHTML;
        letterWrapp.innerText = '';
        letterWrapp.innerHTML = `<div class='fade-el'>${letter}</div>`;
      });
    });
  }

  initSplitText('.split')
  
  const smoother = ScrollSmoother.create({
    wrapper: document.getElementById('smooth-wrapper'),
    content: document.getElementById('smooth-content'),
    smooth: 1.5,
    normalizeScroll: true,
    effects: true,
  });
  
  let activeIndexSlider;
  
  function initPage() {
    smoother.paused(true);
    smoother.scrollTo(0);
    
    activeIndexSlider = document.querySelectorAll('.slider-img').length - 1;
    
    document.querySelectorAll('.slider-img').forEach((element, index) => {
      element.classList.remove('hide');
      element.classList.remove('active');
      if(index == activeIndexSlider) {
        element.classList.add('active');
      }
    });
    
    gsap.set('.slider-title__item', {
      y: 0,
    });
    
    gsap.set('.slider-numeric__item', {
      y: 0,
    });
    
    gsap
      .timeline({
        onComplete: () => {
          smoother.paused(false);
        }
      })
      .to('.preloader-wrapp', {
        y: '100%',
        duration: 0.7,
        ease: 'preloaderEase',
      }, '>2')
      .set('.preloader', {
        display: 'none',
      })
      .fromTo('.header-wrapp', {
        y: '-1rem',
      }, {
        y: 0,
        duration: 0.85,
        ease: 'headerEase',
      })
      .fromTo('.banner-text .fade-el', {
        y: '100%',
      }, {
        y: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: 'headerEase',
      }, '<')
      .fromTo('.banner-title .fade-el', {
        y: '100%',
      }, {
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'headerEase',
      }, '<')
      .fromTo('.banner-descr .fade-el', {
        y: '100%',
      }, {
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'headerEase',
      }, '<')
      .fromTo('.slider', {
        y: '50%',
      }, {
        y: 0,
        duration: 1.05,
        ease: 'headerEase',
      }, '<')
      .fromTo('.slider-img img', {
        scale: 1.7,
      }, {
        scale: 1.3,
        duration: 1,
      }, '<');
  }
  
  initPage();
  
  const slider = document.querySelector('.slider');
  let playAnimation = false;
  
  function nextSlide() {
    playAnimation = true;
    
    if(activeIndexSlider > 0) {
      document.querySelector('.slider-img.active').classList.add('hide');
      document.querySelectorAll('.slider-img')[activeIndexSlider-1].classList.add('active');
      
      gsap.to('.slider-numeric__item', {
          y: '-=100%',
          duration: 1.4,
          ease: 'titleEase',
        })

      gsap
        .timeline({
          onComplete: () => {
            playAnimation = false;
          }
        })
        .to('.slider-title__item', {
          y: '+=100%',
          duration: 0.7,
          ease: 'titleEaseHide',
        })
        .to('.slider-title__item', {
          y: '+=100%',
          duration: 0.7,
          ease: 'titleEase',
        });
      
      activeIndexSlider--;
    } else {
      document.querySelector('body').classList.add('hide');
      
      gsap.timeline({
        onComplete: () => {
          initPage();
        }
      })
        .set('.preloader', {
          display: 'flex',
        }, 1.5)
        .call(() => {
          document.querySelector('body').classList.remove('hide');
        }, null, 1.5)
        .to('.preloader-wrapp', {
          y: 0,
        }, '<')
        .call(() => {
            playAnimation = false;
        }, null, 3)
    }
    
    smoother.paused(false);
  }
  
  let sliderObserver = ScrollTrigger.observe({
    target: '.collection', 
    type: 'wheel,touch,scroll,pointer',  
    wheelSpeed: 1,
    onDown: () => {
      if(!playAnimation) {
        nextSlide();
      }
    },
    onWheel: (self) => {
      if(self.deltaY > 0 && !playAnimation) {
        nextSlide();
      }
    },
    onChange: (self) => {
      console.log(self);
    },
    tolerance: 1,
    preventDefault: true,
  });
  
  sliderObserver.disable();
  
  ScrollTrigger.create({
    trigger: '.collection',
    start: 'top top+=2px',
    end: 'bottom bottom',
    scrub: true,
    onEnter: () => {
      sliderObserver.enable();
    },
    onEnterBack: () => {
      sliderObserver.enable();
    },
  });
  
  gsap.timeline({
    defaults: {
      ease: 'none',
    },
    scrollTrigger: {
      trigger: document.querySelector('.banner'),
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onEnter: () => {
        sliderObserver.disable();
      },
      onEnterBack: () => {
        sliderObserver.disable();
      },
    },
  })
    .to('.collection', {
      padding: 0,
      duration: 1,
    })
    .to('.slider', {
      borderRadius: 0,
      duration: 1,
    }, '<')
    .to('.banner-mask', {
      alpha: 1,
      duration: 1,
    }, '<')
    .to('.collection-mask', {
      alpha: 1,
      duration: 1,
    }, '<')
    .fromTo('.slider-img img', {
      scale: 1.3,
    }, {
      scale: 1,
      duration: 1,
    }, '<')
    .to('.header', {
      color: '#ffffff',
      duration: 0.3,
    }, '<0.3')
    .to('.header-link', {
      color: '#ffffff',
      duration: 0.3,
    }, '<')
    .to('.header-logo svg', {
      filter: 'invert(1)',
      duration: 0.3,
    }, '<');
});