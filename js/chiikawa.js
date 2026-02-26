const traits = [
  {
    name: "Chiikawa",
    height: "small",
    color: "white",
    face: "cute",
    quote: ["jam babam", "ehh", "ahh"],
  },
  {
    name: "Hachiware",
    height: "medium",
    color: "blue",
    face: "cat",
    quote: ["nantokanare", "oi", "yabai"],
  },
  {
    name: "Usagi",
    height: "big",
    color: "yellow",
    face: "bunny",
    quote: ["una", "yaha", "biri"],
  },
];

const card = document.querySelector(".card");

function showTraits() {
  console.log("hello?");
  traits.forEach((trait) => {
    card.innerHTML += `
        <h1>${trait.name}</h1>
        <h2>${trait.height}</h2>
        <h3>${trait.color}</h3>
        <h4>${trait.face}</h4>
        <h5>${trait.quote.join(", ")}</h5>`;
  });
}

showTraits();
