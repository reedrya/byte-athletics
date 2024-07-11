/*
Authors: Ryan Reed, Tyler Hinthorn
Citation for deleting data with JavaScript using AJAX:
Copied from OSU CS340 (Intro to Databases) course: 
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// delete invoice based on invoice_id
function deleteInvoice(invoice_id) {
    let link = '/delete-invoice-ajax/';
    let data = {
        invoice_id: invoice_id
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(invoice_id);
      }
    });
}

// delete row after above data is deleted
function deleteRow(invoice_id) {
    let table = document.getElementById("invoice-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == invoice_id) {
            table.deleteRow(i);
            break;
        }
    }
}