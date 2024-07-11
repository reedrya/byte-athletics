/*
Authors: Ryan Reed, Tyler Hinthorn
Citation for adding data with JavaScript using AJAX:
Copied from OSU CS340 (Intro to Databases) course: 
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// Get the objects we need to modify
let addInvoiceForm = document.getElementById('add-invoice-form-ajax');

// Modify the objects we need
addInvoiceForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerID = document.getElementById("input-customer-id");
    let inputDatePlaced = document.getElementById("input-date-placed");
    let inputTotalPrice = document.getElementById("input-total-price");
    let inputOrderStatus = document.getElementById("input-order-status");

    // Get the values from the form fields
    let customerIDValue = inputCustomerID.value;
    let datePlacedValue = inputDatePlaced.value;
    let totalPriceValue = inputTotalPrice.value;
    let orderStatusValue = inputOrderStatus.value;

    // Put our data we want to send in a javascript object
    let data = {
        customer_id: customerIDValue,
        date_placed: datePlacedValue,
        total_price: totalPriceValue,
        order_status: orderStatusValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-invoice-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCustomerID.value = '';
            inputDatePlaced.value = '';
            inputTotalPrice.value = '';
            inputOrderStatus.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// Invoices
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("invoice-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 5 cells
    let row = document.createElement("TR");
    let invoiceIDCell = document.createElement("TD");
    let customerIDCell = document.createElement("TD");
    let datePlacedCell = document.createElement("TD");
    let totalPriceCell = document.createElement("TD");
    let orderStatusCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    invoiceIDCell.innerText = newRow.invoice_id;
    customerIDCell.innerText = newRow.customer_id;
    datePlacedCell.innerText = newRow.date_placed;
    totalPriceCell.innerText = newRow.total_price;
    orderStatusCell.innerText = newRow.order_status;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "delete";
    deleteCell.onclick = function(){
        deletePerson(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(invoiceIDCell);
    row.appendChild(customerIDCell);
    row.appendChild(datePlacedCell);
    row.appendChild(totalPriceCell);
    row.appendChild(orderStatusCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.invoice_id);
    
    // Add the row to the table
    currentTable.appendChild(row);
}