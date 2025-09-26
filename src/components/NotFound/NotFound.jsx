import { Link } from 'react-router-dom';

export default function NotFound() {
  return <h2>Página não encontrada. <Link to="/login">Ir para login</Link></h2>;
}