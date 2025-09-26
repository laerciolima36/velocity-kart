import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('jwtToken'); // Verifica se o token existe

  if (isAuthenticated) {
    // Se o usuário está autenticado, renderiza o componente filho
    return children;
  } else {
    // Se não estiver autenticado, redireciona para a página de login
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;