let selectedItem = null;

window.toggleCollapse = function (element) {
  const next = element.nextElementSibling;
  if (!next || !next.classList.contains("form-sub")) return;
  next.classList.toggle("open");
};

document.addEventListener("DOMContentLoaded", () => {
  const produkData = {
    diamond: {
      note: "",
      items: [
        { label: "110 Diamond", harga: "Rp 27.000" },
        { label: "165 Diamond", harga: "Rp 40.000" },
        { label: "275 Diamond", harga: "Rp 65.000" },
        { label: "565 Diamond", harga: "Rp 125.000" },
        { label: "1.155 Diamond", harga: "Rp 240.000" },
        { label: "1.765 Diamond", harga: "Rp 360.000" },
        { label: "2.975 Diamond", harga: "Rp 590.000" },
        { label: "6.000 Diamond", harga: "Rp 1.165.000" },
        { label: "12.000 Diamond", harga: "Rp 2.320.000" },
        { label: "24.000 Diamond", harga: "Rp 4.630.000" },
      ],
    },
    wdp: {
      note: "Note: Minimal pembelian 2 WDP",
      items: [
        { label: "2 Weekly Diamond Pass", harga: "Rp 50.000" },
        { label: "3 Weekly Diamond Pass", harga: "Rp 74.000" },
        { label: "4 Weekly Diamond Pass", harga: "Rp 98.500" },
        { label: "5 Weekly Diamond Pass", harga: "Rp 124.000" },
        { label: "6 Weekly Diamond Pass", harga: "Rp 149.000" },
        { label: "7 Weekly Diamond Pass", harga: "Rp 173.500" },
        { label: "8 Weekly Diamond Pass", harga: "Rp 198.500" },
        { label: "9 Weekly Diamond Pass", harga: "Rp 223.500" },
        { label: "10 Weekly Diamond Pass", harga: "Rp 240.000" },
      ],
    },
    combo: {
      note: "",
      items: [
        { label: "220 Diamond", harga: "Rp 58.000" },
        { label: "440 Diamond", harga: "Rp 100.000" },
        { label: "1.720 Diamond", harga: "Rp 355.000" },
        { label: "Elite Monthly Bundle", harga: "Rp 14.000" },
        { label: "Epic Monthly Bundle", harga: "Rp 65.000" },
        { label: "Twilight Pass", harga: "Rp 125.000" },
      ],
    },
  };

  const paymentData = {
    QRIS: { img: 'assets/payment/qris2.png', name: 'Warung Alwi mantap', isQR: true },
    Dana: { account: '085713056206', name: 'ADE ANASIRU MUALIM', img: 'assets/payment/dana.png' },
    Ovo: { account: '085713056206', name: 'ADE ANASIRU MUALIM', img: 'assets/payment/ovo.png' },
    GoPay: { account: '085713056206', name: 'ADE ANASIRU MUALIM', img: 'assets/payment/gopay.png' },
    ShopeePay: { account: '085713056206', name: 'Mamet Ucup Store', img: 'assets/payment/shopeepay.png' },
    BRI: { account: '356901013211502', name: 'ADE ANASIRU MUALIM', img: 'assets/payment/bri.png' },
    BCA: { account: '4922069551', name: 'ADE ANASIRU MUALIM', img: 'assets/payment/bca.png' },
    SeaBank: { account: '901433678333', name: 'ADE ANASIRU MUALIM', img: 'assets/payment/seabank.png' },
    "Bank Jago": { account: '103923428497', name: 'REVITA FEBRIANTI', img: 'assets/payment/jago.png' },
    Blu: { account: '003406906539', name: 'DEWI ANGGRIANI', img: 'assets/payment/blu.png' },
  };

  let selectedTab = "";
  const produkContainer = document.getElementById("produk-container");
  const produkNote = document.getElementById("produk-note");

  window.toggleTab = (kategori) => {
    if (selectedTab === kategori) {
      selectedTab = "";
      produkContainer.innerHTML = "";
      produkNote.style.display = "none";
      selectedItem = null;
      updateTotalHargaDisplay();
    } else {
      selectedTab = kategori;
      renderProduk(produkData[kategori]);
    }
  };

  function renderProduk(data) {
    produkContainer.innerHTML = "";
    produkNote.textContent = data.note;
    produkNote.style.display = data.note ? "block" : "none";
    data.items.forEach((item) => {
      const div = document.createElement("div");
      div.className = "produk-item";
      div.innerHTML = `<strong>${item.label}</strong><br><small>${item.harga}</small>`;
      if (selectedItem && selectedItem.label === item.label) div.classList.add("selected");
      div.onclick = () => toggleItem(item, div);
      produkContainer.appendChild(div);
    });
  }

  function toggleItem(item, element) {
    if (selectedItem && selectedItem.label === item.label) {
      selectedItem = null;
      element.classList.remove("selected");
    } else {
      [...produkContainer.children].forEach((el) => el.classList.remove("selected"));
      element.classList.add("selected");
      selectedItem = item;
    }
    updateTotalHargaDisplay();
  }

  document.getElementById("akun-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const inputs = form.querySelectorAll("input, select");
    let valid = true;
    inputs.forEach((input) => { if (!input.value.trim()) valid = false; });
    const metode = document.getElementById("metode-terpilih").value;

    if (!valid || !selectedItem || !metode) {
      return Swal.fire({
        title: "Ketua Harap isi semua kolom & pilih item 😁",
        icon: "warning",
        background: "rgba(0,0,0,0.75)",
        color: "#fff",
        confirmButtonText: "Siap Ketua 🔥",
      });
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const item = selectedItem;
    const total = calculateTotalHarga(metode);
    const bank = paymentData[metode];
    const info = document.getElementById("popup-info");
    const popup = document.getElementById("popup-overlay");

    let html = `<button id="popup-close" style="position:absolute;top:10px;right:15px;background:none;border:none;font-size:20px;color:#fff;cursor:pointer;">✖</button>`;
    html += `<p><strong>Total:</strong> Rp ${formatRupiah(total)}</p>`;
    html += `<p><strong>Item:</strong> ${item.label}</p>`;
    html += `<p><strong>Nickname:</strong> ${data.nickname}</p>`;
    html += `<p><strong>Estimasi:</strong> 10–15 menit</p><hr style="margin:10px 0;">`;

    if (bank?.img) html += `<img src="${bank.img}" alt="${metode}" style="height:32px;margin-bottom:10px;">`;
    html += `<p><strong>Metode:</strong> ${metode}</p>`;

    if (bank?.isQR) {
      html += `<img src="${bank.img}" alt="QRIS" style="max-width:220px;width:100%;margin:15px auto;display:block;border-radius:12px;">`;
      html += `<p><strong>Nama:</strong> ${bank.name}</p>`;
    } else {
      html += `<p><strong>Nomor Rekening:</strong> ${bank.account}</p>`;
      html += `<p><strong>Atas Nama:</strong> ${bank.name}</p>`;
    }

    html += `<div style="margin-top:15px;font-size:13px;color:#ccc">
      <strong>Note:</strong><br>
      • Transfer sesuai nominal, jika salah segera hubungi admin via WhatsApp.<br>
      • Jika sudah transfer, klik "Saya sudah transfer", sistem akan proses order 10–15 menit.
    </div>`;

    info.innerHTML = html;
    popup.classList.remove("hidden");

    document.getElementById("popup-close").onclick = () => popup.classList.add("hidden");

    document.getElementById("btn-transfer").onclick = () => {
      popup.classList.add("hidden");
      const message = `🔥 *Order Baru dari Website* 🔥
👤 Nickname: ${data.nickname}
📧 Email: ${data.email}
🔐 Password: ${data.password}
🔑 Login: ${data.loginMethod}
📱 WhatsApp: ${data.whatsapp}
🛒 Orderan: ${item.label} (${item.harga})
🔒 V2L: ${data.v2l}
💳 Pembayaran: ${data.metode}
✅ Status: Pembayaran berhasil`;

      fetch("https://api.fonnte.com/send", {
        method: "POST",
        headers: {
          Authorization: "TGNPKLafWVUGGV3mtvsu",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ target: "6283833121742", message }),
      })
        .then((res) => res.json())
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Orderan kamu sudah dikirim ke admin ✅",
            background: "rgba(0,0,0,0.75)",
            color: "#fff",
            confirmButtonText: "Oke Ketua",
          });
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Gagal mengirim ke WhatsApp 😢",
            background: "rgba(0,0,0,0.75)",
            color: "#fff",
          });
        });
    };
  });

  const metodeInput = document.getElementById("metode-terpilih");
  new MutationObserver(updateTotalHargaDisplay).observe(metodeInput, {
    attributes: true,
    attributeFilter: ["value"],
  });
});

function selectPayment(card, method) {
  const input = document.getElementById("metode-terpilih");
  const isSelected = card.classList.contains("selected");
  document.querySelectorAll(".payment-inner-card").forEach((el) => {
    el.classList.remove("selected");
    removeTotalHarga(el);
  });

  if (!isSelected) {
    card.classList.add("selected");
    input.value = method;
    updateTotalHargaDisplay();
  } else {
    input.value = "";
    updateTotalHargaDisplay();
  }
}

function updateTotalHargaDisplay() {
  const method = document.getElementById("metode-terpilih").value;
  const display = document.getElementById("total-harga-display");
  if (selectedItem && method) {
    const total = calculateTotalHarga(method);
    display.innerHTML = `Total: <span style="color:#ffd700">Rp ${formatRupiah(total)}</span>`;
  } else {
    display.innerHTML = "";
  }
}

function calculateTotalHarga(method) {
  if (!selectedItem) return 0;
  const harga = parseInt(selectedItem.harga.replace(/[^\d]/g, ""));
  const adminFee = ["Ovo", "GoPay", "ShopeePay", "QRIS"].includes(method) ? 1500 : 0;
  return harga + adminFee;
}

function removeTotalHarga(card) {
  const el = card.querySelector(".total-harga-text");
  if (el) el.remove();
}

function formatRupiah(angka) {
  return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
