import './Inicio.css'

const Inicio = () => {

  // Funcion para cerrar sesion
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated', 'true');
    localStorage.removeItem('user');
    window.location.reload();
  }

  return (
    <div>
      <main className='container-inicio'>
        <section className='section-inicio'>
          <h1 className='titulo-inicio'>Bienvenido a la página de inicio</h1>
          <button className='button-inicio' onClick={handleLogout}>Cerrar sesión</button>
        </section>
      </main>
    </div>
  )
}

export default Inicio
