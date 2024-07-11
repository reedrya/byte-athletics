/*
Authors: Ryan Reed, Tyler Hinthorn
Citation for adding data with JavaScript using AJAX:
Copied from OSU CS340 (Intro to Databases) course: 
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// Get the objects we need to modify
let addProductForm = document.getElementById('add-product-form-ajax');

// Modify the objects we need
addProductForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputProductName = document.getElementById("input-product-name");
    let inputInventory = document.getElementById("input-inventory");
    let inputPrice = document.getElementById("input-price");
    let inputCategoryID = document.getElementById("input-category-ajax");
    let inputProductTypeID = document.getElementById("input-product-type-ajax");


    // Get the values from the form fields
    let productNameValue = inputProductName.value;
    let inventoryValue = inputInventory.value;
    let priceValue = inputPrice.value;
    let categoryIDValue = inputCategoryID.value;
    let productTypeIDValue = inputProductTypeID.value;


    // Put our data we want to send in a javascript object
    let data = {
        category_id: categoryIDValue,
        product_type_id: productTypeIDValue,
        product_name: productNameValue,
        inventory: inventoryValue,
        price: priceValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputProductName.value = '';
            inputInventory.value = '';
            inputPrice.value = ''
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("product-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 6 cells
    let row = document.createElement("TR");
    let productIDCell = document.createElement("TD");
    let categoryIDCell = document.createElement("TD");
    let productTypeIDCell = document.createElement("TD");
    let productNameCell = document.createElement("TD");
    let inventoryCell = document.createElement("TD");
    let priceCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    productIDCell.innerText = newRow.product_id;
    categoryIDCell.innerText = newRow.category_id;
    productTypeIDCell.innerText = newRow.product_type_id;
    productNameCell.innerText = newRow.product_name;
    inventoryCell.innerText = newRow.inventory;
    priceCell.innerText = newRow.price;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteProduct(newRow.product_id);
    };


    // Add the cells to the row 
    row.appendChild(productIDCell);
    row.appendChild(categoryIDCell);
    row.appendChild(productTypeIDCell);
    row.appendChild(productNameCell);
    row.appendChild(inventoryCell);
    row.appendChild(priceCell);

    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.product_id);
    
    // Add the row to the table
    currentTable.appendChild(row);
}