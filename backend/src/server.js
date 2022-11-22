const express = require('express');
var cors = require('cors');
let database = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.get('/students/list/:searchQuery?', (req, res) => {
  let result = database;
  let search = req.params.searchQuery;
  
  if(search) {
    search = search.toLowerCase();
    result = result.filter((student) => {
      return (
        student.ra == search ||
        student.nome.toLowerCase().indexOf(search) != -1 ||
        student.cpf == search
      );
    })
  }

  setTimeout(() => {
    res.send(result);
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
  res.send({
    result: true,
    message: `O estudante ${req.params.ra} foi excluído com sucesso`,
  });
});

app.post("/students/save", (req,res) => {
  database.push({
    nome: req.body.name,
    ra: req.body.ra,
    email: req.body.email,
    cpf: req.body.cpf,
  });

  res.send({
    result: true,
    message: "Estudante cadastrado com sucesso"
  });
});

app.put("/students/edit/:ra", (req, res) => {
  database = database.filter((student) => {
    return student.ra != req.params.ra;
  });

  database.push({
    nome: req.body.name,
    ra: req.body.ra,
    email: req.body.email,
    cpf: req.body.cpf,
  });

  res.send({
    result: true,
    message: "Estudante atualizado com sucesso"
  });
});

app.listen(3000);
console.log("Server is running...");
