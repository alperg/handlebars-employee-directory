drop database if exists handlebars_employees;
create database handlebars_employees;

use handlebars_employees;

create table employees (
  id int not null auto_increment,
  avatar varchar(255) not null,
  firstName varchar(50) not null,
  lastName varchar(50) not null,
  email varchar(60) not null,
  gender varchar(6) not null,
  department varchar(50) not null,
  startDate varchar(10) not null,
  primary key(id)
);
