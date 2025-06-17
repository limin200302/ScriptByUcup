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
      { label: "Rp 60.000 - 20 Box", value: 60000 },
      { label: "Rp 75.000 - 29 Box", value: 75000 },
      { label: "Rp 100.000 - 40 Box", value: 100000 },
      { label: "Rp 145.000 - 63 Box", value: 145000 },
      { label: "Rp 200.000 - 100 Box", value: 200000 },
      { label: "Rp 265.000 - 130 Box", value: 265000 },
      { label: "Rp 295.000 - 222 Box", value: 295000 },
    ],
  },
  {
    name: "Gold",
    logo: "assets/img/gold.png",
    prices: [
      { label: "Rp 60.000 - 22 Box", value: 60000 },
      { label: "Rp 75.000 - 33 Box", value: 75000 },
      { label: "Rp 100.000 - 45 Box", value: 100000 },
      { label: "Rp 145.000 - 72 Box", value: 145000 },
      { label: "Rp 200.000 - 114 Box", value: 200000 },
      { label: "Rp 265.000 - 149 Box", value: 265000 },
      { label: "Rp 295.000 - 252 Box", value: 295000 },
    ],
  },
  {
    name: "Zamrud",
    logo: "assets/img/zamrud.png",
    prices: [
      { label: "Rp 60.000 - 27 Box", value: 60000 },
      { label: "Rp 75.000 - 39 Box", value: 75000 },
      { label: "Rp 100.000 - 54 Box", value: 100000 },
      { label: "Rp 145.000 - 86 Box", value: 145000 },
      { label: "Rp 200.000 - 137 Box", value: 200000 },
      { label: "Rp 265.000 - 177 Box", value: 265000 },
      { label: "Rp 295.000 - 303 Box", value: 295000 },
    ],
  },
  {
    name: "Diamond",
    logo: "assets/img/diamond.png",
    prices: [
      { label: "Rp 60.000 - 32 Box", value: 60000 },
      { label: "Rp 75.000 - 46 Box", value: 75000 },
      { label: "Rp 100.000 - 64 Box", value: 100000 },
      { label: "Rp 145.000 - 101 Box", value: 145000 },
      { label: "Rp 200.000 - 159 Box", value: 200000 },
      { label: "Rp 265.000 - 207 Box", value: 265000 },
      { label: "Rp 295.000 - 353 Box", value: 295000 },
    ],
  },
  {
    name: "Black Diamond",
    logo: "assets/img/blackdiamond.png",
    prices: [
      { label: "Rp 60.000 - 36 Box", value: 60000 },
      { label: "Rp 75.000 - 53 Box", value: 75000 },
      { label: "Rp 100.000 - 72 Box", value: 100000 },
      { label: "Rp 145.000 - 115 Box", value: 145000 },
      { label: "Rp 200.000 - 183 Box", value: 200000 },
      { label: "Rp 265.000 - 237 Box", value: 265000 },
      { label: "Rp 295.000 - 404 Box", value: 295000 },
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
      { label: "24 Golden Shot - Rp 45.000", value: 45000 },
      { label: "48 Golden Shot - Rp 88.000", value: 88000 },
      { label: "72 Golden Shot - Rp 130.000", value: 130000 },
      { label: "96 Golden Shot - Rp 170.000", value: 170000 },
    ],
  },
];

function renderCategory(category) {
  const container = document.getElementById("category-content");
  container.innerHTML = "";

  let data = [];
  if (category === "cash") data = vipDataCash;
  else if (category === "boxlegends") data = vipDataBox;
  else if (category === "venice") data = vipDataVenice;
  else if (category === "poolpass") data = vipDataPoolPass;
  else if (category === "goldenshot") data = vipDataGoldenShot;

  data.forEach(vip => {
    const section = document.createElement("div");
    section.className = "vip-section";

    const header = document.createElement("div");
    header.className = "vip-header";
    header.innerHTML = `<img src="${vip.logo}" alt="${vip.name}"> ${vip.name}`;
    section.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "package-grid";

    vip.prices.forEach(pkg => {
      const card = document.createElement("div");
      card.className = "package-card";
      card.innerHTML = `
        <h3>${pkg.label.split(" - ")[0]}</h3>
        <p>${pkg.label.split(" - ")[1]}</p>
        <div class="checkmark-icon">&#10003;</div>
      `;
      card.addEventListener("click", () => {
        document.querySelectorAll(".package-card").forEach(c => {
          c.classList.remove("selected-card");
        });
        card.classList.add("selected-card");
      });
      grid.appendChild(card);
    });

    section.appendChild(grid);
    container.appendChild(section);
  });
}

// Tabs
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.category;
    renderCategory(cat);
  });
});

// Title Animation & Default Load
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

  // ✅ PENTING: render default tab
  renderCategory("cash");
});
