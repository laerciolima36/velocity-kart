import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import NotFound from './components/NotFound/NotFound';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Aluguel from './pages/Aluguel';
import Brinquedos from './pages/Brinquedos';
import Contratos from './pages/Contratos';
import Fila from './pages/Fila';
import Relatorio from './pages/Relatorio';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Aluguel />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/brinquedos" element={<ProtectedRoute><Brinquedos /></ProtectedRoute> } />
        <Route path="/fila" element={<Fila />} />
        <Route path="/contratos" element={<ProtectedRoute><Contratos /></ProtectedRoute>} />
        <Route path="/relatorios" element={<ProtectedRoute><Relatorio /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;