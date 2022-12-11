import './App.css';
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <section class="container">
        <header class="main-header">
          Consulta de Alunos
        </header>
        <div class="loader"></div>
        <div class="content-page display-none">
          <div class="top-actions">
            <form  id="form-search-student" class="form-search">
              <input type="text" name="searchInput" id="searchInput" />
              <button>Pesquisar</button>
            </form>
            <a href="studentManager.html" class="btn">Cadastrar Aluno</a>
          </div>
          <table id="studentList" class="table-list">
            <thead>
              <tr>
                <th>Registro acadêmico</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>          
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default App;
