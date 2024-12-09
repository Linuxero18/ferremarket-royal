const FormularioLogin = ({ handleLogin, username, setUsername, password, setPassword, error }) => {
    return (
        <form onSubmit={handleLogin}>
            <div className="form-group">
                <label htmlFor="username">Usuario:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <p className='error'>{error}</p>}
            <button type="submit" className="btn btn-primary">Ingresar</button>
        </form>
    );
};

export default FormularioLogin;
