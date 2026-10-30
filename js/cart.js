
// DUA BOUTIQUE - SHOPPING CART SYSTEM

const CART_KEY = "duaBoutiqueCart";

// Get saved cart
function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

// Save cart
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Add product to cart
function addToCart(product) {
    const cart = getCart();

    const existingProduct = cart.find(
        item => item.id === product.id
    );

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart(cart);
    alert(product.name + " added to cart!");
}

// Display cart items
function displayCart() {
    const cart = getCart();

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartCount || !cartTotal) return;

    cartItems.innerHTML = "";

    let totalItems = 0;
    let totalAmount = 0;

    if (cart.length === 0) {
        cartItems.textContent = "Your cart is empty.";
    }

    cart.forEach((item, index) => {
        totalItems += item.quantity;
        totalAmount += item.price * item.quantity;

        const product = document.createElement("div");
        product.className = "cart-product";

        const name = document.createElement("h3");
        name.textContent = item.name;

        const price = document.createElement("p");
        price.textContent = "Price: Rs. " + item.price;

        const quantity = document.createElement("p");
        quantity.textContent = "Quantity: " + item.quantity;

        const increase = document.createElement("button");
        increase.textContent = "+";
        increase.onclick = () => changeQuantity(index, 1);

        const decrease = document.createElement("button");
        decrease.textContent = "-";
        decrease.onclick = () => changeQuantity(index, -1);

        const remove = document.createElement("button");
        remove.textContent = "Remove";
        remove.onclick = () => removeFromCart(index);

        product.append(name, price, quantity,
            increase, decrease, remove);

        cartItems.appendChild(product);
    });

    cartCount.textContent = totalItems;
    cartTotal.textContent = totalAmount;
}

// Change product quantity
function changeQuantity(index, change) {
    const cart = getCart();

    if (!cart[index]) return;

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart(cart);
    displayCart();
}

// Remove product
function removeFromCart(index) {
    const cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);
    displayCart();
}

// Load cart when page opens
document.addEventListener("DOMContentLoaded", displayCart);
                 
