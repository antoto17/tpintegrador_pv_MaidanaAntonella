import axios from "axios";

const URL = "https://fakestoreapi.com/users";
const STORAGE_CLIENTES = "clientes";

let clientes = [];

const guardarClientes = () => {
    localStorage.setItem(
        STORAGE_CLIENTES,
        JSON.stringify(clientes)
    );
};

const cargarClientesGuardados = () => {
    const datos = localStorage.getItem(STORAGE_CLIENTES);

    if (datos) {
        clientes = JSON.parse(datos);
        return true;
    }

    return false;
};

const obtenerClientes = async () => {

    if (cargarClientesGuardados()) {
        return clientes.filter(
            (cliente) => cliente.disponible !== false
        );
    }

    const respuesta = await axios.get(URL);

    clientes = respuesta.data.map((cliente) => ({
        ...cliente,
        disponible: true
    }));

    guardarClientes();

    return clientes;
};

const obtenerCliente = async (id) => {

    await obtenerClientes();

    const cliente = clientes.find(
        (cliente) =>
            String(cliente.id) === String(id) &&
            cliente.disponible !== false
    );

    if (cliente) {
        return cliente;
    }

    return null;
};

const crearCliente = async (cliente) => {

    await axios.post(URL, cliente);

    const nuevoId = clientes.length > 0
        ? Math.max(...clientes.map(c => Number(c.id))) + 1
        : 1;

    const nuevoCliente = {
        ...cliente,
        id: nuevoId,
        disponible: true
    };

    clientes.push(nuevoCliente);

    guardarClientes();

    return nuevoCliente;
};
const modificarCliente = async (id, datosModificados) => {

    const cliente = clientes.find(
        (c) =>
            String(c.id) === String(id) &&
            c.disponible !== false
    );

    if (!cliente) {
        return null;
    }

    await axios.put(`${URL}/${id}`, datosModificados);

    Object.assign(cliente, datosModificados);

    guardarClientes();

    return cliente;
};

const eliminarCliente = async (id) => {

    const cliente = clientes.find(
        (c) =>
            String(c.id) === String(id) &&
            c.disponible !== false
    );

    if (!cliente) {
        return null;
    }

    try {
        await axios.delete(`${URL}/${id}`);
    } catch {
        
    }

    cliente.disponible = false;

    guardarClientes();

    return cliente;
};

const obtenerEstadisticas = async () => {

    await obtenerClientes();

    const total = clientes.filter(
        (cliente) => cliente.disponible !== false
    ).length;

    const eliminados = clientes.filter(
        (cliente) => cliente.disponible === false
    ).length;

    return {
        total,
        eliminados
    };
};

export default {
    obtenerClientes,
    obtenerCliente,
    crearCliente,
    modificarCliente,
    eliminarCliente,
    obtenerEstadisticas
};