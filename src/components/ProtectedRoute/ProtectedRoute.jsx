import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('jwtToken'); // Verifica se o token existe
  const location = useLocation();

  if (isAuthenticated) {
    // Se o usuário está autenticado, renderiza o componente filho
    return children;
  } else {
    // Se não estiver autenticado, redireciona para a página de login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;