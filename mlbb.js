document.addEventListener("DOMContentLoaded", () => {
  const produkList = [
    { label: "86 Diamond", harga: "Rp 19.500" },
    { label: "172 Diamond", harga: "Rp 39.000" },
    { label: "257 Diamond", harga: "Rp 58.000" },
    { label: "344 Diamond", harga: "Rp 77.000" },
    { label: "429 Diamond", harga: "Rp 96.000" },
    { label: "514 Diamond", harga: "Rp 114.000" },
    { label: "706 Diamond", harga: "Rp 153.000" },
    { label: "878 Diamond", harga: "Rp 189.000" },
  ];

  const container = document.getElementById("produk-container");

  produkList.forEach(item => {
    const div = document.createElement("div");
    div.className = "produk-item";
    div.innerHTML = `<strong>${item.label}</strong><br><small>${item.harga}</small>`;
    div.onclick = () => alert(`Kamu memilih ${item.label} - ${item.harga}`);
    container.appendChild(div);
  });
});
