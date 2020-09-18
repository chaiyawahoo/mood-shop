import data from "./data.js";

const itemsContainer = document.getElementById("items");

function parseItems(item) {
    let newDiv = document.createElement("div");
    newDiv.className = "items";

    let img = document.createElement("img");
    img.src = item.image;
    img.width = 300;
    img.height = 300;

    let desc = document.createElement("p");
    desc.innerText = item.desc;

    let price = document.createElement("p");
    price.innerText = item.price;

    let button = document.createElement("button");
    button.id = item.name;
    button.dataset.price = item.price;
    button.innerHTML = "Add to Cart";

    newDiv.appendChild(img);
    newDiv.appendChild(desc);
    newDiv.appendChild(price);
    newDiv.appendChild(button);
    itemsContainer.appendChild(newDiv);
}

data.forEach(parseItems);