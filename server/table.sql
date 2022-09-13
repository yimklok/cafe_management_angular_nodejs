create table users(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    contectNumber varchar(20),
    email varchar(50),
    password varchar(250),
    status varchar(20),
    role varchar(20),
    UNIQUE (email)
)

insert into users(name,contactNumber,email,password,status,role) values('Admin','0977779688','mrklokkh@gmail.com','30072002','true','admin')


create table category(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
)


create table products(
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    categoryId INTEGER NOT NULL,
    description VARCHAR(255),
    price INTEGER,
    status VARCHAR(20),
    primary key(id)
)

create table bill(
    id INT NOT NULL AUTO_INCREMENT,
    uuid VARCHAR(200) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contactNumber VARCHAR(20) NOT NULL,
    paymentMethod VARCHAR(50) NOT NULL,
    total int NOT NULL,
    productDetails JSON DEFAULT NULL,
    createdBy VARCHAR(255) NOT NULL,
    primary key(id)
)