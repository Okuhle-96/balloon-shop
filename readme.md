# The Balloon Shop

A local party shop needs help to keep track of the balloons they are selling.

Write a factory function that can help them to count the most popular color of balloons that are being sold. We wrote the tests for you and started with the Factory Function to help get you started.

*We have created the tests for you and they are failing so you are required to fix them.*

*Fork* and *clone* this repo.

To run the tests use: `npm test`

**What you are required to do :**

- Create 2 tables in postgresql
    - **valid_color**
    - **invalid_color**
    
- Valid colors are stored in a database table called **valid_color**. Valid colours should be pre-populated. 
- Keep count of how many times a given color is requested (asked for)
- In a separate table called **invalid_color** keep track of the invalid colors requested.
- If an invalid **color** is requested more than **5 times** it should now become a valid color.

The tables should have these columns: **id, color_name, count**

**Note:** that the Factory function takes in a list of valid colors which you will need to add to the database upon Factory Function instantiation.

To create the **valid_color** table you can use the following script:

`create table valid_color (id serial not null primary key, color_name text, count integer);`

Add a **travis badge** for your tests.

Commit your code to GitHub and send it to `mentors@projectcodex.co`.

