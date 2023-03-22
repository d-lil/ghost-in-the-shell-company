-- SELECT role.id, role.title,  department.name AS department, role.salary
-- FROM role
-- JOIN department ON role.department_id = department.id;

-- SELECT employee.id, employee.first_name, employee.last_name, role.title, role.department, role.salary
-- FROM employee
-- JOIN role ON role.id = employee.role_id
-- JOIN department ON department.id = role.department

-- SELECT 
-- e.first_name, e.last_name AS employee,
-- m.first_name, m.last_name AS manager
-- FROM
-- employee e
-- INNER JOIN
-- employee m ON m.id = e.manager_id
-- ORDER BY manager;

-- INSERT INTO department (name)
-- VALUES ();

-- INSERT INTO role (title, department_id, salary)
-- VALUES ();

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ();

-- UPDATE employee SET role_id = WHERE id = ;

-- SELECT employee.id, employee.first_name, employee.last_name, department.name
-- FROM employee
-- WHERE role.id = employee.role_id
-- JOIN department ON department.id = role.department;
