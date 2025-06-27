
// Ambil data dari localStorage
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
let selectedItems = new Set();

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
    const imgSrc = categoryThumbnails[item.category?.toLowerCase()] || "assets/img/default-thumb.png";

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <input type="checkbox" class="item-check" data-index="${index}">
      <img src="${imgSrc}" class="item-thumb" alt="${item.category}">
      <div class="item-info">
        <div class="item-name">${item.name}</div>
        <div class="item-label">${item.label}</div>
        ${bonus ? `<div class="item-bonus">${bonus}</div>` : ""}
      </div>
      <button class="delete-btn" data-index="${index}">Hapus</button>`;
    cartContainer.appendChild(div);
  });

  updateTotal();
  checkSelectAllStatus();
}

function updateTotal() {
  let total = 0;
  let count = 0;
  selectedItems.forEach(index => {
    const item = cartItems[index];
    const price = getPriceFromLabel(item.label);
    total += price;
    count++;
  });
  totalPriceEl.textContent = "Rp " + total.toLocaleString("id-ID");
  checkoutBtn.textContent = `Checkout (${count})`;
}

function fixCartIndex() {
  selectedItems.clear();
}

cartContainer.addEventListener("change", (e) => {
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
    fixCartIndex();
    renderCart();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

window.addEventListener("beforeunload", () => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
});

// === POPUP KONFIRMASI CHECKOUT ===
document.getElementById("checkout-btn").addEventListener("click", () => {
  document.getElementById("confirm-popup").classList.remove("hidden");
});

document.getElementById("wa-cancel").addEventListener("click", () => {
  document.getElementById("confirm-popup").classList.add("hidden");
});

document.getElementById("wa-confirm").addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const selected = document.querySelectorAll(".cart-item input[type='checkbox']:checked");
  let items = [];
  selected.forEach((checkbox) => {
    const itemIndex = checkbox.dataset.index;
    const item = cart[itemIndex];
    if (item) items.push(item);
  });
  if (items.length === 0) return;
// Kirim data item ke input hidden sebelum form dikirim
document.getElementById("order_items").value =
  items.map(i => `- ${i.name} (${i.category}) - ${i.label}`).join("\n");
  // Simpan order ke input hidden
  const orderText = items.map(i => `- ${i.name} (${i.category}) - ${i.label}`).join("\n");
  document.getElementById("order_items").value = orderText;

  document.getElementById("confirm-popup").classList.add("hidden");
  showPopup();
});


// === POPUP FORM ===
function showPopup() {
  document.getElementById("popup-form").style.display = "flex";
}
function closePopup() {
  document.getElementById("popup-form").style.display = "none";
}

// === EMAILJS ===
emailjs.init("nAUL1b5lv7jJmOcaY");

const form = document.getElementById("account-form");
form.addEventListener("submit", handleFormSubmit);
function handleFormSubmit(e) {
  e.preventDefault();

  // Hindari submit ganda
  form.removeEventListener("submit", handleFormSubmit);

  emailjs.sendForm('service_ucup', 'template_1shj4dt', form)
    .then(function () {
      alert("✅ Order berhasil dikirim ke email!");
      closePopup();
    }, function (error) {
      alert("❌ Gagal kirim order: " + error.text);
    });
}
