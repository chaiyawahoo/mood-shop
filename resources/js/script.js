import data from "./data.js";

const itemsContainer = document.getElementById("items");
const cart = []

function parseItems(item) {
    let newDiv = document.createElement("div");
    newDiv.className = "item";

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

function addItem(name, price) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].qty++;
            return;
        }
    }
    const item = {name, price, qty: 1};
    cart.push(item);
}

function removeItem(name, qty=0) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            if (qty > 0) {
                cart[i].qty -= qty;
            }
            if (cart[i].qty < 1 || qty === 0) {
                cart.splice(i, 1);
            }
            return;
        }
    }
}

function showItems() {
    const qty = getQty()
    console.log(`You have ${qty} items in your cart`);

    for (let i = 0; i < cart.length; i++) {
        console.log(`- ${cart[i].name} $${cart[i].price} x ${cart[i].qty}`);
    }

    const total = getTotal()
    console.log(`Total in cart: $${total}`);
}

function getQty() {
    let qty = 0;
    for (let i = 0; i < cart.length; i++) {
        qty += cart[i].qty;
    }
    return qty;
}

function getTotal() {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].qty;
    }
    return total.toFixed(2);
}

data.forEach(parseItems);