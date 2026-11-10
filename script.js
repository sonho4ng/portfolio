const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const olderButton = document.querySelector(".older-button");
const olderUpdates = document.querySelector(".older-updates");

menuButton.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  });
});

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
