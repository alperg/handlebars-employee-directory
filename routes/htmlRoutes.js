const moment = require("moment");
const express = require("express");
const router = express.Router();

const conn = require("../config/connection");

router.get("/", (req, res) => {
  conn.query("select * from employees", (err, data) => {
    const newData = data.map(emp => {
      const empStartDate = moment(emp.startDate, 'M/D/YYYY');
      emp.daysWorked = moment().diff(empStartDate, 'days');
      return emp;
    });
    res.render("index", { employees: newData });
  });
})

module.exports = router;
