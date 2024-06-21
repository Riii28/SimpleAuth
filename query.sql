-- Active: 1718791620434@@127.0.0.1@5432@authdb
CREATE DATABASE authdb

CREATE TABLE users (
    id SERIAL PRIMARY key,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(50) NOT NULL
)

INSERT INTO users (username, email, password) VALUES (
    'Amelia Ramadani',
    'melia@gmail.com',
    'melia amel'
)

SELECT * FROM users


DROP TABLE users