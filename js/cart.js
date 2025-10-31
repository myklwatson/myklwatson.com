// --- CART DATA ---
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// --- UPDATE CART COUNT ---
function updateCartCount() {
  const countElement = document.querySelector('.cart-count');
  if (countElement) countElement.textContent = cart.length;
}

// --- UPDATE DROPDOWN CART ---
function updateCartDropdown() {
  const dropdown = document.querySelector('.cart-dropdown-content');
  if (!dropdown) return;

  dropdown.innerHTML = ''; // clear existing items

  if (cart.length === 0) {
    dropdown.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}" width="40">
      <div>
        <p>${item.title} (${item.option})</p>
        <p>$${item.price}</p>
      </div>
      <button class="remove-item" data-index="${index}">&times;</button>
    `;
    dropdown.appendChild(div);
  });

  // Total at bottom
  const totalDiv = document.createElement('div');
  totalDiv.style.fontWeight = 'bold';
  totalDiv.style.marginTop = '10px';
  totalDiv.textContent = `Total: $${total}`;
  dropdown.appendChild(totalDiv);

  // Go to Cart button
  const cartButton = document.createElement('button');
  cartButton.textContent = 'GO TO CART';
  cartButton.style.marginTop = '10px';
  cartButton.style.width = '100%';
  cartButton.style.padding = '8px';
  cartButton.style.cursor = 'pointer';
  cartButton.addEventListener('click', () => {
    window.location.href = 'cart.html';
  });
  dropdown.appendChild(cartButton);

  // Remove item listeners
  dropdown.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', e => {
      const i = e.target.dataset.index;
      cart.splice(i, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      updateCartDropdown();
      populateCartPage(); // refresh cart page if open
    });
  });
}

// --- POPULATE CART PAGE ---
function populateCartPage() {
  const container = document.querySelector('.cart-items-container');
  if (!container) return;

  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    const totalEl = document.getElementById('cart-total');
    if (totalEl) totalEl.textContent = 'Total: $0';
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="cart-item-info">
        <h3>${item.title}</h3>
        <p>Option: ${item.option}</p>
        <p>Price: $${item.price}</p>
        <label>Qty: <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="qty-input"></label>
        <p>Subtotal: $${subtotal}</p>
        <button class="remove-item" data-index="${index}">&times;</button>
      </div>
    `;
    container.appendChild(div);
  });

  const totalEl = document.getElementById('cart-total');
  if (totalEl) totalEl.textContent = `Total: $${total}`;

  // Quantity change
  container.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', e => {
      const i = e.target.dataset.index;
      let val = parseInt(e.target.value, 10);
      if (isNaN(val) || val < 1) val = 1;
      e.target.value = val;
      cart[i].quantity = val;
      localStorage.setItem('cart', JSON.stringify(cart));
      populateCartPage();
      updateCartCount();
      updateCartDropdown();
    });
  });

  // Remove item
  container.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', e => {
      const i = e.target.dataset.index;
      cart.splice(i, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      populateCartPage();
      updateCartCount();
      updateCartDropdown();
    });
  });
}

// --- CHECKOUT BUTTON ---
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    alert('Proceeding to checkout...');
    // You can integrate payment gateway here
  });
}

// --- INITIALIZE CART ---
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  updateCartDropdown();
  populateCartPage();
});
