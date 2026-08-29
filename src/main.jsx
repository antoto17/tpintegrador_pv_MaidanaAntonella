import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './routes/routes'
import AutorizacionesProvider from './context/AutorizacionesContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AutorizacionesProvider>
      <RouterProvider router={router} />
    </AutorizacionesProvider>
  </StrictMode>
)