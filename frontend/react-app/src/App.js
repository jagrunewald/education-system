import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/shared/Navbar";
import StudentListPage from "./components/pages/StudentListPage";
import StudentManagerPage from './components/pages/StudentManagerPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="main-container">
        <Navbar />
        <section className="container">
          <div className="content-page">
            <Routes>
              <Route path="/" element={<StudentListPage />} />
              <Route path="/save" element={<StudentManagerPage />} />
              <Route path="/student/edit/:id" element={<StudentManagerPage />} />
              <Route path="*" element={
                <div>
                  <h1>Error 404</h1>
                  <p>Não foi possível encontrar a página solicitada</p>
                </div>
              } />
            </Routes>   
          </div>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
