let activeTab = null;

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
  if (activeTab === tabName) {
    // Tutup tab jika diklik 2x
    document.getElementById("produk-container").innerHTML = "";
    document.getElementById("produk-note").style.display = "none";
    activeTab = null;
  } else {
    // Buka tab baru
    renderProduk(tabName);
    activeTab = tabName;
  }
}

function renderProduk(tabName) {
  const container = document.getElementById("produk-container");
  const note = document.getElementById("produk-note");

  container.innerHTML = "";
  const produk = dataProduk[tabName];

  produk.list.forEach(([label, harga]) => {
    const div = document.createElement("div");
    div.className = "produk-item";
    div.innerHTML = `<strong>${label}</strong><br><small>${harga}</small>`;

    div.onclick = () => {
      div.classList.toggle("selected");
    };

    container.appendChild(div);
  });

  // Tampilkan catatan jika ada
  if (produk.note) {
    note.innerText = produk.note;
    note.style.display = "block";
  } else {
    note.style.display = "none";
  }
}
