import "./style.css";

const StudentManagerPage = () => {

  return (
    <>
      <header class="main-header">
      Consulta de Alunos
      </header>
      <div class="loader"></div>
      <div class="content-page">
        <form method="post" class="form" id="student-form">
          <div class="form-group">
            <label for="name">Nome</label>
            <input required type="text" name="name" id="name" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input required type="email" name="email" id="email" />
          </div>
          <div class="form-group">
            <label for="ra">RA</label>
            <input required type="number" name="ra" id="ra" />
          </div>
          <div class="form-group">
            <label for="cpf">CPF</label>
            <input required type="text" name="cpf" id="cpf" />
          </div>
          <div class="actions">
            <a href="studentsList.html"><button class="btn">Cancelar</button></a>
            <button class="btn">Salvar</button>
          </div>
        </form>
      </div>
    </>
  )
};

export default StudentManagerPage;
