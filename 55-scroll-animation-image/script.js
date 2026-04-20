console.clear();

gsap.registerPlugin(ScrollTrigger);

const app = new PIXI.Application({ background: "#1099bb", resizeTo: window });
const app1 = new PIXI.Application({ background: "#f5ce42", resizeTo: window });

document.getElementById("pixijs").appendChild(app.view);
document.getElementById("pixijs1").appendChild(app1.view);
let apps = 2;

https: function myFunc() {
  PIXI.Assets.load("https://assets.codepen.io/10974419/fan_seq-0.json").then(
    () => {
      // create an array of textures from an image path
      const frames = [];

      for (let i = 0; i < 97; i++) {
        const val = i < 10 ? `0${i}` : i;

        // magically works since the spritesheet was loaded with the pixi loader
        frames.push(PIXI.Texture.from(`0${val} (Custom).jpg`));
      }

      // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
      const anim = new PIXI.AnimatedSprite(frames);

      /*
       * An AnimatedSprite inherits all the properties of a PIXI sprite
       * so you can change its position, its anchor, mask it, etc
       */

      anim.x = app.screen.width / 2;
      anim.y = app.screen.height / 2;
      anim.anchor.set(0.5);
      anim.animationSpeed = 0.3;

      //when I change these TWO values the image is not displayed properly
      //I haven't find out any way to resize the image dynamically fill the screen with same ratio
      anim.width = 400;
      anim.Height = 400;
      console.log(anim.width);
      console.log(anim.Height);

      //I want to turn no touch mode
      app.eventMode = "auto";

      gsap.to(anim, {
        currentFrame: anim.totalFrames - 1,
        snap: "currentFrame",
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#pixijs",
          start: "top top",
          end: "+=4000",
          pin: "#pixijs",
          scrub: true,
          markers: true,
          id: 1,
          refreshPriority: apps
        }
      });

      ScrollTrigger.refresh();

      app.stage.addChild(anim);
      apps -= 1;
    }
  );
}

function myFunc1() {
  PIXI.Assets.load("https://pixijs.com/assets/spritesheet/fighter.json").then(
    () => {
      // create an array of textures from an image path
      const frames1 = [];

      for (let r = 0; r < 30; r++) {
        const valr = r < 10 ? `0${r}` : r;

        // magically works since the spritesheet was loaded with the pixi loader
        frames1.push(PIXI.Texture.from(`rollSequence00${valr}.png`));
      }

      // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
      const anim1 = new PIXI.AnimatedSprite(frames1);

      /*
       * An AnimatedSprite inherits all the properties of a PIXI sprite
       * so you can change its position, its anchor, mask it, etc
       */

      anim1.x = app1.screen.width / 2;
      anim1.y = app1.screen.height / 2;
      anim1.anchor.set(0.5);
      anim1.animationSpeed = 0.3;

      //when I change these TWO values the image is not displayed properly
      //I haven't find out any way to resize the image dynamically fill the screen with same ratio
      anim1.width = 400;
      anim1.Height = 400;
      console.log(anim1.width);
      console.log(anim1.Height);

      //I want to turn no touch mode
      app1.eventMode = "auto";

      gsap.to(anim1, {
        currentFrame: anim1.totalFrames - 1,
        snap: "currentFrame",
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#pixijs1",
          start: "top top",
          end: "+=4000",
          pin: "#pixijs1",
          scrub: true,
          markers: { indent: 200 },
          id: 2,
          refreshPriority: apps
        }
      });

      ScrollTrigger.refresh();

      app1.stage.addChild(anim1);
    }
  );
}

myFunc();
myFunc1();