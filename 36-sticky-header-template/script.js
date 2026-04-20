console.clear();

const explore = $(".homepage-explore");

explore.each(function () {
  const exploreArea = $(this);

  exploreArea.prepend(
    '<div class="explore-nav"><div class="desktop-nav"></div></div>'
  );
  exploreArea.append(
    '<div class="image-area"><div class="image-wrapper"></div></div>'
  );

  exploreArea
    .find(">.fsElementContent")
    .addClass("info-boxes-wrapper")
    .wrapInner('<div class="tex-wrapper"/>');

  // wrap infographic boxes
  exploreArea.find(".explore-item-container").each(function () {
    const itemContainer = $(this);
    const indexRef = $(this).index();

    itemContainer.find(">header").attr("data-index-ref", `0${indexRef + 1}`);
    itemContainer.find(".info-box").wrapAll('<div class="info-wrapper" />');

    itemContainer.find(".image-box").each(function () {
      const imbox = $(this);

      const headerTextRef = imbox.find(">header h2.fsElementTitle").text();
      const buttonForNav = $(
        `<button type="button" class="explore-button-nav" data-section-index="${indexRef}"><span>${headerTextRef}</span></button>`
      );
      buttonForNav.appendTo(exploreArea.find(".explore-nav .desktop-nav"));

      const image = imbox.find(">.fsElementContent article img");
      const imageArticle = imbox.find(">.fsElementContent article");

      const linkRef = imbox.find(">header a");
      linkRef
        .clone()
        .appendTo(imbox.find(">header"))
        .addClass("full-link-circle");

      if (image.length) {
        if (typeof image.attr("data-image-sizes") !== "undefined") {
        } else {
          thumbnail.css("background-image", `url("${image.attr("src")}")`);
        }
      }

      imbox
        .clone()
        .appendTo(exploreArea.find(".image-area .image-wrapper"))
        .addClass("image-slide")
        .attr("cloned-here", "");
    });
  });

  // video box implementation
  exploreArea.find(".video-box").each(function () {
    const box = $(this);
    const boxHeader = box.find(">header");
    const boxContent = box.find(">.fsElementContent");
    const image = box.find("article.fsResourceTypeImage img");
    const imageCont = box.find("article.fsResourceTypeImage picture");

    let secondArticle = box.find("article:last-child");
    const popUpVideo = $('<div class="popup-video" />');
    secondArticle.each(function () {
      if ($(this).hasClass("fsResourceDashVideo")) {
        $(this)
          .find("video")
          .append(
            '<source src="' +
              $(this).find("video").attr("data-default-url") +
              '"></source>'
          );
      }
    });
    secondArticle.appendTo(popUpVideo);

    const buttonTrigger = $(
      '<button type="button" class="video-trigger">Full Video</button>'
    );
    buttonTrigger.appendTo(boxHeader);

    const fullTrigger = $(
      '<button type="button" class="full-trigger">Full Video</button>'
    );
    fullTrigger.prependTo(box);

    // moveResourceImage(image, imageCont);
    boxHeader.appendTo(boxContent);

    box.find(".video-trigger, .full-trigger").on("click", function (e) {
      if (e.which == 13 || e.type === "click") {
        const dialog = FS.getInternalNS("dialogs").Dialog({
          closeOnClick: false,
          dialogClass: "fsElementDialog explore-video-dialog",
          id: "explore-",
          removeOnClose: true
        });
        dialog.setContent(popUpVideo);
        dialog.open($(this));

        setTimeout(function () {
          $("dialog.explore-video-dialog").find("video").prop("muted", false);
        }, 700);

        $("dialog.explore-video-dialog").find("video").get(0).play();
      }
    });
  });

  const navExplore = exploreArea.find(".explore-nav");

  // image slider using slick
  exploreArea.find(".image-area .image-wrapper").slick({
    dots: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    draggable: false
  });

  // sync scroll container with slick container
  // using waypoints here
  // also added count up animation
  exploreArea.find(".explore-item-container").each(function () {
    const itemContainer = $(this);
    const indexRef = itemContainer.index();

    const infographicTitle = itemContainer.find(".fsElementTitle");
  });

  // GSAP Implementation
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

  let tlPosts = document.querySelector(".homepage-explore .tex-wrapper"),
    fullCont = document.querySelector(".homepage-explore"),
    imageSections = gsap.utils.toArray(".homepage-explore .image-slide"),
    sections = gsap.utils.toArray(".homepage-explore .explore-item-container"),
    getMaxHeight = () =>
      sections.reduce((val, section) => val + section.offsetHeight, 0),
    maxHeight = getMaxHeight(),
    tl = gsap.timeline();
  let cummulativeHeight = 0;
  const heights = sections.map((section, i) => {
    if (i) {
      cummulativeHeight += section.offsetHeight;
      return cummulativeHeight - 100;
    } else {
      return 0;
    }
  });
  console.log(heights);
  tl.to(sections, {
    y: () => window.innerHeight - (maxHeight + 650),
    duration: 1,
    ease: "none"
  });

  let st = ScrollTrigger.create({
    animation: tl,
    trigger: ".homepage-explore",
    pin: true,
    start: "top top",
    scrub: true,
    end: () =>
      `+=${
        document.querySelector(".tex-wrapper").offsetHeight - window.innerHeight
      }`,
    invalidateOnRefresh: false
  });

  const sectionIndex = parseInt(this.getAttribute("data-section-index"));
  const scrollToSectionButtons = document.querySelectorAll(
    ".homepage-explore .explore-button-nav"
  );
  let links = gsap.utils.toArray(".homepage-explore .explore-button-nav"),
    linkTargets = links.map(
      (link) =>
        $(".explore-item-container").eq(
          link.getAttribute("data-section-index")
        )[0]
    );

  //     const targetSection = sections[sectionIndex];

  links.forEach((link, i) => {
    let target = linkTargets[i];
    console.log(target);
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = st.start + heights[i];
      console.log(target);
      gsap.to(window, {
        ease: "none",
        scrollTo: target,
        overwrite: "auto"
      });
    });
  });
});