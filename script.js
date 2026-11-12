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
  }, { threshold: 0.01, rootMargin: "0px 0px -18% 0px" });

  revealSections.forEach((section) => revealObserver.observe(section));
}

const navigationLinks = [...document.querySelectorAll(".menu a")];
const navigationTargets = new Set(
  navigationLinks
    .map((link) => link.getAttribute("href"))
    .filter((target) => target && target.startsWith("#"))
);
const navigationSections = [...document.querySelectorAll("main > section[id]")].filter(
  (section) => navigationTargets.has(`#${section.id}`)
);

if (navigationLinks.length && navigationSections.length) {
  const setActiveNavigation = () => {
    const marker = window.scrollY + 150;
    let activeId = "main-content";

    navigationSections.forEach((section) => {
      if (section.offsetTop <= marker) activeId = section.id;
    });

    navigationLinks.forEach((link) => {
      const target = link.getAttribute("href");
      const isActive = target === `#${activeId}` || (activeId === "main-content" && target === "#main-content");
      link.classList.toggle("active", isActive);
      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  };

  setActiveNavigation();
  window.addEventListener("scroll", setActiveNavigation, { passive: true });
  window.addEventListener("resize", setActiveNavigation);
}
