let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
let selectedItems = new Set();

const cartList = document.getElementById("cart-list");
const emptyMsg = document.getElementById("empty-msg");
const totalPriceEl = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");
const selectAllCheckbox = document.getElementById("select-all");

function renderCart() {
  cartList.innerHTML = "";

  if (cartItems.length === 0) {
    emptyMsg.style.display = "block";
    selectAllCheckbox.disabled = true;
    checkoutBtn.disabled = true;
    totalPriceEl.textContent = "Rp0";
    checkoutBtn.textContent = "Checkout (0)";
    return;
  }

  emptyMsg.style.display = "none";
  selectAllCheckbox.disabled = false;
  checkoutBtn.disabled = false;

  cartItems.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <input type="checkbox" class="item-check" data-index="${index}">
      <div class="item-info">
        <p><strong>${item.name}</strong></p>
        <p>${item.label}</p>
        <p style="font-size: 12px; color: #888;">Kategori: ${item.category}</p>
      </div>
      <button class="remove-btn" data-index="${index}">Hapus</button>
    `;
    cartList.appendChild(itemDiv);
  });

  attachEventListeners();
  updateTotal();
}

function attachEventListeners() {
  document.querySelectorAll(".item-check").forEach(cb => {
    cb.addEventListener("change", () => {
      const index = parseInt(cb.getAttribute("data-index"));
      if (cb.checked) {
        selectedItems.add(index);
      } else {
        selectedItems.delete(index);
      }
      updateTotal();
      checkSelectAllStatus();
    });
  });

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.getAttribute("data-index"));
      cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      selectedItems.clear();
      renderCart();
    });
  });
}

function updateTotal() {
  let total = 0;
  let count = 0;

  selectedItems.forEach(index => {
    const item = cartItems[index];
    if (!item) return;
    const priceText = item.label.split(" - ")[1] || "0";
    const number = parseInt(priceText.replace(/[^0-9]/g, ""));
    total += number;
    count++;
  });

  totalPriceEl.textContent = "Rp" + total.toLocaleString("id-ID");
  checkoutBtn.textContent = `Checkout (${count})`;
}

function checkSelectAllStatus() {
  const totalCheckbox = document.querySelectorAll(".item-check").length;
  const checkedCount = document.querySelectorAll(".item-check:checked").length;
  selectAllCheckbox.checked = totalCheckbox === checkedCount;
}

selectAllCheckbox.addEventListener("change", () => {
  selectedItems.clear();
  document.querySelectorAll(".item-check").forEach((cb, i) => {
    cb.checked = selectAllCheckbox.checked;
    if (selectAllCheckbox.checked) selectedItems.add(i);
  });
  updateTotal();
});

document.addEventListener("DOMContentLoaded", renderCart);
