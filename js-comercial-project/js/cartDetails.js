let products = JSON.parse(localStorage.getItem('products'));
let productId = localStorage.getItem('productId');
let itemDom = document.querySelector('.item-details');
let productDetails = products.find ((item) => item.id == productId);

itemDom.innerHTML = `
                    <img src="${productDetails.imageUrl}" alt="" srcset="">
                    <h2> ${productDetails.title} </h2>
                    <span> Size : ${productDetails.desc} </span><br>
                    <span> Quantity : ${productDetails.qty} </span>`;


