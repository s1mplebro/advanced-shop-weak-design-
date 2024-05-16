const urlParams = new URLSearchParams(window.location.search);
let app = document.querySelector(".app__details");

const ProductNumber = urlParams.get("id");

console.log(ProductNumber);

async function Fun(str) {
    let data = await fetch(`https://fakestoreapi.com/products/${str}`);
    return data.json();
            
}


async function GetProducts() {
    let product = await Fun(ProductNumber);    
    if (product) {
    //   console.log(product['title']);
    console.log(product);
    let div  = document.createElement('div');
    div.classList.add('father');
    let div1  = document.createElement('div');
    div1.classList.add('left_son');
    let div2  = document.createElement('div');
    div2.classList.add('right_son');
    let img = document.createElement('img');
    img.src  = product['image'];
    div1.appendChild(img);
    let title = document.createElement('h1');
    title.textContent  = product['title']
    let descr = document.createElement('p');
    descr.textContent  = product['description']
    let category = document.createElement('h3');
    category.textContent = product['category']
    let  btn = document.createElement('button');
    btn.classList.add('btn_add')
    btn.innerHTML =  'Add to cart';
    
    div2.appendChild(title)
    div2.appendChild(descr)
    div2.appendChild(category);
    div2.appendChild(btn);
    
    btn.addEventListener('click', function () {
        addToCart(product);
    });
    app.appendChild(div1)
    app.appendChild(div2)
    }
}
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: product.id, name: product.title, price: product.price, quantity: 1,  img : product.image });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

GetProducts();


