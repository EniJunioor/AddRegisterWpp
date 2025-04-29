import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/index';  // Importando a tela de Login
import './App.css'
import Dashboard from './pages/Home';
import MobileCheckin from './pages/ResgistroPonto'

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota para a tela de Login */}
        <Route path="/" element={<Login />} />
        
       {/* Rota para a tela de Home */}
       <Route path="/Dasboard" element={<Dashboard />} />

       <Route path='/MobileCheckin' element={<MobileCheckin />} />
      </Routes>
    </Router>
  );
}

export default App;

