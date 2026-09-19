
(() => {
  const root = document.documentElement;
  const storageKey = "still-color-scheme";
  const saved = localStorage.getItem(storageKey);
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  function apply(mode) {
    root.dataset.colorScheme = mode;
    root.classList.remove(
      "color-scheme-auto",
      "color-scheme-light",
      "color-scheme-dark"
    );
    root.classList.add(mode === "dark" ? "color-scheme-dark" : "color-scheme-light");
    document.querySelectorAll("[data-theme-icon]").forEach((el) => {
      el.textContent = mode === "dark" ? "☀" : "☾";
    });
  }

  apply(saved || (prefersDark ? "dark" : "light"));

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-theme-toggle]");
    if (!button) return;
    const next = root.dataset.colorScheme === "dark" ? "light" : "dark";
    localStorage.setItem(storageKey, next);
    apply(next);
  });
})();
