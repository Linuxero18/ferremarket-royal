import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Shared/Layout/Layout';
import Dashboard from "../page/Inicio";
import Ventas from "../page/Ventas";
import Inventario from "../page/Inventario";
import Proveedores from "../page/Proveedores";
import Reportes from "../page/Reportes";
import NotFound from "../page/NotFound";

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/proveedores" element={<Proveedores />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default AppRoutes;