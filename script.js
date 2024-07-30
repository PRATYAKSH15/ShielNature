// script.js

const products = [
    { id: 1, name: "Eco-Friendly Toothbrush", price: 3, description: "Made from biodegradable materials.", image: "images/tooth.jpg" },
    { id: 2, name: "Reusable Shopping Bag", price: 5, description: "Durable and stylish, perfect for groceries.", image: "images/bagr.jpg" },
    { id: 3, name: "Organic Cotton T-Shirt", price: 15, description: "Soft, comfortable, and eco-friendly.", image: "images/tshirt.jpg" },
    { id: 4, name: "Bamboo Sunglasses", price: 25, description: "Sustainable and stylish sunglasses.", image: "images/bamboosun.jpg" },
    { id: 5, name: "Stainless Steel Bottle", price: 12, description: "Keep your drinks cold or hot for hours.", image: "images/steel.jpg" },
    { id: 6, name: "Biodegradable Phone Case", price: 20, description: "Protect your phone and the planet.", image: "images/phonecase.jpg" }
];

let cart = [];

function renderProducts() {
    const productContainer = document.querySelector('.product-list');
    productContainer.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <p class="product-description">${product.description}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productDiv);
    });
}

function renderCart() {
    const cartContainer = document.querySelector('.cart-list');
    const totalPriceEl = document.getElementById('totalPrice');
    cartContainer.innerHTML = '';
    let totalPrice = 0;
    cart.forEach(cartItem => {
        const product = products.find(p => p.id === cartItem.id);
        totalPrice += product.price * cartItem.quantity;
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price} x ${cartItem.quantity}</p>
            <button onclick="removeFromCart(${cartItem.id})">Remove</button>
        `;
        cartContainer.appendChild(cartItemDiv);
    });
    totalPriceEl.textContent = totalPrice;
}

function addToCart(id) {
    const existingCartItem = cart.find(item => item.id === id);
    if (existingCartItem) {
        existingCartItem.quantity += 1;
    } else {
        cart.push({ id, quantity: 1 });
    }
    renderCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

document.getElementById('checkoutButton').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Oops! No item selected.");
    } else {
        alert("Yay! Your items have been purchased.");
        cart.forEach(cartItem => {
            const product = products.find(p => p.id === cartItem.id);
            product.occupied = true;
        });
        cart = [];
        renderCart();
    }
});

document.getElementById('clearCartButton').addEventListener('click', () => {
    cart = [];
    renderCart();
});

// Slideshow
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 4000); // Change image every 4 seconds
}

renderProducts();
