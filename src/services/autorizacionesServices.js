const usuarios = [
  {
    email: 'antonella@gmail.com',
    password: 'admin123',
    nombre: 'antonella',
    sector: 'Soporte'
  },
  {
    email: 'jimena@gmail.com',
    password: 'admin123',
    nombre: 'jimena',
    sector: 'Gerencia'
  },
  {
    email: 'maia@gmail.com',
    password: 'admin123',
    nombre: 'maia',
    sector: 'Gerencia'
  },
  {
    email: 'abril@gmail.com',
    password: 'admin123',
    nombre: 'abril',
    sector: 'Soporte'
  },
  {
    email: 'guadalupe@gmail.com',
    password: 'admin123',
    nombre: 'guadalupe',
    sector: 'Soporte'
  },
  {
    email: 'lourdes@gmail.com',
    password: 'admin123',
    nombre: 'lourdes',
    sector: 'Gerencia'
  }
]

const validarLogin = (email, password, sector) => {

  const errores = {}

  if (!email.trim()) {
    errores.email = 'El email es obligatorio'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errores.email = 'El email no es válido'
  }

  if (!password.trim()) {
    errores.password = 'La contraseña es obligatoria'
  } else if (password.length < 6) {
    errores.password = 'La contraseña debe tener al menos 6 caracteres'
  } else if (!/[0-9]/.test(password)) {
    errores.password = 'La contraseña debe contener al menos un número'
  }

  if (!sector) {
    errores.sector = 'Seleccione un sector'
  }

  return errores
}

const login = (email, password, sector) => {

  const errores = validarLogin(email, password, sector)

  if (Object.keys(errores).length > 0) {
    return {
      usuario: null,
      errores,
      errorGeneral: ''
    }
  }

  const usuario = usuarios.find(
    usuario =>
      usuario.email === email &&
      usuario.password === password &&
      usuario.sector === sector
  )

  if (!usuario) {
    return {
      usuario: null,
      errores: {},
      errorGeneral: 'Los datos ingresados no son correctos'
    }
  }

  return {
    usuario,
    errores: {},
    errorGeneral: ''
  }
}

export default {
  login
}