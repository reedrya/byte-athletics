-- phpMyAdmin SQL Dump
-- version 5.2.1-1.el7.remi
-- https://www.phpmyadmin.net/

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_reedrya`
--

-- --------------------------------------------------------

--
-- Table structure for table `Categories`
--

CREATE OR REPLACE TABLE `Categories` (
  `category_id` int(11) NOT NULL,
  `sport` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` (`category_id`, `sport`) VALUES
(1, 'Football'),
(2, 'Baseball'),
(3, 'Soccer'),
(4, 'Basketball'),
(17, 'Hockey'),
(18, 'Volleyball');

-- --------------------------------------------------------

--
-- Table structure for table `Customers`
--

CREATE OR REPLACE TABLE `Customers` (
  `customer_id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `shipping_address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Customers`
--

INSERT INTO `Customers` (`customer_id`, `full_name`, `email`, `phone_number`, `shipping_address`) VALUES
(1, 'Bob Ross', 'realbobross@gmail.com', '9862416969', '123 Happy Accident Drive'),
(2, 'Tom Brady', 'tb12@yahoo.com', '1212121212', '283 Deflated Ball Avenue'),
(3, 'Steve McSteve', 'stevesquared@aol.com', '1234567890', '1544 Stevenson Street');

-- --------------------------------------------------------

--
-- Table structure for table `Invoices`
--

CREATE OR REPLACE TABLE `Invoices` (
  `invoice_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `date_placed` date NOT NULL,
  `total_price` decimal(9,2) NOT NULL,
  `order_status` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Invoices`
--

INSERT INTO `Invoices` (`invoice_id`, `customer_id`, `date_placed`, `total_price`, `order_status`) VALUES
(1, 1, '2020-09-17', 179.97, 'Delivered'),
(2, 2, '2023-08-12', 250.00, 'Shipped'),
(3, 3, '2021-03-20', 119.99, 'Purchased In Store');

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE OR REPLACE TABLE `Products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `inventory` int(11) NOT NULL,
  `price` decimal(9,2) NOT NULL,
  `category_id` int(11) NOT NULL,
  `product_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`product_id`, `product_name`, `inventory`, `price`, `category_id`, `product_type_id`) VALUES
(1, 'Air Jordans', 4, 119.99, 4, 0),
(2, 'Beavers Jersey', 9, 59.99, 1, 0),
(3, 'Soccer Ball', 23, 30.00, 3, 0),
(4, 'Football Pads', 12, 250.00, 1, 0),
(5, 'Baseball Glove', 19, 99.99, 2, 0),
(21, 'Beavers Soccer Ball', 50, 123.00, 3, 12),
(22, 'Jordan 4', 23, 250.00, 4, 11),
(23, 'Football', 100, 60.00, 1, 12),
(24, 'Official Game Ball', 16, 54.99, 4, 12),
(25, 'Baseball Cleats', 62, 90.00, 2, 11),
(26, 'Mitt', 4, 16.00, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Product_invoices`
--

CREATE OR REPLACE TABLE `Product_invoices` (
  `invoice_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `total_amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Product_invoices`
--

INSERT INTO `Product_invoices` (`invoice_id`, `product_id`, `total_amount`) VALUES
(1, 2, 3),
(2, 4, 1),
(3, 1, 1),
(2, 21, 14),
(3, 22, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Product_types`
--

CREATE OR REPLACE TABLE `Product_types` (
  `product_type_id` int(11) NOT NULL,
  `item_type` varchar(255) NOT NULL,
  `product_size` varchar(45) NOT NULL,
  `brand` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Product_types`
--

INSERT INTO `Product_types` (`product_type_id`, `item_type`, `product_size`, `brand`) VALUES
(1, 'Equipment', '12', 'Nike'),
(11, 'Shoes', '10', 'Puma'),
(12, 'Ball', '9', 'Nike');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `category_id` (`category_id`);

--
-- Indexes for table `Customers`
--
ALTER TABLE `Customers`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `customer_id` (`customer_id`);

--
-- Indexes for table `Invoices`
--
ALTER TABLE `Invoices`
  ADD PRIMARY KEY (`invoice_id`),
  ADD UNIQUE KEY `invoice_id` (`invoice_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`product_id`),
  ADD UNIQUE KEY `product_id` (`product_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `product_type_id` (`product_type_id`);

--
-- Indexes for table `Product_invoices`
--
ALTER TABLE `Product_invoices`
  ADD KEY `invoice_id` (`invoice_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `Product_types`
--
ALTER TABLE `Product_types`
  ADD PRIMARY KEY (`product_type_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Categories`
--
ALTER TABLE `Categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `Customers`
--
ALTER TABLE `Customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `Invoices`
--
ALTER TABLE `Invoices`
  MODIFY `invoice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `Product_types`
--
ALTER TABLE `Product_types`
  MODIFY `product_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Invoices`
--
ALTER TABLE `Invoices`
  ADD CONSTRAINT `Invoices_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`);

--
-- Constraints for table `Products`
--
ALTER TABLE `Products`
  ADD CONSTRAINT `Products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `Categories` (`category_id`),
  ADD CONSTRAINT `Products_ibfk_2` FOREIGN KEY (`product_type_id`) REFERENCES `Product_types` (`product_type_id`);

--
-- Constraints for table `Product_invoices`
--
ALTER TABLE `Product_invoices`
  ADD CONSTRAINT `Product_invoices_ibfk_1` FOREIGN KEY (`invoice_id`) REFERENCES `Invoices` (`invoice_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Product_invoices_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Products` (`product_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
