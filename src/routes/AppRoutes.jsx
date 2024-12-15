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
import FormularioEditarUsuario from '../components/Shared/Form/FormularioEditarUsuario';
import FormularioEditarProveedor from '../components/Shared/Form/FormularioEditarProveedor';
import VentasRealizadas from '../page/PageVentas/ventasRealizadas';
import RegistrarVenta from '../page/PageVentas/registrarVenta';
import DetalleVenta from '../page/PageVentas/detalleVenta';


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
        path="/ventasRealizadas" 
        element={
          <PrivateRoute>
            <Layout>
              <VentasRealizadas />
            </Layout>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/registrarVenta" 
        element={
          <PrivateRoute>
            <Layout>
              <RegistrarVenta />
            </Layout>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/detalleventas/venta/:id" 
        element={
          <PrivateRoute>
            <Layout>
              <DetalleVenta />
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
      <Route 
        path="/editarUsuario/:id" 
        element={
          <PrivateRoute>
            <Layout>
              <FormularioEditarUsuario />
            </Layout>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/editarProveedor/:id" 
        element={
          <PrivateRoute>
            <Layout>
              <FormularioEditarProveedor />
            </Layout>
          </PrivateRoute>
        } 
      />
    </Routes>
  );
}

export default AppRoutes;