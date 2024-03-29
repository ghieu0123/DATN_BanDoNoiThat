DROP DATABASE IF EXISTS ban_do_noi_that;

CREATE DATABASE IF NOT EXISTS ban_do_noi_that;

USE ban_do_noi_that;

-- create table: User
DROP TABLE IF EXISTS `User`;
CREATE TABLE `User`(
	`id`			INT AUTO_INCREMENT PRIMARY KEY,
    `username`	 	VARCHAR(50) NOT NULL UNIQUE CHECK (LENGTH(`username`) >= 5 AND LENGTH(`username`) <= 50),
    `email`			VARCHAR(50) NOT NULL UNIQUE CHECK (LENGTH(`email`) >= 6 AND LENGTH(`email`) <= 50),
    `password` 		VARCHAR(800) NOT NULL,
    `address`		VARCHAR(100) NOT NULL,
    `phone`			INT UNSIGNED NOT NULL,
    `firstName` 	NVARCHAR(50) NOT NULL,
	`lastName` 		NVARCHAR(50) NOT NULL,
    `role` 			ENUM('ADMIN','MANAGER','USER') DEFAULT 'USER',
    `status`		BOOLEAN DEFAULT 0 -- 0: Not Active, 1: Active
);

-- create table: Category
DROP TABLE IF EXISTS `Category`;
CREATE TABLE `Category`(
	`id`				INT AUTO_INCREMENT PRIMARY KEY,
	`categoryName`		VARCHAR(50) NOT NULL UNIQUE KEY
);

-- create table: Type
DROP TABLE IF EXISTS `Type`;
CREATE TABLE `Type`(
	`id`				INT AUTO_INCREMENT PRIMARY KEY,
	`TypeName`			VARCHAR(50) NOT NULL UNIQUE KEY
);

-- create table: Product
DROP TABLE IF EXISTS `Product`;
CREATE TABLE `Product`(
	`id`				INT AUTO_INCREMENT PRIMARY KEY,
    `name`				VARCHAR(100) NOT NULL UNIQUE KEY,
    `collection`		VARCHAR(50)	 NOT NULL,
    `size`				VARCHAR(50) NOT NULL,
    `typeId`			INT,
    `description`		TEXT NOT NULL,
    `material`			VARCHAR(50) NOT NULL,
    `price`				INT NOT NULL,
    `image`				TEXT NOT NULL,
    `categoryId`		INT,
	FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`typeId`) REFERENCES `Type`(`id`) ON DELETE SET NULL
);

-- create table: ShopOrder
DROP TABLE IF EXISTS `ShopOrder`;
CREATE TABLE `ShopOrder`(
	`id`				INT AUTO_INCREMENT PRIMARY KEY,
	`orderDate`			DATE NOT NULL,
    `totalPrice`		INT NOT NULL,
    `addressShipping`	VARCHAR(100) NOT NULL,
    `orderStatus`		BOOLEAN DEFAULT 0
);

-- create table: ShoppingCart
DROP TABLE IF EXISTS `ShoppingCart`;
CREATE TABLE `ShoppingCart`(
	`id`				INT AUTO_INCREMENT PRIMARY KEY,
	`shopOrderId`		INT NOT NULL,
    `userId`			INT NOT NULL,
    FOREIGN KEY (`shopOrderId`) REFERENCES `ShopOrder`(`id`),
    FOREIGN KEY (`userId`) REFERENCES `User`(`id`)
);

-- create table: ShoppingCartItem
DROP TABLE IF EXISTS `ShoppingCartItem`;
CREATE TABLE `ShoppingCartItem`(
	`id`				INT AUTO_INCREMENT PRIMARY KEY,
    `quantity`			INT UNSIGNED NOT NULL,
	`productId`			INT NOT NULL,
    `shoppingCartId`	INT NOT NULL,
    FOREIGN KEY (`productId`) REFERENCES `Product`(`id`),
    FOREIGN KEY (`shoppingCartId`) REFERENCES `ShoppingCart`(`id`)
);

-- create table: Payment
DROP TABLE IF EXISTS `Payment`;
CREATE TABLE `Payment`(
	`id`				INT AUTO_INCREMENT PRIMARY KEY,
	`paymentDate`		DATETIME NOT NULL DEFAULT NOW(),
    `userId`			INT NOT NULL,
    `shopOrderId`		INT UNIQUE NOT NULL,
    FOREIGN KEY (`shopOrderId`) REFERENCES `ShopOrder`(`id`),
    FOREIGN KEY (`userId`) REFERENCES `User`(`id`)
);

INSERT INTO `User` (`username`, `email`, `password`, `address`, `phone`, `firstName`, `lastName`, `role`, `status`)
VALUES 
('ghieu0123', 'ghieu0123@gmail.com', '123456', 'tp.Bac Ninh', 123456789, 'Hieu', 'Nguyen', 'ADMIN', 1),
('duchao', 'duchao@gmail.com', '123456', 'Tien du, Bac Ninh', 987654321, 'Hao', 'Nguyen', 'USER', 1),
('phanphong', 'phanphong@gmail.com', '123456', 'Lao Cai', 987654321, 'Phong', 'Phan', 'USER', 1),
('sontung', 'sontung@gmail.com', '123456', 'Luc Nam, Bac Giang', 123456789, 'tung', 'Nguyen', 'USER', 1),
('vuhai', 'vuhai@gmail.com', '123456', 'Tien du, Bac Ninh', 987654321, 'Hai', 'Vu', 'ADMIN', 1);

INSERT INTO `Category` (`categoryName`)
VALUES 
('Phòng ngủ'),
('Phòng ăn'),
('Phòng khách');

INSERT INTO `Type` (`typeName`)
VALUES 
('Giường'),
('Đèn'),
('Tủ'),
('Ghế'),
('Bàn'),
('Sofa');

INSERT INTO `Product` (`name`, `collection`, `size`, `typeId`, `description`, `material`, `price`, `image`, `categoryId`)
VALUES 
('Giường ngủ bọc vải Pio 1m8', 'Pio', 'D2000- R1800- C1000 mm', 1, 'Giường ngủ bọc vải Pio được thiết kế...', 'Gỗ Beech- Bọc vải', 21136000, 'image', 1),
('Giường ngủ gỗ Victoria 1m6', 'Victoria', 'D2000 - R1600 - C1160', 1, 'Giường ngủ gỗ với màu trắng nhẹ nhàng...', 'Gỗ Sồi kết hợp MDF veneer', 27115000, 'image', 1),
('Bàn đầu giường Pio', 'Pio', 'D500- R400 - C550', 5, 'Bàn đầu giường Pio giúp tạo điểm nhấn...', 'Gỗ Beech+ MDF Veneer thông', 5015000, 'image', 1),
('Đèn bàn Aria Marb Nickel', 'Nickel', 'D420 - R220 - C600mm', 2, 'Đèn bàn, đèn trang trí phòng khách, phòng ngủ...', 'Chụp vải - chân niken, đá marble', 15600000, 'image', 1),
('Đèn bàn Victoria', 'Victoria', 'D420 - R220 - C600mm', 2, 'Bàn đầu giường Cabo được thiết kế hình hộp chữ nhật...', 'MDF màu walnut', 7735000, 'image', 1),
('Tủ gỗ Victorya', 'Victoria', 'D2000 - R1200 - C2700mm', 3, 'Tủ với thiết kế sang trọng...', 'Gỗ Beech', 21160000, 'image', 1),
('Bàn Ăn', 'Summer Collection', 'M', 5, 'Comfortable cotton t-shirt for everyday wear', 'Cotton', 20, 'tshirt.jpg', 2),
('Tủ Bếp', '2024 Edition', 'N/A', 3, 'Best-selling novel by Author Name', 'Paperback', 15, 'book.jpg', 2),
('Ghế phòng ăn', 'Soft Toys Collection', 'Small', 4, 'Adorable teddy bear for children', 'Plush', 10, 'teddybear.jpg', 2),
('Sofa 3 chỗ Hung King', 'Living Room Collection', 'D1885 - R745 - C755 mm', 6, 'Comfortable sofa for your living room', 'Gỗ Beech tự nhiên, mây, bọc vải', 20315000, 'image', 3),
('Tủ Tivi Hung King', 'Living Room Collection', 'N/A', 3, 'Best-selling novel by Author Name', 'Paperback', 15, 'book.jpg', 3),
('Bàn nước Hung King', 'Living Room Collection', 'Small', 5, 'Adorable teddy bear for children', 'Plush', 10, 'teddybear.jpg', 3),
('Sofa ONA HER 3 chỗ da xanh S4', 'ONA', '3-seater', 6, 'Comfortable sofa for your living room', 'Fabric', 500, 'sofa.jpg', 3),
('Bàn nước Arena - Lớn', 'ONA', 'ONA', 5, 'A powerful smartphone with high-resolution camera', 'Plastic', 1000, 'smartphone.jpg', 3),
('Sofa 3 chỗ mẫu 1 vải 65', 6, 'M', 6, 'Comfortable cotton t-shirt for everyday wear', 'Cotton', 20, 'tshirt.jpg', 3),
('Bàn nước', 'Osaka', 'N/A', 5, 'Best-selling novel by Author Name', 'Paperback', 15, 'book.jpg', 3),
('Tủ Buffet', 'Osaka', 'Small', 3, 'Adorable teddy bear for children', 'Plush', 10, 'teddybear.jpg', 3);


INSERT INTO `ShopOrder` (`orderDate`, `totalPrice`, `addressShipping`, `orderStatus`)
VALUES 
('2024-01-05', 100, 'Hap Linh, Bac Ninh', 1),
('2024-01-21', 50, 'Hap Linh, Bac Ninh', 1),
('2024-02-22', 200, 'tp. Bac Ninh', 1),
('2024-02-23', 75, 'tp. Bac Giang', 1),
('2024-03-20', 150, 'Ha Noi', 1);

INSERT INTO `ShoppingCart` (`shopOrderId`, `userId`)
VALUES 
(1, 1),
(2, 1),
(3, 3),
(4, 4),
(5, 5);

INSERT INTO `ShoppingCartItem` (`quantity`, `productId`, `shoppingCartId`)
VALUES 
(2, 1, 1),
(1, 2, 1),
(3, 3, 3),
(1, 4, 4),
(2, 5, 5);

INSERT INTO `Payment` (`paymentDate`, `userId`, `shopOrderId`)
VALUES 
('2024-03-20 10:00:00', 1, 1),
('2024-03-21 11:00:00', 1, 2),
('2024-03-22 12:00:00', 3, 3),
('2024-03-23 13:00:00', 4, 4),
('2024-03-24 14:00:00', 5, 5);
