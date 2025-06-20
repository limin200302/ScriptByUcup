// ========== Render Keranjang ==========
const cart = JSON.parse(localStorage.getItem("cart") || "[]");
const cartList = document.getElementById("cart-list");
const emptyMsg = document.getElementById("empty-msg");
const selectAll = document.getElementById("select-all");
const orderInput = document.getElementById("order_items");
const totalHarga = document.getElementById("total-harga");

function renderCart() {
  cartList.innerHTML = "";

  if (cart.length === 0) {
    emptyMsg.style.display = "block";
    totalHarga.textContent = "Rp 0";
    return;
  }

  emptyMsg.style.display = "none";

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <label><input type="checkbox" class="item-checkbox" data-index="${index}" checked />
        ${item.name} (${item.category}) - ${item.label}
      </label>
      <button class="delete-btn" data-index="${index}">❌</button>
    `;
    cartList.appendChild(div);
  });

  updateSummary();
}

// ========== Update Total & Order Items ==========
function updateSummary() {
  const checkboxes = document.querySelectorAll(".item-checkbox:checked");
  const selectedItems = [...checkboxes].map(cb => cart[cb.dataset.index]);

  // Total harga dari label
  let total = 0;
  selectedItems.forEach(item => {
    const match = item.label.match(/Rp\s?([\d.,]+)/);
    if (match) {
      const angka = parseInt(match[1].replace(/[.,]/g, ""));
      total += angka;
    }
  });

  // Tambah biaya admin
  const metode = document.querySelector("input[name='metode']:checked");
  if (metode) {
    const val = metode.value.toLowerCase();
    if (val === "qris" || val === "shopeepay" || val === "ovo" || val === "gopay") {
      total += 1500;
    }
  }

  totalHarga.textContent = "Rp " + total.toLocaleString("id-ID");

  // Simpan ke input hidden
  const orderText = selectedItems
    .map(i => `- ${i.name} (${i.category}) - ${i.label}`)
    .join("\n");
  orderInput.value = orderText;
}

// ========== Event Listeners ==========
cartList.addEventListener("change", (e) => {
  if (e.target.classList.contains("item-checkbox")) {
    updateSummary();
  }
});

cartList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.dataset.index;
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
});

selectAll.addEventListener("change", () => {
  document.querySelectorAll(".item-checkbox").forEach(cb => {
    cb.checked = selectAll.checked;
  });
  updateSummary();
});

document.querySelectorAll("input[name='metode']").forEach(radio => {
  radio.addEventListener("change", updateSummary);
});

// ========== EmailJS ==========
emailjs.init("nAUL1b5lv7jJmOcaY");
document.getElementById("account-form").addEventListener("submit", function (e) {
  e.preventDefault();

  if (orderInput.value.trim() === "") {
    alert("❌ Pilih minimal 1 item dari keranjang!");
    return;
  }

  emailjs.sendForm("service_ucup", "template_1shj4dt", this)
    .then(() => {
      alert("✅ Order berhasil dikirim ke email!");
      localStorage.removeItem("cart");
      window.location.href = "index.html";
    })
    .catch(err => {
      alert("❌ Gagal mengirim order: " + err.text);
    });
});

// ========== Inisialisasi ==========
renderCart();
