import { useEffect, useState } from 'react'
import '../css/dashboard.css'
import useAutorizaciones from '../hooks/useAutorizaciones'
import Login from './Login'
import clientesService from '../services/clientesService'

const Dashboard = () => {
  const { admin } = useAutorizaciones()

  const [estadisticas, setEstadisticas] = useState({
    total: 0,
    eliminados: 0
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    clientesService
      .obtenerEstadisticas()
      .then((data) => {
        setEstadisticas(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className="dashboard">

      <h1>Panel de Control de Clientes</h1>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Clientes</h3>
          <p>{loading ? 'Cargando...' : estadisticas.total}</p>
        </div>

        <div className="dashboard-card">
          <h3>Clientes Eliminados</h3>
          <p>{loading ? 'Cargando...' : estadisticas.eliminados}</p>
        </div>

      </div>

      {!admin && (
        <div className="dashboard-login">

          <h3>Bienvenido al Sistema</h3>

          <p>Ingrese sus credenciales para acceder</p>

          <Login />

        </div>
      )}

      {admin && (
        <div className="user-card">

          <h3>Usuario conectado</h3>

          <p>
            <strong>Administrador:</strong> {admin.nombre}
          </p>

          <p>
            <strong>Email:</strong> {admin.email}
          </p>

          <p>
            <strong>Sector:</strong> {admin.sector}
          </p>

        </div>
      )}

    </div>
  )
}

export default Dashboard