Database: open and run data file in MySql.

BackEnd(Java Spring boot):
  - Open with environment like: Intelij or Spring tool suite
  - My project use Maven + Java SE 17 + Java Spring version 3.2.1
  Library: + mysql-connector-java 8.0.24
           + lombok
           + cloudinary-http44 1.33.0
           + spring-boot-starter-mail
  You must change Mysql password before run file application. Changing in src/main/resources file application.properties: spring.datasource.password="My MySql password"
  
FrontEnd(ReactJS):
  Download and open FE folder with VScode. Create a new terminal, write and run "npm install". After installed all libraries(node module folder), run "npm start".
  Project will be run after 1 minute.

Prj Description: e-commerece website sell furniture item, add to cart, purchase by Vn Pay, upload image like profile image to Cloudinary, view Order for User and manager product and account for admin.
