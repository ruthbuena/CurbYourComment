DROP DATABASE IF EXISTS brocial_networkDB;
CREATE database brocial_networkDB;

USE brocial_networkDB;

CREATE TABLE bro (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  age INTEGER(100) NULL,
  height_inches INTEGER(100) NULL,
  weight DECIMAL(10,1) NULL,
  photo VARCHAR(255) NULL,
  PRIMARY KEY (id)
);

INSERT INTO bro (name, age, height_inches, weight, photo)VALUES ("John Doe", 21, 65, 165, "https://www.google.com/imgres?imgurl=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F650718512311234560%2F56c7GFHj.jpg&imgrefurl=https%3A%2F%2Ftwitter.com%2Fvindefran&docid=0H30mubqgVFCXM&tbnid=OJ4fn8WpA5LgOM%3A&vet=10ahUKEwiymP2zgPHVAhVp3IMKHU5TB80QMwgnKAAwAA..i&w=512&h=512&bih=661&biw=1325&q=vinny%20defrancesco&ved=0ahUKEwiymP2zgPHVAhVp3IMKHU5TB80QMwgnKAAwAA&iact=mrc&uact=8");
