let cart = JSON.parse(localStorage.getItem("cart")) || [];
const whatsappNumber = "60122458995";

updateCart();

function addToCart(name, price) {
  const item = cart.find(i => i.name === name);

  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  saveCart();
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");
  const emptyCart = document.getElementById("empty-cart");
  const checkoutBtn = document.getElementById("checkout-btn");

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    emptyCart.style.display = "block";
    if (checkoutBtn) checkoutBtn.style.display = "none";
    cartCount.innerText = 0;
    cartTotal.innerText = "";
    return;
  }

  emptyCart.style.display = "none";
  if (checkoutBtn) checkoutBtn.style.display = "block";

  let total = 0;
  let message = "🧾 *INVOICE – Illipe Wellness Co.*%0A%0A";

  cart.forEach((item, index) => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    message +=
      `${index + 1}. ${item.name}%0A` +
      `   Qty: ${item.qty} x RM ${item.price.toFixed(2)}%0A` +
      `   Subtotal: RM ${subtotal.toFixed(2)}%0A%0A`;

    cartItems.innerHTML += `
      <li class="cart-item">
        <div>
          ${item.name}<br>
          RM ${item.price.toFixed(2)}
        </div>

        <div class="qty-control">
          <button onclick="changeQty(${index}, -1)">−</button>
          ${item.qty}
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>

        <span class="remove-btn" onclick="removeItem(${index})">✕</span>
      </li>
    `;
  });

  total = Number(total.toFixed(2));
  message += `💰 *TOTAL: RM ${total.toFixed(2)}*`;

  cartTotal.innerText = "Total: RM " + total.toFixed(2);
  cartCount.innerText = cart.reduce((sum, i) => sum + i.qty, 0);

  if (checkoutBtn) {
  checkoutBtn.href = `https://wa.me/${whatsappNumber}?text=${message}`;
  }
}

function changeQty(index, change) {
  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function toggleCartDropdown() {
  const dropdown = document.getElementById("cart-dropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}
