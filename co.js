// === Inisialisasi EmailJS ===
emailjs.init("nAUL1b5lv7jJmOcaY");

// === Ambil data dari localStorage ===
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
let selectedItems = new Set();

// DOM elements
const cartContainer = document.getElementById("cart-list");
const totalHargaEl = document.getElementById("total-harga");
const selectAllCheckbox = document.getElementById("select-all");
const emptyMsg = document.getElementById("empty-msg");

// Ambil harga dari label "Rp 55.000 - xxx"
function getPriceFromLabel(label) {
  const match = label.match(/Rp\s?([\d.]+)/i);
  if (!match) return 0;
  return parseInt(match[1].replace(/\./g, ""));
}

// Tampilkan keranjang
function renderCart() {
  cartContainer.innerHTML = "";
  if (cartItems.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }
  emptyMsg.style.display = "none";

  cartItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <input type="checkbox" class="item-check" data-index="${index}" checked>
      <div class="info">
        <div><strong>${item.name}</strong></div>
        <div>${item.label}</div>
        <div><em>${item.category}</em></div>
      </div>
      <button class="delete-btn" data-index="${index}">Hapus</button>
    `;
    cartContainer.appendChild(div);
    selectedItems.add(index);
  });
  updateTotal();
}

// Update total harga
function updateTotal() {
  let total = 0;
  selectedItems.forEach(i => {
    const item = cartItems[i];
    const price = getPriceFromLabel(item.label);
    total += price;
  });
  totalHargaEl.textContent = "Rp " + total.toLocaleString("id-ID");
}

// Checkbox masing-masing item
cartContainer.addEventListener("change", function (e) {
  if (e.target.classList.contains("item-check")) {
    const index = parseInt(e.target.getAttribute("data-index"));
    if (e.target.checked) {
      selectedItems.add(index);
    } else {
      selectedItems.delete(index);
    }
    updateTotal();
  }
});

// Pilih semua
selectAllCheckbox.addEventListener("change", () => {
  selectedItems.clear();
  document.querySelectorAll(".item-check").forEach((cb, i) => {
    cb.checked = selectAllCheckbox.checked;
    if (selectAllCheckbox.checked) selectedItems.add(i);
  });
  updateTotal();
});

// Hapus item
cartContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = parseInt(e.target.getAttribute("data-index"));
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    selectedItems.delete(index);
    renderCart();
  }
});

// Form submit
document.getElementById("checkout-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Ambil item yang dipilih
  const items = [];
  document.querySelectorAll(".item-check:checked").forEach((cb) => {
    const idx = parseInt(cb.getAttribute("data-index"));
    if (cartItems[idx]) items.push(cartItems[idx]);
  });

  if (items.length === 0) {
    alert("Pilih dulu item yang ingin dipesan.");
    return;
  }

  // Simpan ke input hidden
  const orderText = items.map(i => `- ${i.name} (${i.category}) - ${i.label}`).join("\n");
  document.getElementById("order_items").value = orderText;

  // Kirim ke email
  emailjs.sendForm('service_ucup', 'template_1shj4dt', this)
    .then(() => {
      alert("✅ Order berhasil dikirim ke email!");
      localStorage.removeItem("cart");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("❌ Gagal kirim: " + error.text);
    });
});

// Jalankan awal
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});
