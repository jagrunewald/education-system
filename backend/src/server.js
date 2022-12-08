const express = require("express");
const knex = require("knex");
const knexConfigFile = require("../knexfile");
const StudentsController = require("./controllers/StudentController");
var cors = require("cors");

const app = express();

app.database = knex(knexConfigFile.test);

const StudentsControllerInstance = new StudentsController(app);

app.use(cors());
app.use(express.json());

app.get("/students/list/:searchQuery?", StudentsControllerInstance.listAction);
app.get("/students/find/:ra", StudentsControllerInstance.findAction);
app.delete("/students/delete/:ra", StudentsControllerInstance.deleteAction);
app.post("/students/save", StudentsControllerInstance.createAction);
app.put("/students/edit/:ra", StudentsControllerInstance.editAction);

app.listen(3000);
console.log("Server is running...");
