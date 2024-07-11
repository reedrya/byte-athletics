/*
Authors: Ryan Reed, Tyler Hinthorn
Citation for deleting data with JavaScript using AJAX:
Copied from OSU CS340 (Intro to Databases) course: 
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// delete product type based on product_type_id
function deleteProductType(product_type_id) {
    let link = '/delete-product-type-ajax/';
    let data = {
        product_type_id: product_type_id
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(product_type_id);
      }
    });
  }
  
// delete row after above data is deleted
function deleteRow(product_type_id){
    let table = document.getElementById("product-type-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == product_type_id) {
            table.deleteRow(i);
            break;
        }
    }
}