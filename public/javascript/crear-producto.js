const createButton = document.getElementById('crear');
createButton.addEventListener("click", crearProducto);

function load() {
    setNavBarToken()
}

async function crearProducto() {

    const url = "/product";
    const nombreElement = document.getElementById('nombre');
    const name = nombreElement.value;

    const precioElement = document.getElementById('precio');
    const price = precioElement.value;

    const imagenElement = document.getElementById('imagen');
    const image = imagenElement.value;

    const cantidadElement = document.getElementById('cantidad');
    const amount = cantidadElement.value;

    const token = localStorage.getItem('token')
    const data = { name, price, image, amount }

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