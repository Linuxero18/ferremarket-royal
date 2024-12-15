import { useNavigate } from 'react-router-dom';
import FormularioLogin from '../../components/Shared/Form/FormularioLogin';
import { useState } from 'react';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_usuario: username,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userId', data.user.id_usuario); 
                localStorage.setItem('user', JSON.stringify(data.user)); 
                navigate('/inicio');  // Redirigir a la página de inicio
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Error en el servidor');
            }
        } catch (error) {
            setError('Error en el servidor');
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <FormularioLogin
                handleLogin={handleLogin}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                error={error}
            />
        </div>
    );
};

export default Login;
