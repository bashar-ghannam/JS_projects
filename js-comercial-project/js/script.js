// Defind Product
let productsDom = document.querySelector('.products');
let cartsProductsMenu = document.querySelector('.carts-products');
let cartsProductsDom = document.querySelector('.carts-products div');
let shoppingCartIcon = document.querySelector('.shoppingCart')
let badgeDom = document.querySelector('.badge');
let products = JSON.parse(localStorage.getItem('products'));


// open cart menu
shoppingCartIcon.addEventListener('click',openCartMenu);

// display products
let drawProductUI;
(drawProductUI = function (products = []){
    let productUI = products.map( (item) => {
        return `
            <div class="product-item">
                <img src="${item.imageUrl}" alt="products" class="product-item-img"/>

                <div class="product-item-desc">
                    <a onclick='saveItemData(${item.id})'> ${item.title} </a>
                    <p>
                        Pre-order now to get access to our alpha and future releases!
                    </p>
                    <span> Size : ${item.desc} </span>
                </div><!-- ./product-item-desc -->

                <div class="product-item-actions">
                    <button class="add-to-cart" onclick="addedToCart(${item.id})">Add To Cart</button>
                    <i class="favorite fa fa-heart" onclick="addedToFavorite(${item.id})"
                    style = "color: ${item.liked == true ? "red" : ""}"></i>
                </div><!-- ./product-item-actions -->
            </div>  
        `;
    });
    productsDom.innerHTML =  productUI;
})(products);

// Check If there is item in localStorage
let addedItem = localStorage.getItem('productsInCart') 
            ? JSON.parse(localStorage.getItem('productsInCart')) 
            : [];
if (addedItem){
    addedItem.map((item) => {
        cartsProductsDom.innerHTML += `<p> ${item.title} ${item.qty}</p>`;
    });
    badgeDom.style.display = "block";
    badgeDom.innerHTML = addedItem.length;
}


// Add To Cart
let allItems = [];
function addedToCart(id){
    if(localStorage.getItem('username')){
        let choosenItem = products.find( (item) => item.id === id );
        let items = allItems.find((item) => item.id === choosenItem.id);
        if (items) {
            choosenItem.qty += 1;     
        } else {
            allItems.push(choosenItem);
        }

        cartsProductsDom.innerHTML = "";
        allItems.forEach(item => {
            cartsProductsDom.innerHTML += `<p> ${item.title}  ${item.qty}</p>`;
        });

        addedItem = [...addedItem , choosenItem];
        let uniqueProducts = getUniqueArr(addedItem, "id");
        // jason.stringify() from object to string
        localStorage.setItem("productsInCart", JSON.stringify(uniqueProducts));

        let cartsProductLength = document.querySelectorAll('.carts-products div p');
        badgeDom.style.display = "block";
        badgeDom.innerHTML = cartsProductLength.length;
    } else {
        window.location = "login.html";
    }    
}


function getUniqueArr(arr, filterType){
    let unique = arr
                    .map((item) => item[filterType])
                    .map((item,i,final) => final.indexOf(item) === i && i)
                    .filter((item) => arr[item])
                    .map((item) => arr[item]);
    return unique;
}



// Open Cart Menu 
function openCartMenu () {
    if (cartsProductsDom.innerHTML != "")
        if (cartsProductsMenu.style.display == "block"){
            cartsProductsMenu.style.display = "none";
        }else{
            cartsProductsMenu.style.display = "block";}
}


function saveItemData (id) {
    localStorage.setItem('productId', id);
    window.location = "cartDetails.html";
}


// Search function 
let input = document.getElementById('search');

input.addEventListener("keyup", function(e){
    search(e.target.value, JSON.parse(localStorage.getItem('products')));
});
function search (title, myArray){
    let arr = myArray.filter ((item) => item.title.indexOf(title) !== -1);
    drawProductUI(arr);
}


// Add To Favorite
let favoriteItem = localStorage.getItem('productsFavorite') 
            ? JSON.parse(localStorage.getItem('productsFavorite')) 
            : [];
function addedToFavorite(id){
    if(localStorage.getItem('username')){
        let choosenItem = products.find( (item) => item.id === id );
        choosenItem.liked =true;
        favoriteItem = [...favoriteItem, choosenItem];
        let uniqueProducts = getUniqueArr(favoriteItem, "id");
        localStorage.setItem("productsFavorite", JSON.stringify(uniqueProducts));
        products.map((item) => {
            if (item.id === choosenItem.id) {
                item.liked = true;
            }
        });
        localStorage.setItem('products', JSON.stringify(products));
        drawProductUI(products);        
    } else {
        window.location = "login.html";
    }    
}