// let app = document.querySelector(".product");


// async function Fun() {
//     let data = await fetch(`https://fakestoreapi.com/products`);
//     return data.json();
            
// }



// async function GetProducts() {
//     let products = await Fun();    
//     if (products) {
//         // console.log(products);
//         for (let i = 0; i < products.length; i++) {
//             // console.log(products[i].id);
//         //    let prods  = document.createElement('div');
//         //    prods.classList.add('prods');
//            let immg  = document.createElement('div');
//            immg.classList.add('immg');
//         //    prods.appendChild(immg);
//            let  img =  document.createElement('img');
//            img.src  = products[i].image;
//            immg.appendChild(img);
//            let immgtext  = document.createElement('div');
//            immgtext.classList.add('immg_text');
//            immg.appendChild(immgtext);
//            let  p = document.createElement('p');
//            p.classList.add('dets');
//            p.textContent = 'DETAIL'
//            immgtext.appendChild(p);
//            let ii = document.createElement('button');
//            ii.innerHTML = '🛒'
//            ii.classList.add('shop_btn');
//            immgtext.appendChild(ii)
//            app.appendChild(immg);
//             p.addEventListener('click', function(){
//                 localStorage.setItem('product_id',products[i].id);
//                 window.location.href = `/assets/pages/details.html?id=${products[i].id}`;
//             })
           
//         }
//     }
// }

// GetProducts()

document.addEventListener('DOMContentLoaded', () => {
    let app = document.querySelector(".product");

    async function fetchData(url) {
        try {
            let response = await fetch(url);
            return response.json();
        } catch (error) {
            console.error("Error fetching data:", error);
            return null;
        }
    }

    async function getProducts() {
        let products = await fetchData('https://fakestoreapi.com/products');

        if (products) {
            for (let i = 0; i < products.length; i++) {
                let immg = document.createElement('div');
                immg.classList.add('immg');

                let img = document.createElement('img');
                img.src = products[i].image;
                immg.appendChild(img);

                let immgtext = document.createElement('div');
                immgtext.classList.add('immg_text');
                immg.appendChild(immgtext);

                let p = document.createElement('p');
                p.classList.add('dets');
                p.textContent = 'DETAIL';
                immgtext.appendChild(p);

                let ii = document.createElement('button');
                ii.innerHTML = '🛒';
                ii.classList.add('shop_btn');
                immgtext.appendChild(ii);

                app.appendChild(immg);

                p.addEventListener('click', function () {
                    localStorage.setItem('product_id', products[i].id);
                    window.location.href = `/assets/pages/details.html?id=${products[i].id}`;
                });

                ii.addEventListener('click', function () {
                    addToCart(products[i]);
                });
            }
        }
    }

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        let existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ id: product.id, name: product.title, price: product.price, quantity: 1, img : product.image });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    getProducts();
});
