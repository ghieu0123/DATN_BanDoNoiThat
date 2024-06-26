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
    `phone`			VARCHAR(25) NOT NULL,
    `image`			TEXT,
    `firstName` 	NVARCHAR(50) NOT NULL,
	`lastName` 		NVARCHAR(50) NOT NULL,
    `role` 			ENUM('ADMIN','USER') DEFAULT 'USER',
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
    `collection`		VARCHAR(50),
    `size`				VARCHAR(50) NOT NULL,
    `typeId`			INT,
    `description`		TEXT NOT NULL,
    `material`			VARCHAR(50) NOT NULL,
    `price`				INT NOT NULL,
    `image`				TEXT,
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
    `orderStatus`		ENUM('NOT_PAY', 'PROCESSING','PAY') DEFAULT 'NOT_PAY',
    `userId`			INT,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE SET NULL
);

-- create table: ShoppingCart
DROP TABLE IF EXISTS `ShoppingCart`;
CREATE TABLE `ShoppingCart`(
	`id`				INT AUTO_INCREMENT PRIMARY KEY,
    `userId`			INT,
    `createdDate`		DATETIME NOT NULL DEFAULT NOW(),
    FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL
);

-- create table: ShoppingCartItem
DROP TABLE IF EXISTS `ShoppingCartItem`;
CREATE TABLE `ShoppingCartItem`(
	`id`				INT AUTO_INCREMENT PRIMARY KEY,
    `quantity`			INT UNSIGNED NOT NULL,
	`productId`			INT NOT NULL,
    `shoppingCartId`	INT,
    FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`shoppingCartId`) REFERENCES `ShoppingCart`(`id`) ON DELETE CASCADE
);

-- create table: ShoppingCartItem
DROP TABLE IF EXISTS `ShopOrderItem`;
CREATE TABLE `ShopOrderItem`(
	`id`				INT AUTO_INCREMENT PRIMARY KEY,
    `quantity`			INT UNSIGNED NOT NULL,
	`productId`			INT NOT NULL,
    `shopOrderId`		INT,
    FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`shopOrderId`) REFERENCES `ShopOrder`(`id`) ON DELETE CASCADE
);

-- create table: Payment
DROP TABLE IF EXISTS `Payment`;
CREATE TABLE `Payment`(
	`id`				INT AUTO_INCREMENT PRIMARY KEY,
	`paymentDate`		DATETIME NOT NULL DEFAULT NOW(),
    `userId`			INT NOT NULL,
    `shopOrderId`		INT UNIQUE NOT NULL,
    FOREIGN KEY (`shopOrderId`) REFERENCES `ShopOrder`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE
);

-- Create table Registration_User_Token
DROP TABLE IF EXISTS 	`Registration_User_Token`;
CREATE TABLE IF NOT EXISTS `Registration_User_Token` ( 	
	id 				INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	`token`	 		CHAR(36) NOT NULL UNIQUE,
	`userId` 		INT NOT NULL,
	`expiryDate` 	DATETIME NOT NULL,
     FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE
);

-- Create table Reset_Password_Token
DROP TABLE IF EXISTS 	`Reset_Password_Token`;
CREATE TABLE IF NOT EXISTS `Reset_Password_Token` ( 	
	id 				INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	`token`	 		CHAR(36) NOT NULL UNIQUE,
	`userId` 		INT NOT NULL, 
	`expiryDate` 	DATETIME NOT NULL,
     FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE
);



INSERT INTO `User` (`username`, `email`, `password`, `address`, `phone`, `firstName`, `lastName`, `role`, `status`)
VALUES 
('ghieu0123', 'ghieu0123@gmail.com', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'tp.Bac Ninh', '123456789', 'Hieu', 'Nguyen', 'ADMIN', 1),
('duchao', 'duchao@gmail.com', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Tien du, Bac Ninh', '987654321', 'Hao', 'Nguyen', 'ADMIN', 1),
('phanphong', 'phanphong@gmail.com', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Lao Cai', '987654321', 'Phong', 'Phan', 'USER', 1),
('sontung', 'sontung@gmail.com', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Luc Nam, Bac Giang', '123456789', 'tung', 'Nguyen', 'USER', 1),
('vuhai', 'vuhai@gmail.com', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Tien du, Bac Ninh', '987654321', 'Hai', 'Vu', 'ADMIN', 1);

INSERT INTO `Category` (`categoryName`)
VALUES 
('Bedroom'),
('DiningRoom'),
('LivingRoom');

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
('Giường ngủ bọc vải Pio 1m8', 'Pio', 'D2000- R1800- C1000 mm', 1, 'Giường ngủ bọc vải Pio 1m8 màu 10/WV094 được thiết kế bọc vải hoàn toàn với khung gỗ beech chắc chắn. Những chi tiết nhấn nhá tại đầu giường, gối đầu giường giúp nó trở nên lạ mắt và ấn tượng. Sử dụng chân thon gọn giúp phòng ngủ của bạn trở nên thông thoáng và thanh lịch hơn. Giường Pio là một lựa chọn sáng giá cho không gian phòng ngủ Bắc Âu- Hiện đại, với 2 kích thước lựa chọn: 1m6, 1m8, có các màu vải khác nhau để lựa chọn.', 'Gỗ Beech- Bọc vải', 21136000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789949/product_image/fnvlgcol9mnykeos16bu.jpg', 1),
('Giường ngủ gỗ Victoria 1m6', 'Victoria', 'D2000 - R1600 - C1160', 1, 'Giường ngủ gỗ Victoria 1m6 với màu trắng nhẹ nhàng, tạo một không gian trang nhã và tinh tế với các hoa văn chạm khắc mang phong cách cổ điển phương Tây. Giường được làm bằng gỗ Xà Cừ xử lý tinh tế, mang lại cảm giác thoái mái, thư giãn. Giường ngủ Victoria là một lựa chọn tối ưu cho phòng ngủ phong cách cổ điển.', 'Gỗ Sồi kết hợp MDF veneer', 27115000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789941/product_image/aa7yndiq6qjfiquvbkgb.jpg', 1),
('Bàn đầu giường Pio', 'Pio', 'D500- R400 - C550', 5, 'Một sản phẩm cộng thêm cho phòng ngủ của bạn. Bàn đầu giường Pio giúp tạo điểm nhấn và công năng. Hoàn thiện với màu nâu xám và điểm xuyến với màu ghi tạo tổng thể hài hòa. PIO – Vẻ đẹp yên bình giữa lối sống đô thị Pha trộn giữa phong cách scandinavian và sự mới lạ trong chọn lựa màu sắc, bộ sưu tập PIO toát lên vẻ đẹp nhẹ nhàng, thanh lịch và cũng rất gần gũi với thiên nhiên. PIO thể hiện lối sống của những người trẻ, biết chiêm nghiệm và thưởng ngoạn sự trở về bình yên giữa nhịp sống hiện đại.Thiết kế bởi những đường cong, điểm xuyến các chi tiết nhấn nhá bên cạnh sử dụng các vật liệu như gỗ beech, melamine marble...', 'Gỗ Beech+ MDF Veneer thông', 5015000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789930/product_image/agklrubkzbkucpdqm3qs.jpg', 1),
('Đèn bàn Aria Marb Nickel', 'Nickel', 'D420 - R220 - C600mm', 2, 'Đèn bàn, đèn trang trí phòng khách, phòng ngủ từ lâu không chỉ đơn thuần là giải pháp cung cấp ánh sáng, mà còn là một vật dụng nội thất trang trí giúp gia tăng tính thẩm mỹ, phong cách trong không gian của gia đình bạn. Đa dạng các mẫu đèn trang trí đẹp, kiểu dáng hiện đại để bạn tham khảo.', 'Chụp vải - chân niken, đá marble', 15600000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789920/product_image/d5jwfbdw8lzzuaeeq4kc.jpg', 1),
('Đèn bàn Victoria', 'Victoria', 'D420 - R220 - C600mm', 2, 'Đèn bàn, đèn trang trí phòng khách, phòng ngủ từ lâu không chỉ đơn thuần là giải pháp cung cấp ánh sáng, mà còn là một vật dụng nội thất trang trí giúp gia tăng tính thẩm mỹ, phong cách trong không gian của gia đình bạn. Đa dạng các mẫu đèn trang trí đẹp, kiểu dáng hiện đại để bạn tham khảo.', 'MDF màu walnut', 7735000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789907/product_image/nb365634upfsyotn9l6i.jpg', 1),
('Tủ gỗ Victoria', 'Victoria', 'D2000 - R1200 - C2700mm', 3, 'Tủ với thiết kế sang trọng, được làm bằng chất gỗ sồi đặc, cánh tủ đóng mở nhẹ nhàng nhờ thiết kế nam châm, chân tủ dễ dàng tháo lắp khi cần di chuyển, với đường nét gia công tỉ mỉ, tủ ly sẽ là điểm nổi bật cho phòng ăn nhà bạn', 'Gỗ Beech', 21160000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789898/product_image/qnf3z0hrwmysswmylmhx.jpg', 1),
('Bàn Ăn Bridge', 'Bridge', 'D1600 - R850 - C720 mm', 5, 'Bàn ăn gỗ Bridge được thiết kế đặc biệt từ gỗ sồi đặc. Kiểu dáng tối giản với những nét cong mềm mại, được xử lý tinh xảo mang tính thủ công cao mang lại sự tinh tế, sang trọng cho không gian. Màu sắc và vân gỗ của Bridge được chọn lựa kỹ lưỡng chính là điểm đặc sắc trong thiết kế bàn ăn Bridge nói riêng và những thiết kế cùng BST nói chung.', 'Gỗ sồi', 49590000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789887/product_image/mg5gdgi6ybpjq2wjgjjw.jpg', 2),
('Tủ Bếp Bridge', 'Bridge', 'N/A', 3, 'sự tinh xảo trong hoàn thiện, từng chi tiết, những đường cong, bề mặt gỗ sồi được thực hiện và chọn lựa vô cùng kỹ càng, để tạo ra một Bridge hoàn hảo, chạm đến tâm hồn đầy cảm xúc và yêu quý những giá trị lâu bền của gia chủ Việt.', 'Gỗ sồi', 49900000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789873/product_image/xfvkf3vymjskw3tsayru.jpg', 2),
('Ghế phòng ăn Boheme', 'Boheme', 'D450 - R400 - C900', 4, 'Ghế Boheme nhập khẩu từ Ý có kiểu dáng thanh mảnh sở hữu vẻ đẹp hiện đại theo phong cách Ý sang trọng. Sản phẩm được làm bằng khung kim loại rắn chắc và bọc da trắng tự nhiên', 'Da, Kim loại', 4000000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789862/product_image/axmcrrjmsdbuejmmkjof.jpg', 2),
('Sofa 3 chỗ Hung King', 'Hung King', 'D1885 - R745 - C755 mm', 6, 'Comfortable sofa for your living room, help you relax after hard working', 'Gỗ Beech tự nhiên, mây, bọc vải', 20315000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789847/product_image/k3lzbdvppiny74cuebbu.jpg', 3),
('Tủ Tivi Hung King', 'Hung King', 'D2000 - R550 - C562 mm', 3, 'Best-selling good by Nha dep. Tủ với thiết kế trang trọng giúp không gian chủ nhà thêm phần lịch sự, chất liệu gỗ Beech cùng tông màu hài hòa, tạo cảm giác thư thái cho phòng khách.', 'Gỗ Beech, MDF Veneer beech', 25000000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789836/product_image/aarzl7cwvcxmm5zncdty.jpg', 3),
('Bàn nước Hung King', 'Hung King', 'D1150 - R650 - C408 mm', 5, 'Phòng khách là không gian chính của ngôi nhà, là nơi sum họp gia đình. Bàn nước tạo nên sự trang nhã, lịch thiệp, đi cùng chất liệu gỗ Beech tạo ra một không gian đẹp góp phần mang lại những nguồn cảm hứng và nét sinh động cho không gian', 'Gỗ Beech, MDF Veneer beech', 15000000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789825/product_image/r2m8nbsjxylfkpti44mo.jpg', 3),
('Sofa 3 chỗ PENNY da cognac 509MB', 'PENNY', 'D2400 - R880 - C850', 6, 'Sự đơn giản, tinh tế, sang trọng và không kém phần nổi bật của chiếc sofa mang âm hưởng Scandinavian này với lần lượt các phiên bản màu từ tối tới sáng sẽ mang đến ấn tượng đặc sắc cho từng không gian. Thiết kế vuông vức, thanh mảnh nhẹ nhàng là tất cả những yếu tố thiết yếu hội tụ ở chiếc sofa này.', 'Chân kim loại sơn, nệm bọc da tự nhiên', 66000000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789814/product_image/wj1u6gfflqbacvqkdsry.jpg', 3),
('Bàn nước Arena', 'PENNY', 'D1500 - R750 - C450 mm', 5, 'Sự đơn giản, tinh tế, sang trọng và không kém phần nổi bật của chiếc bàn mang âm hưởng Scandinavian này với lần lượt các phiên bản màu từ tối tới sáng sẽ mang đến ấn tượng đặc sắc cho từng không gian. Thiết kế vuông vức, thanh mảnh nhẹ nhàng là tất cả những yếu tố thiết yếu hội tụ ở chiếc bàn này.', 'Mặt bàn gỗ Ash - Chân kim loại', 7812000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789802/product_image/sfe5gvlkxbdgjl6p6guq.jpg', 3),
('Sofa Bridge 3 chỗ hiện đại da đen', 'Bridge', 'D2100 - R900 - C750 mm', 6, 'Sofa Bridge 3 chỗ với phần khung ghế được làm từ gỗ sồi tự nhiên nhập khẩu từ Mỹ mang đến một thiết kế chắc chắn, bền vững theo thời gian. Điểm nhấn là phần tay vịn được gọt dũa tinh xảo với các đường vân gỗ cách điệu độc đáo. Những xúc chạm tinh tế sẽ được khơi nguồn khi chạm tay nhẹ lên bề mặt sản phẩm, vì chất liệu da tự nhiên cao cấp sẽ đem lại cảm giác mềm mại và chân thực. Sản phẩm có đa dạng lựa chọn với 3 màu sắc khác nhau: màu beige, màu cognac và màu đen. Sofa Bridge 3 chỗ là sản phẩm phù hợp cho không gian phòng khách sang trọng và tao nhã.', 'Khung ngoài từ gỗ sồi đặc tự nhiên nhập khẩu Mỹ', 115000000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789789/product_image/aqtv3qn74flc3ureqpxn.jpg', 3),
('Bàn nước Area', 'Area', 'D715 - R715 - C350mm', 5, 'Bàn nước Arena được thiết kế với bốn chân kim loại sơn đen kết hợp cùng hai thanh kim loại đan chéo nhau tạo thành tư thế trụ vững chắc. Mặt bàn tròn phủ da sang trọng với sự hòa quyện của hai tông màu đen và camel. Bao quanh bề mặt bàn là một lớp bọc phủ da camel được thiết kế ôm trọn mặt bàn giúp bảo vệ các vật bài trí nhỏ gọn, đồng thời, đây cũng là cách để tạo điểm nhấn cho không gian thêm hiện đại.', 'Chân kim loại - Da', 15000000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789780/product_image/yssx6xdq8y8wwbwkwemy.jpg', 3),
('Tủ Buffet', 'Area', 'D1800 - R400 - C815 mm', 3, 'Chưa có bài đánh giá.', 'Gỗ Oak - MDF veneer Oak - Inox 304 màu gold', 29300000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789765/product_image/mloh5gvrrs86467x5pay.jpg', 3),
('Giường ngủ gỗ Maxine 1m8', 'Maxine', 'D2000 - R1800 - C1260', 1, 'Giường ngủ gỗ Maxine 1m8 với đường nét hài hòa cùng thiết kế tinh xảo tạo vẻ ngoài sang trọng. Sản phẩm sử dụng khung gỗ hoàn thiện MDF veneer Walnut nên rất chắc chắn. Sản phẩm đem đến trải nghiệm thư giãn giúp bạn tận hưởng trọn vẹn giấc ngủ ngon.', 'Khung gỗ Okumi', 33000000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789455/product_image/woizcv5w2xph5xmza9gy.jpg', 1),
('Ghế xoay văn phòng Maxine', 'Maxine', 'D590 - R650 - C1160 mm', 4, 'Chưa có bài đánh giá.', 'lưng ghế ốp gỗ ép Walnut - nệm bọc da tổng hợp', 33600000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789445/product_image/jsv91hpgztcf6ya67e5f.jpg', 1),
('Bàn làm việc Maxine', 'Maxine', 'D1800-R750/1180-C750', 5, 'Một thiết kế bàn làm việc đẳng cấp cho không gian làm việc của bạn, Maxine sử dụng chất liệu da trên bề mặt, khung gỗ hoàn thiện mdf veneer nâu trầm sang trọng tạo cảm giác thư thái, nhẹ nhàng.', 'MDF veneer recon Walnut', 51000000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789435/product_image/h5r4wxin49qd79utfykr.jpg', 1),
('Bàn đầu giường Skagen', 'Skagen', 'D400-R320-C507', 5, 'Chưa có bài đánh giá.', 'Gỗ + MDF Veneer Walnut', 22700000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789427/product_image/jarktga4o5kmdvnwt8tk.jpg', 1),
('Bàn ăn 6 chỗ Coastal', 'Kazad', 'D1600 - R800 - C755 mm', 5, 'Bàn ăn Coastal được làm từ gỗ Ash, theo phong cách truyền thống và mang kết cấu vững chãi. Mặt bàn bằng phẳng với các đường vân tự nhiên, bốn cạnh được bo tròn mềm mại để tránh va chạm trong lúc sử dụng.', 'Gỗ Ash - MDF veneer Ash', 13600000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789407/product_image/s5zzwktz1zsve4lmlch6.jpg', 2),
('Ghế ăn Coastal KD1085-18', 'Kazad', 'D435 - R525 - C840 mm', 4, 'Coastal mang đậm chất Việt khi khéo léo dung hòa được những nét đẹp lấy cảm hứng từ miền duyên hải nước ta với các vật liệu cao cấp, lối thiết kế hiện đại. Ghế ăn Coastal với bốn chân gỗ chắc chắn, được bọc vải êm ái cùng thiết kế phù hợp với thể trạng người Việt.', 'Gỗ Ash - nệm bọc vải', 5200000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789401/product_image/rijvf9eg4btycvs2xxp4.jpg', 2),
('Bàn ăn Mây 1m8', 'Mây', 'D1800 - R900 - C740', 5, 'Bàn ăn Mây sử dụng đá marble trắng cùng thiết kế đặc biệt với kết cấu chân được đan xen vừa tạo độ vững chắc và điểm nhấn cho không gian phòng ăn. Ngoài ra, phần kính trên bề mặt giúp phô diễn vẻ đẹp của chất liệu mây.', 'Gỗ tần bì', 39300000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789395/product_image/j8pa6qxiorcorql36jee.jpg', 2),
('Ghế ăn không tay Elegance', 'Elegance', 'D430 - R505 - C790 mm', 4, 'Ghế Elegance được làm từ gỗ Tần bì Mỹ. Bề mặt ngồi được thiết kế tỉ mỉ với sự đan xen của những sợi dây thừng cao cấp nhập khẩu từ Đức. Với đặc điểm chống nước tốt cùng khả năng đàn hồi cao, sản phẩm hứa hẹn sẽ đem lại trải nghiệm thú vị cho người dùng.', 'Gỗ Ash (tần bì) đặc tự nhiên nhập khẩu từ Mỹ', 16300000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789385/product_image/txhndoy9kjv0srl2keeg.jpg', 3),
('Tủ tivi Mây', 'Mây', 'D1850- R420- C550 mm', 3, 'Chưa có bài đánh giá.', 'Gỗ Acacia- Mặt Laminate', 25300000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789365/product_image/kssmxiklqnxswdaslyk5.jpg', 3),
('Sofa Jadora 2.5 chỗ vải VACT4029', 'Jadora', 'D2200 - R1200 - C650/850 mm', 6, 'Sofa Jadora là sản phẩm được thiết kế và sản xuất bởi Nhà Xinh. Với kiểu dáng rộng rãi cùng đệm ngồi êm ái, Jadora hứa hẹn sẽ mang đến cho người dùng trải nghiệm thư thái nhất.', 'Khung gỗ - Nệm bọc vải 2 màu - 5 gối', 34300000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789355/product_image/nj9b9gurl8ayozbezz4h.jpg', 3),
('Bàn nước tròn Elegance', 'Elegance', 'Ø900- C550 mm', 5, 'Với chất liệu MDF bọc giả da cá đuối và 3 chân kim loại thanh mảnh nhưng vững vàng cho phòng khách thêm thoáng mà vẫn có nhiều không gian để tiếp khách. Thành bàn cao hơn mặt bàn giúp cho đồ vật khó bị rơi và việc vệ sinh cũng trở nên tiện lợi hơn.', 'Chân inox màu gold- MDF bọc giả da cá đuối', 13500000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789342/product_image/nmzkelfgis1usrc68zib.jpg', 3),
('Đèn bàn Gianfranco Vintage', 'Gianfranco', '170x410x630 mm', 2, 'Chưa có bài đánh giá.', 'Inox 304 màu gold', 32300000, 'http://res.cloudinary.com/dlvp8wjer/image/upload/v1716789320/product_image/pp8efelnxnd9uxwimppv.jpg', 3);

INSERT INTO `ShopOrder` (`orderDate`, `totalPrice`, `addressShipping`, `orderStatus`, `userId`)
VALUES 
('2024-01-05', 100000000, 'Hap Linh, Bac Ninh', 'PAY', 1),
('2024-01-21', 500000000, 'Hap Linh, Bac Ninh', 'PAY', 1),
('2024-02-22', 200000000, 'tp. Bac Ninh', 'PAY', 2),
('2024-02-23', 75000000, 'tp. Bac Giang', 'PAY', 3),
('2024-03-20', 15000000, 'Ha Noi', 'PAY', 4);

INSERT INTO `ShoppingCart` (`userId`, `createdDate`)
VALUES 
(1, '2024-01-05'),
(2, '2024-02-05'),
(3, '2024-03-05'),
(4, '2024-04-05'),
(5, '2024-05-05');

INSERT INTO `ShoppingCartItem` (`quantity`, `productId`, `shoppingCartId`)
VALUES 
(2, 1, 1),
(1, 2, 1),
(1, 2, 2),
(3, 3, 3),
(1, 4, 4),
(2, 5, 5);

INSERT INTO `ShopOrderItem` (`quantity`, `productId`, `shopOrderId`)
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
