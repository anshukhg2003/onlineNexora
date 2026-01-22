let cartItems = [];
initMenPage();

function initMenPage() {
let cartItemsStr = localStorage.getItem('cartItems');
cartItems = cartItemsStr ? JSON.parse(cartItemsStr) : [];

displayItemHomePage();
displayCartIcon();
syncMobileCartCount();
}

function addToCart(itemId, button) {
  cartItems.push(itemId);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  displayCartIcon();
  syncMobileCartCount();

  launchBalloons(button);
}


function displayCartIcon() {
  let cartItemCount = document.querySelector('.cart-item-count');
  if(cartItems.length > 0) {
  cartItemCount.style.visibility = 'visible';
   cartItemCount.innerText = cartItems.length;
  } else {
    cartItemCount.style.visibility = 'hidden';
  }
}


function displayItemHomePage() {

let itemsContainerElement = document.querySelector('.items-container');
if (!itemsContainerElement) {
  return;
}

let innerHTML = '';
women_Items.forEach(product => {
innerHTML += `<div class="item-container">
        <img class="item-image" src="/${product.image}" alt="item image" />
        <div class="rating">${product.rating.stars} ⭐ | ${product.rating.count}</div>
        <div class="company-name">${product.company}</div>
        <div class="item-name">${product.item_name}</div>
        <div class="price">
          <span class="current-price">RS ${product.current_price}</span>
          <span class="original-price">RS ${product.original_price}</span>
          <span class="discount">(${product.discount_percentage}% OFF)</span>
        </div>
        <button class="btn-add-cart" onclick="addToCart('${product.id}', this)">

          Add to Cart
        </button>
      </div>`;
})
itemsContainerElement.innerHTML = innerHTML;
}


function syncMobileCartCount() {
  const mobileCart = document.querySelector(".mobile-cart-count");
  if (mobileCart) {
    mobileCart.innerText = cartItems.length;
  }
}

// ===============================
// PROFILE MODAL
// ===============================
const modal = document.getElementById("profileModal");
const closeBtn = document.querySelector(".close-btn");
const tabBtns = document.querySelectorAll(".tab-btn");
const tabForms = document.querySelectorAll(".tab-form");

// Desktop profile
const desktopProfile = document.querySelector(
  ".action_bar .action_container:first-child"
);

// Mobile profile
const mobileProfile = document.querySelector(".mobile-profile");

function openProfileModal() {
  modal.style.display = "block";
}

function closeProfileModal() {
  modal.style.display = "none";
}

// Desktop click
if (desktopProfile) {
  desktopProfile.addEventListener("click", openProfileModal);
}

// Mobile click
if (mobileProfile) {
  mobileProfile.addEventListener("click", (e) => {
    e.preventDefault();
    closeHamburger();
    openProfileModal();
  });
}

// Close modal
if (closeBtn) {
  closeBtn.addEventListener("click", closeProfileModal);
}

// Click outside modal
window.addEventListener("click", (e) => {
  if (e.target === modal) closeProfileModal();
});

// Tabs
tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    tabForms.forEach((form) => {
      form.id === btn.dataset.tab
        ? form.classList.add("active")
        : form.classList.remove("active");
    });
  });
});

// Submit forms
tabForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert(form.id === "signin" ? "Signed In!" : "Signed Up!");
    closeProfileModal();
  });
});

// ===============================
// HAMBURGER MENU
// ===============================
const hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".mobile_nav");
const overlay = document.querySelector(".menu-overlay");

function toggleMenu() {
  hamburger.classList.toggle("active");
  mobileNav.classList.toggle("active");
  overlay.classList.toggle("active");
}

function closeHamburger() {
  hamburger.classList.remove("active");
  mobileNav.classList.remove("active");
  overlay.classList.remove("active");
}

if (hamburger) {
  hamburger.addEventListener("click", toggleMenu);
}

if (overlay) {
  overlay.addEventListener("click", closeHamburger);
}

// Close hamburger on mobile link click
document.querySelectorAll(".mobile_nav a").forEach((link) => {
  link.addEventListener("click", closeHamburger);
});


function launchBalloons(button) {
  const colors = ["#ff4d4d", "#ffd93d", "#6bcf63", "#4dabf7", "#e599f7"];

  const rect = button.getBoundingClientRect();

  for (let i = 0; i < 6; i++) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";

    balloon.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    balloon.style.left =
      rect.left + window.scrollX + rect.width / 2 +
      (Math.random() * 30 - 15) + "px";

    balloon.style.top =
      rect.top + window.scrollY + "px";

    document.body.appendChild(balloon);

    setTimeout(() => balloon.remove(), 1500);
  }
}
