module.exports = class StudentsController {
  constructor(app) {
    this.app = app;
  };

  listAction = (req, res) => {
    let query = this.app.database("students");

    let search = req.params.searchQuery;

    if(search) {
      query.where("ra", search)
        .orWhere("nome", "like", `%${search}%`)
        .orWhere("cpf", search);
    };

    return query
      .select()
      .then((data) => {
        console.log("listaction", data)
        res.send(data);
    });
  };

  findAction = (req, res) => {
    return this.app.database("students").select()
    .where({ ra :  req.params.ra })
    .first()
    .then((response) => {
      res.send(response);
    });
  };

  isCreateDataValid = async (data) => {
    if(data.name == '') {
      return "O nome é um campo obrigatório";
    };
  
    if(data.email == '') {
      return "O email é um campo obrigatório";
    };
  
    if(data.ra == '' && parseInt(data.ra) != data.ra) {
      return "O RA é um campo obrigatório e precisa ser um número inteiro";
    };
  
    if(data.cpf == '' && parseInt(data.cpf) != data.cpf) {
      return "O cpf é um campo obrigatório e precisa ser um numero inteiro";
    };

    const userExists = await this.app.database("students")
      .select()
      .where({ ra: data.ra })
      .first();
  
    if(userExists) {
      return "Desculpe, mas já existe um estudante cadastrado com esse RA.";
    };

    return true;
  };

  isEditDataValid = (data) => {
    if(data.name == '') {
      return "O nome é um campo obrigatório";
    };
  
    if(data.email == '') {
      return "O email é um campo obrigatório";
    };

    return true;
  }

  createAction = async (req, res) => {
    const isCreateDataValid = await this.isCreateDataValid(req.body);

    if(isCreateDataValid !== true) {
      return res.status(400).send({
        result: false,
        message: isCreateDataValid,
      });
    }
  
    return this.app.database("students")
      .insert({
        nome: req.body.name,
        ra: req.body.ra,
        email: req.body.email,
        cpf: req.body.cpf,
      })
      .then((response) => {
        if(response) {
          res.send({
            result: true,
            message: "Estudante cadastrado com sucesso",
          })
        } else {
          res.send({
            result: false,
            message: "Não foi possível cadastrar o estudante"
          });
        };
      });
  };

  editAction = async (req, res) => {
    const isEditDataValid = this.isEditDataValid(req.body);

    if(isEditDataValid != true) {
      return res.status(400).send({
        result: false,
        message: isEditDataValid,
      });
    };
    
    const userFound = await this.app
      .database("students")
      .select()
      .where({ ra : req.params.ra })
      .first();
  
      if(!userFound) {
        return res.status(400).send({
          result: false,
          message: "O estudante informado não existe"
        });
      };
  
      if(userFound) {
        const studentUpdate = await this.app.
          database("students")
          .update({
            email: req.body.email,
            nome: req.body.name
          })
          .where({
            ra: req.params.ra
          });
  
        if(studentUpdate) {
          res.send({
            result: true,
            message: "O estudante foi atualizado com sucesso"
          })
        } else {
          res.status(500).send({
            result: false,
            message: "Descula, mas não conseguimos atualizar o estudante"
          });
        };
      };
  };

  deleteAction = (req, res) => {
    return this.app.database("students")
    .where({ ra: req.params.ra })
    .del()
    .then((response) => {
      if (response) {
        res.send({
          result: true,
          message: `O estudante ${req.params.ra} foi excluído com sucesso`,
        });
      } else {
        res.send({
          result: false,
          message: "Nã foi possível excluir o estudante",
        });
      };
    });
  };

};
