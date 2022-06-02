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
                  <img src="/assets/prod003.png" alt="">
                </div>
                <div class="productTitle">
                     <h2>Hilary Perkins</h2>
                </div>
                <div class="productMeta">
                  <div class="productInfo">               
                    <h4>$67</h4>
                  </div>
                  <div class="addToCart" data-id="62873f85bab68bee4e164c4b">
                    <img src="/assets/add.svg" alt="">
                  </div>
                </div>
              </div>
        `;
    })
    .join("");
  productList.innerHTML = listHtml;
}

// showing cart

appCartTrigger.addEventListener("click", () => {
  appCart.classList.add("active");
});

// closing cart

closeCart.addEventListener("click", () => {
  appCart.classList.remove("active");
});
