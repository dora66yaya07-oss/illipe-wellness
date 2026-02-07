let cart = [];
let total = 0;

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

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    emptyCart.style.display = "block";
    cartTotal.innerText = "";
    return;
  }

  emptyCart.style.display = "none";

  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} <span>RM ${item.price}</span>`;
    cartItems.appendChild(li);
  });

  cartTotal.innerText = `Total: RM ${total}`;
}

function toggleCartDropdown() {
  const dropdown = document.getElementById("cart-dropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}
