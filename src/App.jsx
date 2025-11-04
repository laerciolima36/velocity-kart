import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import CadastroProduto from './components/CadastroProduto/CadastroProduto';
import NotFound from './components/NotFound/NotFound';
import Aluguel from './pages/Aluguel';
import Contratos from './pages/Contratos';
import Relatorio from './pages/Relatorio';
import Fila from './pages/Fila';
import './App.css';
import Brinquedos from './pages/Brinquedos';

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
