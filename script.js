let productData = [];

// Accessing DOM Element
let productList = document.querySelector(".productList");
let appCartTrigger = document.querySelector(".appCartTrigger");
let appCart = document.querySelector(".appCart");
let closeCart = document.querySelector(".closeCart");
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










// showing cart

appCartTrigger.addEventListener("click", () => {
  appCart.classList.add("active");
});

// closing cart

closeCart.addEventListener("click", () => {
  appCart.classList.remove("active");
});
