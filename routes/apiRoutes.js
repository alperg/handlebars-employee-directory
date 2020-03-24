require("console.table");
const moment = require("moment");
const express = require("express");
const router = express.Router();

const conn = require("../config/connection");

const parseData = (data) => {
  return data.map(emp => {
    const empStartDate = moment(emp.startDate, 'M/D/YYYY');
    emp.daysWorked = moment().diff(empStartDate, 'days');
    return emp;
  });
}

router.get("/api/employees/:id?", (req, res) => {
  if(req.params.id) {
    const query = conn.query("select * from employees where id=?", [req.params.id], (err, data) => {
      if(err) {
        console.log(err);
        return status(500).end();
      } else if(!data.length) {
        // console.log(data);
        return res.json([]);
      }
      // console.table(parseData(data));
      return res.json(parseData(data));
    });
    console.log(query.sql);
  } else {
    const query = conn.query("select * from employees", (err, data) => {
      // console.table(parseData(data));
      res.json(parseData(data));
    });
    console.log(query.sql);
  }
});

router.post("/api/employees", (req, res) => {
  const sql = "insert into employees (avatar, firstName, lastName, email, gender, department, startDate) values (?)";
  const emp = [
    req.body.avatar,
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.gender,
    req.body.department,
    req.body.startDate
  ];
  const query = conn.query(sql, [emp], (err, data) => {
    if(err) {
      console.log(err);
      return res.status(500).end();
    } 
    return res.status(200).end();
  });
  console.log(query.sql);
});

router.put("/api/employees/:id", (req, res) => {
  const query = conn.query("update employees set ? where id=?", [req.body, req.params.id], (err, data) => {
    if(err) {
      console.log(err);
      return res.status(500).end();
    } 
    return res.status(200).end();
  });
  console.log(query.sql);
});

router.delete("/api/employees/:id", (req, res) => {
  const query = conn.query("delete from employees where id=?", [req.params.id], (err, data) => {
    if(err) {
      console.log(err);
      return res.status(500).end();
    }
    return res.status(200).end();
  });
  console.log(query.sql);
});

module.exports = router;
