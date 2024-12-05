import { useNavigate } from "react-router-dom"

const Inicio = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'false');
    navigate('/')
  }

  return (
    <div>
      <h2>Inicio</h2>
      <button onClick={handleLogin}>Cerrar Sesión</button>
    </div>
  )
}

export default Inicio
