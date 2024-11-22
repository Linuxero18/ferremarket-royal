import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import AppRoutes from './routes/AppRoutes';

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
