//News Subscribing
const newsForm = document.getElementById('newsletter-form');
const emailInput = document.getElementById('email-input');
const subscribeMessageModal = document.getElementById('subscribeMessageModal');

// Listen for the form submit event
newsForm?.addEventListener('submit', function (event) {
  // Prevent the form from actually submitting (page reload)
  event.preventDefault();
  subscribeMessageModal.style.display = 'block';
  const messageElement = document.getElementById('subscribeMessage');

  // Ensure the user entered a valid email
  if (emailInput.value && emailInput.validity.valid) {
    // Show a success message
    messageElement.textContent = 'Thank you for subscribing!';
  } else {
    // If the email is invalid, show an error message
    messageElement.textContent = 'Please enter a valid email address.';
  }
  setTimeout(() => {
    subscribeMessageModal.style.display = 'none';
  }, 800); // after 0.8 seconds
});

//Item Added
// Get all 'Add to Cart' buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const itemAddedModal = document.getElementById('itemAddedModal');

// Show modal when 'Add to Cart' button is clicked
addToCartButtons?.forEach((button) => {
  button.addEventListener('click', () => {
    itemAddedModal.style.display = 'block';
    // Automatically close
    setTimeout(() => {
      itemAddedModal.style.display = 'none';
    }, 800); // after 0.8 seconds
  });
});

// Close modal if user clicks outside of the modal
window.addEventListener('click', (event) => {
  if (event.target === itemAddedModal) {
    itemAddedModal.style.display = 'none';
  }
});

// Toggle mobile menu
document.querySelector('.menu-toggle')?.addEventListener('click', () => {
  // Add mobile menu functionality here
  console.log('Menu toggle clicked');
});

// Search functionality
document.querySelector('.search-bar button')?.addEventListener('click', () => {
  const searchInput = document.querySelector('.search-bar input');
  console.log('Search query:', searchInput.value);
});

// Shopping Cart Modal Functionality
const cartModal = document.getElementById('cartModal');
const clearCartModal = document.getElementById('clearCartModal');
const viewCartBtn = document.getElementById('viewCartBtn');
const closeBtn = document.querySelector('.close');
const clearCartBtn = document.getElementById('clearCartBtn');
const processOrderBtn = document.getElementById('processOrderBtn');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

let cart = [];

// Open modal
viewCartBtn?.addEventListener('click', () => {
  cartModal.style.display = 'block';
  updateCartDisplay();
});

// Close modal
closeBtn?.addEventListener('click', () => {
  cartModal.style.display = 'none';
});

// Close modal when clicking outside
window?.addEventListener('click', (event) => {
  if (event.target === cartModal) {
    cartModal.style.display = 'none';
  }
});

// Add to cart functionality
document.querySelectorAll('.add-to-cart-btn')?.forEach((button) => {
  button.addEventListener('click', (e) => {
    const productCard = e.target.closest('.product-card');
    const title = productCard.querySelector('h3').textContent;
    const price = 7; // Example price

    cart.push({ title, price });
    sessionStorage.setItem('cartItems', JSON.stringify(cart));
    updateCartDisplay();
  });
});

// Clear cart
clearCartBtn?.addEventListener('click', () => {
  const messageElement = document.getElementById('cartMessage');
  cartModal.style.display = 'none';
  if (cart.length > 0) {
    messageElement.textContent = 'Cart cleared!';
  } else {
    messageElement.textContent = 'No items to clear';
  }
  clearCartModal.style.display = 'block';
  cart = [];
  sessionStorage.setItem('cartItems', JSON.stringify(cart));
  setTimeout(() => {
    clearCartModal.style.display = 'none';
  }, 800); // after 0.8 seconds
});

//Item Message display Modal
const processMessageModal = document.getElementById('processMessageModal');

// Process order
processOrderBtn?.addEventListener('click', () => {
  const messageElement = document.getElementById('processMessage');
  if (cart.length > 0) {
    messageElement.textContent = 'Order processed successfully!';
    cart = [];
    updateCartDisplay();
  } else {
    messageElement.textContent = 'Your cart is empty!';
  }
  cartModal.style.display = 'none';
  processMessageModal.style.display = 'block';
  setTimeout(() => {
    processMessageModal.style.display = 'none';
  }, 800); // after 0.8 seconds
});

// Show modal when 'Add to Cart' button is clicked
function clearCartDisplay() {
  itemMessageModal.style.display = 'block';
  // Automatically close
  setTimeout(() => {
    itemMessageModal.style.display = 'none';
  }, 800); // after 0.8 seconds
}

// Show modal when 'Add to Cart' button is clicked
addToCartButtons?.forEach((button) => {
  button.addEventListener('click', () => {
    itemAddedModal.style.display = 'block';
    // Automatically close
    setTimeout(() => {
      itemAddedModal.style.display = 'none';
    }, 800); // after 0.8 seconds
  });
});

// Update cart display
function updateCartDisplay() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.style.padding = '10px';
    itemElement.style.borderBottom = '1px solid #eee';
    itemElement.innerHTML = `<div style="display: flex; justify-content: space-between; align-items: center;">
        <span>${item.title}</span>
        <span>$${item.price.toFixed(2)}</span>
      </div>`;
    cartItems.appendChild(itemElement);
    total += item.price;
  });

  cartTotal.textContent = total.toFixed(2);
}

// About Us Form
const contactForm = document.getElementById('contact-form');
const dialogMessageModal = document.getElementById('dialogMessageModal');

contactForm?.addEventListener('submit', function (event) {
  // Prevent the form from actually submitting (page reload)
  event.preventDefault();
  const messageElement = document.getElementById('dialogMessage');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const feedbackInput = document.getElementById('feedback');

  // Regular expressions for validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9]+$/;

  // Validation flags
  let isValid = true;
  let errorMessage = '';

  // Validate Name (not empty)
  if (!nameInput.value.trim()) {
    errorMessage += 'Name is required.\n';
    isValid = false;
  }

  // Validate Email (not empty and valid format)
  if (!emailInput.value.trim()) {
    errorMessage += 'Email is required.\n';
    isValid = false;
  } else if (!emailPattern.test(emailInput.value)) {
    errorMessage += 'Please enter a valid email address.\n';
    isValid = false;
  }

  // Validate Phone (optional but must be numbers if filled)
  if (phoneInput.value.trim() && !phonePattern.test(phoneInput.value)) {
    errorMessage += 'Phone number must contain only numbers.\n';
    isValid = false;
  }

  // Validate Feedback (not empty)
  if (!feedbackInput.value.trim()) {
    errorMessage += 'Feedback is required.\n';
    isValid = false;
  }

  // Display validation result
  if (isValid) {
    // If all validations pass, show success mesage
    messageElement.textContent = 'Thank you for your message!';
    messageElement.style.color = 'green';
    dialogMessageModal.style.display = 'block';

    // You can submit the form programmatically here if needed
    // contactForm.submit();
  } else {
    // If validation fails, show error message
    //alert(errorMessage); //
    messageElement.innerHTML =
      'Please correct the errors and try again.<br><br>' + errorMessage;
    messageElement.style.color = 'red';
    dialogMessageModal.style.display = 'block';
  }

  setTimeout(() => {
    dialogMessageModal.style.display = 'none';
  }, 800); // after 0.8 seconds
});
