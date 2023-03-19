const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'C0mm4nd0420!',
        database: "twerkers_db"
    },
    console.log(`Connected to the twerkers_db ♡(^ε^ )Lᵒᵛᵉᵧₒᵤ`)
)