--orders page
--show order with an entered invoice_id from the textbox
SELECT * FROM Invoices WHERE invoice_id = :InvoiceIDInput

--add new order info
INSERT INTO Invoices(customer_id, product_id, date_placed, total_amount, total_price)
VALUES(:CustomerInput, :ProductInput, :DateInput, :AmountInput, :PriceInput);

--update order info
UPDATE Invoices SET customer_id = :CustomerInput, product_id = :ProductInput, date_placed = :DateInput,
total_amount = :AmountInput, total_price = :PriceInput;

------------------------------------------------------------------------------
--customers page
--show customer with an entered customer_id from the textbox
SELECT * FROM Customers WHERE full_name = :FullNameInput

--add new customer info
INSERT INTO Customers(full_name, email, phone_number, shipping_address)
VALUES(:FullNameInput, :EmailInput, :PhoneNumberInput, :AddressInput);

--


-----------------------------------------------------------------------------
--products page
--show products with a product_name entered from the textbox

SELECT * FROM Products WHERE product_name = :ProductNameInput

--add new product info
INSERT INTO Products(product_name, inventory, price, category_id, product_type_id)
VALUES(:ProductNameInput, :InventoryInput, :PriceInput, :CategoryInput, :ProductTypeInput);

--update product info
UPDATE Products SET product_name = :productNameInput, inventory = :InventoryInput, price = :PriceInput, 
category_id = :CategoryInput, product_type_id = :ProductTypeInput
WHERE product_id = :product_id_from_table;

--delete product
DELETE FROM Products WHERE product_id = :product_id_from_table;

---------------------------------------------------------------------------------
--Category page
--show category with a category_id entered from textbox
SELECT * FROM Categories WHERE sport = :SportInput

--add new category
INSERT INTO Categories(sport)
VALUES(:SportInput)

---------------------------------------------------------------------------------
--Product Types page
--Show product types by an entered product_type_id
SELECT * FROM Product_types WHERE item_type = :ItemTypeInput

--add new product type
INSERT INTO Product_types(item_type, product_size, brand)
VALUES(:ItemTypeInput, :ProductSizeInput, :BrandInput)
