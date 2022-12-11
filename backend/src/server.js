const express = require("express");
const StudentsRoutes = require("./routes/StudentsRoutes");
const knex = require("knex");
const knexConfigFile = require("../knexfile");

var cors = require("cors");

const app = express();

app.database = knex(knexConfigFile.test);

app.use(cors());
app.use(express.json());

app.use("/students", StudentsRoutes(app));

app.listen(3000);
console.log("Server is running...");
