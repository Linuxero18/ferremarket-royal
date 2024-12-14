import { Link } from 'react-router-dom';

const Ventas = () => {
  return (
    <div>
      <h2>Registrar Venta</h2>
      <Link to="/ventasRealizadas">
        <button>Ver Ventas Realizadas</button>
      </Link>
    </div>
  );
};

export default Ventas;
