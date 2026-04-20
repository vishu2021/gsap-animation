let sections = gsap.utils.toArray(".sezione-primaria");
let currentIndex = 0; // Tieni traccia dell'indice corrente della sezione
console.clear();
function goToSection(i, direction) {
  // Impedisci il trigger dell'animazione se la sezione è già la corrente
  if (i === currentIndex) return;

  currentIndex = i; // Aggiorna l'indice corrente
console.log(i, direction);
  gsap.to(window, {
    scrollTo: { y: i * innerHeight },
    duration: 0.5
  });
}

ScrollTrigger.defaults({
  markers: true
});

sections.forEach((eachPanel, i) => {
  ScrollTrigger.create({
    trigger: eachPanel,
    start: "top bottom", // Si attiva quando la parte superiore della sezione raggiunge il fondo del viewport
    end: "bottom top", // Si disattiva quando la parte inferiore della sezione lascia la parte superiore del viewport
    onEnter: () => goToSection(i, "forward"),
    onEnterBack: () => goToSection(i, "back")
  });
});