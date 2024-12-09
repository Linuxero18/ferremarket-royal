import { useNavigate } from 'react-router-dom';
import FormularioLogin from '../../components/Shared/Form/FormularioLogin';
import { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/usuarios/login', {
                nombre_usuario: username,
                password,
            });

            if (response.status === 200) {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/inicio'); 
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Error en el servidor');
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
