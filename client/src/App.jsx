import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/index';  // Importando a tela de Login
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota para a tela de Login */}
        <Route path="/" element={<Login />} />
        
       
      </Routes>
    </Router>
  );
}

export default App;

