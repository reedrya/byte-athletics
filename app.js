// Authors: Ryan Reed, Tyler Hinthorn
// SETUP, ROUTES, and LISTENER citation:
// Obtained from CS340 (Intro to Databases) OSU course:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

/*
    SETUP
*/
var express = require('express');                               // access express library
var app     = express();                                        // instantiate an express object

PORT        = 23080;                                            // set port num

// for handling JSON and form data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');                     // import express-handlebars
app.engine('.hbs', engine({ extname: ".hbs" }));                // Create an instance of the handlebars engine to process templates
const { query } = require('express');
app.set('view engine', '.hbs');                                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/

//********************************************************
// GET ROUTES
//********************************************************

// GET Customers
app.get('/customers', function (req, res) {

    let query1 = `SELECT Customers.customer_id, Customers.full_name, Customers.email, Customers.phone_number, Customers.shipping_address
                 FROM Customers`;

    // Run the 1st query
    db.pool.query(query1, function (error, rows, fields) {

        return res.render('customers', { data: rows });
    })
});

// GET Invoices
app.get('/invoices', function (req, res) {

    let query1 = `SELECT Invoices.invoice_id, Customers.customer_id, Invoices.date_placed, Invoices.total_price, Invoices.order_status
                     FROM Invoices
                     INNER JOIN Customers ON Invoices.customer_id = Customers.customer_id;`;

    let query2 = `SELECT * FROM Customers;`;

    // Run the 1st query
    db.pool.query(query1, function (error, rows, fields) {

        // Save the invoices
        let invoices = rows;

        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {

            // Save the customers
            let customers = rows;
            return res.render('invoices', { data: invoices, customers: customers });
        })                                                     
    })
});

// GET Product Types
app.get('/product_types', function (req, res) {

    let query1 = `SELECT Product_types.product_type_id, Product_types.item_type, Product_types.product_size, Product_types.brand
                 FROM Product_types`;

    db.pool.query(query1, function (error, rows, fields) {

        return res.render('product_types', { data: rows });
    })
});

// GET Categories
app.get('/categories', function (req, res) {

    let query1 = `SELECT Categories.category_id, Categories.sport 
                 FROM Categories`;

    db.pool.query(query1, function (error, rows, fields) {

        return res.render('categories', { data: rows });
    })
});

// GET Products
app.get('/products', function (req, res) {

    let query1 = `SELECT Products.product_id, Categories.category_id, Product_types.product_type_id, Products.product_name, Products.inventory, Products.price
                     FROM Products
                     INNER JOIN Categories ON Products.category_id = Categories.category_id 
                     INNER JOIN Product_types ON Products.product_type_id = Product_types.product_type_id`;               // Define our query

    let query2 = `SELECT * FROM Categories;`;

    let query3 = `SELECT * FROM Product_types;`;


    // Run the 1st query
    db.pool.query(query1, function (error, rows, fields) {

        // Save the products
        let products = rows;

        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {

            // Save the categories
            let categories = rows;

            // Run the third query
            db.pool.query(query3, (error, rows, fields) => {

                // Save the Product_types
                let product_types = rows;

                return res.render('products', { data: products, categories: categories, product_types: product_types });
            });
        });
    });
});

// GET Product Invoices
app.get('/product_invoices', function (req, res) {

    let query1 = `SELECT Invoices.invoice_id, Products.product_id, Product_invoices.total_amount
                     FROM Product_invoices
                     INNER JOIN Invoices ON Product_invoices.invoice_id = Invoices.invoice_id 
                     INNER JOIN Products ON Product_invoices.product_id = Products.product_id`;

    let query2 = `SELECT * FROM Invoices;`;

    let query3 = `SELECT * FROM Products;`;


    // Run the 1st query
    db.pool.query(query1, function (error, rows, fields) {

        // Save the product_invoices
        let product_invoices = rows;

        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {

            // Save the invoices
            let invoices = rows;

            // Run the third query
            db.pool.query(query3, (error, rows, fields) => {

                // Save the products
                let products = rows;

                return res.render('product_invoices', { data: product_invoices, invoices: invoices, products: products });
            });
        });
    });
});

//********************************************************
// POST ROUTES
//********************************************************

// POST ADD Invoice
app.post('/add-invoice-ajax', function (req, res) {
    // parse data to JS object
    let data = req.body;

    // capture NULL values
    let total_price = parseInt(data.total_price);
    if (isNaN(total_price)) {
        total_price = 'NULL'
    }

    // define query and run it through database
    let add_invoice = `INSERT INTO Invoices (customer_id, date_placed, total_price, order_status) 
                       VALUES (${data.customer_id}, '${data.date_placed}', ${total_price}, '${data.order_status}')`;

    db.pool.query(add_invoice, function (error, rows, fields) {

        // if error present
        if (error) {
            // output error to terminal
            console.log(error)
            // bad request
            res.sendStatus(400);
        }
        else {
            // if no error, display invoices data
            let query2 = `SELECT * FROM Invoices;`;
            db.pool.query(query2, function (error, rows, fields) {

                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                // send the results of the query
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// POST ADD Customer
app.post('/add-customer-ajax', function (req, res) {
    let data = req.body;

    let add_customer = `INSERT INTO Customers (full_name, email, phone_number, shipping_address) VALUES ('${data.full_name}', '${data.email}', '${data.phone_number}', '${data.shipping_address}')`;

    db.pool.query(add_customer, function (error, rows, fields) {

        if (error) {
            
            console.log(error)
            res.sendStatus(400);
        }
        else {
            let query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                // send the results of query
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// POST ADD Product Type
app.post('/add-product-type-ajax', function (req, res) {
    let data = req.body;

    let add_product_type = `INSERT INTO Product_types (item_type, product_size, brand) VALUES ('${data.item_type}', ${data.product_size}, '${data.brand}')`;

    db.pool.query(add_product_type, function (error, rows, fields) {

        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else {
            let query2 = `SELECT * FROM Product_types;`;
            db.pool.query(query2, function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// POST ADD Category
app.post('/add-category-ajax', function (req, res) {
    let data = req.body;

    query1 = `INSERT INTO Categories (sport) VALUES ('${data.sport}')`;
    db.pool.query(query1, function (error, rows, fields) {

        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else {
            query2 = `SELECT * FROM Categories;`;
            db.pool.query(query2, function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// POST ADD Product
app.post('/add-product-ajax', function (req, res) {
    let data = req.body;

    query1 = `INSERT INTO Products (category_id, product_type_id, product_name, inventory, price) VALUES (${data.category_id}, ${data.product_type_id}, '${data.product_name}', ${data.inventory}, ${data.price})`;
    db.pool.query(query1, function (error, rows, fields) {

        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else {
            query2 = `SELECT * FROM Products;`;
            db.pool.query(query2, function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// POST ADD Product Invoice
app.post('/add-product-invoice-ajax', function (req, res) {
    let data = req.body;

    query1 = `INSERT INTO Product_invoices (invoice_id, product_id, total_amount) VALUES (${data.invoice_id}, ${data.product_id}, ${data.total_amount})`;
    db.pool.query(query1, function (error, rows, fields) {

        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else {
            query2 = `SELECT * FROM Product_invoices;`;
            db.pool.query(query2, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

//********************************************************
// DELETE ROUTES
//********************************************************

// DELETE Invoice
app.delete('/delete-invoice-ajax/', function (req, res, next) {
    let data = req.body;
    let invoice_id = parseInt(data.invoice_id);
    let deleteInvoices = `DELETE FROM Invoices WHERE invoice_id = ?`;

    db.pool.query(deleteInvoices, [invoice_id], function (error, rows, fields) {
        if (error) {

            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.sendStatus(204);
        }
    })
});

// DELETE Customer
app.delete('/delete-customer-ajax/', function (req, res, next) {
    let data = req.body;
    let customer_id = parseInt(data.customer_id);
    let deleteCustomers = `DELETE FROM Customers WHERE customer_id = ?`;

    db.pool.query(deleteCustomers, [customer_id], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.sendStatus(204);
        }
    })
});

// DELETE Product Type
app.delete('/delete-product-type-ajax/', function (req, res, next) {
    let data = req.body;
    let product_type_id = parseInt(data.product_type_id);
    let deleteCustomers = `DELETE FROM Product_types WHERE product_type_id = ?`;

    db.pool.query(deleteCustomers, [product_type_id], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.sendStatus(204);
        }
    })
});

// DELETE Category
app.delete('/delete-category-ajax/', function (req, res, next) {
    let data = req.body;
    let category_id = parseInt(data.category_id);
    let deleteCategory = `DELETE FROM Categories WHERE category_id = ?`;


    db.pool.query(deleteCategory, [category_id], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.sendStatus(204);
        }
    })
});

// DELETE Product
app.delete('/delete-product-ajax/', function (req, res, next) {
    let data = req.body;
    let product_id = parseInt(data.product_id);
    let deleteProduct = `DELETE FROM Products WHERE product_id = ?`;


    db.pool.query(deleteProduct, [product_id], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.sendStatus(204);
        }
    })
});

// DELETE Product Invoice
app.delete('/delete-product-invoice-ajax/', function (req, res, next) {
    let data = req.body;
    let invoiceID = parseInt(data.invoice_id);
    let deleteInvoiceID = `DELETE FROM Product_invoices WHERE invoice_id = ?`;
    let deleteProductID = `DELETE FROM Product_invoices WHERE product_id = ?`;

    db.pool.query(deleteInvoiceID, [invoiceID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }

        else {
            db.pool.query(deleteProductID, [product_id], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.sendStatus(204);
                }
            })
        }
    })
});

/*
    LISTENER
*/
app.listen(PORT, function () {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
