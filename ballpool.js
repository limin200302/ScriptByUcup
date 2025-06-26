// ballpool.js

const vipDataCash = [
  {
    name: "Silver",
    logo: "assets/img/silver.png",
    prices: [
      { label: "Rp 55.000 - 605 Cash", value: 55000 },
      { label: "Rp 70.000 - 880 Cash", value: 70000 },
      { label: "Rp 95.000 - 1.210 Cash", value: 95000 },
      { label: "Rp 135.000 - 1.892 Cash", value: 135000 },
      { label: "Rp 190.000 - 2.992 Cash", value: 190000 },
      { label: "Rp 250.000 - 3.872 Cash", value: 250000 },
      { label: "Rp 275.000 - 6.600 Cash", value: 275000 },
    ],
  },
  {
    name: "Gold",
    logo: "assets/img/gold.png",
    prices: [
      { label: "Rp 55.000 - 688 Cash", value: 55000 },
      { label: "Rp 70.000 - 1.000 Cash", value: 70000 },
      { label: "Rp 95.000 - 1.375 Cash", value: 95000 },
      { label: "Rp 135.000 - 2.150 Cash", value: 135000 },
      { label: "Rp 190.000 - 3.400 Cash", value: 190000 },
      { label: "Rp 250.000 - 4.400 Cash", value: 250000 },
      { label: "Rp 275.000 - 7.500 Cash", value: 275000 },
    ],
  },
  {
    name: "Zamrud",
    logo: "assets/img/zamrud.png",
    prices: [
      { label: "Rp 55.000 - 825 Cash", value: 55000 },
      { label: "Rp 70.000 - 1.200 Cash", value: 70000 },
      { label: "Rp 95.000 - 1.650 Cash", value: 95000 },
      { label: "Rp 135.000 - 2.580 Cash", value: 135000 },
      { label: "Rp 190.000 - 4.080 Cash", value: 190000 },
      { label: "Rp 250.000 - 5.280 Cash", value: 250000 },
      { label: "Rp 275.000 - 9.000 Cash", value: 275000 },
    ],
  },
  {
    name: "Diamond",
    logo: "assets/img/diamond.png",
    prices: [
      { label: "Rp 55.000 - 963 Cash", value: 55000 },
      { label: "Rp 70.000 - 1.400 Cash", value: 70000 },
      { label: "Rp 95.000 - 1.925 Cash", value: 95000 },
      { label: "Rp 135.000 - 3.010 Cash", value: 135000 },
      { label: "Rp 190.000 - 4.760 Cash", value: 190000 },
      { label: "Rp 250.000 - 6.160 Cash", value: 250000 },
      { label: "Rp 275.000 - 10.500 Cash", value: 275000 },
    ],
  },
  {
    name: "Black Diamond",
    logo: "assets/img/blackdiamond.png",
    prices: [
      { label: "Rp 55.000 - 1.100 Cash", value: 55000 },
      { label: "Rp 70.000 - 1.600 Cash", value: 70000 },
      { label: "Rp 95.000 - 2.200 Cash", value: 95000 },
      { label: "Rp 135.000 - 3.440 Cash", value: 135000 },
      { label: "Rp 190.000 - 5.440 Cash", value: 190000 },
      { label: "Rp 250.000 - 7.040 Cash", value: 250000 },
      { label: "Rp 275.000 - 12.000 Cash", value: 275000 },
    ],
  },
];
const vipDataBox = [
  {
    name: "Silver",
    logo: "assets/img/silver.png",
    prices: [
      { label: "Rp 60.000 - 20 Box Legends", value: 60000 },
      { label: "Rp 75.000 - 29 Box Legends", value: 75000 },
      { label: "Rp 100.000 - 40 Box Legends", value: 100000 },
      { label: "Rp 145.000 - 63 Box Legends", value: 145000 },
      { label: "Rp 200.000 - 100 Box Legends", value: 200000 },
      { label: "Rp 265.000 - 130 Box Legends", value: 265000 },
      { label: "Rp 295.000 - 222 Box Legends", value: 295000 },
    ],
  },
  {
    name: "Gold",
    logo: "assets/img/gold.png",
    prices: [
      { label: "Rp 60.000 - 22 Box Legends", value: 60000 },
      { label: "Rp 75.000 - 33 Box Legends", value: 75000 },
      { label: "Rp 100.000 - 45 Box Legends", value: 100000 },
      { label: "Rp 145.000 - 72 Box Legends", value: 145000 },
      { label: "Rp 200.000 - 114 Box Legends", value: 200000 },
      { label: "Rp 265.000 - 149 Box Legends", value: 265000 },
      { label: "Rp 295.000 - 252 Box Legends", value: 295000 },
    ],
  },
  {
    name: "Zamrud",
    logo: "assets/img/zamrud.png",
    prices: [
      { label: "Rp 60.000 - 27 Box Legends", value: 60000 },
      { label: "Rp 75.000 - 39 Box Legends", value: 75000 },
      { label: "Rp 100.000 - 54 Box Legends", value: 100000 },
      { label: "Rp 145.000 - 86 Box Legends", value: 145000 },
      { label: "Rp 200.000 - 137 Box Legends", value: 200000 },
      { label: "Rp 265.000 - 177 Box Legends", value: 265000 },
      { label: "Rp 295.000 - 303 Box Legends", value: 295000 },
    ],
  },
  {
    name: "Diamond",
    logo: "assets/img/diamond.png",
    prices: [
      { label: "Rp 60.000 - 32 Box Legends", value: 60000 },
      { label: "Rp 75.000 - 46 Box Legends", value: 75000 },
      { label: "Rp 100.000 - 64 Box Legends", value: 100000 },
      { label: "Rp 145.000 - 101 Box Legends", value: 145000 },
      { label: "Rp 200.000 - 159 Box Legends", value: 200000 },
      { label: "Rp 265.000 - 207 Box Legends", value: 265000 },
      { label: "Rp 295.000 - 353 Box Legends", value: 295000 },
    ],
  },
  {
    name: "Black Diamond",
    logo: "assets/img/blackdiamond.png",
    prices: [
      { label: "Rp 60.000 - 36 Box Legends", value: 60000 },
      { label: "Rp 75.000 - 53 Box Legends", value: 75000 },
      { label: "Rp 100.000 - 72 Box Legends", value: 100000 },
      { label: "Rp 145.000 - 115 Box Legends", value: 145000 },
      { label: "Rp 200.000 - 183 Box Legends", value: 200000 },
      { label: "Rp 265.000 - 237 Box Legends", value: 265000 },
      { label: "Rp 295.000 - 404 Box Legends", value: 295000 },
    ],
  },
];
const vipDataVenice = [
  {
    name: "Venice",
    logo: "assets/img/venice.png",
    prices: [
      { label: "7 Hari - Rp 80.000", value: 80000 },
      { label: "14 Hari - Rp 150.000", value: 150000 },
      { label: "21 Hari - Rp 225.000", value: 225000 },
      { label: "28 Hari - Rp 285.000", value: 285000 },
      { label: "56 Hari - Rp 565.000", value: 565000 },
      { label: "84 Hari - Rp 850.000", value: 850000 },
    ],
  },
];

const vipDataPoolPass = [
  {
    name: "Pool Pass",
    logo: "assets/img/poolpass.png",
    prices: [
      { label: "Pool Pass Biasa - Rp 50.000", value: 50000 },
      { label: "Pool Pass Elite - Rp 85.000", value: 85000 },
    ],
  },
];

const vipDataGoldenShot = [
  {
    name: "Golden Shot",
    logo: "assets/img/goldenshot.png",
    prices: [
      { label: "25 Golden Shot - Rp 40.000", value: 40000 },
      { label: "50 Golden Shot - Rp 80.000", value: 80000 },
      { label: "75 Golden Shot - Rp 125.000", value: 125000 },
      { label: "100 Golden Shot - Rp 155.000", value: 155000 },
    ],
  },
];
const vipDataBoxCollector = [
  {
    name: "Box Collector",
    logo: "assets/img/boxcol.png",
    prices: [
      { label: "8 Box - Rp 100.000", value: 100000 },
      { label: "16 Box - Rp 200.000", value: 200000 },
      { label: "24 Box - Rp 300.000", value: 300000 },
      { label: "32 Box - Rp 400.000", value: 400000 },
      { label: "40 Box - Rp 490.000", value: 490000 },
      { label: "48 Box - Rp 585.000", value: 585000 },
      { label: "56 Box - Rp 685.000", value: 685000 },
      { label: "64 Box - Rp 780.000", value: 780000 },
      { label: "72 Box - Rp 875.000", value: 875000 },
      { label: "80 Box - Rp 970.000", value: 970000 },
    ],
    note: "• Max 26 kepingan cue promo random untuk 1 Box",
  },
];

// Data Cart
let cartItems = [];

function updateCartBadge() {
  // Ambil ulang dari localStorage setiap kali dipanggil
  cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const badge = document.getElementById("cart-count");
  if (badge) {
    badge.textContent = cartItems.length;
    badge.style.display = cartItems.length > 0 ? "inline-block" : "none";
  }
}

// ---------------------------
// Render Kategori
function renderCategory(category) {
  const container = document.getElementById("category-content");
  container.innerHTML = "";

  let data = [];
  if (category === "cash") data = vipDataCash;
  else if (category === "boxlegends") data = vipDataBox;
  else if (category === "venice") data = vipDataVenice;
  else if (category === "poolpass") data = vipDataPoolPass;
  else if (category === "goldenshot") data = vipDataGoldenShot;
  else if (category === "boxcollector") data = vipDataBoxCollector;

  data.forEach(vip => {
    const section = document.createElement("div");
    section.className = "vip-section";

    const header = document.createElement("div");
    header.className = "vip-header";
    header.innerHTML = `<img src="${vip.logo}" alt="${vip.name}"> ${vip.name}`;
    section.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "package-grid";

    vip.prices.forEach((pkg) => {
  const card = document.createElement("div");
  card.className = "package-card";

  card.innerHTML = `
    <h3>${pkg.label.split(" - ")[0]}</h3>
    <p>${pkg.label.split(" - ")[1]}</p>
    <div class="checkmark-icon">&#10003;</div>
  `;

  // Inisialisasi jumlah
  let quantity = 0;

  const quantityDisplay = document.createElement("span");
  quantityDisplay.className = "quantity-display";
  quantityDisplay.textContent = quantity;

  // Tombol + (Tambah)
  const plusBtn = document.createElement("button");
  plusBtn.className = "btn-plus";
  plusBtn.textContent = "+";
  plusBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    quantity++;
    quantityDisplay.textContent = quantity;

    // Tambahkan ke cart
    cartItems.push({
      label: pkg.label,
      category: category,
      name: vip.name,
    });

    localStorage.setItem("cart", JSON.stringify(cartItems));
    updateCartBadge();
    animateFlyToCart(e.target);
  });

  // Tombol − (Kurang)
  const minusBtn = document.createElement("button");
  minusBtn.className = "btn-minus";
  minusBtn.textContent = "−";
  minusBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (quantity > 0) {
      quantity--;
      quantityDisplay.textContent = quantity;

      // Hapus satu item dari cart yang cocok
      const index = cartItems.findIndex(
        (item) =>
          item.label === pkg.label &&
          item.category === category &&
          item.name === vip.name
      );
      if (index !== -1) {
        cartItems.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        updateCartBadge();
      }
    }
  });

  // Gabungkan kontrol jumlah
  const controlWrap = document.createElement("div");
  controlWrap.className = "btn-control";
  controlWrap.appendChild(minusBtn);
  controlWrap.appendChild(quantityDisplay);
  controlWrap.appendChild(plusBtn);

  card.appendChild(controlWrap);
  grid.appendChild(card);
});

    section.appendChild(grid);

    if (vip.note) {
      const note = document.createElement("div");
      note.className = "vip-note";
      note.textContent = vip.note;
      section.appendChild(note);
    }

    container.appendChild(section);
  });
}

// ---------------------------
// Tabs
let currentCategory = null;
document.querySelectorAll(".tab-btn").forEach(tab => {
  tab.addEventListener("click", (e) => {
    const category = tab.getAttribute("data-category");
    if (currentCategory === category) {
      document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
      document.getElementById("category-content").innerHTML = "";
      currentCategory = null;
    } else {
      document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
      tab.classList.add("active");
      renderCategory(category);
      currentCategory = category;
    }
    e.stopPropagation();
  });
});

// ---------------------------
// Animasi Judul & Default Load
document.addEventListener("DOMContentLoaded", function () {
  const title = "8 Ball Pool Menu";
  const container = document.getElementById("animated-title");

  title.split("").forEach((char, index) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.animationDelay = `${index * 0.1}s`;
    span.classList.add("glow-letter");
    container.appendChild(span);
  });

  updateCartBadge();
  renderCategory("cash");
  document.querySelector('[data-category="cash"]')?.classList.add("active");
});
// ✅ Update badge saat balik ke halaman tanpa reload (setelah hapus item dari keranjang)
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartBadge();
  }
});

// ---------------------------
// Animasi terbang ke keranjang
function animateFlyToCart(sourceElement) {
  const cartIcon = document.querySelector(".cart-icon img");
  if (!cartIcon) return;

  const clone = sourceElement.cloneNode(true);
  const rect = sourceElement.getBoundingClientRect();
  clone.style.position = "fixed";
  clone.style.left = rect.left + "px";
  clone.style.top = rect.top + "px";
  clone.style.zIndex = 9999;
  clone.style.background = "gold";
  clone.style.borderRadius = "50%";
  clone.style.transition = "all 0.8s ease-in-out";

  document.body.appendChild(clone);

  const targetRect = cartIcon.getBoundingClientRect();
  setTimeout(() => {
    clone.style.left = targetRect.left + "px";
    clone.style.top = targetRect.top + "px";
    clone.style.opacity = "0";
    clone.style.transform = "scale(0.2)";
  }, 10);

  setTimeout(() => {
    clone.remove();
  }, 900);
}
