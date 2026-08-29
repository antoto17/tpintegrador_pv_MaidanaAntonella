import '../css/login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAutorizaciones from '../hooks/useAutorizaciones'
import AutorizacionesService from '../services/autorizacionesServices'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [sector, setSector] = useState('')
  const [errores, setErrores] = useState({})

  const { setAdmin } = useAutorizaciones()
  const navigate = useNavigate()

  const manejarSubmit = (e) => {

    e.preventDefault()

    const resultado = AutorizacionesService.login(
      email,
      password,
      sector
    )

    if (Object.keys(resultado.errores).length > 0) {
      setErrores(resultado.errores)
      return
    }

    setErrores({})

    if (!resultado.usuario) {
      alert(resultado.errorGeneral)
      return
    }

    setAdmin({
      nombre: resultado.usuario.nombre,
      email: resultado.usuario.email,
      sector: resultado.usuario.sector
    })

    navigate('/')
  }

  return (
    <div className="login-container">

      <h1>Iniciar Sesión</h1>

      <form onSubmit={manejarSubmit}>

        <label>Email:</label>

        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p style={{ color: 'red', minHeight: '18px' }}>
          {errores.email || ' '}
        </p>

        <label>Contraseña:</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p style={{ color: 'red', minHeight: '18px' }}>
          {errores.password || ' '}
        </p>

        <label>Sector:</label>

        <select
          value={sector}
          onChange={(e) => setSector(e.target.value)}
        >
          <option value="">Seleccione un sector</option>
          <option value="Soporte">Soporte</option>
          <option value="Gerencia">Gerencia</option>
        </select>

        <p style={{ color: 'red', minHeight: '18px' }}>
          {errores.sector || ' '}
        </p>

        <button type="submit">
          Ingresar
        </button>

      </form>

    </div>
  )
}

export default Login