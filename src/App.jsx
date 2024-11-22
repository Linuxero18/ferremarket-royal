import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import AppRoutes from './routes/AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./styles/Generales.css"

function App() {
  return (
    <BrowserRouter>
      <div>
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
