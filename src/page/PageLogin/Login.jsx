import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/inicio');
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
};

export default Login;
