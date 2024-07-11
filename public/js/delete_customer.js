/*
Authors: Ryan Reed, Tyler Hinthorn
Citation for deleting data/rows with JavaScript using AJAX:
Copied from OSU CS340 (Intro to Databases) course: 
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// delete customer based on customer_id
function deleteCustomer(customer_id) {
    let link = '/delete-customer-ajax/';
    let data = {
        customer_id: customer_id
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(customer_id);
      }
    });
}

// delete row after above data is deleted
function deleteRow(customer_id) {
    let table = document.getElementById("customer-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == customer_id) {
            table.deleteRow(i);
            break;
        }
    }
}