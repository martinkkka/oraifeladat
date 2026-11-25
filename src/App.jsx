import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { DartsListPage } from './pages/DartsListPage.jsx';
import { DartsSinglePage } from './pages/DartsSinglePage.jsx';
import { CreateDartsPage } from './pages/CreateDartsPage.jsx';
import { DartsModPage } from './pages/DartsModPage.jsx';
import { DartsDelPage } from './pages/DartsDelPage.jsx';
import './App.css';

export function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Dartsozók</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/create-darts">Új dartsozó</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<DartsListPage />} />
        <Route path="/darts/:dartsId" element={<DartsSinglePage />} />
        <Route path="/create-darts" element={<CreateDartsPage />} />
        <Route path="/mod-darts/:dartsId" element={<DartsModPage />} />
        <Route path="/del-darts/:dartsId" element={<DartsDelPage />} />
      </Routes>
    </Router>
  );
}

export default App;
