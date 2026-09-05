document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const success = form.querySelector(".form-success");
      if (success) success.classList.add("show");
      form.reset();
    });
  }
});

(function pageTransitions() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const coverMs = 450;

  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      document.documentElement.classList.remove("is-leaving");
    }
  });

  document.addEventListener("click", (event) => {
    if (reduceMotion.matches) return;
    if (event.defaultPrevented) return;
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest("a[href]");
    if (!link) return;
    if (link.target === "_blank" || link.hasAttribute("download")) return;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) return;

    let next;
    try {
      next = new URL(link.href, window.location.href);
    } catch {
      return;
    }

    if (next.origin !== window.location.origin) return;
    if (next.pathname === window.location.pathname && next.search === window.location.search) {
      if (next.hash) return;
      event.preventDefault();
      return;
    }

    event.preventDefault();
    if (document.documentElement.classList.contains("is-leaving")) return;

    document.documentElement.classList.add("is-leaving");
    window.setTimeout(() => {
      window.location.href = next.href;
    }, coverMs);
  });
})();
