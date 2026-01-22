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
  if (!cartSummaryElement) return;
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

  cartItemObjects = cartItems
    .map(itemId => {

      let allArrays = [
        products,
        men_Items,
        women_Items,
        footwear_Items,
        beauty_Items,
        electronics_Items,
        kids_Item
      ];

      for (let arr of allArrays) {
        let found = arr.find(item => item.id === itemId);
        if (found) return found;
      }

      return null;
    })
    .filter(item => item !== null);
}





/* ===============================
   DISPLAY CART ITEMS
================================ */
function displayCartItems() {
  let containerElement = document.querySelector('.cart-items-container');

  if (!containerElement) return;

  let innerHTML = "";

  cartItemObjects.forEach(product => {
    innerHTML += generateItemHTML(product);
  });

  containerElement.innerHTML = innerHTML;
}

/* ===============================
   GENERATE ITEM HTML
================================ */
function generateItemHTML(Product) {
  return `
    <div class="cart-item-container">
      <div class="item-left-part">
        <img class="cart-item-img" src="${Product.image}">
      </div>

      <div class="item-right-part">
        <div class="company">${Product.company}</div>
        <div class="item-name">${Product.item_name}</div>

        <div class="price-container">
          <span class="current-price">RS ${Product.current_price}</span>
          <span class="original-price">RS ${Product.original_price}</span>
          <span class="discount-percentage">
            (${Product.discount_percentage}% OFF)
          </span>
        </div>

        <div class="return-period">
          <span class="return-period-days">
            ${Product.return_period} days
          </span> return available
        </div>

        <div class="delivery-details">
          Delivery by
          <span class="delivery-details-days">
            ${Product.delivery_date}
          </span>
        </div>
      </div>

      <div class="remove-from-cart"
           onclick="removeFromCart('${Product.id}')">
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

