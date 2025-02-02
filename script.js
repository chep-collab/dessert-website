let cart = [];

// Function to add items to the cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartUI();
}

// Function to remove an item from the cart
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
}

// Function to update the cart display
function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = ''; // Clear previous items
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity} 
                        <button class="remove-item" onclick="removeFromCart('${item.name}')">Remove</button>
                        <button class="increase-qty" onclick="changeQuantity('${item.name}', 1)">+</button>
                        <button class="decrease-qty" onclick="changeQuantity('${item.name}', -1)">-</button>`;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to increase/decrease item quantity
function changeQuantity(name, delta) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(name);
        } else {
            updateCartUI();
        }
    }
}

// Show the modal for order confirmation
function showOrderModal() {
    const modal = document.getElementById('order-modal');
    modal.style.display = 'block';
}

// Close the modal
function closeModal() {
    const modal = document.getElementById('order-modal');
    modal.style.display = 'none';
}

// Start a new order (reset cart)
function startNewOrder() {
    cart = [];
    updateCartUI();
}

// Event listeners
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const menuItem = button.closest('.menu-item');
        const name = menuItem.getAttribute('data-name');
        const price = parseFloat(menuItem.getAttribute('data-price'));
        addToCart(name, price);
    });
});

document.getElementById('confirm-order').addEventListener('click', showOrderModal);
document.getElementById('close-modal').addEventListener('click', closeModal);
document.getElementById('close-order-modal').addEventListener('click', closeModal);
document.getElementById('start-new-order').addEventListener('click', startNewOrder);
