import { useNavigate } from "react-router-dom";
import './Inicio.css';

const Inicio = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'false');
    navigate('/');
  };

  return (
    <div>
      <div className="inicio-container">
        <h2>Inicio</h2>
        <button className="btn btn-danger" onClick={handleLogin}>Cerrar Sesión</button>

        <div className="texto-container">
          <div className="historia">
            <h3>Historia de la Organización</h3>
            <p>
              La ferretería Ferremarket Royal fue fundada por los hermanos Daysi y Ronald Bardales, ambos originarios de Villa Rica,
              tras meses de planificación y un estudio de mercado dentro de la localidad, la tienda abrió sus puertas el 9 de mayo de
              2023 en la Av. Leopoldo Krause 864, en un local que construyeron con una inversión aproximada de S/ 150,000. Desde su
              apertura, Ferremarket Royal ha brindado sus servicios durante más de un año, destacándose por la calidad de productos y
              su amplia variedad de estos, cubriendo tanto proyectos pequeños del hogar como grandes construcciones. En este tiempo,
              la ferretería se ha convertido en una opción confiable para la comunidad de Villa Rica y sus alrededores.
            </p>
          </div>

          <div className="mision">
            <h3>Misión Empresarial</h3>
            <p>
              Ofrecer a los habitantes de Villa Rica y sus alrededores una amplia variedad de productos de ferretería de alta calidad,
              orientados a la construcción, reparación y mejora del hogar, garantizando un servicio eficiente y rápido para satisfacer
              las necesidades de nuestra localidad.
            </p>
          </div>

          <div className="vision">
            <h3>Visión Empresarial</h3>
            <p>
              Ser reconocida como la ferretería líder en Villa Rica, destacándose por la calidad de nuestros productos y el servicio
              ágil que ofrecemos. Nuestro objetivo es expandirnos hacia localidades cercanas, ampliando nuestro alcance para llegar a
              más clientes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
