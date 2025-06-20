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
        ${item.name} - ${item.label}
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
// Data rekening berdasarkan metode pembayaran
const paymentData = {
  QRIS: {
    img: 'assets/payment/qris2.png',
    name: 'Warung Alwi mantap',
    isQR: true,
  },
  Dana: {
    account: '085713056206',
    name: 'ADE ANASIRU MUALIM',
  },
  Ovo: {
    account: '085713056206',
    name: 'ADE ANASIRU MUALIM',
  },
  GoPay: {
    account: '085713056206',
    name: 'ADE ANASIRU MUALIM',
  },
  ShopeePay: {
    account: '085713056206',
    name: 'Mamet Ucup Store',
  },
  BRI: {
    account: '356901013211502',
    name: 'ADE ANASIRU MUALIM',
  },
  BCA: {
    account: '4922069551',
    name: 'ADE ANASIRU MUALIM',
  },
  SeaBank: {
    account: '901433678333',
    name: 'ADE ANASIRU MUALIM',
  },
  'Bank Jago': {
    account: '103923428497',
    name: 'REVITA FEBRIANTI',
  },
  Blu: {
    account: '003406906539',
    name: 'DEWI ANGGRIANI',
  }
};

// Tampilkan popup jika sudah pilih metode pembayaran
document.getElementById("account-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const metode = document.querySelector('input[name="metode"]:checked');
  if (!metode) {
    alert("Pilih metode pembayaran terlebih dahulu.");
    return;
  }

  const metodeVal = metode.value;
  const popup = document.getElementById("payment-popup");
  const info = document.getElementById("payment-info");

  const total = document.getElementById("total-harga").innerText;

  const data = paymentData[metodeVal] || {};

  let html = `<p><strong>Jenis Pembayaran:</strong> ${metodeVal}</p>`;
  html += `<p><strong>Jumlah Bayar:</strong> ${total}</p>`;

  if (data.isQR) {
    html += `<img src="${data.img}" alt="QRIS" style="width:100%;max-height:200px;margin:10px 0;border-radius:10px;">`;
    html += `<p><strong>Nama:</strong> ${data.name}</p>`;
  } else {
    html += `<p><strong>Nomor Rekening:</strong> ${data.account || '-'}</p>`;
    html += `<p><strong>Atas Nama:</strong> ${data.name || '-'}</p>`;
  }

  info.innerHTML = html;
  popup.classList.remove("hidden");
});

// Tombol batal dan lanjut dari popup
document.getElementById("cancel-payment").addEventListener("click", () => {
  document.getElementById("payment-popup").classList.add("hidden");
});

document.getElementById("confirm-payment").addEventListener("click", () => {
  document.getElementById("payment-popup").classList.add("hidden");
  document.getElementById("account-form").submit(); // submit sebenarnya
});

// ========== Inisialisasi ==========
renderCart();
