const ConvenienceFee = 99;
let cartItemObjects = [];
onLoad();

function onLoad() {
  loadCartItemObjects();
  displayCartItems();
  displayCartSummary();
}

function displayCartSummary() {
  let cartSummaryElement = document.querySelector('.cart-summary');
  let totalItem = cartItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  cartItemObjects.forEach(cartItem => {
    totalMRP += cartItem.original_price;
    totalDiscount += cartItem.original_price - cartItem.current_price;
  });
 
  let finalPayment = totalMRP - totalDiscount + ConvenienceFee;
  cartSummaryElement.innerHTML = ` <div class="cart-details-container">
          <div class="price-header">PRICE DETAILS (${totalItem} Items)</div>
          <div class="price-item">
            <span class="price-item-tag">Total MRP</span>
            <span class="price-item-value">₹ ${totalMRP}</span>
          </div>

          <div class="price-item">
            <span class="price-item-tag">Discount on MRP</span>
            <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
          </div>
          <div class="price-item">
            <span class="price-item-tag">Convenience Fee</span>
            <span class="price-item-value">₹ 99</span>
          </div>
          <hr>
          <div class="price-footer">
            <span class="price-item-tag">Total Amount</span>
            <span class="price-item-value">₹ ${finalPayment}</span>
          </div>
          </div>
        <button class="btn-place-order">
          <div class="css-xjhrni">PLACE ORDER</div>
        </button>`;
}

/* ===============================
   LOAD CART ITEM OBJECTS
================================ */
function loadCartItemObjects() {
  console.log(cartItems);

  cartItemObjects = cartItems
    .map(itemId => {
      for (let i = 0; i < men_Items.length; i++) {
        if (itemId == men_Items[i].id) {
          return men_Items[i];
        }
      }
      return null; // important
    })
    .filter(item => item !== null); // remove undefined/null
}

/* ===============================
   DISPLAY CART ITEMS
================================ */
function displayCartItems() {
  let containerElement = document.querySelector('.cart-items-container');

  if (!containerElement) return;

  let innerHTML = "";

  cartItemObjects.forEach(men_Items => {
    innerHTML += generateItemHTML(men_Items);
  });

  containerElement.innerHTML = innerHTML;
}

/* ===============================
   GENERATE ITEM HTML
================================ */
function generateItemHTML(men_Items) {
  return `
    <div class="cart-item-container">
      <div class="item-left-part">
        <img class="cart-item-img" src="/${men_Items.image}">
      </div>

      <div class="item-right-part">
        <div class="company">${men_Items.company}</div>
        <div class="item-name">${men_Items.item_name}</div>

        <div class="price-container">
          <span class="current-price">RS ${men_Items.current_price}</span>
          <span class="original-price">RS ${men_Items.original_price}</span>
          <span class="discount-percentage">
            (${men_Items.discount_percentage}% OFF)
          </span>
        </div>

        <div class="return-period">
          <span class="return-period-days">
            ${men_Items.return_period} days
          </span> return available
        </div>

        <div class="delivery-details">
          Delivery by
          <span class="delivery-details-days">
            ${men_Items.delivery_data}
          </span>
        </div>
      </div>

      <div class="remove-from-cart"
           onclick="removeFromCart('${men_Items.id}')">
        ✖
      </div>
    </div>
  `;
}

function removeFromCart(itemId) {
  cartItems = cartItems.filter(cartItemId => cartItemId != itemId);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  loadCartItemObjects();
  displayCartIcon();
  displayCartItems();
  displayCartSummary();
}

