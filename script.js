let cart = [];
let total = 0;

const whatsappNumber = "60122458995";

function addToCart(name, price) {
  cart.push({ name, price });
  total += price;

  document.getElementById("cart-count").innerText = cart.length;
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const emptyCart = document.getElementById("empty-cart");
  const checkoutBtn = document.getElementById("checkout-btn");

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    emptyCart.style.display = "block";
    cartTotal.innerText = "";
    checkoutBtn.style.display = "none";
    return;
  }

  emptyCart.style.display = "none";
  checkoutBtn.style.display = "block";

  let message = "Hello Illipe Wellness Co.%0A%0AI would like to order:%0A";

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} <span>RM ${item.price}</span>`;
    cartItems.appendChild(li);

    message += `${index + 1}. ${item.name} - RM ${item.price}%0A`;
  });

  message += `%0ATotal: RM ${total}`;

  cartTotal.innerText = "Total: RM " + total;

  checkoutBtn.href = `https://wa.me/${whatsappNumber}?text=${message}`;
}

function toggleCartDropdown() {
  const dropdown = document.getElementById("cart-dropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

