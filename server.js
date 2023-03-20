const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require('console.table');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'C0mm4nd0420!',
        database: "twerkers_db"
    },
    console.log('\x1b[45m', `Connected to the twerkers_db ♡(^ε^ )Lᵒᵛᵉᵧₒᵤ`, '\x1b[0m')
    );

db.connect((error) => {
    if (error) throw error;
    console.log('\x1b[35m', `Welcome to the Phantom Employee Database of Your Local Shell Company`);
    promptUser();
})    

const promptUser = () => {
    inquirer.prompt([
        {
            name: 'choices',
            type: 'list',
            message: 'Please select from the following options:',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Exit'
            ]
        }
    ])
    .then((answers) => {
        const {choices} = answers;
        switch (choices) {
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update and Employee Role':
                updateRole();
                break;
            case 'Exit':
                db.end();
        }
    });
};

const addDepartmentPrompt = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department you would like to add?'
        }
    ]);
};

const addRolePrompt = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the new role?'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department of the new role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the new role?'
        }
    ])
};

const addEmployeePrompt = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the new employee?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the new employee?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the role ID of the new employee?'
        },
        {
            type: 'input',
            name: 'employee_id',
            message: 'What is the manager ID of the new employee? (Leave blank if N/A)'
        }
    ])
};

const updateRolePrompt = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'What is the ID of the employee?'
        },
        {
            type: 'input',
            name: 'new_role',
            message: "What is the ID of the new role?"
        }
    ])
};

const viewAllDepartments = () => {
    const dbQuery = `SELECT * FROM department`;
    db.query(dbQuery, (error, results) => {
        if (error) throw error;
        if (error) throw error;
        console.log('\x1b[35m', `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`, '\x1b[0m');
        console.table(results);
        console.log('\x1b[35m',`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`, '\x1b[0m');
        promptUser();
    });
};

const viewAllRoles = () => {
    const dbQuery = `SELECT role.id, role.title, role.salary, department.department_name FROM role JOIN department on role.department = department.id`;
    db.query(dbQuery, (error, results) => {
        if (error) throw error;
        console.log('\x1b[35m', `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`, '\x1b[0m');
        console.table(results);
        console.log('\x1b[35m',`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`, '\x1b[0m');
        promptUser();
    });
};

const viewAllEmployees = () => {
    const dbQuery = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, employee.manager FROM employee JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department`;
    db.query(dbQuery, (error, results) => {
        if (error) throw error;
        console.log('\x1b[35m', `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`, '\x1b[0m');
        console.table(results);
        console.log('\x1b[35m',`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`, '\x1b[0m');
        promptUser();
    });
};

async function addDepartment() {
    const { name } = await inquirer.prompt(addDepartmentPrompt);
    const dbQuery = (name) => `INSERT INTO department (department_name) VALUES ('${name}');`;
    db.query(dbQuery, (error, results) => {
        if (error) throw error;
        
        console.log('\x1b[35m', `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`, '\x1b[0m');
        console.table(`${results} has been added as a new department.`);
        console.log('\x1b[35m',`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`, '\x1b[0m');
        promptUser();
    });
};


async function addRole() {
    const { title, department_id, salary } = await inquirer.prompt(addRolePrompt);
    const dbQuery = (title, department_id, salary) => `INSERT INTO role (title, department_id, salary) VALUES ('${title}', '${department_id}', '${salary}')`;
    db.query(dbQuery, (error, results) => {
        if (error) throw error;
        
        console.log('\x1b[35m', `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`, '\x1b[0m');
        console.table(`${results} has been added as a new role.`);
        console.log('\x1b[35m',`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`, '\x1b[0m');
        promptUser();
    })
};
 

async function addEmployee() {
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt(addEmployeePrompt);
    const dbQuery = (first_name, last_name, role_id, manager_id) => `INSERT INTO employee (first_name, last_name, role_id, manager) VALUES ('${first_name}', '${last_name}', '${role_id}', '${manager_id}')`;
    db.query(dbQuery, (error, results) => {
        if (error) throw error;
        console.log('\x1b[35m', `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`, '\x1b[0m');
        console.table(`${first_name} ${last_name} has been added as a new employee.`);
        console.log('\x1b[35m',`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`, '\x1b[0m');
        promptUser();
    });
};

async function updateRole() {
    const { employee_id, new_role } = await inquirer.prompt(updateRolePrompt)
    const dbQuery = `UPDATE employee SET role = ${new_role} WHERE id = ${employee_id}`;
    db.query(dbQuery, (error, results) => {
        if (error) throw error;
        console.log('\x1b[35m', `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`, '\x1b[0m');
        console.table(results);
        console.log('\x1b[35m',`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`, '\x1b[0m');
        promptUser();
    });
};
