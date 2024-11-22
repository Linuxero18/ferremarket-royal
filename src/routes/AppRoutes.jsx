import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../page/Dashboard";
import Ventas from "../page/Ventas";
import Inventario from "../page/Inventario";
import Proveedores from "../page/Proveedores";
import Reportes from "../page/Reportes";
import NotFound from "../page/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/ventas",
    element: <Ventas />,
  },
  {
    path: "/inventario",
    element: <Inventario />,
  },
  {
    path: "/proveedores",
    element: <Proveedores />,
  },
  {
    path: "/reportes",
    element: <Reportes />,
  },
  {
    path: "*", // Ruta para cualquier URL no definida
    element: <NotFound />,
  }
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;