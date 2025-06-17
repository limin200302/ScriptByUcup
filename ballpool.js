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
       
function renderCategory(category) {
  const container = document.getElementById("category-content");
  container.innerHTML = "";

  const data = category === "cash" ? vipDataCash : category === "boxlegends" ? vipDataBox : [];

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
        <h3>${pkg.label.split(" - ")[1]}</h3>
        <p>${pkg.label.split(" - ")[0]}</p>        
      `;
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

// Title Animation
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
});
card.addEventListener("click", () => {
  // Hilangkan dulu semua highlight
  document.querySelectorAll(".package-card").forEach(c => {
    c.classList.remove("selected-card");
  });

  // Tambahkan highlight ke card yang diklik
  card.classList.add("selected-card");
});

// Default view
renderCategory("cash");
