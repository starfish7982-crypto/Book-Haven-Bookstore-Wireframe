//News Subscribing
const newsForm = document.getElementById('newsletter-form');
const emailInput = document.getElementById('email-input');
const emailError = document.getElementById('email-error');
const subscribeMessageModal = document.getElementById('subscribeMessageModal');

// Listen for the form submit event
newsForm?.addEventListener('submit', function (event) {
  // Prevent the form from actually submitting (page reload)
  event.preventDefault();
  const messageElement = document.getElementById('subscribeMessage');

  // Regular Expression for Email Validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Ensure the user entered a valid email
  if (emailInput.value && emailPattern.test(emailInput.value)) {
    emailError.style.display = 'none';
    emailInput.style.removeProperty('border-color');
    // Show a success message
    alert('Thank you for subscribing!');
    newsForm.reset();
  } else {
    // If the email is invalid, show an error message
    emailError.style.display = 'block';
    emailInput.style.borderColor = 'red';
  }
});

//Item Added
// Get all 'Add to Cart' buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const itemAddedModal = document.getElementById('itemAddedModal');

// Show modal when 'Add to Cart' button is clicked
addToCartButtons?.forEach((button) => {
  button.addEventListener('click', (e) => {
    const productCard = e.target.closest('.product-card');
    const title = productCard.querySelector('h3').textContent;
    alert('Item added to the cart:' + title);
  });
});

// Close modal if user clicks outside of the modal
window.addEventListener('click', (event) => {
  if (event.target === itemAddedModal) {
    itemAddedModal.style.display = 'none';
  }
});

// Toggle mobile menu
const toggleButton = document.querySelector('.navbar-toggle');
const navMenu = document.querySelector('.nav-menu');

toggleButton.addEventListener('click', () => {
  navMenu.classList.toggle('active');
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
    const price = 7; // Price

    cart.push({ title, price });
    updateCartDisplay();
  });
});

// Clear cart
clearCartBtn?.addEventListener('click', () => {
  if (cart.length > 0) {
    alert('Cart cleared!');
    // message = 'Cart cleared!';
  } else {
    alert('No items to clear');
    // message = 'No items to clear';
  }
  cart = [];
  updateCartDisplay();
});

// Process order
processOrderBtn?.addEventListener('click', () => {
  if (cart.length > 0) {
    // message = 'Thank you for your order!';
    alert('Thank you for your order!');
    cart = [];
    updateCartDisplay();
  } else {
    alert('Cart is empty!');
    // message = 'Cart is empty!';
  }
});

// Update cart display
function updateCartDisplay() {
  cartItems.innerHTML = '';
  let total = 0;
  sessionStorage.setItem('cartItems', JSON.stringify(cart));
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

const contactForm = document.getElementById('contact-form');

contactForm?.addEventListener('submit', function (event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const feedbackInput = document.getElementById('feedback');

  // Error message area
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('contact-email-error');
  const phoneError = document.getElementById('phone-error');
  const feedbackError = document.getElementById('feedback-error');

  // Regular Expressions
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9]+$/;

  // Reset Error Message
  nameError.textContent = '';
  emailError.textContent = '';
  phoneError.textContent = '';
  feedbackError.textContent = '';
  nameInput.classList.remove('error');
  emailInput.classList.remove('error');
  phoneInput.classList.remove('error');
  feedbackInput.classList.remove('error');

  // Verification Flag
  let isValid = true;

  // Verify Name (cannot be empty)
  if (!nameInput.value.trim()) {
    nameError.textContent = 'Name is required.';
    nameError.style.display = 'block';
    nameInput.classList.add('error');
    isValid = false;
  }

  // Verify Email (cannot be empty and must be in correct format)
  if (!emailInput.value.trim()) {
    emailError.textContent = 'Email is required.';
    emailError.style.display = 'block';
    emailInput.classList.add('error');
    isValid = false;
  } else if (!emailPattern.test(emailInput.value)) {
    emailError.textContent = 'Please enter a valid email address.';
    emailError.style.display = 'block';
    emailInput.classList.add('error');
    isValid = false;
  }

  // Verify Phone (optional, but must be a number if entered)
  if (phoneInput.value.trim() && !phonePattern.test(phoneInput.value)) {
    phoneError.textContent = 'Phone number must contain only numbers.';
    phoneError.style.display = 'block';
    phoneInput.classList.add('error');
    isValid = false;
  }

  // Verify Feedback (cannot be empty)
  if (!feedbackInput.value.trim()) {
    feedbackError.textContent = 'Feedback is required.';
    feedbackError.style.display = 'block';
    feedbackInput.classList.add('error');
    isValid = false;
  }

  // If all verifications are successful, a success message will be displayed.
  if (isValid) {
    localStorage.setItem('name', nameInput.value);
    localStorage.setItem('email', emailInput.value);
    localStorage.setItem('phone', phoneInput.value);
    localStorage.setItem('feedback', feedbackInput.value);

    alert('Thank you for your message.' + nameInput.value + '!');
    contactForm.reset();
  } else {
    alert('Please enter your name, email and feedback!');
  }
});
