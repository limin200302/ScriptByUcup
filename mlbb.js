const diamondOptions = [
  { id: 1, label: "86 Diamond", price: "Rp 20.000" },
  { id: 2, label: "172 Diamond", price: "Rp 39.000" },
  { id: 3, label: "257 Diamond", price: "Rp 58.000" },
  { id: 4, label: "344 Diamond", price: "Rp 76.000" },
  { id: 5, label: "429 Diamond", price: "Rp 94.000" },
  { id: 6, label: "514 Diamond", price: "Rp 112.000" },
];

const container = document.getElementById("diamond-options");
let selectedOption = null;

diamondOptions.forEach((item) => {
  const div = document.createElement("div");
  div.className = "diamond-item";
  div.textContent = `${item.label} - ${item.price}`;
  div.addEventListener("click", () => {
    document.querySelectorAll(".diamond-item").forEach(el => el.classList.remove("selected"));
    div.classList.add("selected");
    selectedOption = item;
  });
  container.appendChild(div);
});

document.getElementById("mlbb-form").addEventListener("submit", function (e) {
  e.preventDefault();

  if (!selectedOption) {
    alert("❌ Pilih paket diamond dulu, Ketua!");
    return;
  }

  const email = this.email.value.trim();
  const password = this.password.value.trim();
  const note = this.note.value.trim();

  const detail = `
✅ Order Top Up MLBB
Email: ${email}
Password: ${password}
Note: ${note || "-"}
Paket: ${selectedOption.label} - ${selectedOption.price}
`;

  alert(detail); // Ganti jadi WhatsApp/emailjs/send ke server nanti
});
