/*
Authors: Ryan Reed, Tyler Hinthorn
Citation for adding data with JavaScript using AJAX:
Copied from OSU CS340 (Intro to Databases) course: 
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// Get the objects we need to modify
let addProductInvoiceForm = document.getElementById('add-product-invoice-form-ajax');

// Modify the objects we need
addProductInvoiceForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputInvoiceID = document.getElementById("input-invoice-id");
    let inputIProductID = document.getElementById("input-product-id");
    let inputTotalAmount = document.getElementById("input-total-amount");

    // Get the values from the form fields
    let invoiceIDValue = inputInvoiceID.value;
    let productIDValue = inputIProductID.value;
    let totalAmountValue = inputTotalAmount.value;

    // Put our data we want to send in a javascript object
    let data = {
        invoice_id: invoiceIDValue,
        product_id: productIDValue,
        total_amount: totalAmountValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-product-invoice-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputInvoiceID.value = '';
            inputIProductID.value = '';
            inputTotalAmount.value = '';
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
    let currentTable = document.getElementById("product-invoice-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 3 cells
    let row = document.createElement("TR");
    let invoiceIDCell = document.createElement("TD");
    let productIDCell = document.createElement("TD");
    let totalAmountCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    invoiceIDCell.innerText = newRow.invoice_id;
    productIDCell.innerText = newRow.product_id;
    totalAmountCell.innerText = newRow.total_amount;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "delete";
    deleteCell.onclick = function(){
        deletePerson(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(invoiceIDCell);
    row.appendChild(productIDCell);
    row.appendChild(totalAmountCell);

    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.invoice_id);
    
    // Add the row to the table
    currentTable.appendChild(row);
}