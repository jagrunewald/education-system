import React from "react";
import "./style.css";

class StudentListPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      studentsList: [],
    }
  }


  componentDidMount() {
    console.log("componentDidMOunt ok")
    this.fetchStudentsList();
  }

  fetchStudentsList = (searchQuery = "") => {
    // $(".loader").show("slow");
    // $(".content-page").hide("fast");
  
    fetch(`http://localhost:3006/students/list/${searchQuery}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          studentsList: data,
        })
  
        // $(".loader").hide("fast");
        // $(".content-page").show("slow");
      })
      .catch((error) => {
        alert("Desculpe, ocorreu um erro de conexão com o servidor");
        console.log(error);
      })
  };

  render() {
    return (
      <div className="padding-left-right-20">
        <div className="top-actions">
          <form  id="form-search-student" className="form-search">
            <input type="text" name="searchInput" id="searchInput" />
            <button>Pesquisar</button>
          </form>
          <a href="studentManager.html" className="btn">Cadastrar Aluno</a>
        </div>
        <table id="studentList" className="table-list">
          <thead>
            <tr>
              <th>Registro acadêmico</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.studentsList.map((student) => {
                return (
                  <tr>
                    <td>{student.ra}</td>
                    <td>{student.nome}</td>
                    <td>{student.cpf}</td>
                    <td>
                      <a href={`studentManager.html?ra={student.ra}`}>Editar</a>
                      <a href="/#" class="remove-student" data-ra={student.ra}>Excluir</a>
                    </td>
                  </tr>

                );    
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default StudentListPage;
