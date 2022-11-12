const express = require('express');
var cors = require('cors');
let database = require('./database');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.get('/students/list', (req, res) => {
  setTimeout(() => {
    res.send(database);
  }, 2000);
})

app.get('/students/find/:ra', (req, res) => {
  const studentFound = database.find(function(student) {
    return student.ra == req.params.ra;
  });
  setTimeout(() => {
    res.send(studentFound);
  }, 2000);
})

app.delete('/students/delete/:ra', (req, res) => {
  database = database.filter((student) => {
    return student.ra != req.params.ra;
  });
  console.log(database);
  res.send({
    result: true,
    message: `O estudante ${req.params.ra} foi excluído com sucesso`,
  });
} )

app.listen(3000);
console.log("Server is running...");
