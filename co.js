// Ambil data dari localStorage
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
let selectedItems = new Set();

// Bonus berdasarkan kategori dan harga
const bonusData = {
  cash: {
    55000: "Bonus🎁: 2 Keping Cue Mastermind",
    70000: "Bonus🎁: 4 Keping Cue Murasa",
    95000: "Bonus🎁: 4 Keping Cue Mastermind",
    135000: "Bonus🎁: 16 Cue Hawar Beku + 30 Golden Shot",
    190000: "Bonus🎁: VIP Points",
    250000: "Bonus🎁: 16 Hawar Beku + 4 Muramasa + 30 Golden Shot",
    275000: "Bonus🎁: VIP Points"
  },
  boxlegends: {
    60000: "Bonus🎁: 2 Keping Cue Mastermind",
    75000: "Bonus🎁: 4 Keping Cue Murasa",
    100000: "Bonus🎁: 4 Keping Cue Mastermind",
    145000: "Bonus🎁: 16 Cue Hawar Beku + 30 Golden Shot",
    200000: "Bonus🎁: VIP Points",
    265000: "Bonus🎁: 16 Hawar Beku + 4 Muramasa + 30 Golden Shot",
    295000: "Bonus🎁: VIP Points"
  }
};
const categoryThumbnails = {
  cash: "assets/img/cash.png",
  boxlegends: "assets/img/boxlegends.png",
  venice: "assets/img/venice.png",
  poolpass: "assets/img/poolpass.png",
  goldenshot: "assets/img/goldenshot.png",
  boxcollector: "assets/img/boxcollector.png"
};
const cartContainer = document.getElementById("cart-list");
const totalPriceEl = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");
const selectAllCheckbox = document.getElementById("select-all");
const emptyMsg = document.getElementById("empty-msg");

function getPriceFromLabel(label) {
  const match = label.match(/Rp\s?([\d.]+)/i);
  if (!match) return 0;
  return parseInt(match[1].replace(/\./g, ""));
}

function getBonus(category, price) {
  return bonusData[category]?.[price] || "";
}

function renderCart() {
  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";

  cartItems.forEach((item, index) => {
    const price = getPriceFromLabel(item.label);
    const bonus = getBonus(item.category, price);

    const div = document.createElement("div");
div.className = "cart-item";

// Tambahkan bagian ini:
const imgSrc = categoryThumbnails[item.category.toLowerCase()] || "assets/img/default-thumb.png";

div.innerHTML = `
  <input type="checkbox" class="item-check" data-index="${index}">
  <img src="${imgSrc}" class="item-thumb" alt="${item.category}">
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

function updateTotal() {
  let total = 0;
  let count = 0;

  selectedItems.forEach(i => {
    const item = cartItems[i];
    const price = getPriceFromLabel(item.label);
    total += price;
    count++;
  });

  totalPriceEl.textContent = "Rp " + total.toLocaleString("id-ID");
  checkoutBtn.textContent = `Checkout (${count})`;
}

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
  selectAllCheckbox.checked = totalCheckbox === checkedCount && totalCheckbox > 0;
}

cartContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = parseInt(e.target.getAttribute("data-index"));
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    selectedItems.delete(index);
    renderCart();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});
window.addEventListener("beforeunload", () => {
  // Pastikan badge ikut update saat kembali ke halaman utama
  localStorage.setItem("cart", JSON.stringify(cartItems));
});
