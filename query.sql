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

CREATE TABLE user_choices (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    choice VARCHAR(10) CHECK (choice IN ('mau', 'ngga')) NOT NULL
);

SELECT * FROM user_choices



DROP TABLE users

DROP TABLE user_choices

DROP TABLE user_choices2

-- Tabel users untuk menyimpan informasi pengguna
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Tabel user_choices untuk menyimpan pilihan user
CREATE TABLE user_choices (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    choice VARCHAR(10) CHECK (choice IN ('mau', 'ngga')) NOT NULL
);

CREATE TABLE user_choices2 (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    choice VARCHAR(10) CHECK (choice IN ('pantai', 'puncak', 'mall')) NOT NULL
)

SELECT * FROM users