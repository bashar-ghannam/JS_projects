
let productsDom = document.querySelector('.products');
let noProductsDom = document.querySelector('.noProducts');

function drawFavoriteProductsUI(allProducts = []){
    if (JSON.parse(localStorage.getItem('productsFavorite')).length === 0) 
        noProductsDom.innerHTML = "There is no items !!";
    let products = JSON.parse(localStorage.getItem('productsFavorite')) || allProducts;
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
                    <button class="add-to-cart">Remove From Favorite</button>
                </div><!-- ./product-item-actions -->
            </div>  
        `;
    });
    productsDom.innerHTML =  productUI;
}
drawFavoriteProductsUI();

// function removeItemFromCart (id){
//     let productsInCart = localStorage.getItem('productsInCart');
//     if (productsInCart) {
//         let items = JSON.parse(productsInCart);
//         let filteredItem = items.filter((item) => item.id !== id);   
//         localStorage.setItem('productsInCart',JSON.stringify(filteredItem));
//         drawFavoriteProductsUI(filteredItem);
//     }
// }
