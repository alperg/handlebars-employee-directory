const axios = require("axios");
const ora = require('ora');
const logo = require("asciiart-logo");

const conn = require("../config/connection");
const spinner = ora('Importing data...');

const logoText = logo({ name: "Import" }).render();
console.log(logoText);

axios.get('https://alper.dev/employees')
  .then(result => {
    spinner.start();
    result.data.forEach(row => {
      const sql = "insert into employees (avatar, firstName, lastName, email, gender, department, startDate) values (?,?,?,?,?,?,?)";
      conn.query(sql, [
        row.avatar,
        row.firstName,
        row.lastName,
        row.email,
        row.gender,
        row.department,
        row.date,
      ]);
    });
  }).catch(err => {
    console.log(err);
  }).finally(() => {
    conn.end();
    setTimeout(() => {
      spinner.stopAndPersist({
        symbol: '👍',
        text: 'All done!',
      });
    }, 2000);
  });