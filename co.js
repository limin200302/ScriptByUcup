const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
let selectedItems = new Set();

const cartContainer = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");
const selectAllCheckbox = document.getElementById("select-all");

// Bonus Mapping
const bonusCash = {
  55000: "2 Keping Cue Mastermind",
  70000: "4 Keping Cue Muramasa",
  95000: "4 Keping Cue Mastermind",
  135000: "16 Keping Cue Hawar Beku dan 30 Golden Shot",
  190000: "VIP Points",
  250000: "16 Hawar Beku + 4 Muramasa + 30 Golden Shot",
  275000: "VIP Points"
};

const bonusBox = {
  60000: "2 Keping Cue Mastermind",
  75000: "4 Keping Cue Muramasa",
  100000: "4 Keping Cue Mastermind",
  145000: "16 Hawar Beku dan 30 Golden Shot",
  200000: "VIP Points",
  265000: "16 Hawar Beku + 4 Muramasa + 30 Golden Shot",
  295000: "VIP Points"
};

function parseHarga(label) {
  const match = label.match(/Rp\s?([\d.]+)/);
  return match ? parseInt(match[1].replace(/\./g, "")) : 0;
}

function getBonus(category, harga) {
  if (category === "cash") return bonusCash[harga] || null;
  if (category === "boxlegends") return bonusBox[harga] || null;
  return null;
}

function renderCart() {
  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p class='empty-msg'>Keranjang kosong.</p>";
    return;
  }

  cartItems.forEach((item, index) => {
    const harga = parseHarga(item.label);
    const checked = selectedItems.has(index) ? "checked" : "";

    const bonus = getBonus(item.category, harga);
    const bonusHTML = bonus
      ? `<div class="bonus">🎁 Bonus: ${bonus}</div>`
      : "";

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <input type="checkbox" class="item-check" data-index="${index}" ${checked}>
      <div class="item-info">
        <div class="item-name">${item.name}</div>
        <div class="item-label">${item.label}</div>
        ${checked && bonus ? bonusHTML : ""}
      </div>
      <button class="delete-btn" data-index="${index}">Hapus</button>
    `;
    cartContainer.appendChild(div);
  });

  updateTotal();
}

function updateTotal() {
  let total = 0;
  selectedItems.forEach(index => {
    const item = cartItems[index];
    const harga = parseHarga(item.label);
    total += harga;
  });

  totalPriceEl.textContent = "Rp " + total.toLocaleString("id-ID");
  checkoutBtn.textContent = `Checkout (${selectedItems.size})`;
}

// Checkbox item
cartContainer.addEventListener("change", function (e) {
  if (e.target.classList.contains("item-check")) {
    const index = parseInt(e.target.getAttribute("data-index"));
    if (e.target.checked) {
      selectedItems.add(index);
    } else {
      selectedItems.delete(index);
    }
    checkSelectAllStatus();
    renderCart();
  }
});

// Checkbox Semua
selectAllCheckbox.addEventListener("change", () => {
  selectedItems.clear();
  if (selectAllCheckbox.checked) {
    cartItems.forEach((_, i) => selectedItems.add(i));
  }
  renderCart();
});

// Cek status "semua"
function checkSelectAllStatus() {
  const allCheck = document.querySelectorAll(".item-check");
  const checkedCheck = document.querySelectorAll(".item-check:checked");
  selectAllCheckbox.checked = allCheck.length === checkedCheck.length;
}

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

// Init
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});
