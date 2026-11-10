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
