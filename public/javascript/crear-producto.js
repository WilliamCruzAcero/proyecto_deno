const createButton = document.getElementById('crear');
createButton.addEventListener("click", crearProducto);

function load() {
    setNavBarToken()
}

async function crearProducto() {

    const url = "/productos";
    const nombreElement = document.getElementById('nombre');
    const nombre = nombreElement.value;

    const precioElement = document.getElementById('precio');
    const precio = precioElement.value;

    const imagenElement = document.getElementById('imagen');
    const imagen = imagenElement.value;

    const cantidadElement = document.getElementById('cantidad');
    const cantidad = cantidadElement.value;

    const token = localStorage.getItem('token')
    const data = { nombre, precio, imagen, cantidad }

    const fetchConfig = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }

    const response = await fetch(url, fetchConfig)

    let body;
    switch (response.status) {
        case 401:
        case 403:
            localStorage.removeItem("token")
            window.location = '/'
            break;
        case 200:
            location.reload();
            break;
        default:
            body = await response.json();
            alert(body.error);
            location.reload();
            break;
    }
}