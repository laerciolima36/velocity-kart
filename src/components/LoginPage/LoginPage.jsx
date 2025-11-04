import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Se você estiver usando React Router
import api from "../../config/axiosInstance";
import 'bootstrap/dist/css/bootstrap.min.css';
import logoautomationcode from '../../assets/logoautomationcode.png'; // Certifique-se de que o caminho está correto
import logovelo from '../../assets/logovelo.png'
import Load from '../Load/Load'; // Componente de loading, se necessário

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para navegação
  const location = useLocation();
  const [loading, setLoading] = useState(false); // Estado para controle de loading

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    setLoading(true); // Inicia o loading
    event.preventDefault();
    setError(''); // Limpa qualquer erro anterior

    try {
      const response = await api.post('/auth/login', { // Substitua pela URL da sua API
        username: username,
        password: password,
      });

      const token = response.data; // Assumindo que a API retorna um objeto com a chave 'token'
      console.log(token);
      // Armazena o token (exemplo usando localStorage)
      localStorage.setItem('jwtToken', token);

      // Redireciona para a rota anterior (ou "/" se não houver)
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error) {
      setLoading(false); // Finaliza o loading
      console.error('Erro ao fazer login:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Exibe a mensagem de erro da API
      } else {
        setError('Falha ao fazer login. Verifique suas credenciais e tente novamente.');
      }
    }
  };

  return (
    <div>
      {loading && <Load />}
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow p-4 m-4" style={{ width: '100%', maxWidth: '400px' }}>
          <img src={logovelo} alt="automatioincode" />
          <h5 className="text-center mb-4">Login</h5>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Usuário</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name='username'
                autoComplete='username'
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Senha</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name='password'
                autoComplete='current-password'
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Entrar</button>
            <div className="text-center mt-3" style={{ fontSize: '12px' }}>
              <abel>AutomationCode - 2026 © </abel>
              <a href="https://www.automationcode.com.br" target="_blank" rel="noopener noreferrer">www.automationcode.com.br</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;