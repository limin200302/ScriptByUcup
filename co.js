let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
let selectedItems = new Set();

const cartList = document.getElementById("cart-list");
const totalPriceEl = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");
const selectAllCheckbox = document.getElementById("select-all");
const emptyMsg = document.getElementById("empty-msg");

function renderCart() {
  cartList.innerHTML = "";

  if (cartItems.length === 0) {
    emptyMsg.style.display = "block";
    return;
  } else {
    emptyMsg.style.display = "none";
  }

  cartItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <input type="checkbox" class="item-check" data-index="${index}">
      <div class="item-info">
        <p><strong>${item.name}</strong></p>
        <p>${item.label}</p>
        <p><em>Kategori: ${item.category}</em></p>
      </div>
      <button class="remove-btn" data-index="${index}">Hapus</button>
    `;

    cartList.appendChild(div);
  });

  addEventListeners();
  updateTotal();
}

function addEventListeners() {
  // Checkbox item
  document.querySelectorAll(".item-check").forEach(cb => {
    cb.addEventListener("change", function () {
      const index = parseInt(this.getAttribute("data-index"));
      if (this.checked) {
        selectedItems.add(index);
      } else {
        selectedItems.delete(index);
      }
      updateTotal();
      checkSelectAllStatus();
    });
  });

  // Tombol hapus
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.target.getAttribute("data-index"));
      cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      selectedItems.delete(index);
      renderCart();
    });
  });
}

function updateTotal() {
  let total = 0;
  let count = 0;

  selectedItems.forEach(index => {
    const item = cartItems[index];
    const priceMatch = item.label.match(/Rp\s?([\d.]+)/);
    if (priceMatch) {
      const price = parseInt(priceMatch[1].replace(/\./g, ""));
      total += price;
    }
    count++;
  });

  totalPriceEl.textContent = "Rp" + total.toLocaleString("id-ID");
  checkoutBtn.textContent = `Checkout (${count})`;
}

selectAllCheckbox.addEventListener("change", () => {
  selectedItems.clear();
  document.querySelectorAll(".item-check").forEach((cb, i) => {
    cb.checked = selectAllCheckbox.checked;
    if (selectAllCheckbox.checked) selectedItems.add(i);
  });
  updateTotal();
});

function checkSelectAllStatus() {
  const totalCheckbox = document.querySelectorAll(".item-check").length;
  const checkedCount = document.querySelectorAll(".item-check:checked").length;
  selectAllCheckbox.checked = totalCheckbox === checkedCount;
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});
