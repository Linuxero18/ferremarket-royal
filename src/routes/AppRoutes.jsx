import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Ventas from "../page/PageVentas/Ventas";
import Inventario from "../page/PageInventario/Inventario";
import Proveedores from "../page/PageProveedores/Proveedores";
import Reportes from "../page/PageReportes/Reportes";
import NotFound from "../page/Page404/NotFound";
import Inicio from '../page/PageInicio/Inicio';
import Login from '../page/PageLogin/Login';
import PrivateRoute from '../components/PrivateRoute';
import Usuarios from '../page/PageUsuarios/Usuarios';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />

      <Route
        path="/inicio"
        element={
          <PrivateRoute>
            <Layout>
              <Inicio />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/ventas"
        element={
          <PrivateRoute>
            <Layout>
              <Ventas />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/inventario"
        element={
          <PrivateRoute>
            <Layout>
              <Inventario />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/proveedores"
        element={
          <PrivateRoute>
            <Layout>
              <Proveedores />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/reportes"
        element={
          <PrivateRoute>
            <Layout>
              <Reportes />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/usuarios"
        element={
          <PrivateRoute>
            <Layout>
              <Usuarios />
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;