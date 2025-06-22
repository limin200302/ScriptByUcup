// Inisialisasi Supabase
const supabase = createClient(
  'https://etfbdevjytilaykogzwa.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0ZmJkZXZqeXRpbGF5a29nendhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0NjE0MjAsImV4cCI6MjA2NjAzNzQyMH0.rGwSOp2_l9eWK2B7Fk7BFo0_JK4BOY5GAYJOa3C58tM'
);

// ========== Bonus Data ==========
const bonusData = {
  cash: {
    55000: "Bonus🎁: 2 Keping Cue Mastermind",
    70000: "Bonus🎁: 4 Keping Cue Muramasa",
    95000: "Bonus🎁: 4 Keping Cue Mastermind",
    135000: "Bonus🎁: 16 Cue Hawar Beku + 30 Golden Shot",
    190000: "Bonus🎁: VIP Points",
    250000: "Bonus🎁: 16 Hawar Beku + 4 Muramasa + 30 Golden Shot",
    275000: "Bonus🎁: VIP Points"
  },
  boxlegends: {
    60000: "Bonus🎁: 2 Keping Cue Mastermind",
    75000: "Bonus🎁: 4 Keping Cue Muramasa",
    100000: "Bonus🎁: 4 Keping Cue Mastermind",
    145000: "Bonus🎁: 16 Cue Hawar Beku + 30 Golden Shot",
    200000: "Bonus🎁: VIP Points",
    265000: "Bonus🎁: 16 Hawar Beku + 4 Muramasa + 30 Golden Shot",
    295000: "Bonus🎁: VIP Points"
  }
};

// ========== Render Keranjang ==========
let cart = JSON.parse(localStorage.getItem("cart") || "[]");
const cartList = document.getElementById("cart-list");
const emptyMsg = document.getElementById("empty-msg");
const selectAll = document.getElementById("select-all");
const orderInput = document.getElementById("order_items");
const totalHarga = document.getElementById("total-harga");

function renderCart() {
  cart = JSON.parse(localStorage.getItem("cart") || "[]"); // Selalu ambil ulang
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
    const cleanName = item.name.replace(/\((.*?)\)/g, '').trim(); // Ambil nominal harga
    const match = item.label.match(/Rp\s?([\d.,]+)/);
    const price = match ? parseInt(match[1].replace(/[.,]/g, "")) : 0;

    let bonusText = "";
    if (bonusData[item.category] && bonusData[item.category][price]) {
      bonusText = `<div class="item-bonus">${bonusData[item.category][price]}</div>`;
    }
    div.innerHTML = `
      <label>
        <input type="checkbox" class="item-checkbox" data-index="${index}" checked />
        ${cleanName} - ${item.label}
        ${bonusText}
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
  let total = 0;
  selectedItems.forEach(item => {
    const match = item.label.match(/Rp\s?([\d.,]+)/);
    if (match) {
      const angka = parseInt(match[1].replace(/[.,]/g, ""));
      total += angka;
    }
  });
  const metode = document.getElementById("metode-terpilih").value.toLowerCase();
  if (["qris", "shopeepay", "ovo", "gopay"].includes(metode)) {
    total += 1500;
  }
  totalHarga.textContent = "Rp " + total.toLocaleString("id-ID");
  const orderText = selectedItems
    .map(i => `- ${i.name.replace(/\((.*?)\)/g, '').trim()} - ${i.label}`)
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

// ========== Payment Select ==========
function selectPayment(el, metode) {
  const semua = document.querySelectorAll('.payment-inner-card');
  const inputMetode = document.getElementById('metode-terpilih');
  if (el.classList.contains('selected')) {
    el.classList.remove('selected');
    inputMetode.value = '';
  } else {
    semua.forEach(e => e.classList.remove('selected'));
    el.classList.add('selected');
    inputMetode.value = metode;
  }
  updateSummary();
}

// ========== Data Rekening ==========
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
  "Bank Jago": {
    account: '103923428497',
    name: 'REVITA FEBRIANTI',
  },
  Blu: {
    account: '003406906539',
    name: 'DEWI ANGGRIANI',
  },
};

// ========== Popup Pembayaran ==========
document.getElementById("account-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  if (orderInput.value.trim() === "") {
    alert("❌ Pilih minimal 1 item dari keranjang!");
    return;
  }

  const metode = document.getElementById("metode-terpilih").value;
  if (!metode) {
    alert("❌ Pilih metode pembayaran terlebih dahulu.");
    return;
  }

  const popup = document.getElementById("payment-popup");
  const info = document.getElementById("payment-info");
  const total = document.getElementById("total-harga").innerText;
  const data = paymentData[metode] || {};
  let html = `<p><strong>Jenis Pembayaran:</strong> ${metode}</p>`;
  html += `<p><strong>Jumlah Bayar:</strong> ${total}</p>`;
  if (data.isQR) {
    html += `<img src="${data.img}" alt="QRIS" style="display:block; max-width:220px; width:100%; height:auto; margin:15px auto; border-radius:12px; box-shadow:0 0 10px rgba(0,0,0,0.4);">`;
    html += `<p><strong>Nama:</strong> ${data.name}</p>`;
  } else {
    html += `<p><strong>Nomor Rekening:</strong> ${data.account || '-'}</p>`;
    html += `<p><strong>Atas Nama:</strong> ${data.name || '-'}</p>`;
  }
  html += `<div style="margin-top:15px;font-size:13px;color:#ccc">
    <strong>Note:</strong><br>
    • Transfer sesuai nominal, jika salah segera hubungi admin via WhatsApp.<br>
    • Jika sudah transfer, klik "Lanjutkan", sistem akan proses order 10-15 menit.
  </div>`;
  info.innerHTML = html;
  popup.classList.remove("hidden");
});

document.getElementById("cancel-payment").addEventListener("click", () => {
  document.getElementById("payment-popup").classList.add("hidden");
});

document.getElementById("confirm-payment").addEventListener("click", async () => {
  document.getElementById("payment-popup").classList.add("hidden");
  const metode = document.getElementById("metode-terpilih").value;
  const total = document.getElementById("total-harga").innerText;
  const orderText = document.getElementById("order_items").value;
  const nickname = document.querySelector("input[name='nickname']").value;
  localStorage.setItem("nickname", nickname); // Simpan nickname ke localStorage

  const transaksiBaru = {
    waktu: new Date().toISOString(),
    item: orderText,
    total: total,
    metode: metode,
    status: "Sedang diproses",
  };

  // Menyimpan transaksi ke localStorage
  let histori = JSON.parse(localStorage.getItem("riwayat_transaksi")) || [];
  histori.push(transaksiBaru);
  localStorage.setItem("riwayat_transaksi", JSON.stringify(histori));

  // Menyimpan transaksi ke Supabase
  await saveTransactionToSupabase(transaksiBaru); // Fungsi untuk menyimpan ke Supabase

  // Kirim email konfirmasi
  let metodeInput = document.querySelector("input[name='metode_emailjs']");
  if (!metodeInput) {
    metodeInput = document.createElement("input");
    metodeInput.type = "hidden";
    metodeInput.name = "metode_emailjs";
    document.getElementById("account-form").appendChild(metodeInput);
  }
  metodeInput.value = metode;

  emailjs.sendForm("service_ucup", "template_1shj4dt", document.getElementById("account-form"))
    .then(() => {
      alert("Order Berhasil ✅, Admin akan memproses orderanmu ketua🔥");
      localStorage.removeItem("cart");
      window.location.href = "index.html";
    })
    .catch(err => {
      alert("❌ Gagal mengirim order: " + err.text);
    });
});

// ========== Save Transaction to Supabase ==========
async function saveTransactionToSupabase(transaksiBaru) {
  const { data, error } = await supabase
    .from('transaksi1') // Nama tabel Supabase
    .insert([transaksiBaru]);

  if (error) {
    console.error("Error saving transaction to Supabase:", error);
  } else {
    console.log("Transaction saved to Supabase:", data);
  }
}

// ========== Init ==========
emailjs.init("nAUL1b5lv7jJmOcaY");
renderCart();
