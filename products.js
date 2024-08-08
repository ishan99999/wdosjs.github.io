const inputFields = document.querySelectorAll(".input_amount");
const cartButtons = document.querySelectorAll(".cart-button");
const itemPrices = document.querySelectorAll(".item-price");
const itemNames = document.querySelectorAll(".itemName");
const cartTable = document.getElementById("cartTable");
const cartBody = document.getElementById("cart-body");
const totalSection = document.getElementById("grand-total");
const clearButton = document.getElementById("clearButton");
clearButton.onclick = clearFunction;
let sum = 0;

cartButtons.forEach(cartButtonFunction);
clearButton.onclick = clearFunction;

function clearFunction() {
    cartTable.style.display = 'none';
    cartBody.innerHTML = '';  // Clear the cart items
    sum = 0;  // Reset the total sum to 0
    totalSection.textContent = `Rs.${sum.toFixed(2)}`;
    localStorage.removeItem('cartItems');  // Clear the localStorage cart items
    localStorage.removeItem('grandTotal');  // Clear the localStorage grand total
}


function cartButtonFunction(element, index) {
    element.onclick = getDetails.bind(this, index);
}

function getDetails(index) {
    let itemName = itemNames[index].textContent;
    let itemPrice = Number(itemPrices[index].textContent.slice(3)); 
    let itemQuantity = Number(inputFields[index].value);
    let total = itemPrice * itemQuantity;
    sum += total;

    if (itemQuantity > 0) {
        let newRow = cartBody.insertRow();
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);

        cell1.textContent = itemName;
        cell2.textContent = itemPrice.toFixed(2);
        cell3.textContent = itemQuantity;
        cell4.textContent = total.toFixed(2);
        totalSection.textContent = `Rs.${sum.toFixed(2)}`;
        updateCartVisibility();
    } else {
        alert("Please enter a valid quantity");
    }
}

function updateCartVisibility() {
    if (cartBody.rows.length === 0) {
        cartTable.style.display = 'none';
    } else {
        cartTable.style.display = 'table';
    }
}

// Call updatecartvisibility 
updateCartVisibility();

document.addEventListener('DOMContentLoaded', () => {
    const buyNowButton = document.querySelector('.buy-now');
    buyNowButton.addEventListener('click', proceedToCheckout);
});

function proceedToCheckout() {
    // Collect the cart details
    let cartItems = [];
    const cartBody = document.querySelector('#cart-body');
    for (let i = 0; i < cartBody.rows.length; i++) {
        let row = cartBody.rows[i];
        let itemName = row.cells[0].textContent;
        let itemPrice = row.cells[1].textContent;
        let itemQuantity = row.cells[2].textContent;
        let itemTotal = row.cells[3].textContent;

        cartItems.push({ itemName, itemPrice, itemQuantity, itemTotal });
    }

    // Store the cart details in local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('grandTotal', sum.toFixed(2)); // Ensure 'sum' is defined

    // Navigate to the checkout page
    window.location.href = 'checkout.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const saveFavouriteButton = document.getElementById('save-favourite');
    const applyFavouritesButton = document.getElementById('apply-favourites');
    const cartBody = document.getElementById('cart-body');
    const totalSection = document.getElementById('grand-total');

    // Save to Favourites
    saveFavouriteButton.addEventListener('click', () => {
        const cartItems = [];
        for (let i = 0; i < cartBody.rows.length; i++) {
            let row = cartBody.rows[i];
            let itemName = row.cells[0].textContent;
            let itemPrice = row.cells[1].textContent;
            let itemQuantity = row.cells[2].textContent;
            let itemTotal = row.cells[3].textContent;

            cartItems.push({ itemName, itemPrice, itemQuantity, itemTotal });
        }

        const orderData = {
            items: cartItems,
            total: totalSection.textContent.split("Rs.")[1].trim()
        };
        localStorage.setItem('favouriteOrder', JSON.stringify(orderData));
        alert('Order saved to favourites.');
    });

    // Apply Favourites
    applyFavouritesButton.addEventListener('click', () => {
        const favouriteOrder = JSON.parse(localStorage.getItem('favouriteOrder'));
        if (favouriteOrder) {
            cartBody.innerHTML = ''; // Clear the existing items in cart when favourites added
            favouriteOrder.items.forEach(item => {
                let newRow = cartBody.insertRow();
                let cell1 = newRow.insertCell(0);
                let cell2 = newRow.insertCell(1);
                let cell3 = newRow.insertCell(2);
                let cell4 = newRow.insertCell(3);

                cell1.textContent = item.itemName;
                cell2.textContent = item.itemPrice;
                cell3.textContent = item.itemQuantity;
                cell4.textContent = item.itemTotal;
            });
            totalSection.textContent = `Rs.${favouriteOrder.total}`;
            updateCartVisibility();
        } else {
            alert('No favourite order found.');
        }
    });
});
