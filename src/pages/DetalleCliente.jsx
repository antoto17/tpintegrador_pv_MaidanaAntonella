import '../css/detallecliente.css'

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAutorizaciones from "../hooks/useAutorizaciones";
import clientesService from "../services/clientesService";

const DetalleCliente = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useAutorizaciones();

  const [cliente, setCliente] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [editando, setEditando] = useState(false);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");

  const [errores, setErrores] = useState({});

  useEffect(() => {

    const cargarCliente = async () => {

      try {

        const data = await clientesService.obtenerCliente(id);

        setCliente(data);
        setNombre(data.name.firstname);
        setApellido(data.name.lastname);
        setEmail(data.email);
        setTelefono(data.phone);
        setCiudad(data.address.city);

      } catch {

        setMensaje("Error al cargar cliente");

      }

    };

    cargarCliente();

  }, [id]);

  const validar = () => {

    const nuevosErrores = {};

    if (!nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
      nuevosErrores.nombre = "El nombre solo puede contener letras";
    } else if (nombre.trim().length < 2) {
      nuevosErrores.nombre = "El nombre debe tener al menos 2 caracteres";
    }

    if (!apellido.trim()) {
      nuevosErrores.apellido = "El apellido es obligatorio";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido)) {
      nuevosErrores.apellido = "El apellido solo puede contener letras";
    } else if (apellido.trim().length < 2) {
      nuevosErrores.apellido = "El apellido debe tener al menos 2 caracteres";
    }

    if (!email.trim()) {
      nuevosErrores.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nuevosErrores.email = "El email no tiene un formato válido";
    }

    if (!telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio";
    } else if (!/^\d{7,}$/.test(telefono)) {
      nuevosErrores.telefono = "El teléfono debe tener al menos 7 números";
    }

    if (!ciudad.trim()) {
      nuevosErrores.ciudad = "La ciudad es obligatoria";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(ciudad)) {
      nuevosErrores.ciudad = "La ciudad solo puede contener letras";
    } else if (ciudad.trim().length < 2) {
      nuevosErrores.ciudad = "La ciudad debe tener al menos 2 caracteres";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const modificarCliente = async () => {

    if (!validar()) {
      return;
    }

    try {

      const datosModificados = {
        ...cliente,
        email,
        phone: telefono,
        name: {
          ...cliente.name,
          firstname: nombre,
          lastname: apellido
        },
        address: {
          ...cliente.address,
          city: ciudad
        }
      };

      const clienteModificado =
        await clientesService.modificarCliente(
          id,
          datosModificados
        );

      setCliente(clienteModificado);
      setEditando(false);
      setErrores({});
      setMensaje("Cliente modificado correctamente");

    } catch {

      setMensaje("Error al modificar cliente");

    }
  };

  const cancelarEdicion = () => {

    setNombre(cliente.name.firstname);
    setApellido(cliente.name.lastname);
    setEmail(cliente.email);
    setTelefono(cliente.phone);
    setCiudad(cliente.address.city);

    setErrores({});
    setEditando(false);

  };

  const eliminarCliente = async () => {

    try {

      await clientesService.eliminarCliente(id);

      setMensaje("Cliente eliminado correctamente");

      setTimeout(() => {
        navigate("/clientes");
      }, 2000);

    } catch {

      setMensaje("Error al eliminar cliente");

    }
  };

  if (!cliente) {
    return <h2>Cargando cliente...</h2>;
  }

  return (

    <div className="detalle-cliente">

      <h1>Ficha del Cliente</h1>

      {mensaje && (
        <p className="mensaje-eliminado">
          {mensaje}
        </p>
      )}

      <p>
        <strong>ID:</strong> {cliente.id}
      </p>

      {editando ? (

        <>

          <p>
            <strong>Nombre:</strong>
          </p>

          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <p className="error">
            {errores.nombre || " "}
          </p>

          <p>
            <strong>Apellido:</strong>
          </p>

          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />

          <p className="error">
            {errores.apellido || " "}
          </p>

          <p>
            <strong>Email:</strong>
          </p>

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <p className="error">
            {errores.email || " "}
          </p>

          <p>
            <strong>Teléfono:</strong>
          </p>

          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />

          <p className="error">
            {errores.telefono || " "}
          </p>

          <p>
            <strong>Ciudad:</strong>
          </p>

          <input
            type="text"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
          />

          <p className="error">
            {errores.ciudad || " "}
          </p>

          <button onClick={modificarCliente}>
            Guardar cambios
          </button>

          <button onClick={cancelarEdicion}>
            Cancelar
          </button>

        </>

      ) : (

        <>

          <p>
            <strong>Nombre:</strong>{" "}
            {cliente.name.firstname} {cliente.name.lastname}
          </p>

          <p>
            <strong>Email:</strong> {cliente.email}
          </p>

          <p>
            <strong>Teléfono:</strong> {cliente.phone}
          </p>

        </>

      )}

      <h2>Dirección</h2>

      <p>
        <strong>Calle:</strong> {cliente.address.street || "-"}
      </p>

      <p>
        <strong>Número:</strong> {cliente.address.number || "-"}
      </p>

      <p>
        <strong>Código Postal:</strong> {cliente.address.zipcode || "-"}
      </p>

      <p>
        <strong>Ciudad:</strong> {cliente.address.city}
      </p>

      <h2>Credenciales</h2>

      <p>
        <strong>Usuario:</strong> {cliente.username}
      </p>

      <p>
        <strong>Contraseña:</strong> {cliente.password}
      </p>

      {admin?.sector === "Gerencia" && !editando && (

        <>

          <button onClick={() => setEditando(true)}>
            Modificar Cliente
          </button>

          <button
            className="btn-eliminar"
            onClick={eliminarCliente}
          >
            Eliminar Cliente
          </button>

          <button
            className="btn-volver"
            onClick={() => navigate("/clientes")}
          >
            Volver a Clientes
          </button>

        </>

      )}

    </div>
  );
};

export default DetalleCliente;