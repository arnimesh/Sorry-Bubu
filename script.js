//(function () {
//  const card = document.getElementById("card");
//  const successCard = document.getElementById("successCard");
//  const btnYes = document.getElementById("btnYes");
//  const btnNo = document.getElementById("btnNo");
//  const hint = document.getElementById("hint");
//
//  if (!card || !successCard || !btnYes || !btnNo || !hint) return;
//
//  function attachImageFallback(img) {
//    if (!img) return;
//    img.addEventListener("error", function () {
//      const fallback = img.getAttribute("data-fallback");
//      if (fallback && img.src.indexOf(fallback) === -1) {
//        img.src = fallback;
//        img.removeAttribute("data-fallback");
//      }
//    });
//  }
//
//  attachImageFallback(document.getElementById("characterImg"));
//  attachImageFallback(document.getElementById("successImg"));
//
//  btnYes.addEventListener("click", function () {
//    card.classList.add("hidden");
//    successCard.classList.remove("hidden");
//  });
//
//  const maxOffset = 80;
//  const runAwayRadius = 90;
//  let lastMoveTime = 0;
//  const moveCooldownMs = 280;
//
//  function randomOffset() {
//    return (Math.random() - 0.5) * 2 * maxOffset;
//  }
//
//  function moveNoButton() {
//    hint.classList.add("visible");
//    const dx = randomOffset();
//    const dy = randomOffset();
//    btnNo.style.transform = "translate(" + dx + "px, " + dy + "px)";
//  }
//
//  document.addEventListener("mousemove", function (e) {
//    const now = Date.now();
//    if (now - lastMoveTime < moveCooldownMs) return;
//    const rect = btnNo.getBoundingClientRect();
//    const cx = rect.left + rect.width / 2;
//    const cy = rect.top + rect.height / 2;
//    const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
//    if (dist < runAwayRadius) {
//      lastMoveTime = now;
//      moveNoButton();
//    }
//  });
//
//  btnNo.addEventListener("mouseenter", moveNoButton);
//
//  btnNo.addEventListener("click", function (e) {
//    e.preventDefault();
//    moveNoButton();
//  });
//})();
(function () {
  const card = document.getElementById("card");
  const successCard = document.getElementById("successCard");
  const btnYes = document.getElementById("btnYes");
  const btnNo = document.getElementById("btnNo");
  const hint = document.getElementById("hint");

  if (!card || !successCard || !btnYes || !btnNo || !hint) return;

  function attachImageFallback(img) {
    if (!img) return;
    img.addEventListener("error", function () {
      const fallback = img.getAttribute("data-fallback");
      if (fallback && img.src.indexOf(fallback) === -1) {
        img.src = fallback;
        img.removeAttribute("data-fallback");
      }
    });
  }

  attachImageFallback(document.getElementById("successImg"));

  btnYes.addEventListener("click", function () {
    card.classList.add("hidden");
    successCard.classList.remove("hidden");

    // ⭐⭐⭐ CHANGED: Heart animation instead of confetti ⭐⭐⭐
    const duration = 2000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 6,
        spread: 70,
        origin: { y: 0.6 },
        shapes: ["circle"],
        scalar: 1.2,
        colors: ["#ff6b9d", "#ff8ec7", "#ffb7d5"]
      });

      // Add emoji hearts
      const heart = document.createElement("div");
      heart.innerText = "💖";
      heart.style.position = "fixed";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = "-20px";
      heart.style.fontSize = "20px";
      heart.style.animation = "fall 2s linear forwards";
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 2000);

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  });

  const maxOffset = 80;
  const runAwayRadius = 90;
  let lastMoveTime = 0;
  const moveCooldownMs = 280;

  function randomOffset() {
    return (Math.random() - 0.5) * 2 * maxOffset;
  }

  function moveNoButton() {
    hint.classList.add("visible");
    const dx = randomOffset();
    const dy = randomOffset();
    btnNo.style.transform = "translate(" + dx + "px, " + dy + "px)";
  }

  document.addEventListener("mousemove", function (e) {
    const now = Date.now();
    if (now - lastMoveTime < moveCooldownMs) return;

    const rect = btnNo.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dist = Math.hypot(e.clientX - cx, e.clientY - cy);

    if (dist < runAwayRadius) {
      lastMoveTime = now;
      moveNoButton();
    }
  });

  btnNo.addEventListener("mouseenter", moveNoButton);

  btnNo.addEventListener("click", function (e) {
    e.preventDefault();
    moveNoButton();
  });
})();
