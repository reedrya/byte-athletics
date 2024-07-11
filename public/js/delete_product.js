/*
Authors: Ryan Reed, Tyler Hinthorn
Citation for deleting data with JavaScript using AJAX:
Copied from OSU CS340 (Intro to Databases) course: 
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// delete product based on product_id
function deleteProduct(product_id) {
    let link = '/delete-product-ajax/';
    let data = {
        product_id: product_id
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(product_id);
      }
    });
  }
  
// delete row after above data is deleted
function deleteRow(product_id){
    let table = document.getElementById("product-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == product_id) {
            table.deleteRow(i);
            break;
        }
    }
}