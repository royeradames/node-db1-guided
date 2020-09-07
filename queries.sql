-- https://www.w3schools.com/sql/trysql.asp?filename=trysql_op_in
--list of all products
SELECT * FROM PRODUCTS;

select productId, productName
from products;

select productName, Price, unit from products;

--list of all ucstomers from the uk
select *
from customers
where country = 'UK';

--list of all customers from the UK
select * from customers
where country = 'UK' or city = 'Berlin'-- this sample databse has case sensitive string comparisons
;

--list of all customers from the UK and USA 
select * 
from customers
where country = 'UK' or country ='USA';

--list of all customers from the UK and USA using the IN operator
select * 
from customers
where country in ('UK', 'USA')

--list of all customers excluding does from the UK and USA 
select * 
from customers
where country not in ('UK', 'USA')

--list of all customers sorted by the country, then by the city, then by the name
select country, city, *
from customers
order by country, city, customerName;

--list 5 cheaper products
select * 
from products
order by price
limit 5;

--add a new shipping company
insert into shippers (phone, shipperName)
values ('(212) 555-1212', 'Lamda shipping');

--add multiple shipping company
insert into shippers (phone, shipperName)
values ('(212) 555-1212', 'LS shipping'), ('(212) 555-1214', 'Code shipping');

--fix the errors
--select * from shippers
update shippers
set shipperName = 'Lambda Shipping', phone = '(212) 555-1211'
where shipperId = 4; --remember to TEST the WHERE condition with a select first!

--delete a record
--select from shippers
delete from shippers
where shipperId = 4;