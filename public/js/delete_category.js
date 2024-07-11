/*
Authors: Ryan Reed, Tyler Hinthorn
Citation for deleting data with JavaScript using AJAX:
Copied from OSU CS340 (Intro to Databases) course: 
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// delete category based on category_id
function deleteCategory(category_id) {
    let link = '/delete-category-ajax/';
    let data = {
        category_id: category_id
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(category_id);
      }
    });
  }
  
// delete row after above data is deleted
function deleteRow(category_id){
    let table = document.getElementById("category-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == category_id) {
            table.deleteRow(i);
            break;
        }
    }
}