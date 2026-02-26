fetch(`https://kea-alt-del.dk/t7/api/categories`)
  .then((response) => response.json())
  .then((categories) => {
    console.log(categories);
    let markup = "";
    categories.forEach(
      (element) =>
        (markup += `
        <a href="list.html?category=${element.category}" class="button">${element.category}</a>
`),
    );
    document.querySelector(".grid_1_1_1").innerHTML = markup;
  });
