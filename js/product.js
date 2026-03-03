const productId = new URLSearchParams(window.location.search).get("id");
const endpoint = `https://kea-alt-del.dk/t7/api/products/${productId}`;
const container = document.querySelector(".product_container");

function getData() {
  fetch(endpoint)
    .then((response) => response.json())
    .then(renderProduct);
}

function renderProduct(product) {
  console.log(product);
  container.innerHTML += `<nav class="breadcrumb">
        <a href="index.html">Categories</a> > <a href="list.html?category=${product.category}">${product.category}</a> >
        <span>${product.productdisplayname}</span>
      </nav>
      <article class="grid_1_1">
        <div class="img">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="Product image" />
            ${product.discount ? `<p class="procent">-${product.discount}%</p>  ` : ""}
               ${
                 product.soldout
                   ? `<div class="filter"></div>
            <h2 class="out_of_stock">Out of stock</h2>`
                   : ""
               }
          </div>
        <section>
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
            <p class="status">${product.soldout ? "Out of stock" : "In stock // Available for pickup"}</p>
          <button class="buy">${product.soldout ? "Notify me when in stock" : "Add to basket"}</button>
        </section>
      </article>
    
    `;
}

getData();
