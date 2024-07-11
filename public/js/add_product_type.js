/*
Authors: Ryan Reed, Tyler Hinthorn
Citation for adding data with JavaScript using AJAX:
Copied from OSU CS340 (Intro to Databases) course: 
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// Get the objects we need to modify
let addProductTypeForm = document.getElementById('add-product-type-form-ajax');

// Modify the objects we need
addProductTypeForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputItemType = document.getElementById("input-item-type");
    let inputSize = document.getElementById("input-product-size");
    let inputBrand = document.getElementById("input-brand");

    // Get the values from the form fields
    let itemTypeValue = inputItemType.value;
    let sizeValue = inputSize.value;
    let brandValue = inputBrand.value;

    // Put our data we want to send in a javascript object
    let data = {
        item_type: itemTypeValue,
        product_size: sizeValue,
        brand: brandValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-product-type-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputItemType.value = '';
            inputSize.value = '';
            inputBrand.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// Product_types
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("product-type-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let productTypeIDCell = document.createElement("TD");
    let itemTypeCell = document.createElement("TD");
    let sizeCell = document.createElement("TD");
    let brandCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    productTypeIDCell.innerText = newRow.product_type_id;
    itemTypeCell.innerText = newRow.item_type;
    sizeCell.innerText = newRow.product_size;
    brandCell.innerText = newRow.brand;
    
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "delete";
    deleteCell.onclick = function(){
        deleteProductType(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(productTypeIDCell);
    row.appendChild(itemTypeCell);
    row.appendChild(sizeCell);
    row.appendChild(brandCell);

    // FOR DELETE
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.product_type_id);
    
    // Add the row to the table
    currentTable.appendChild(row);
}