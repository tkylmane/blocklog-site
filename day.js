/* Tabs through a pilot's day: the step crossing the middle of the screen lights its tab
   and shows its screenshot in the sticky phone. Without this script the steps read as
   plain rows, each with its own screenshot. */
(function () {
  const day = document.getElementById("day");
  if (!day || !("IntersectionObserver" in window)) return;
  const tabs = [...day.querySelectorAll(".day-tab")];
  const steps = [...day.querySelectorAll(".step")];
  const shots = [...day.querySelectorAll(".day-phone img")];
  const pill = day.querySelector(".day-pill");
  const bar = day.querySelector(".day-tabs");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  let current = -1;

  function movePill() {
    const t = tabs[current];
    if (!t) return;
    pill.style.width = t.offsetWidth + "px";
    pill.style.transform = "translateX(" + t.offsetLeft + "px)";
  }

  function show(i) {
    if (i === current) return;
    current = i;
    tabs.forEach((t, n) => t.setAttribute("aria-selected", String(n === i)));
    shots.forEach((s, n) => s.classList.toggle("on", n === i));
    steps.forEach((s, n) => s.classList.toggle("on", n === i));
    movePill();
    /* On a phone the tab bar scrolls sideways: keep the lit tab in view. */
    const t = tabs[i];
    if (bar.scrollWidth > bar.clientWidth) {
      bar.scrollTo({ left: t.offsetLeft - (bar.clientWidth - t.offsetWidth) / 2, behavior: reduce.matches ? "auto" : "smooth" });
    }
  }

  const io = new IntersectionObserver(entries => {
    for (const e of entries) if (e.isIntersecting) show(steps.indexOf(e.target));
  }, { rootMargin: "-45% 0px -45% 0px" });
  steps.forEach(s => io.observe(s));

  tabs.forEach((t, n) => t.addEventListener("click", ev => {
    ev.preventDefault();
    steps[n].scrollIntoView({ behavior: reduce.matches ? "auto" : "smooth", block: "center" });
    show(n);
  }));

  addEventListener("resize", movePill);
  /* Place the highlight on the first tab without sliding in from nothing. */
  pill.style.transition = "none";
  show(0);
  pill.getBoundingClientRect();
  pill.style.transition = "";
})();
