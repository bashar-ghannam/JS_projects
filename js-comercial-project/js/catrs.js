
let productsDom = document.querySelector('.products');
let noProductsDom = document.querySelector('.noProducts');

function drawCartProductsUI(allProducts = []){
    if (JSON.parse(localStorage.getItem('productsInCart')).length === 0) 
        noProductsDom.innerHTML = "There is no items !!";
    let products = JSON.parse(localStorage.getItem('productsInCart')) || allProducts;
    let productUI = products.map( (item) => {
        return `
            <div class="product-item">
                <img src="${item.imageUrl}" alt="products" class="product-item-img"/>

                <div class="product-item-desc">
                    <h2> ${item.title} </h2>
                    <p>
                        Pre-order now to get access to our alpha and future releases!
                    </p>
                    <span> Size : ${item.desc} </span><br>
                    <span> Quantity : ${item.qty} </span>
                </div><!-- ./product-item-desc -->

                <div class="product-item-actions">
                    <button class="add-to-cart" onclick="removeItemFromCart(${item.id})">Remove From Cart</button>
                </div><!-- ./product-item-actions -->
            </div>  
        `;
    });
    productsDom.innerHTML =  productUI;
}
drawCartProductsUI();

function removeItemFromCart (id){
    let productsInCart = localStorage.getItem('productsInCart');
    if (productsInCart) {
        let items = JSON.parse(productsInCart);
        let filteredItem = items.filter((item) => item.id !== id);   
        localStorage.setItem('productsInCart',JSON.stringify(filteredItem));
        drawCartProductsUI(filteredItem);
    }
}
