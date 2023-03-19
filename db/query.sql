SELECT role.id, role.title, role.department, role.salary
FROM role
JOIN department ON role.department = department.department_name;

SELECT employee.id, employee.first_name, employee.last_name, role.title, role.department, role.salary, CONCAT(manager.first_name, '', manager.last_name) AS manager
From employee
JOIN role ON role.id = employee.role_id
JOIN department ON department.id = role.department
LEFT JOIN 