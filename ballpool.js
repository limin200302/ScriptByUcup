// ballpool.js
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".select-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const paket = btn.parentElement.querySelector("h3").textContent;
      const harga = btn.parentElement.querySelector("p").textContent;
      const url = `https://wa.me/6285713056206?text=Saya%20ingin%20beli%20${encodeURIComponent(paket)}%20dengan%20harga%20${encodeURIComponent(harga)}`;
      window.open(url, "_blank");
    });
  });
});
