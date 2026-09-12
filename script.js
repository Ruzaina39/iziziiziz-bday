// ==========================================================================
// EASY EDITING
// Everything you would ever want to change lives in this block.
// You do not need to touch anything below "END OF EASY EDITING" unless
// you want to. Just edit the text between the quote marks " ".
// ==========================================================================

const CONFIG = {

  // Her name, used in a couple of small places.
  name: "Izel",

  // Shown during the "birth" scene of the story.
  birthDate: "12 · SEPTEMBER · 2003",

  // The year shown near the end of the story, and the "present day" year.
  presentYear: "2026",

  // ---- THE LETTER -------------------------------------------------------
  // Each item in this list becomes its own paragraph.
  // Keep the emojis if you want them, or remove them — up to you.
  letter: [
    "Happy Birthday, Izel! 🤎",
    "You've grown up so well, but you're still like a kid to me because you have that kidda voice 😭😂",
    "The day we met, you were my pizza… and now you're that one person jisko main din mein ek baar bina baat kiye reh nahi sakti.",
    "We've been together for 3 years, and I still can't believe ki in 3 saalon mein itna sab kuch badal gaya.",
    "Tum pizza se meri jaan ban gayi. Meri babygirl uff 😭",
    "Agar tum nahi hoti toh mera kya hota, jaaneman?",
    "Tum jitni bhi badi ho jao, mere liye tum abhi bhi ek choti bacchi hi rahogi… kyuki awaaz tumhari abhi bhi waisi hi hai.",
    "Hehehehe 😭",
    "Lekin haan, jitne bhi log meri life mein aaye hain, tumhare bina meri life adhoori hai.",
    "And you might be the first person jisko main yeh baat bol rahi hoon.",
    "Happy Birthday once again, Izel. 🤎",
    "I hope this year gives you everything you deserve, because you genuinely mean so much to me."
  ],
  letterSignature: "— from your pizza turned jaan 🤎",

  // ---- MEMORIES -----------------------------------------------------------
  // Put your 10 photos inside assets/photos/ using these exact file names.
  // You can change each caption to whatever you like.
  memoriesSubtext: "Little moments that became some of my favorite memories.",
  photos: [
    { src: "assets/photos/memory01.jpg", caption: "the first one" },
    { src: "assets/photos/memory02.jpg", caption: "that random tuesday" },
    { src: "assets/photos/memory03.jpg", caption: "we laughed so hard here" },
    { src: "assets/photos/memory04.jpg", caption: "our little tradition" },
    { src: "assets/photos/memory05.jpg", caption: "best day ever" },
    { src: "assets/photos/memory06.jpg", caption: "you and your voice notes" },
    { src: "assets/photos/memory07.jpg", caption: "matching energy" },
    { src: "assets/photos/memory08.jpg", caption: "late night talks" },
    { src: "assets/photos/memory09.jpg", caption: "this made my whole week" },
    { src: "assets/photos/memory10.jpg", caption: "still my favorite person" }
  ],

  // ---- THINGS I LOVE ABOUT YOU --------------------------------------------
  loveThings: [
    "Your voice 😭",
    "The way you make normal days funny.",
    "How comfortable everything feels with you.",
    "The fact that three years somehow went by so fast.",
    "The person you've become."
  ],

  // ---- FINAL SECRET MESSAGE -----------------------------------------------
  // Each line appears one at a time when she clicks the button.
  finalMessage: [
    "I'll always love you, no matter what.",
    "Whenever we fight, I always think of a reason to talk to you.",
    "Whenever you're not online, I think about having a call with you and texting you.",
    "Love you, mah baby.",
    "Byeeeeee 🤎",
    "— your Zayden"
  ],

  // ---- MUSIC ----------------------------------------------------------------
  // Put your song file at assets/birthday-song.mp3 (the site still works fine
  // if you leave this file out — the player will just stay silent).
  musicSrc: "assets/birthday-song.mp3",

  // ---- COLORS (only change these if you want a different palette) ---------
  colors: {
    background: "#F5EDE5",
    burgundy:   "#2B080D",
    brown:      "#806D69",
    beige:      "#D8C9BF",
    cream:      "#FBF7F2"
  }
};

// ==========================================================================
// END OF EASY EDITING — the code below runs the actual website.
// ==========================================================================

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const T = (ms) => reduceMotion ? Math.min(ms, 250) : ms; // shrink timings if requested
const qs  = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));
const sleep = (ms) => new Promise((res) => setTimeout(res, T(ms)));

document.addEventListener("DOMContentLoaded", () => {
  wireEnterFlow();
  wireMusicPlayer();
  populateMainSite();
  wireLightbox();
  wireSecret();
  wireScrollReveal();
});

/* ==========================================================================
   1. ENTER → COUNTDOWN → STORY → REVEAL → MAIN SITE
   ========================================================================== */

function wireEnterFlow(){
  const enterBtn = qs("#enterBtn");
  enterBtn.addEventListener("click", async () => {
    enterBtn.disabled = true;
    tryStartMusic();

    await fadeOutScreen("#intro");
    await runCountdown();
    await fadeOutScreen("#countdown");
    await runStory();
    await fadeOutScreen("#story");
    await runReveal();
    await sleep(2600);
    await fadeOutScreen("#reveal");
    showMainSite();
  });
}

function fadeOutScreen(selector){
  return new Promise((resolve) => {
    const el = qs(selector);
    el.classList.add("fade-out");
    setTimeout(() => { el.hidden = true; resolve(); }, T(1100));
  });
}

async function runCountdown(){
  const screen = qs("#countdown");
  const numberEl = qs("#countdownNumber");
  screen.hidden = false;
  for (const n of [3, 2, 1]) {
    numberEl.textContent = n;
    numberEl.classList.remove("show");
    void numberEl.offsetWidth; // restart animation
    numberEl.classList.add("show");
    await sleep(1000);
  }
  await sleep(300);
}

async function runReveal(){
  const screen = qs("#reveal");
  screen.hidden = false;
  spawnRevealParticles();
  qs(".reveal-happy").classList.add("show");
  await sleep(500);
  qs(".reveal-name").classList.add("show");
}

function spawnRevealParticles(){
  const wrap = qs("#revealParticles");
  const glyphs = ["✦", "✧", "♡", "·"];
  for (let i = 0; i < 22; i++) {
    const s = document.createElement("span");
    s.className = "reveal-spark";
    s.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    s.style.left = (5 + Math.random() * 90) + "%";
    s.style.top = (40 + Math.random() * 45) + "%";
    s.style.animationDelay = (Math.random() * 1.6) + "s";
    s.style.fontSize = (0.7 + Math.random() * 1.1) + "rem";
    wrap.appendChild(s);
  }
}

function showMainSite(){
  qs("#mainSite").hidden = false;
  document.body.style.overflowY = "auto";
  window.scrollTo(0, 0);
}

/* ==========================================================================
   2. THE HAND-DRAWN STORY
   ========================================================================== */

const girlG   = () => qs("#girl");
const friendG = () => qs("#friend");
const envG    = () => qs("#envLayer");
const partG   = () => qs("#particleLayer");
const captionEl = () => qs("#storyCaption");
const dateEl     = () => qs("#storyDate");

function setCaption(text){
  const el = captionEl();
  el.classList.remove("show");
  void el.offsetWidth;
  el.textContent = text;
  if (text) el.classList.add("show");
}

function setDate(text){
  const el = dateEl();
  if (!text){ el.classList.remove("show"); return; }
  el.textContent = text;
  el.classList.add("show");
}

function clearEnv(){ envG().innerHTML = ""; }
function clearParticles(){ partG().innerHTML = ""; }

// ---- girl figure, drawn fresh (with a gentle "draw-on" stroke) per stage ----
// stage: 'baby' | 'child' | 'tween' | 'teen' | 'woman'
function girlMarkup(stage){
  const specs = {
    baby:  { h: 60,  headR: 16, hair: `M -12,-58 Q 0,-70 12,-58`,               dress: `M -14,-42 Q 0,-30 14,-42 L 16,4 Q 0,14 -16,4 Z` },
    child: { h: 120, headR: 19, hair: `M -20,-118 Q 0,-140 20,-118 L 22,-96 Q 0,-104 -22,-96 Z`, dress: `M -20,-92 L -26,-10 Q 0,4 26,-10 L 20,-92 Z` },
    tween: { h: 165, headR: 20, hair: `M -22,-162 Q 0,-192 22,-162 Q 26,-130 16,-110 L -16,-110 Q -26,-130 -22,-162 Z`, dress: `M -22,-128 L -30,10 Q 0,24 30,10 L 22,-128 Z` },
    teen:  { h: 205, headR: 21, hair: `M -24,-200 Q 0,-238 24,-200 Q 30,-150 18,-122 L -18,-122 Q -30,-150 -24,-200 Z`, dress: `M -24,-160 L -32,20 Q 0,36 32,20 L 24,-160 Z` },
    woman: { h: 235, headR: 22, hair: `M -25,-228 Q 0,-270 25,-228 Q 33,-160 20,-128 L -20,-128 Q -33,-160 -25,-228 Z`, dress: `M -25,-182 L -34,30 Q 0,48 34,30 L 25,-182 Z` },
  };
  const s = specs[stage];
  const legY = -s.h * 0.02;
  return `
    <g class="figure-shell">
      <!-- legs -->
      <path class="stroke draw" d="M -8,${legY} L -10,10" />
      <path class="stroke draw" d="M 8,${legY} L 10,10" />
      <!-- dress / body -->
      <path class="stroke fill-soft draw" d="${s.dress}" />
      <!-- arms -->
      <path class="stroke draw arm-left" d="M -18,${-s.h*0.62} Q -34,${-s.h*0.5} -28,${-s.h*0.32}" />
      <path class="stroke draw arm-right" d="M 18,${-s.h*0.62} Q 34,${-s.h*0.5} 28,${-s.h*0.32}" />
      <!-- neck + head -->
      <circle class="stroke fill-cream head" cx="0" cy="${-s.h*0.72 - s.headR}" r="${s.headR}" />
      <!-- hair -->
      <path class="stroke fill-soft draw hair" d="${s.hair}" transform="translate(0, ${-s.h*0.72 - s.headR + s.headR*0.05})" />
      <!-- face: closed, gentle -->
      <g class="face" transform="translate(0, ${-s.h*0.72 - s.headR})">
        <path class="stroke eye eye-l" d="M -6,-1 Q -3,2 0,-1" />
        <path class="stroke eye eye-r" d="M 3,-1 Q 6,2 9,-1" transform="translate(-3,0)"/>
        <path class="stroke" d="M -3,7 Q 0,9 3,7" />
      </g>
    </g>
  `;
}

function friendMarkup(){
  return `
    <g class="figure-shell">
      <path class="stroke draw" d="M -8,-4 L -10,10" />
      <path class="stroke draw" d="M 8,-4 L 10,10" />
      <path class="stroke fill-soft draw" d="M -22,-150 L -28,10 Q 0,22 28,10 L 22,-150 Z" />
      <path class="stroke draw" d="M -16,-190 Q -32,-176 -26,-158" />
      <path class="stroke draw" d="M 16,-190 Q 32,-176 26,-158" />
      <circle class="stroke fill-cream" cx="0" cy="-210" r="21" />
      <path class="stroke fill-soft draw" d="M -22,-228 Q 0,-244 22,-228 Q 24,-214 16,-206 L -16,-206 Q -24,-214 -22,-228 Z" />
      <g class="face" transform="translate(0,-210)">
        <path class="stroke" d="M -6,-1 Q -3,2 0,-1" />
        <path class="stroke" d="M 0,-1 Q 3,2 6,-1" transform="translate(3,0)"/>
        <path class="stroke" d="M -3,7 Q 0,9 3,7" />
      </g>
    </g>
  `;
}

function setGirlStage(stage, x = 400, y = 430, scale = 1){
  const g = girlG();
  g.setAttribute("transform", `translate(${x},${y}) scale(${scale})`);
  g.innerHTML = girlMarkup(stage);
  breathe(g.querySelector(".figure-shell"));
  blinkLoop(g.querySelector(".face"));
  swayHair(g.querySelector(".hair"));
}

function breathe(el){
  if (!el || reduceMotion) return;
  el.style.animation = "breathe 4.2s ease-in-out infinite";
}
function swayHair(el){
  if (!el || reduceMotion) return;
  el.style.transformOrigin = "top center";
  el.style.animation = "hairSway 5.6s ease-in-out infinite";
}
let blinkTimers = [];
function blinkLoop(faceEl){
  if (!faceEl) return;
  const id = setInterval(() => {
    if (!document.body.contains(faceEl)) { clearInterval(id); return; }
    faceEl.classList.add("blink");
    setTimeout(() => faceEl.classList.remove("blink"), 160);
  }, 2600 + Math.random() * 1600);
  blinkTimers.push(id);
}

// ---- small environment pieces ----
function addFlower(x, y, scale = 1, delay = 0){
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("transform", `translate(${x},${y}) scale(${scale})`);
  g.innerHTML = `
    <path class="stroke draw" style="animation-delay:${delay}s" d="M0,0 Q -4,-24 0,-46" />
    <g class="bloom" style="transform-origin:0px -46px; transform:scale(0); animation: bloomIn .8s ${delay+0.9}s ease-out forwards;">
      ${[0,72,144,216,288].map(a => `<ellipse class="fill-soft stroke" cx="${Math.cos(a*Math.PI/180)*7}" cy="${-46 + Math.sin(a*Math.PI/180)*7}" rx="6" ry="9" transform="rotate(${a} 0 -46)"/>`).join("")}
      <circle class="fill-cream stroke" cx="0" cy="-46" r="4" />
    </g>
  `;
  envG().appendChild(g);
}

function addWindow(x, y){
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("transform", `translate(${x},${y})`);
  g.innerHTML = `
    <rect class="stroke fill-cream draw" x="-60" y="-140" width="120" height="150" rx="4" />
    <line class="stroke" x1="-60" y1="-65" x2="60" y2="-65" />
    <line class="stroke" x1="0" y1="-140" x2="0" y2="10" />
  `;
  envG().appendChild(g);
}

function addBook(x, y){
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("transform", `translate(${x},${y})`);
  g.innerHTML = `
    <path class="stroke fill-cream draw" d="M -30,0 Q 0,-10 30,0 L 30,18 Q 0,8 -30,18 Z" />
    <path class="stroke" d="M 0,-8 L 0,16" />
  `;
  envG().appendChild(g);
}

function addSun(cx, cy, r = 46){
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("id", "storySun");
  g.innerHTML = `<circle class="fill-cream" cx="${cx}" cy="${cy}" r="${r}" opacity="0.9" />`;
  envG().appendChild(g);
  return g;
}

function addStars(count = 14){
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  for (let i = 0; i < count; i++){
    const x = 40 + Math.random() * 720;
    const y = 20 + Math.random() * 160;
    const s = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    s.setAttribute("cx", x); s.setAttribute("cy", y); s.setAttribute("r", 1.4 + Math.random()*1.3);
    s.setAttribute("fill", "var(--burgundy)");
    s.setAttribute("opacity", "0");
    s.style.animation = `starTwinkle 3s ease-in-out ${Math.random()*2}s infinite`;
    g.appendChild(s);
  }
  envG().appendChild(g);
}

function duskOverlay(on){
  let ov = qs("#duskOverlay");
  if (!ov){
    ov = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    ov.setAttribute("id", "duskOverlay");
    ov.setAttribute("x", "0"); ov.setAttribute("y", "0");
    ov.setAttribute("width", "800"); ov.setAttribute("height", "500");
    ov.setAttribute("fill", "#2B080D");
    ov.setAttribute("opacity", "0");
    ov.style.transition = "opacity 2.6s ease";
    ov.style.pointerEvents = "none";
    qs("#storySvg").insertBefore(ov, girlG());
  }
  requestAnimationFrame(() => { ov.setAttribute("opacity", on ? "0.14" : "0"); });
}

function driftParticle(kind = "petal"){
  const p = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  const x = Math.random() * 800;
  p.setAttribute("cx", x); p.setAttribute("cy", "-10");
  p.setAttribute("r", kind === "petal" ? 3 : 1.6);
  p.setAttribute("class", "fill-soft");
  p.style.animation = `driftDown ${6 + Math.random()*4}s linear forwards`;
  partG().appendChild(p);
  setTimeout(() => p.remove(), T(11000));
}
let particleInterval = null;
function startAmbientParticles(){
  if (reduceMotion) return;
  stopAmbientParticles();
  particleInterval = setInterval(() => driftParticle(), 900);
}
function stopAmbientParticles(){
  if (particleInterval) clearInterval(particleInterval);
  particleInterval = null;
}

// ---- walking helper: animate a group's translateX over a duration ----
function walkTo(el, fromX, toX, y, scale, duration){
  return new Promise((resolve) => {
    if (reduceMotion){
      el.setAttribute("transform", `translate(${toX},${y}) scale(${scale})`);
      resolve(); return;
    }
    const start = performance.now();
    function frame(now){
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const x = fromX + (toX - fromX) * eased;
      const bob = Math.sin(t * Math.PI * 8) * 3;
      el.setAttribute("transform", `translate(${x},${y + bob}) scale(${scale})`);
      if (t < 1) requestAnimationFrame(frame); else resolve();
    }
    requestAnimationFrame(frame);
  });
}

// ---- the full sequence ----
async function runStory(){
  const screen = qs("#story");
  screen.hidden = false;
  startAmbientParticles();

  // SCENE 1 — BIRTH
  clearEnv(); clearParticles(); setGirlStage("baby", 400, 380, 1);
  setDate(CONFIG.birthDate);
  addFlower(220, 460, 0.6, 0.2);
  addFlower(600, 470, 0.5, 0.6);
  addStars(0);
  await sleep(1800);
  setCaption("And a little girl was born.");
  await sleep(2600);
  setCaption("");
  setDate("");

  // SCENE 2 — CHILDHOOD
  clearEnv();
  addWindow(600, 430);
  addFlower(150, 460, 0.7, 0);
  setGirlStage("child", 340, 430, 1);
  setCaption("She grew, little by little.");
  await sleep(2800);
  setCaption("");

  // SCENE 3 — TIME PASSING (flower blooms, day becomes evening, stars)
  clearEnv();
  addBook(560, 460);
  addFlower(180, 460, 1, 0);
  setGirlStage("tween", 360, 430, 1);
  setCaption("The days turned into years, quietly.");
  await sleep(2400);
  duskOverlay(true);
  addStars(16);
  await sleep(2600);
  setCaption("");
  duskOverlay(false);

  // SCENE 4 — TEENAGER
  clearEnv();
  addWindow(600, 420);
  setGirlStage("teen", 350, 430, 1);
  setCaption("She became someone with her own voice.");
  await sleep(2800);
  setCaption("");

  // SCENE 5 — YOUNG WOMAN
  clearEnv();
  addFlower(600, 460, 0.8, 0);
  setGirlStage("woman", 400, 430, 1);
  setCaption("and somehow…");
  await sleep(2200);
  setCaption("life was about to change.");
  await sleep(2800);
  setCaption("");

  // SCENE 6 — LATE 2023, THEY MEET
  clearEnv();
  setDate("LATE · 2023");
  setGirlStage("woman", 180, 430, 0.95);
  const friend = friendG();
  friend.innerHTML = friendMarkup();
  friend.setAttribute("transform", "translate(650,430) scale(0.95)");
  friend.style.opacity = 1;
  breathe(friend.querySelector(".figure-shell"));
  blinkLoop(friend.querySelector(".face"));

  await sleep(1200);
  await Promise.all([
    walkTo(girlG(), 180, 370, 430, 0.95, T(2200)),
    walkTo(friend, 650, 440, 430, 0.95, T(2200)),
  ]);
  setCaption("✦");
  await sleep(1100);
  setCaption("We met.");
  await sleep(2200);
  setCaption("The beginning of us.");
  await sleep(2600);
  setCaption("");
  setDate("");

  // SCENE 7 — FRIENDSHIP
  addFlower(120, 470, 0.5, 0);
  addFlower(680, 470, 0.5, 0.3);
  setCaption("They walked together, and time moved gently around them.");
  await Promise.all([
    walkTo(girlG(), 370, 500, 430, 0.85, T(3600)),
    walkTo(friend, 440, 560, 430, 0.85, T(3600)),
  ]);
  await sleep(600);
  setCaption("");
  // fade into the distance
  girlG().style.transition = "opacity 1.6s ease";
  friend.style.transition = "opacity 1.6s ease";
  girlG().style.opacity = 0.15;
  friend.style.opacity = 0.15;
  await sleep(1800);

  // SCENE 8 — PRESENT
  clearEnv();
  setCaption("And here we are…");
  await sleep(2200);
  setDate(CONFIG.presentYear);
  girlG().style.opacity = 1;
  friend.style.opacity = 1;
  setGirlStage("woman", 340, 430, 0.9);
  friend.innerHTML = friendMarkup();
  friend.setAttribute("transform", "translate(440,430) scale(0.9)");
  breathe(friend.querySelector(".figure-shell"));
  await sleep(2400);
  setCaption("✦");
  await sleep(1400);

  stopAmbientParticles();
  setCaption("");
  setDate("");
}

/* ==========================================================================
   3. MAIN SITE CONTENT (letter, memories, love cards, populated from CONFIG)
   ========================================================================== */

function populateMainSite(){
  // letter
  const letterBody = qs("#letterBody");
  letterBody.innerHTML = CONFIG.letter.map(p => `<p>${escapeHtml(p)}</p>`).join("");
  qs("#letterSign").textContent = CONFIG.letterSignature;

  // memories
  qs("#memoriesSubtext").textContent = CONFIG.memoriesSubtext;
  const scrapbook = qs("#scrapbook");
  scrapbook.innerHTML = CONFIG.photos.map((photo, i) => `
    <figure class="memory-item m${i + 1} reveal-el" data-index="${i}" tabindex="0" role="button" aria-label="Open photo: ${escapeHtml(photo.caption)}">
      <img src="${photo.src}" alt="${escapeHtml(photo.caption)}" loading="lazy"
           onerror="this.closest('.memory-item').classList.add('img-missing'); this.style.background='var(--beige)'; this.alt=''; this.src='';">
      <figcaption class="cap">${escapeHtml(photo.caption)}</figcaption>
    </figure>
  `).join("");

  // love cards
  const loveCards = qs("#loveCards");
  loveCards.innerHTML = CONFIG.loveThings.map(item => `
    <div class="love-card reveal-el">${escapeHtml(item)}</div>
  `).join("");

  // final message lines (built now, revealed later)
  const secretMessage = qs("#secretMessage");
  secretMessage.innerHTML = CONFIG.finalMessage.map(line => `<p>${escapeHtml(line)}</p>`).join("");
}

function escapeHtml(str){
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ==========================================================================
   4. LIGHTBOX
   ========================================================================== */

function wireLightbox(){
  const lightbox = qs("#lightbox");
  const img = qs("#lightboxImg");
  const caption = qs("#lightboxCaption");
  let currentIndex = 0;

  function open(index){
    currentIndex = index;
    const p = CONFIG.photos[currentIndex];
    img.src = p.src;
    img.alt = p.caption;
    caption.textContent = p.caption;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function close(){
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }
  function next(){ open((currentIndex + 1) % CONFIG.photos.length); }
  function prev(){ open((currentIndex - 1 + CONFIG.photos.length) % CONFIG.photos.length); }

  document.addEventListener("click", (e) => {
    const item = e.target.closest(".memory-item");
    if (item) open(Number(item.dataset.index));
  });
  document.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("memory-item")){
      e.preventDefault();
      open(Number(e.target.dataset.index));
    }
  });

  qs("#lightboxClose").addEventListener("click", close);
  qs("#lightboxNext").addEventListener("click", next);
  qs("#lightboxPrev").addEventListener("click", prev);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });
  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });
}

/* ==========================================================================
   5. MUSIC PLAYER
   ========================================================================== */

function wireMusicPlayer(){
  const audio = qs("#bgAudio");
  const playPauseBtn = qs("#playPauseBtn");
  const muteBtn = qs("#muteBtn");
  const volumeSlider = qs("#volumeSlider");
  const indicator = qs("#musicIndicator");

  if (CONFIG.musicSrc) audio.src = CONFIG.musicSrc;
  audio.volume = Number(volumeSlider.value);

  playPauseBtn.addEventListener("click", () => {
    if (audio.paused) tryStartMusic(); else pauseMusic();
  });
  muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    qs(".icon-vol").hidden = audio.muted;
    qs(".icon-mute").hidden = !audio.muted;
  });
  volumeSlider.addEventListener("input", () => {
    audio.volume = Number(volumeSlider.value);
  });
  audio.addEventListener("play", () => {
    qs(".icon-play").hidden = true;
    qs(".icon-pause").hidden = false;
    indicator.classList.add("playing");
  });
  audio.addEventListener("pause", () => {
    qs(".icon-play").hidden = false;
    qs(".icon-pause").hidden = true;
    indicator.classList.remove("playing");
  });
  audio.addEventListener("error", () => {
    // Song file missing or unsupported — the site keeps working silently.
    playPauseBtn.disabled = true;
  });
}

function tryStartMusic(){
  const audio = qs("#bgAudio");
  if (!audio.src) return;
  const p = audio.play();
  if (p && p.catch) p.catch(() => { /* autoplay blocked or file missing — that's fine */ });
}
function pauseMusic(){ qs("#bgAudio").pause(); }

/* ==========================================================================
   6. FINAL SECRET
   ========================================================================== */

function wireSecret(){
  const btn = qs("#secretBtn");
  const spark = qs("#secretSpark");
  const message = qs("#secretMessage");

  btn.addEventListener("click", async () => {
    btn.classList.add("hide");
    await sleep(500);
    spark.hidden = false;
    await sleep(900);
    message.hidden = false;
    const lines = qsa("p", message);
    for (const line of lines){
      line.classList.add("show");
      await sleep(900);
    }
  });
}

/* ==========================================================================
   7. SCROLL REVEAL
   ========================================================================== */

function wireScrollReveal(){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  // re-scan periodically since content is injected dynamically
  const scan = () => qsa(".reveal-el").forEach(el => observer.observe(el));
  scan();
  setTimeout(scan, 400); // catch late-populated nodes
}
