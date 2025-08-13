import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './componentes/Login.jsx'
import App from './componentes/App.jsx'
import Navbar from './componentes/Navbar.jsx'
import Catalogo from './componentes/Catalogo.jsx'
import Categorias from './componentes/Categorias.jsx'
import Inventario from './componentes/Inventario.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
