// 1. Initialize the Cart from localStorage or start empty
let cart = JSON.parse(localStorage.getItem('my_shopping_cart')) || [];

// DOM Element Selections
const cartSidebar = document.getElementById('cart-sidebar');
const cartToggleBtn = document.getElementById('cart-toggle-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// 2. Add event listener to products grid
const productsGrid = document.getElementById('products-grid');

productsGrid.addEventListener('click', (event) => {

    // Check if clicked element is Add to Cart button
    if (event.target.classList.contains('add-to-cart-btn')) {

        const button = event.target;

        // Get product information from data attributes
        const productId = parseInt(button.getAttribute('data-id'));
        const productName = button.getAttribute('data-name');
        const productPrice = parseFloat(button.getAttribute('data-price'));

        // Add product to cart
        addToCartFromHTML(productId, productName, productPrice);
    }
});



// 3. Add product to cart
function addToCartFromHTML(id, name, price) {

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {

        // Increase quantity
        existingItem.quantity += 1;

    } else {

        // Add new product
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
}

// 4. Remove product from cart
function removeFromCart(productId) {

    cart = cart.filter(item => item.id !== productId);

    updateCart();
}

// 5. Update cart
function updateCart() {

    // Save cart to localStorage
    localStorage.setItem(
        'my_shopping_cart',
        JSON.stringify(cart)
    );

    // Calculate total items
    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    // Calculate total price
    const totalPrice = cart.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
    );

    // Update cart count
    if (cartCount) {
        cartCount.textContent = totalItems;
    }

    // Update total price
    if (cartTotal) {
        cartTotal.textContent = `₹${totalPrice.toFixed(2)}`;
    }

    // Display cart items
    if (cart.length === 0) {

        cartItemsContainer.innerHTML =
            '<p style="text-align:center; color:#888;">My cart is empty</p>';

    } else {

        cartItemsContainer.innerHTML = cart.map(item => `

            <div class="cart-item">

                <div>
                    <h4>${item.name}</h4>

                    <small>
                        ₹${item.price.toFixed(2)} × ${item.quantity}
                    </small>
                </div>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${item.id})">
                    ❌
                </button>

            </div>

        `).join('');
    }
}

// 6. Open cart sidebar
// Sidebar Drawer Control Triggers

if (cartToggleBtn) {

    cartToggleBtn.addEventListener('click', () => cartSidebar.classList.add('open'));

}

closeCartBtn.addEventListener('click', () => cartSidebar.classList.remove('open'));

//7.Login or Signup
function createAccount(event) { 
    event.preventDefault(); 
    alert("Account Created successfully!"); 
    window.location.href = "login.html"; 
}

// 8. Checkout button
if (checkoutBtn) {

    checkoutBtn.addEventListener('click', () => {

        if (cart.length === 0) {

            alert("Your cart is empty!");

        } else {

            alert("Thank you for your order! Clearing cart.");

            cart = [];

            updateCart();

            cartSidebar.classList.remove('open');
        }

    });

}

// 9. Load cart when page starts
updateCart();