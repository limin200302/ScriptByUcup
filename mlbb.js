let activeTab = null;
let lastClickedItem = null;

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
  lastClickedItem = null;

  const produk = dataProduk[tabName];

  produk.list.forEach(([label, harga]) => {
    const div = document.createElement("div");
    div.className = "produk-item";
    div.innerHTML = `<strong>${label}</strong><br><small>${harga}</small>`;

    div.addEventListener("click", () => {
      if (div.classList.contains("selected")) {
        div.classList.remove("selected");
      } else {
        div.classList.add("selected");
      }
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
document.body.addEventListener("click", (e) => {
  const container = document.getElementById("produk-container");
  if (!container.contains(e.target)) {
    const selected = container.querySelectorAll(".selected");
    if (selected.length === 1) {
      selected[0].classList.remove("selected");
    }
  }
});
document.addEventListener("DOMContentLoaded", () => {
  // ... kode produk kamu di atas (jangan hapus)

  const btnOrder = document.querySelector(".btn-order");
  const form = document.getElementById("akun-form");

  btnOrder.addEventListener("click", (e) => {
    const inputs = form.querySelectorAll("input, select");
    let isEmpty = false;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isEmpty = true;
      }
    });

    if (isEmpty) {
      e.preventDefault(); // Cegah submit form

      Swal.fire({
        icon: "warning",
        title: "Ketua Harap isi kolom yang kosong 😁",
        showCancelButton: true,
        confirmButtonText: "Siap ketua 🔥",
        cancelButtonText: "Batal",
        reverseButtons: true,
      }).then((result) => {
        if (!result.isConfirmed) {
          Swal.fire({
            icon: "error",
            title: "Yah maaf ketua 😓",
            text: "Permintaan kamu belum dapat kita proses.",
          });
        }
      });
    }
  });
});
