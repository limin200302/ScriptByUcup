// Ambil dari localStorage
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let selectedItems = new Set();

const cartContainer = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");
const selectAllCheckbox = document.getElementById("select-all");

function renderCart() {
  cartContainer.innerHTML = "";

  cartItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <input type="checkbox" class="item-check" data-index="${index}">
      <div class="item-info">
        <div class="item-name">${item.name}</div>
        <div class="item-label">${item.label}</div>
      </div>
      <button class="delete-btn" data-index="${index}">Hapus</button>
    `;

    cartContainer.appendChild(div);
  });

  updateTotal();
}

// Update total dan tombol checkout
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

// Checkbox tiap item
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

// Checkbox "Semua"
selectAllCheckbox.addEventListener("change", () => {
  selectedItems.clear();
  document.querySelectorAll(".item-check").forEach((cb, i) => {
    cb.checked = selectAllCheckbox.checked;
    if (selectAllCheckbox.checked) selectedItems.add(i);
  });
  updateTotal();
});

// Cek jika semua dicentang
function checkSelectAllStatus() {
  const totalCheckbox = document.querySelectorAll(".item-check").length;
  const checkedCount = document.querySelectorAll(".item-check:checked").length;
  selectAllCheckbox.checked = totalCheckbox === checkedCount;
}

// Hapus item
cartContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = parseInt(e.target.getAttribute("data-index"));
    cartItems.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    selectedItems.delete(index);
    renderCart();
  }
});

// Inisialisasi saat halaman dibuka
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});
