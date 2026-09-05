document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const success = form.querySelector(".form-success");
    if (success) success.classList.add("show");
    form.reset();
  });
});
