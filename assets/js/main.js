(function () {
  "use strict";

  /* ===== Planet data ===== */
  const planets = [
    { name: "Mercurio", emoji: "☀️", fact: "Es el planeta más cercano al Sol y el más pequeño.", bg: "radial-gradient(circle at 30% 30%, #e0dad2, #8a8178)" },
    { name: "Venus", emoji: "🔥", fact: "Es el planeta más caliente, ¡más que Mercurio!", bg: "radial-gradient(circle at 30% 30%, #ffe9b8, #d9a53f)" },
    { name: "Tierra", emoji: "🌎", fact: "Es nuestro hogar y el único planeta con vida conocida.", bg: "radial-gradient(circle at 30% 30%, #8fe3ff, #1f7bd6 55%, #2f9e4a)" },
    { name: "Marte", emoji: "🔴", fact: "Lo llaman el planeta rojo por su polvo de óxido.", bg: "radial-gradient(circle at 30% 30%, #ff9b73, #c1440e)" },
    { name: "Júpiter", emoji: "🌪️", fact: "Es el más grande y tiene una tormenta gigante llamada la Gran Mancha Roja.", bg: "repeating-linear-gradient(0deg, #d8a46b 0 14px, #f1d3a6 14px 26px, #b9784a 26px 34px)" },
    { name: "Saturno", emoji: "💍", fact: "Sus anillos están hechos de hielo y rocas.", bg: "radial-gradient(circle at 30% 30%, #fff0bf, #e0b85c)", ring: true },
    { name: "Urano", emoji: "🧊", fact: "Gira acostado, ¡como si rodara por su órbita!", bg: "radial-gradient(circle at 30% 30%, #d4fbff, #5fd3e0)" },
    { name: "Neptuno", emoji: "💨", fact: "Tiene los vientos más rápidos de todo el Sistema Solar.", bg: "radial-gradient(circle at 30% 30%, #8fb5ff, #2d4fd6)" }
  ];

  const grid = document.querySelector("#planet-grid");
  planets.forEach((p, i) => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-3";
    col.setAttribute("data-aos", "zoom-in");
    col.setAttribute("data-aos-delay", (i % 4) * 100);
    col.innerHTML = `
      <div class="planet-card" tabindex="0" role="button" aria-label="${p.name}: ver dato curioso">
        <div class="inner">
          <div class="face front">
            <div class="sphere${p.ring ? " ring" : ""}" style="background:${p.bg}"></div>
            <h3>${p.name}</h3>
            <span class="hint"><i class="bi bi-hand-index"></i> Tócame</span>
          </div>
          <div class="face back">
            <span class="emoji">${p.emoji}</span>
            <h3>${p.name}</h3>
            <p>${p.fact}</p>
          </div>
        </div>
      </div>`;
    grid.appendChild(col);
  });

  document.querySelectorAll(".planet-card").forEach((card) => {
    const flip = () => card.classList.toggle("flipped");
    card.addEventListener("click", flip);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); }
    });
  });

  /* ===== Twinkling stars ===== */
  const canvas = document.querySelector("#stars");
  const ctx = canvas.getContext("2d");
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const count = Math.floor((canvas.width * canvas.height) / 5000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((s) => {
      s.phase += s.speed;
      ctx.globalAlpha = 0.4 + Math.abs(Math.sin(s.phase)) * 0.6;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();

  /* ===== Close mobile menu on link click ===== */
  const navmenu = document.querySelector("#navmenu");
  document.querySelectorAll("#navmenu .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navmenu.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(navmenu).hide();
    });
  });

  /* ===== Active nav link on scroll + scroll-top button ===== */
  const links = document.querySelectorAll("#navmenu .nav-link");
  const scrollTop = document.querySelector("#scroll-top");

  function onScroll() {
    const pos = window.scrollY + 120;
    links.forEach((link) => {
      const section = document.querySelector(link.hash);
      const inside = section && pos >= section.offsetTop && pos < section.offsetTop + section.offsetHeight;
      link.classList.toggle("active", !!inside);
    });
    scrollTop.classList.toggle("show", window.scrollY > 200);
  }

  window.addEventListener("scroll", onScroll);
  window.addEventListener("load", onScroll);

  document.querySelector("#year").textContent = new Date().getFullYear();

  AOS.init({ duration: 700, once: true });
})();
