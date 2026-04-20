const items = gsap.utils.toArray(".data");
const formatter = getFormatter(1);

gsap.from(items, {
  textContent: 0,
  duration: 4,
  ease: "power1.in",
  onUpdate() {
    let i = items.length;
    while (i--) {
      items[i].innerText = formatter(items[i].innerText);
    }
  }
});

function getFormatter(increment, pad) {
  let snap = gsap.utils.snap(increment),
      exp = /\B(?=(\d{3})+(?!\d))/g,
      snapWithCommas = value => (snap(+value) + "").replace(exp, ","),
      whole = increment % 1 === 0,
      decimals = whole ? 0 : ((increment + "").split(".")[1] || "0").length;
  return !pad || whole ? snapWithCommas : value => {
    let s = snapWithCommas(value),
        i = s.indexOf(".");
    ~i || (i = s.length);
    return s.substr(0, i) + "." + (s.substr(i + 1, s.length - i - 1) + "00000000").substr(0, decimals);
  };
}