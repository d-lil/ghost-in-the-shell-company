DROP DATABASE IF EXISTS twerkers_db;
CREATE DATABASE twerkers_db;

USE twerkers_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    department INT,
    salary INT NOT NULL,
    FOREIGN KEY(department) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager INT ON DELETE SET NULL,
    FOREIGN KEY(role_id) REFERENCES role(id)
    FOREIGN KEY(manager) REFERENCES employee(id)
);