const listContainer = document.querySelector(".list_container");
const breadcrumb = document.querySelector(".crumb_sec");

const category = new URLSearchParams(window.location.search).get("category");
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${category}`;
document.querySelector(".title").textContent = category;

let allData;

function getData() {
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      allData = data;
      showProducts(allData);
    });
}

function crumb_sec() {
  console.log(category);
  breadcrumb.innerHTML += `<span class="flex">
    <nav class="breadcrumb">
      <a href="index.html">Categories</a> > <a href="list.html?category=${category}">${category}</a>
    </nav>
      <div>
        <button class="button">All</button>
        <button class="button">Unisex</button>
        <button class="button">Women</button>
        <button class="button">Men</button>  
      </div>
    </span>
  `;
  breadcrumb
    .querySelectorAll(".button")
    .forEach((button) => button.addEventListener("click", filter));
}

function filter(e) {
  const chosen = e.target.textContent;
  if (chosen == "All") {
    showProducts(allData);
  } else {
    const part = allData.filter((element) => element.gender == chosen);
    showProducts(part);
  }
}

function showProducts(products) {
  let markup = "";

  products.forEach((product) => {
    console.log(product.id, product.discount, product.gender);

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
crumb_sec();
