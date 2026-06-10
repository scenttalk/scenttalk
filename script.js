// Sample perfume products
const products = [
    { id: 1, name: "Midnight Elegance", price: 89.99, description: "A sophisticated blend of dark florals and amber", emoji: "🌙" },
    { id: 2, name: "Summer Breeze", price: 79.99, description: "Fresh citrus and tropical notes", emoji: "☀️" },
    { id: 3, name: "Rose Garden", price: 84.99, description: "Romantic rose with hints of vanilla", emoji: "🌹" },
    { id: 4, name: "Ocean Mist", price: 74.99, description: "Clean aquatic fragrance with sea salt", emoji: "🌊" },
    { id: 5, name: "Spice Market", price: 94.99, description: "Warm spices with woody undertones", emoji: "🌶️" },
    { id: 6, name: "Lavender Dreams", price: 69.99, description: "Calming lavender with soft musk", emoji: "💜" },
    { id: 7, name: "Citrus Burst", price: 72.99, description: "Energizing lemon and grapefruit blend", emoji: "🍋" },
    { id: 8, name: "Vanilla Bliss", price: 81.99, description: "Smooth vanilla with caramel notes", emoji: "🍦" }
];

// Shopping cart
let cart = [];

// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
});

// Load and display products
function loadProducts() {
    const productGrid = document.getElementById('product-grid');
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    alert(`${product.name} added to cart!`);
    updateCart();
}

// Update cart display
function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty</p>';
        cartTotalSpan.textContent = '0.00';
        return;
    }
    
    let cartHTML = '<div style="max-height: 300px; overflow-y: auto;">';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartHTML += `
            <div style="padding: 1rem; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>${item.name}</strong><br>
                    $${item.price.toFixed(2)} x ${item.quantity}
                </div>
                <div>
                    <button onclick="removeFromCart(${index})" style="background: #e74c3c; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 3px;">Remove</button>
                </div>
            </div>
        `;
    });
    
    cartHTML += '</div>';
    cartItemsDiv.innerHTML = cartHTML;
    cartTotalSpan.textContent = total.toFixed(2);
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Setup event listeners
function setupEventListeners() {
    // Cart modal
    const cartLink = document.querySelector('.cart-link');
    const cartModal = document.getElementById('cart-modal');
    const closeBtn = document.querySelector('.close-btn');
    
    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        cartModal.style.display = 'block';
        updateCart();
    });
    
    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    // CTA button
    const ctaBtn = document.querySelector('.cta-btn');
    ctaBtn.addEventListener('click', () => {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
        } else {
            alert(`Processing payment for $${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}...`);
            // Here you would integrate with a payment gateway
        }
    });
}
