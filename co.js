emailjs.init("nAUL1b5lv7jJmOcaY");

// Ambil data cart
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const cartList = document.getElementById("cart-list");
const selectAll = document.getElementById("select-all");
const totalHarga = document.getElementById("total-harga");
const emptyMsg = document.getElementById("empty-msg");
let selected = new Set();

function getPrice(label) {
  const match = label.match(/Rp\s?([\d.]+)/);
  return match ? parseInt(match[1].replace(/\./g, "")) : 0;
}

function updateTotal() {
  let total = 0;
  selected.forEach(i => total += getPrice(cartItems[i].label));
  totalHarga.textContent = "Rp " + total.toLocaleString("id-ID");
  document.getElementById("order_items").value = [...selected].map(i => {
    const it = cartItems[i];
    return `- ${it.name} (${it.category}) - ${it.label}`;
  }).join("\n");
}

function renderCart() {
  cartList.innerHTML = "";
  if (cartItems.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }
  emptyMsg.style.display = "none";

  cartItems.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <label><input type="checkbox" data-index="${i}" class="item-check"> ${item.name} - ${item.label}</label>
      <button onclick="removeItem(${i})">Hapus</button>
    `;
    cartList.appendChild(div);
  });
}

function removeItem(i) {
  cartItems.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
  selected.clear();
  updateTotal();
}

cartList.addEventListener("change", e => {
  if (e.target.classList.contains("item-check")) {
    const i = parseInt(e.target.dataset.index);
    if (e.target.checked) selected.add(i);
    else selected.delete(i);
    updateTotal();
  }
});

selectAll.addEventListener("change", () => {
  selected.clear();
  document.querySelectorAll(".item-check").forEach((cb, i) => {
    cb.checked = selectAll.checked;
    if (selectAll.checked) selected.add(i);
  });
  updateTotal();
});

document.getElementById("account-form").addEventListener("submit", function(e) {
  e.preventDefault();
  if (selected.size === 0) return alert("Pilih minimal 1 item dari keranjang!");
  emailjs.sendForm("service_ucup", "template_1shj4dt", this)
    .then(() => {
      alert("✅ Order berhasil dikirim ke email!");
      localStorage.removeItem("cart");
      window.location.reload();
    })
    .catch(err => alert("❌ Gagal kirim: " + err.text));
});

renderCart();
