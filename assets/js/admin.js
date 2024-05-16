document.addEventListener('DOMContentLoaded', function () {
    const productsList = document.getElementById('productsList');
    const addProductForm = document.getElementById('addProductForm');
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');
    const productCategoryInput = document.getElementById('productCategory');
    const productImageInput = document.getElementById('productImage');
    const addProductBtn = document.getElementById('addProductBtn');

    // Функция для загрузки списка товаров
    function loadProducts() {
        fetch('http://localhost:8000/products')
            .then(response => response.json())
            .then(data => {
                productsList.innerHTML = ''; // Очищаем список товаров перед обновлением

                data.forEach(product => {
                    const productItem = document.createElement('div');
                    productItem.classList.add('product-item');

                    const image = document.createElement('img');
                    image.src = product.image;
                    productItem.appendChild(image);

                    const name = document.createElement('p');
                    name.textContent = product.title;
                    productItem.appendChild(name);

                    const priceInput = document.createElement('input');
                    priceInput.type = 'number';
                    priceInput.value = product.price;
                    priceInput.classList.add('price-input');
                    productItem.appendChild(priceInput);

                    const categoryInput = document.createElement('input');
                    categoryInput.type = 'text';
                    categoryInput.value = product.category;
                    categoryInput.classList.add('category-input');
                    productItem.appendChild(categoryInput);

                    const updateButton = document.createElement('button');
                    updateButton.textContent = 'Update';
                    updateButton.addEventListener('click', function () {
                        updateProduct(product.id, priceInput.value, categoryInput.value);
                    });
                    productItem.appendChild(updateButton);

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.classList.add('delete-btn');
                    deleteButton.addEventListener('click', function () {
                        
                        deleteProduct(product.id);
                    });
                    productItem.appendChild(deleteButton);

                    productsList.appendChild(productItem);
                });
            })
            .catch(error => console.error('Ошибка:', error));
    }

    // Функция для добавления нового товара
    addProductBtn.addEventListener('click', function () {
        const productName = productNameInput.value.trim();
        const productPrice = parseFloat(productPriceInput.value);
        const productCategory = productCategoryInput.value.trim();
        const productImage = productImageInput.value.trim();

        if (productName && !isNaN(productPrice) && productCategory && productImage) {
            fetch('http://localhost:8000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: productName, price: productPrice, category: productCategory, image: productImage }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Новый товар добавлен:', data);
                    loadProducts(); 
                    // Очищаем поля ввода
                    productNameInput.value = '';
                    productPriceInput.value = '';
                    productCategoryInput.value = '';
                    productImageInput.value = '';
                })
                .catch(error => console.error('Ошибка:', error));
        } else {
            alert('Please fill in all fields correctly.');
        }
    });

  
    function updateProduct(productId, price, category) {
        fetch(`http://localhost:8000/products/${productId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ price, category }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Успех:', data);
                loadProducts(); // Перезагружаем список товаров после обновления
            })
            .catch(error => console.error('Ошибка:', error));
    }

 
    function deleteProduct(productId) {
        fetch(`http://localhost:8000/products/${productId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                console.log('Товар успешно удален.');
                loadProducts(); // Перезагружаем список товаров после удаления
            } else {
                console.error('Ошибка:', response.status);
            }
        })
        .catch(error => console.error('Ошибка:', error));
    }
    

   
    loadProducts();
});
