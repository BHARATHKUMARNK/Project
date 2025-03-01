// Global Cart Script

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to Add Item to Cart
function addToCart(name, price, image) {
    let button = event.target;
    
    let existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
        alert(`${name} is already in your cart!`);
        return;
    }

    // Change button text temporarily
    button.innerText = "✔ Added";
    button.style.background = "#28a745";
    setTimeout(() => {
        button.innerText = "Add to Cart";
        button.style.background = "linear-gradient(to right, #ff5733, #ff4500)";
    }, 2000);

    let product = { name, price, image };
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${name} added to cart!`);
}

// Function to Load Cart Items (for `cart.html`)
function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cart-container");
    let totalPriceElement = document.getElementById("total-price");

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty! 🛒</p>";
        totalPriceElement.innerText = "0";
        return;
    }

    let totalPrice = 0;

    cart.forEach((product, index) => {
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        let priceValue = parseFloat(product.price);
        totalPrice += priceValue;

        itemDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="cart-info">
                <h3>${product.name}</h3>
                <p>Price: ₹${priceValue}</p>
                <button class="remove-btn" onclick="removeFromCart(${index})">❌ Remove</button>
            </div>
        `;

        container.appendChild(itemDiv);
    });

    totalPriceElement.innerText = totalPrice.toFixed(2);
}

// Function to Remove Items from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartItems();
}

// Function to Proceed to Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty! 🛒");
        return;
    }

    let totalPrice = cart.reduce((sum, product) => sum + parseFloat(product.price), 0);

    localStorage.setItem("totalPrice", totalPrice.toFixed(2));
    window.location.href = "checkout.html";
}
