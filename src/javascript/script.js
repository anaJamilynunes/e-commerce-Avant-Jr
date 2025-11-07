const ArrProducts = [
    {
        id: 1,
        type: "Waffle",
        name: "Waffle with Berries",
        image: "src/img/image-waffle-desktop.jpg",
        price: "$6.50",
    },
        {
        id: 2,
        type: "Crème Brûlée",
        name: "Vanilla Bean Crème Brûlée",
        image: "src/img/image-creme-brulee-desktop.jpg",
        price: "$7.00",
    },
    {
        id: 3,
        type: "Macarron",
        name: "Macaron Mix of Five",
        image: "src/img/image-macaron-desktop.jpg",
        price: "$8.00",
    },
    {
        id: 4,
        type: "Tiramisu",
        name: "Classic Tiramisu",
        image: "src/img/image-tiramisu-desktop.jpg",
        price: "$5.50",
    },
    {
        id: 5,
        type: "Pistachio Baklava",
        name: "Waffle with Berries",
        image: "src/img/image-baklava-desktop.jpg",
        price: "$4.00",
    },
    {
        id: 6,
        type: "Pie",
        name: "Lemon Meringue Pie",
        image: "src/img/image-meringue-desktop.jpg",
        price: "$5.00",
    },
        {
        id: 7,
        type: "Cake",
        name: "Red Velvet Cake",
        image: "src/img/image-cake-desktop.jpg",
        price: "$4.50",
    },
    {
        id: 8,
        type: "Brownie",
        name: "Salted Caramel Brownie",
        image: "src/img/image-brownie-desktop.jpg",
        price: "$5.50",
    },
    {
        id: 9,
        type: "Panna Cotta",
        name: "Vanilla Panna Cotta",
        image: "src/img/image-panna-cotta-desktop.jpg",
        price: "$6.50",
    },

]

const body = document.querySelector("body"),
products = document.querySelector(".products");
productList = document.querySelector(".productList");
quantity = document.querySelector(".quantity");//REVER
total = document.querySelector(".totalPrice");
const div = document.createElement("div");
        div.classList.add("item");

let checkOutList = [];


function onInit(){
    ArrProducts.forEach((item, key) =>{
        let div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `
            <img src ="${item.image}" />
            <button style="justify-content: center; display: flex;" data-id="${item.id}" class="add-btn"> <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)">
        <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/>
        <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
                Add to Cart
            </button>
            <div class="type">${item.type}</div>
            <div style="color:hsl(14, 65%, 9%)" class="name"><b>${item.name}<b></div>
            <div style="color:hsl(14, 86%, 42%); class="price">${item.price}</div>
        `;
        products.appendChild(div);

        const addBtn = div.querySelector(".add-btn");
        addBtn.addEventListener("click", () => {
            addToCart(key);
            updateCartTitle();
            renderQuantityControls(div, key, 1);
        });
    });
}
onInit();

function renderQuantityControls(div, key, initialQty) {
    const quantityControl = document.createElement("div");
    quantityControl.classList.add("quantity-control");
    quantityControl.innerHTML = `
        <button type="button" class="minus person-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" fill="none" viewBox="0 0 10 2">
            <path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
        </button>
        <span class="quantity" style="color: white;">${initialQty}</span>
        <button type="button" class=" plus person-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
            <path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
        </button>
    `;

    const addBtn = div.querySelector(".add-btn");
    div.replaceChild(quantityControl, addBtn);

    const quantitySpan = quantityControl.querySelector(".quantity");
    const minusBtn = quantityControl.querySelector(".minus");
    const plusBtn = quantityControl.querySelector(".plus");

    plusBtn.addEventListener("click", () => {
        let quantity = parseInt(quantitySpan.textContent);
        quantity++;
        quantitySpan.textContent = quantity;
        checkOutList[key].quantity = quantity;
        reloadCart();
        dellCard();
    });

    minusBtn.addEventListener("click", () => {
        let quantity = parseInt(quantitySpan.textContent);
        if (quantity > 1) {
            quantity--;
            quantitySpan.textContent = quantity;
            checkOutList[key].quantity = quantity;
            reloadCart();
            dellCard();
        } else {
            delete checkOutList[key];
            reloadCart();
            div.replaceChild(addBtn, quantityControl);
            dellCard();
            //acInf();
        }
        
    });

    /*removeBtn.addEventListener("click", () => {
        let quantity = parseInt(quantitySpan.textContent);
        delete checkOutList[key];
        reloadCart();
        div.replaceChild(addBtn, quantityControl);
    });*/
}

function addToCart(Id){
    if (!checkOutList[Id]) {
        checkOutList[Id] = { ...ArrProducts[Id], quantity: 1 };
    } else {
        checkOutList[Id].quantity += 1;
    }

    reloadCart(); 
}


function updateCartTitle() {
    const cartTitle = document.querySelector(".cart .cTitle");
    let totalItems = 0;
    checkOutList.forEach((item) => {
        if (item) totalItems += item.quantity;
    });
    cartTitle.textContent = `Your Cart (${totalItems})`;
}

function reloadCart(){
    const productList = document.querySelector(".productList");
    const total = document.querySelector(".total");
    const cartTitle = document.querySelector(".cart .cTitle");
    const confirm = document.querySelector(".confirm");
    const cardDelivery = document.querySelector(".cardDelivery");

    productList.innerHTML = "";
    let count = 0;
    let totalPrice = 0;

    checkOutList.forEach((item, key) => {
        if (!item) return;
        count += item.quantity;
        totalPrice += parseFloat(item.price.replace("$", "")) * item.quantity;

        const li = document.createElement("li");
        li.innerHTML = `
            <div class="cart-item">
                <span>${item.name}</span>
            </div>
            <div  class="cart-item lItem">
                <span style="color: hsl(14, 86%, 42%); margin-right: 10px;"><b>${item.quantity}x</b></span>
                <span style=" margin-left: 5px; color: hsl(7, 20%, 60%)""> @${item.price}</span>
                <span style="color:hsl(12, 20%, 44%)"><b>$${(parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}</b></span>
                <button class="btn remBtn"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                <path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg> </button>
                <br></br>
            </div>
        `;
        productList.appendChild(li);   
});
            cartTitle.textContent = `Your Cart (${count})`;

total.innerHTML = `<h4>Total: $${totalPrice.toFixed(2)}</h4>`;

    cartTitle.textContent = `Your Cart (${count})`;

    total.innerHTML = 
    `<div class="marginC row">
    <span><p>Order Total</p></span>
    <p style="font-size: 20px;"><b >$${totalPrice.toFixed(2)}</b></p>
    </div>`;
    

    confirm.innerHTML = `
    <p style="justify-content: center; display: flex; margin-left: 5%;" class="tag cardDelivery"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><path fill="#1EA575" d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"/>
                <path fill="#1EA575" d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"/></svg>
                This is a <strong>carbon-neutral</strong> delivery</p>
    <button style="justify-content: center; display: flex; margin-left: 5%;" class="abrirCard btn btnConfirm">Confirm Order</button>
    `;
    
}

/*if (botaoAbrir) {
        botaoAbrir.addEventListener('click', abrirCard);
    }


confirm.addEventListener('click', (e) => {
    if (e.target.classList.contains('abrirCard')) {
        abrirCard();
    }
});*/

const delInf = document.getElementById("delInf");
const delTitle = document.getElementById("delTitle");
const delSvg = document.getElementById("delSvg");
const delCard = document.getElementById("delCard");
const imgBorda = document.getElementById("imgBorda");

delInf.addEventListener("click", () => {
    //delTitle.style.display = "none";
    //delSvg.style.display = "none";
    delTitle.style.display = (delTitle.style.display === "none") ? "block" : "none";
    delSvg.style.display = (delSvg.style.display === "none") ? "block" : "none";

    //delCard.style.display = (delCard.style.display === "block") ? "none" : "block";
});

function dellCard(){
    const existeItem = checkOutList.some(key => key); // há produto no carrinho?
    if (existeItem) {
        delCard.style.display = "block"; // mostra
    } else if(!existeItem){
        delCard.style.display = "none";  // esconde
    }
};

