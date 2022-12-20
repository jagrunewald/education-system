import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Loader from "../../shared/Loader";
import "./style.css";

const StudentManagerPage = () => {

  const [isRedirect, setIsRedirect] = useState(false);
  const [isLoading, uptadeIsLoading] = useState(false);
  const [name, updateName] = useState("");
  const [email, updateEmail] = useState("");
  const [ra, updateRa] = useState("");
  const [cpf, updateCpf] = useState("");

  // console.log(name, email, ra, cpf);

  const isEditingMode = () => {
    return false;
  }

  const getRAFromUrl = () => {
    return 0;
  }

  const onSubmitForm = (event) => {
    event.preventDefault();

    const body = {
      name: name,
      ra,
      cpf,
      email,
    };

    let methodEndpoint;
    let urlEndpoint;

    if(isEditingMode()) {
      methodEndpoint = "PUT";
      urlEndpoint = `http://localhost:3006/students/edit/${getRAFromUrl()}`;
    } else {
      methodEndpoint = "POST";
      urlEndpoint = `http://localhost:3006/students/save`;
    }

    fetch(urlEndpoint, {
        method: methodEndpoint,
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        alert(data.message);
        if (data.result) {
          setIsRedirect(true);
        }
      });
  }

  if (isRedirect) {
    return <Navigate to="/" />;
  }

  if(isLoading) {
    return <Loader />;
  }

  return (
    <>
      <header className="main-header">
      Consulta de Alunos
      </header>
      <div className="content-page">
        <form
          method="post"
          className="form"
          id="student-form"
          onSubmit={onSubmitForm}
        >
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              required
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(event) => {
                updateName(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              required
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(event) => {
                updateEmail(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ra">RA</label>
            <input
              required
              type="number"
              name="ra"
              id="ra"
              value={ra}
              onChange={(event) => {
                updateRa(event.target.value);
              }}            
          />
          </div>
          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input
              required
              type="text"
              name="cpf"
              id="cpf"
              value={cpf}
              onChange={(event) => {
                updateCpf(event.target.value);
              }}
            />
          </div>
          <div className="actions">
            <Link to="/"><button className="btn">Cancelar</button></Link>
            <button className="btn">Salvar</button>
          </div>
        </form>
      </div>
    </>
  )
};

export default StudentManagerPage;
