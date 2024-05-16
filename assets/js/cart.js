document.addEventListener('DOMContentLoaded', displayCart);

function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartDiv = document.getElementById('cart');
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
        
        sum  +=   cart[i].quantity;
        
        
    }
    let total = document.getElementById("total");
    total.innerHTML = sum;
    cartDiv.innerHTML = '';

    cart.forEach(item => {
        let productDiv = document.createElement('div');
        productDiv.classList.add('cart-item');

        let imgDiv = document.createElement('div');
        imgDiv.classList.add('cart-item-image');
        let img = document.createElement('img');
        img.src = item.img;
        imgDiv.appendChild(img);
        productDiv.appendChild(imgDiv);

        let detailsDiv = document.createElement('div');
        detailsDiv.classList.add('cart-item-details');
        let name = document.createElement('p');
        name.textContent = item.name;
        let price = document.createElement('p');
        price.textContent = `$${item.price.toFixed(2)}`;
        detailsDiv.appendChild(name);
        detailsDiv.appendChild(price);
        productDiv.appendChild(detailsDiv);

        let quantityDiv = document.createElement('div');
        quantityDiv.classList.add('cart-item-quantity');
        let decreaseBtn = document.createElement('button');
        decreaseBtn.textContent = '-';
        decreaseBtn.addEventListener('click', function () {
            updateQuantity(item.id, item.quantity - 1);
        });
        let quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity;
        quantityInput.min = '1';
        quantityInput.addEventListener('change', function () {
            updateQuantity(item.id, parseInt(quantityInput.value));
        });
        let increaseBtn = document.createElement('button');
        increaseBtn.textContent = '+';
        increaseBtn.addEventListener('click', function () {
            updateQuantity(item.id, item.quantity + 1);
        });
        quantityDiv.appendChild(decreaseBtn);
        quantityDiv.appendChild(quantityInput);
        quantityDiv.appendChild(increaseBtn);
        productDiv.appendChild(quantityDiv);

        let removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', function () {
            removeFromCart(item.id);
        });
        productDiv.appendChild(removeBtn);

        cartDiv.appendChild(productDiv);
    });
}

function updateQuantity(productId, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = cart.find(item => item.id === productId);

    if (product && newQuantity >= 1) {
        product.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let updatedCart = cart.filter(item => item.id !== productId);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    displayCart();
}

