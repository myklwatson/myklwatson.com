// --- PRINT DATA ---
const prints = [
  { id: 1, title: "Foxton Sunset", desc: "Colours of Sea and Sky Series - A3 Fine Art Print on ILFORD Archival Paper.", basePrice: 120, images: ["images/prints/COSAS_1.jpg","images/prints/COSAS_1b.jpg","images/prints/COSAS_1c.jpg"] },
  { id: 2, title: "Papamoa Sunrise", desc: "Colours of Sea and Sky Series - A3 Fine Art Print on ILFORD Archival Paper.", basePrice: 120, images: ["images/prints/COSAS_2.jpg","images/prints/COSAS_2b.jpg","images/prints/COSAS_2c.jpg"] },
  { id: 3, title: "Waimarama Sunrise", desc: "Colours of Sea and Sky Series - A3 Fine Art Print on ILFORD Archival Paper.", basePrice: 120, images: ["images/prints/COSAS_3.jpg","images/prints/COSAS_3b.jpg","images/prints/COSAS_3c.jpg"] },
  { id: 4, title: "Morning Mist", desc: "Colours of Sea and Sky Series - A3 Fine Art Print on ILFORD Archival Paper.", basePrice: 120, images: ["images/prints/COSAS_4.jpg","images/prints/COSAS_4b.jpg","images/prints/COSAS_4c.jpg"] },
  { id: 5, title: "Lake Wanaka Star Trails", desc: "New Zealand Landscapes Series - A3 Fine Art Print on ILFORD Archival Paper.", basePrice: 120, images: ["images/prints/landscape_1.jpg"] },
  { id: 6, title: "Waihi Falls - Manawatu", desc: "New Zealand Landscapes Series - A3 Fine Art Print on ILFORD Archival Paper.", basePrice: 120, images: ["images/prints/landscape_2.jpg"] },
  { id: 7, title: "Waimarama Night Sky", desc: "New Zealand Landscapes Series - A3 Fine Art Print on ILFORD Archival Paper.", basePrice: 120, images: ["images/prints/landscape_3.jpg"] },
  { id: 8, title: "That Wanaka Tree", desc: "New Zealand Landscapes Series - A3 Fine Art Print on ILFORD Archival Paper.", basePrice: 120, images: ["images/prints/landscape_5.jpg"] },
  { id: 9, title: "Shoulder", desc: "Bodyscape Series - A3 Fine Art Print on ILFORD Archival Paper.", basePrice: 150, images: ["images/prints/MATT_SCAPE1.jpg"] },
  { id: 10, title: "Abdomen", desc: "Bodyscape Series - A3 Fine Art Print on ILFORD Archival Paper.", basePrice: 150, images: ["images/prints/MATT_SCAPE2.jpg"] },
  { id: 11, title: "Glutes and Back", desc: "Bodyscape Series - A3 Fine Art Print on ILFORD Archival Paper.", basePrice: 150, images: ["images/prints/MATT_SCAPE3.jpg"] },
  { id: 12, title: "Ribcage", desc: "Bodyscape Series - A3 Fine Art Print on ILFORD Archival Paper.", basePrice: 150, images: ["images/prints/MATT_SCAPE4.jpg"] },
  { id: 13, title: "Ascent", desc: "Illustrative Artwork - A3 Fine Art Print on ILFORD Archival Paper.", basePrice: 150, images: ["images/prints/Ill_1.jpg"] },
  { id: 14, title: "Bound", desc: "Illustrative Artwork - A3 Fine Art Print on ILFORD Archival Paper.", basePrice: 150, images: ["images/prints/Ill_2.jpg"] },
  { id: 15, title: "The Red Lady", desc: "Illustrative Artwork - A3 Fine Art Print on ILFORD Archival Paper.", basePrice: 150, images: ["images/prints/Ill_3.jpg"] },
  { id: 16, title: "ISO", desc: "Illustrative Artwork - A3 Fine Art Print on ILFORD Archival Paper.", basePrice: 150, images: ["images/prints/Ill_4.jpg"] }
];



// --- ELEMENTS ---
const printCards = document.querySelectorAll('.print-card');
const lightbox = document.getElementById('lightbox');
const lightboxMainImg = document.getElementById('lightbox-main-img');
const lightboxThumbs = document.getElementById('lightbox-thumbs');
const printTitle = document.getElementById('print-title');
const printDesc = document.getElementById('print-desc');
const printOption = document.getElementById('print-option');
const printPrice = document.getElementById('print-price');
const lightboxClose = document.querySelector('.lightbox .close');
const addToCartBtn = document.querySelector('.add-to-cart');

let currentPrint = null;

// --- LIGHTBOX ---
printCards.forEach(card => {
  card.addEventListener('click', () => {
    const productId = parseInt(card.dataset.product, 10);
    const product = prints.find(p => p.id === productId);
    if (!product) return;

    currentPrint = product;
    lightboxMainImg.src = product.images[0];
    lightboxThumbs.innerHTML = '';
    product.images.forEach(src => {
      const thumb = document.createElement('img');
      thumb.src = src;
      thumb.className = 'lightbox-thumb';
      thumb.addEventListener('click', () => lightboxMainImg.src = src);
      lightboxThumbs.appendChild(thumb);
    });

    printTitle.textContent = product.title;
    printDesc.textContent = product.desc;
    printOption.value = 'unframed';
    updatePrice();
    lightbox.style.display = 'flex';
  });
});

lightboxClose.addEventListener('click', () => lightbox.style.display = 'none');
window.addEventListener('click', e => { if(e.target === lightbox) lightbox.style.display='none'; });

// --- PRICE ---
function updatePrice() {
  if(!currentPrint) return;
  let price = Number(currentPrint.basePrice);
  if(printOption.value === 'matted') price += 60;
  if(printOption.value === 'framed') price += 200;
  printPrice.textContent = `$${price}`;
}
printOption.addEventListener('change', updatePrice);

// --- CART ---
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  const countEl = document.querySelector('.cart-count');
  if(countEl) {
    const totalQty = cart.reduce((sum, i) => sum + Number(i.quantity), 0);
    countEl.textContent = totalQty;
  }
}

function updateCartDropdown() {
  const dropdown = document.querySelector('.cart-dropdown-content');
  if(!dropdown) return;

  dropdown.innerHTML = '';
  if(cart.length === 0) { dropdown.innerHTML = '<p>Your cart is empty.</p>'; return; }

  let total = 0;
  cart.forEach((item,index) => {
    const price = Number(item.price);
    const qty = Number(item.quantity);
    total += price * qty;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}" width="40">
      <div>
        <p>${item.title} (${item.option})</p>
        <p>Qty: ${qty}</p>
        <p>$${price * qty}</p>
      </div>
      <button class="remove-item" data-index="${index}">&times;</button>
    `;
    dropdown.appendChild(div);
  });

  const totalDiv = document.createElement('div');
  totalDiv.style.fontWeight='bold';
  totalDiv.style.marginTop='10px';
  totalDiv.textContent=`Total: $${total}`;
  dropdown.appendChild(totalDiv);

  const cartBtn = document.createElement('button');
  cartBtn.textContent='GO TO CART';
  cartBtn.style.width='100%';
  cartBtn.style.padding='8px';
  cartBtn.addEventListener('click',()=>window.location.href='cart.html');
  dropdown.appendChild(cartBtn);

  dropdown.querySelectorAll('.remove-item').forEach(btn=>{
    btn.addEventListener('click',e=>{
      const i = e.target.dataset.index;
      cart.splice(i,1);
      localStorage.setItem('cart',JSON.stringify(cart));
      updateCartCount();
      updateCartDropdown();
    });
  });
}

// --- ADD TO CART ---
addToCartBtn.addEventListener('click', () => {
  if (!currentPrint) return;
  const selectedOption = printOption.value;
  let price = Number(currentPrint.basePrice);
  if (selectedOption === 'matted') price += 60;
  if (selectedOption === 'framed') price += 200;

  const item = {
    id: currentPrint.id,
    title: currentPrint.title,
    option: selectedOption,
    price: price,
    image: currentPrint.images[0],
    quantity: 1
  };

  const existingIndex = cart.findIndex(cartItem => cartItem.id === item.id && cartItem.option === item.option);
  if(existingIndex > -1){
    cart[existingIndex].quantity += 1;
  } else {
    cart.push(item);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  updateCartDropdown();

  alert(`Added to cart: ${currentPrint.title} (${selectedOption}) - $${price}`);
});

// --- INITIALIZE ---
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  updateCartDropdown();
});
