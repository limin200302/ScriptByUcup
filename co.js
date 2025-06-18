// Ambil dari localStorage
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
let selectedItems = new Set();

const cartList = document.getElementById("cart-list");
const totalPriceEl = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");
const selectAllCheckbox = document.getElementById("select-all");
const emptyMsg = document.getElementById("empty-msg");

// BONUS MAP
const bonusMap = {
  55000: "2 Keping Cue Mastermind",
  60000: "2 Keping Cue Mastermind",
  70000: "4 Keping Cue Murasa",
  75000: "4 Keping Cue Murasa",
  95000: "4 Keping Cue Mastermind",
  100000: "4 Keping Cue Mastermind",
  135000: "16 Keping Cue Hawar Beku dan 30 Golden Shot",
  145000: "16 Keping Cue Hawar Beku dan 30 Golden Shot",
  190000: "VIP Points",
  200000: "VIP Points",
  250000: "16 Keping Hawar Beku + 4 Keping Muramasa + 30 Golden Shot",
  265000: "16 Keping Hawar Beku + 4 Keping Muramasa + 30 Golden Shot",
  275000: "VIP Points",
  295000: "VIP Points"
};

// Tampilkan isi keranjang
function renderCart() {
  cartList.innerHTML = "";
  if (cartItems.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";

  cartItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";

    const bonus = getBonus(item);

    div.innerHTML = `
      <input type="checkbox" class="item-check" data-index="${index}">
      <div class="item-info">
        <strong>${item.name}</strong><br>
        ${item.label}<br>
        <em>Kategori: ${item.category}</em><br>
        ${bonus ? `<span class="bonus">🎁 Bonus: ${bonus}</span>` : ""}
      </div>
      <button class="remove-btn" data-index="${index}">Hapus</button>
    `;

    cartList.appendChild(div);
  });

  updateTotal();
}

// Cek bonus berdasarkan item
function getBonus(item) {
  const nominal = parseInt(item.label.replace("Rp", "").split("-")[0].replace(/\D/g, ""));
  if (item.category === "cash" || item.category === "boxlegends") {
    return bonusMap[nominal] || "";
  }
  return "";
}

// Update total harga
function updateTotal() {
  let total = 0;
  let count = 0;

  selectedItems.forEach(i => {
    const item = cartItems[i];
    const nominal = parseInt(item.label.replace("Rp", "").split("-")[0].replace(/\D/g, ""));
    total += nominal;
    count++;
  });

  totalPriceEl.textContent = "Rp" + total.toLocaleString("id-ID");
  checkoutBtn.textContent = `Checkout (${count})`;
}

// Event listener item checkbox
cartList.addEventListener("change", (e) => {
  if (e.target.classList.contains("item-check")) {
    const index = parseInt(e.target.getAttribute("data-index"));
    if (e.target.checked) {
      selectedItems.add(index);
    } else {
      selectedItems.delete(index);
    }
    updateTotal();
    checkSelectAllStatus();
  }
});

// Pilih semua checkbox
selectAllCheckbox.addEventListener("change", () => {
  selectedItems.clear();
  document.querySelectorAll(".item-check").forEach((cb, i) => {
    cb.checked = selectAllCheckbox.checked;
    if (selectAllCheckbox.checked) selectedItems.add(i);
  });
  updateTotal();
});

// Cek apakah semua dicentang
function checkSelectAllStatus() {
  const all = document.querySelectorAll(".item-check").length;
  const checked = document.querySelectorAll(".item-check:checked").length;
  selectAllCheckbox.checked = all === checked;
}

// Hapus item
cartList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const index = parseInt(e.target.getAttribute("data-index"));
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    selectedItems.delete(index);
    renderCart();
    updateCartBadge(); // sinkron badge
  }
});

// Sinkron badge di icon
function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  if (badge) {
    badge.textContent = cartItems.length;
    badge.style.display = cartItems.length > 0 ? "inline-block" : "none";
  }
}

// Saat halaman siap
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartBadge();
});
