document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('customer-form');
    const orderBody = document.getElementById('order-body');
    const orderGrandTotal = document.getElementById('order-grand-total');

    let cartItems = JSON.parse(localStorage.getItem('cartItems'));
    let grandTotal = localStorage.getItem('grandTotal');

    cartItems.forEach(item => {
        let newRow = orderBody.insertRow();
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);

        cell1.textContent = item.itemName;
        cell2.textContent = item.itemPrice;
        cell3.textContent = item.itemQuantity;
        cell4.textContent = item.itemTotal;
    });

    orderGrandTotal.textContent = `Rs.${grandTotal}`;

    // Handling the form submission
    form.addEventListener('submit', (event) => {
        const name = document.getElementById('name').value.trim();
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 2);
        const formattedDate = deliveryDate.toLocaleDateString();

        alert(`Thank you for your purchase, ${name}! Your order will be delivered by ${formattedDate}.`);
    });
});
