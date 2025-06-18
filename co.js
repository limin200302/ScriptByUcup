document.addEventListener("DOMContentLoaded", () => {
  const cartList = document.getElementById("cart-list");
  const emptyMsg = document.getElementById("empty-msg");

  // Ambil dari localStorage
  const stored = localStorage.getItem("cart");
  const cartItems = stored ? JSON.parse(stored) : [];

  function renderCart() {
    cartList.innerHTML = "";

    if (cartItems.length === 0) {
      emptyMsg.style.display = "block";
      return;
    }

    emptyMsg.style.display = "none";

    cartItems.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <div class="item-info">
          <p><strong>${item.name}</strong></p>
          <p>${item.label}</p>
          <p><em>Kategori: ${item.category}</em></p>
        </div>
        <button class="remove-btn" data-index="${index}">Hapus</button>
      `;
      cartList.appendChild(div);
    });

    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.target.getAttribute("data-index"));
        cartItems.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        renderCart();
      });
    });
  }

  renderCart();
});
