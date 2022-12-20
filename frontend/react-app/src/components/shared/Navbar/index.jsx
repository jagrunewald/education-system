import { Link } from "react-router-dom";
import "./style.css";

const Navbar = () => {
  return (
    <nav className="main-nav">
    <header>
      Módulo academico
    </header>
    <ul className="nav-links">
      <Link to="/" className="nav-item">
        <li>Alunos</li>
      </Link>
    </ul>
  </nav>
  );
};

export default Navbar;
