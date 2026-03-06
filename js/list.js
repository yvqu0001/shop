const listContainer = document.querySelector(".list_container");
const breadcrumb = document.querySelector(".crumb_sec");
const filters = document.querySelector(".filters");
const sort = document.querySelector(".sort");

const category = new URLSearchParams(window.location.search).get("category");
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${category}`;
document.querySelector(".title").textContent = category;

let allData;
let part;

function getData() {
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      allData = part = data;
      showProducts(allData);
    });
}

function crumbSec() {
  console.log(category);
  breadcrumb.innerHTML += `
    <nav class="breadcrumb">
      <a href="index.html" class="small_button">Categories</a> > <a href="list.html?category=${category}" class="small_button">${category}</a>
    </nav>
  `;
  filters
    .querySelectorAll(".button")
    .forEach((button) => button.addEventListener("click", filter));
  sort
    .querySelectorAll(".button")
    .forEach((button) => button.addEventListener("click", sorting));
}

function filter(e) {
  const chosen = e.target.textContent;
  console.log(chosen);
  if (chosen == "All") {
    showProducts(allData);
  } else {
    part = allData.filter((element) => element.gender == chosen);
    showProducts(part);
  }
}

function sorting(e) {
  if (e.target.dataset.price) {
    const dir = e.target.dataset.price;
    if (dir == "up") {
      part.sort((a, b) => a.price - b.price);
    } else {
      part.sort((a, b) => b.price - a.price);
    }
  } else {
    const dir = e.target.dataset.text;
    if (dir == "az") {
      part.sort((a, b) =>
        a.productdisplayname.localeCompare(b.productdisplayname, "en"),
      );
    } else {
      part.sort((a, b) =>
        b.productdisplayname.localeCompare(a.productdisplayname, "en"),
      );
    }
  }
  showProducts(part);
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
                    <div class="info">

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
            </div>
        </article>
      </a>`;
  });

  listContainer.innerHTML = markup;
}

getData();
crumbSec();
