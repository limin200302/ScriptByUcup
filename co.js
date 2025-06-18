// Ambil data dari localStorage
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
let selectedItems = new Set();

// Bonus berdasarkan harga dan kategori
const bonusMap = {
  cash: {
    55000: "Bonus: 2 Keping Cue Mastermind",
    70000: "Bonus: 4 Keping Cue Murasa",
    95000: "Bonus: 4 keping Cue Mastermind",
    135000: "Bonus: 16 Keping Cue Hawar Beku + 30 Golden Shot",
    190000: "Bonus: VIP Points",
    250000: "Bonus: 16 Keping Hawar Beku + 4 Keping Muramasa + 30 Golden Shot",
    275000: "Bonus: VIP Points"
  },
  boxlegends: {
    60000: "Bonus: 2 Keping Cue Mastermind",
    75000: "Bonus: 4 Keping Cue Murasa",
    100000: "Bonus: 4 keping Cue Mastermind",
    145000: "Bonus: 16 Keping Cue Hawar Beku + 30 Golden Shot",
    200000: "Bonus: VIP Points",
    265000: "Bonus: 16 Keping Hawar Beku + 4 Keping Muramasa + 30 Golden Shot",
    295000: "Bonus: VIP Points"
  }
};

const cartContainer = document.getElementById("cart-list");
const totalPriceEl = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");
const selectAllCheckbox = document.getElementById("select-all");
const emptyMsg = document.getElementById("empty-msg");

// Render isi keranjang
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

    const label = item.label || "";
    const priceText = label.split(" - ")[1] || "";
    const price = parseInt(priceText.replace("Rp", "").replace(/\D/g, ""));
    const bonus = bonusMap[item.category]?.[price] || "";

    div.innerHTML = `
      <input type="checkbox" class="item-check" data-index="${index}">
      <div class="item-info">
        <div class="item-name">${item.name}</div>
        <div class="item-label">${item.label}</div>
        ${bonus ? `<div class="item-bonus">${bonus}</div>` : ""}
      </div>
      <button class="delete-btn" data-index="${index}">Hapus</button>
    `;

    cartContainer.appendChild(div);
  });

  updateTotal();
  checkSelectAllStatus();
}

// Update total harga dan tombol checkout
function updateTotal() {
  let total = 0;
  let count = 0;

  selectedItems.forEach(i => {
    const item = cartItems[i];
    const priceText = item.label.split(" - ")[1];
    const price = parseInt(priceText.replace("Rp", "").replace(/\D/g, ""));
    total += price;
    count++;
  });

  totalPriceEl.textContent = "Rp" + total.toLocaleString("id-ID");
  checkoutBtn.textContent = `Checkout (${count})`;
}

// Event: Ceklis per item
cartContainer.addEventListener("change", function (e) {
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

// Event: Ceklis "Semua"
selectAllCheckbox.addEventListener("change", () => {
  selectedItems.clear();
  document.querySelectorAll(".item-check").forEach((cb, i) => {
    cb.checked = selectAllCheckbox.checked;
    if (selectAllCheckbox.checked) selectedItems.add(i);
  });
  updateTotal();
});

// Cek jika semua item sudah dicentang
function checkSelectAllStatus() {
  const total = document.querySelectorAll(".item-check").length;
  const checked = document.querySelectorAll(".item-check:checked").length;
  selectAllCheckbox.checked = total > 0 && total === checked;
}

// Event: Tombol hapus
cartContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = parseInt(e.target.getAttribute("data-index"));
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    selectedItems.delete(index);
    renderCart();
  }
});

// Inisialisasi
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});
