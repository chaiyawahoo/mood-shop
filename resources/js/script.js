import data from "./data.js";

const itemsContainer = document.getElementById("items");

const cart = [];
const cartQty = document.getElementById("cart-qty");
const itemList = document.getElementById("item-list");
const cartTotal = document.getElementById("cart-total");

data.forEach(parseItems);

const allItemButtons = Array.from(document.querySelectorAll("button"));
allItemButtons.forEach(elt => elt.addEventListener("click", () => {
    const {name, price} = elt.dataset;
    addItem(name, price);
}));

itemList.onclick = function(e) {
    if (e.target) {
        const name = e.target.parentElement.parentElement.dataset.name;
        if (e.target.classList.contains("remove")) {
            removeItem(name);
        } else if (e.target.classList.contains("add-one")) {
            addItem(name);
        } else if (e.target.classList.contains("remove-one")) {
            removeItem(name, 1);
        }
    }
}

itemList.onchange = function(e) {
    if (e.target && e.target.classList.contains("update")) {
        const name = e.target.parentElement.parentElement.dataset.name;
        const qty = parseInt(e.target.value);
        updateItem(name, qty);
    }
}

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
    button.dataset.name = item.name;
    button.dataset.price = item.price;
    button.innerHTML = "Add to Cart";

    newDiv.appendChild(img);
    newDiv.appendChild(desc);
    newDiv.appendChild(price);
    newDiv.appendChild(button);
    itemsContainer.appendChild(newDiv);

    showItems();
}

function addItem(name, price) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].qty++;
            showItems();
            return;
        }
    }
    const item = {name, price, qty: 1};
    cart.push(item);
    showItems();
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
            showItems();
            return;
        }
    }
}

function updateItem(name, qty) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            if (qty < 1) {
                removeItem(name);
                return;
            }
            cart[i].qty = qty;
            showItems();
            return;
        }
    }
}

function showItems() {
    const qty = getQty();
    cartQty.innerHTML = `You have ${qty} items in your cart`;

    let itemStr = '';
    for (let i = 0; i < cart.length; i++) {
        const {name, price, qty} = cart[i];
        itemStr += `
        <li data-name="${name}">
            <p>${name} $${price} x ${qty} = $${(qty * price).toFixed(2)}</p>
            <div id="modify">
                <button class="remove">Remove</button>
                <button class="add-one"> + </button>
                <button class="remove-one"> - </button>
                <input class="update" type="number" min="0">
            </div>
        </li>`;
    }
    itemList.innerHTML = itemStr;

    const total = getTotal();
    cartTotal.innerHTML = `Total in cart: $${total}`;
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