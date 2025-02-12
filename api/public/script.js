// For Menu Toggle
let MenuItems = document.getElementById("MenuItems");
if (MenuItems) {
  MenuItems.style.maxHeight = "0px";

  function menutoggle() {
    if (MenuItems.style.maxHeight === "0px") {
      MenuItems.style.maxHeight = "200px";
    } else {
      MenuItems.style.maxHeight = "0px";
    }
  }
}

// For "Shop Now" Button Animation
const btn = document.getElementById("shopBtn");
if (btn) {
  const fullText = "Shop Now and Equip Yourself for Success!";
  let index = 0;

  function typeLetterByLetter() {
    if (index < fullText.length) {
      btn.innerHTML += fullText.charAt(index);
      index++;
      setTimeout(typeLetterByLetter, 100); // Delay between letters
    }
  }

  setTimeout(() => {
    btn.innerHTML = ""; // Clear the initial text
    index = 0; // Reset the index
    typeLetterByLetter(); // Start the typing effect
  }, 1000);
}

// For Image Fade In-Out Animation
const images = document.querySelectorAll(".gallery > img");
const totalImages = images.length;

function fadeInImages() {
  images.forEach((img, index) => {
    img.style.animation = `fadeIn 1s ease-in-out forwards`;
    img.style.animationDelay = `${index + 1}s`;
  });

  setTimeout(() => {
    fadeOutImages();
  }, totalImages * 1000 + 2000); // Wait for all images to fade in + 2 seconds
}

function fadeOutImages() {
  images.forEach((img) => {
    img.style.animation = `fadeOut 1s ease-in-out forwards`;
  });

  setTimeout(() => {
    resetImages();
  }, 1000);
}

function resetImages() {
  images.forEach((img) => {
    img.style.opacity = 0;
  });
  fadeInImages();
}

// Start the fade-in process
fadeInImages();

// Promotional Banner Close
document.addEventListener("DOMContentLoaded", () => {
  const closePromoBanner = document.querySelector(".close-promo-banner");
  const promoBanner = document.querySelector(".promo-banner");

  if (closePromoBanner && promoBanner) {
    closePromoBanner.addEventListener("click", () => {
      promoBanner.classList.add("hide");
    });
  }
});

// Cart functionality
function addToCart(image, name, price) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Check if the item already exists in the cart
  const existingItem = cartItems.find((item) => item.name === name);

  if (existingItem) {
    // Increment its quantity
    existingItem.quantity += 1;
  } else {
    cartItems.push({ image, name, price, quantity: 1 });
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  showSuccessMessage(name);
  displayCartItems();
}

function showSuccessMessage(name) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "success-message";
  messageDiv.innerText = `${name} added successfully!`;
  document.body.appendChild(messageDiv);

  setTimeout(() => {
    messageDiv.remove();
  }, 2000);
}

function updateQuantity(index, quantity) {
  if (quantity < 1 || quantity > 100) {
    alert("Please enter a quantity between 1 and 100");
    return;
  }

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems[index].quantity = parseInt(quantity);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  displayCartItems();
}

function removeFromCart(index) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  displayCartItems();
}

function displayCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartTable = document.getElementById("cartTable");
  const emptyCartMessage = document.getElementById("emptyCartMessage");
  const totalPriceSection = document.getElementById("totalPriceSection");

  let subtotal = 0;

  if (cartItems.length === 0) {
    cartTable.style.display = "none";
    emptyCartMessage.style.display = "block";
    totalPriceSection.style.display = "none";
  } else {
    cartTable.style.display = "table";
    emptyCartMessage.style.display = "none";
    totalPriceSection.style.display = "block";

    cartTable.innerHTML = `
      <tr>
        <th>Product</th>
        <th>Quantity</th>
        <th>Subtotal</th>
      </tr>
    `;

    cartItems.forEach((item, index) => {
      const itemSubtotal = item.price * item.quantity;
      subtotal += itemSubtotal;

      const row = `
        <tr>
          <td>
            <div class="cart-info">
              <img src="${item.image}" alt="${
        item.name
      }" width="100" height="100">
              <div>
                <p>${item.name}</p>
                <small>Price: Rs. ${item.price}</small><br>
                <a href="#" onclick="removeFromCart(${index})">Remove</a>
              </div>
            </div>
          </td>
          <td>
            <input type="number" min="1" max="100" value="${
              item.quantity
            }" onchange="updateQuantity(${index}, this.value)">
          </td>
          <td>Rs. ${itemSubtotal.toFixed(2)}</td>
        </tr>
      `;

      cartTable.innerHTML += row;
    });

    const tax = subtotal * 0.1;
    document.getElementById("subtotal").innerText =
      "Rs. " + subtotal.toFixed(2);
    document.getElementById("tax").innerText = "Rs. " + tax.toFixed(2);
    document.getElementById("total").innerText =
      "Rs. " + (subtotal + tax).toFixed(2);
  }
}

document.addEventListener("DOMContentLoaded", displayCartItems);

// Dynamic CSS Injection
const style = document.createElement("style");
style.innerHTML = `
  .cart-info {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .cart-details {
    display: flex;
    flex-direction: column;
  }

  .cart-details p {
    margin: 0;
  }

  @media only screen and (max-width: 800px) {
    .cart-info {
      flex-direction: column;
      align-items: flex-start;
    }

    .cart-details {
      margin-top: 10px;
    }
  }
`;
document.head.appendChild(style);



document.getElementById("placeorder").addEventListener("click", function () {
  const place = document.createElement("div");
  place.className = "success-place";

  place.innerHTML = `
    <h1 class="vollkorn-custom">Order Placed Successfully!</h1>
    <h5 class="bullet-points">We've sent you an email with the order details.</h5>
  `;

  document.body.appendChild(place);

  setTimeout(() => {
    place.remove();
  }, 2000);
});
