const olderButton = document.querySelector(".older-button");
const olderUpdates = document.querySelector(".older-updates");

if (olderButton && olderUpdates) {
  olderButton.addEventListener("click", () => {
    const isHidden = olderUpdates.hasAttribute("hidden");
    if (isHidden) {
      olderUpdates.removeAttribute("hidden");
      olderButton.innerHTML = "Hide earlier updates <span>↑</span>";
    } else {
      olderUpdates.setAttribute("hidden", "");
      olderButton.innerHTML = "Show earlier updates <span>↓</span>";
    }
  });
}

const revealSections = document.querySelectorAll(".scroll-reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealSections.forEach((section) => section.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  revealSections.forEach((section) => revealObserver.observe(section));
}
