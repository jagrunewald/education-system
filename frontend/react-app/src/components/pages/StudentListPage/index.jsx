import React from "react";
import "./style.css";

class StudentListPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      studentsList: [],
      isLoading: true,
      formSearch: {
        searchInput : "",
      }
    }
  }


  componentDidMount() {
    console.log("componentDidMOunt ok")
    this.fetchStudentsList();
  }

  onClickremoveStudent = (ra) => {
    console.log(ra)
    const confirmation = window.confirm("Você realmente deseja excluir esse estudante?");
    
    if(confirmation) {
      this.deleteStudent(ra);
    }
  }

  deleteStudent = (ra) => {
    this.setState({
      isLoading: true,
    });

    fetch(`http://localhost:3006/students/delete/${ra}`, {
        method: 'DELETE',
      }).then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('data',data);
        this.fetchStudentsList();
      });
  }

  onSubmitFormSearch = (event) => {
    event.preventDefault();
    this.fetchStudentsList(event.target.searchInput.value);
  }

  fetchStudentsList = (searchQuery = "") => {
    this.setState({
      isLoading: true,
    });
    // $(".loader").show("slow");
    // $(".content-page").hide("fast");
  
    fetch(`http://localhost:3006/students/list/${searchQuery}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          studentsList: data,
          isLoading: false,
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

    if(this.state.isLoading) {
      return <div className="loader"></div>;
    }
    return (
      <div className="padding-left-right-20">
        <div className="top-actions">
          <form  
            id="form-search-student"
            className="form-search"
            onSubmit={this.onSubmitFormSearch}
          >
            <input
              type="text"
              name="searchInput"
              id="searchInput"
              value={this.state.formSearch.searchInput}
              onChange={(event) => {
                this.setState({
                  formSearch: {
                    searchInput: event.target.value,
                  }
                })
              }}
            />
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
                  <tr key={student.ra}>
                    <td>{student.ra}</td>
                    <td>{student.nome}</td>
                    <td>{student.cpf}</td>
                    <td>
                      <a href={`studentManager.html?ra={student.ra}`}>Editar</a>
                      <a 
                        href="/#"
                        className="remove-student"
                        onClick={() => {this.onClickremoveStudent(student.ra)}}
                      >
                        Excluir
                      </a>
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
