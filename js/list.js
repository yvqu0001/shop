const listContainer = document.querySelector(".list_container");
const category = new URLSearchParams(window.location.search).get("category");
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${category}`;
document.querySelector(".title").textContent = category;

function getData() {
  fetch(endpoint)
    .then((response) => response.json())
    .then(showProducts);
}

function showProducts(products) {
  let markup = "";

  products.forEach((product) => {
    console.log(product.id, product.discount);

    markup += `   
      <a href="product.html?id=${product.id}" class="card_link">
        <article class="card ${product.soldout && "sold_out"} ${product.sale && "sale"}">
          <div class="img">  
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="Product image" class="img" />
             ${product.discount ? `<p class="procent">-${product.discount}%</p>  ` : ""}
               ${
                 product.soldout
                   ? `<div class="filter"></div>
            <h2 class="out_of_stock">Out of stock</h2>`
                   : ""
               }
          </div>
          <h3 class="brand">${product.brandname}</h3>
          <h2 class="name">${product.productdisplayname}</h2>
          <span class="flex">
            <h4 class="price">${Math.round(product.price - (product.price * product.discount) / 100)} kr.</h4>
            ${
              product.discount
                ? `<h4 class="price old_price">${product.price} kr.</h4>`
                : ""
            }
          </span>
        </article>
      </a>`;
  });

  listContainer.innerHTML = markup;
}

getData();
