DROP DATABASE IF EXISTS brocial_networkDB;
CREATE database brocial_networkDB;

USE brocial_networkDB;

CREATE TABLE bro (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  age INTEGER(100) NULL,
  height_inches INTEGER(100) NULL,
  weight DECIMAL(10,1) NULL,
  photo TEXT NULL,
  PRIMARY KEY (id)
);
