let score = 0;
let lastEventTrigger = 0; // dernier palier atteint

let doubleClickActive = false;
let luckyMode = false;
let miniCookieMultiplier = 1;

const cookie = document.getElementById("cookie");
const scoreDisplay = document.getElementById("score");
const container = document.getElementById("cookie-container");

const floatingImagesSrc = [
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia1.tenor.com%2Fm%2FPPAVaj0CzTMAAAAC%2Flarry-spooky-larry.gif&f=1&nofb=1&ipt=e92e54fec1bf15d7b090fa7e46c6e7ec9448b7de3c1039018d593cc2cfea63fd',
  'bonus2.pnghttps://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.CSvxWFKNPXHQoUbxkYPLwwHaEH%3Fpid%3DApi&f=1&ipt=d1ef20bf732fbcec178e1a417be0ffdcb3b379412662430d426b24dd5bdf4c96&ipo=images',
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Frisibank.fr%2Fcache%2Fmedias%2F0%2F27%2F2735%2F273560%2Ffull.png&f=1&nofb=1&ipt=bfdc90824ab2a50a86d8ae1270b9dc68f6327d018ecfb2605fa7ac47b57fb969',
  'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.numerama.com%2Fcontent%2Fuploads%2F2017%2F06%2Fboeing-avion.jpg&f=1&nofb=1&ipt=b7c5d396160a47d53bfb2739d199c3d53d6dfeb2e5ea3d0a309b9fd53fc578ef',
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F03%2F0c%2F48%2F030c4870bffe7539d52fded518824efd.jpg&f=1&nofb=1&ipt=5b79d27b12cefbfc10648c41567fddfbf7f5b7a2bb272c517e6bee75cbe1c80c',
]; // ajoute ici les URLs ou noms de tes images

function createFloatingImage() {
  const img = document.createElement('img');
  img.className = 'floating-image';

  // Choix aléatoire de l’image
  img.src = floatingImagesSrc[Math.floor(Math.random() * floatingImagesSrc.length)];

  // Position verticale aléatoire (entre 10% et 80% de la hauteur)
  const topPos = Math.random() * 70 + 10;
  img.style.top = topPos + 'vh';

  // Choix aléatoire du sens (gauche -> droite ou droite -> gauche)
  const leftToRight = Math.random() < 0.5;
  img.style.animationName = leftToRight ? 'floatLeftToRight' : 'floatRightToLeft';

  // Durée aléatoire entre 5 et 12 secondes
  const duration = Math.random() * 7 + 5;
  img.style.animationDuration = duration + 's';

  document.body.appendChild(img);

  // Supprime l’image après la fin de l’animation
  img.addEventListener('animationend', () => {
    img.remove();
  });
}

// Crée une image flottante toutes les 3 à 8 secondes (intervalle aléatoire)
function startFloatingImages() {
  createFloatingImage();
  const interval = Math.random() * 50000 + 30000;
  setTimeout(startFloatingImages, interval);
}

startFloatingImages();

// Liste d’événements possibles
const events = [
  "🎉 Jackpot ! +100 cookies !",
  "💣 Oups... -50 cookies !",
  "🚀 Bonus vitesse x2 pendant 10s !",
  "🍀 Tu trouves un cookie porte-bonheur !",
  "🪙 Tu gagnes un cookie en or !"
];

function updateBackground() {
  const body = document.body;
  body.classList.remove("earth", "space", "mars");

  if (score >= 10000) {
    body.classList.add("mars");
  } else if (score >= 5000) {
    body.classList.add("space");
  } else {
    body.classList.add("earth");
  }
}

function triggerRandomEvent() {
  const eventText = events[Math.floor(Math.random() * events.length)];
  alert(eventText);

  if (eventText.includes("+100")) {
    score += 100;
  }

  if (eventText.includes("-50")) {
    score = Math.max(0, score - 50);
  }

  if (eventText.includes("vitesse x2")) {
    doubleClickActive = true;
    setTimeout(() => {
      doubleClickActive = false;
    }, 10000);
  }

  if (eventText.includes("porte-bonheur")) {
    luckyMode = true;
    setTimeout(() => {
      luckyMode = false;
    }, 15000);
  }

  if (eventText.includes("cookie en or")) {
    miniCookieMultiplier = 3;
    setTimeout(() => {
      miniCookieMultiplier = 1;
    }, 5000);
  }
}

function checkForEvent() {
  const currentTrigger = Math.floor(score / 500);
  if (currentTrigger > lastEventTrigger) {
    lastEventTrigger = currentTrigger;
    triggerRandomEvent();
  }
}

cookie.addEventListener("click", () => {
  score += doubleClickActive ? 2 : 1;
  scoreDisplay.textContent = "Cookies : " + score;

  updateBackground();
  checkForEvent();

  for (let i = 0; i < miniCookieMultiplier; i++) {
    const mini = document.createElement("img");
    mini.src = cookie.src;
    mini.className = "mini-cookie";
    mini.style.filter = cookie.style.filter;

    const offsetX = (Math.random() - 0.5) * 100;
    const offsetY = -Math.random() * 100 - 50;

    mini.style.left = "85px";
    mini.style.top = "85px";
    mini.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(0.5)`;
    mini.style.opacity = 0;

    container.appendChild(mini);

    setTimeout(() => {
      mini.remove();
    }, 800);
  }
});
