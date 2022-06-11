let productData = [];
let cartArray = [];
// Accessing DOM Element
let productList = document.querySelector(".productList");
let appCartTrigger = document.querySelector(".appCartTrigger");
let appCart = document.querySelector(".appCart");
let closeCart = document.querySelector(".closeCart");
let cartList = document.querySelector(".cartList");
let cartCount = document.querySelector(".cartCountBadge");
// Function for fetch data
fetchData();
async function fetchData() {
  let response = await fetch("/data.json");
  let data = await response.json();
  productData = [...data];
  populateData(productData);
}

//Defining  populateData function

function populateData(data) {
  let listHtml = data
    .map((itm) => {
      return `
        <div class="productItem">
                <div class="productPic">
                  <img src="/assets/${itm.image}" alt="">
                </div>
                <div class="productTitle">
                     <h2>${itm.title}</h2>
                </div>
                <div class="productMeta">
                  <div class="productInfo">               
                    <h4>${itm.price}</h4>
                  </div>
                  <div class="addToCart" data-id=${itm.id}>
                    <img src="/assets/add.svg" alt="">
                  </div>
                </div>
              </div>
        `;
    })
    .join("");
  productList.innerHTML = listHtml;
}

// Add to cart funtion

productList.addEventListener("click", addToCart);
function addToCart(e) {
  if (e.target.classList.contains("addToCart")) {
    let id = e.target.dataset.id;
    let itm = productData.find((val) => {
      return val.id === id;
    });

    let selectProductIndex = cartArray.findIndex((itm) => {
      return itm.id === id;
    });
    console.log(selectProductIndex);
    if (selectProductIndex === -1) {
      itm.count = 1;
      cartArray.push(itm);
    } else {
      cartArray[selectProductIndex].count++;
    }
    populateCart(cartArray);
    showCartCount(cartArray);
    console.log(cartArray);
  }
}
function populateCart(cartData) {
  let html = cartData
    .map((data) => {
      return `
                <div class="cartItem" data-id=${data.id}>
                    <div class="cartItemPic">
                        <img src="/assets/${data.image}" alt="">
                    </div>
                    <div class="cartItemInfo">
                        <h3>${data.title}</h3>
                        <h4>$${data.price}</h4>
                    </div>                    
                    <input type="number" value=${data.count}  class="cartItemCount" name="cartItemCount" id="">
                    <button class="cartRemoveItem" >
                        <img src="/assets/trash.svg" alt="">
                    </button>
                </div>
    
    `;
    })
    .join();
  cartList.innerHTML = html;
}

function showCartCount(data) {
  let count = data.reduce((acc, curr) => {
    return acc + curr.count;
  }, 0);
  cartCount.innerHTML=count
}
// showing cart

appCartTrigger.addEventListener("click", () => {
  appCart.classList.add("active");
});

// closing cart

closeCart.addEventListener("click", () => {
  appCart.classList.remove("active");
});
