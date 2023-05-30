const {request} = require('express');
const { User } = require('../../models/modelUsuario');
req = request
document.addEventListener('DOMContentLoaded', () => {
  // Variables
  
  function load() {
    setNavBarToken()
  }

const dataBase = User.productos
const baseDeDatos = dataBase
//  [
//   {
//       id: 1,
//       nombre: 'Patata',
//       precio: 1,
//       imagen: 'patata.jpg'
//   },
//   {
//       id: 2,
//       nombre: 'Cebolla',
//       precio: 1.2,
//       imagen: 'cebolla.jpg'
//   },
//   {
//       id: 3,
//       nombre: 'Calabacin',
//       precio: 2.1,
//       imagen: 'calabacin.jpg'
//   },
//   {
//       id: 4,
//       nombre: 'Fresas',
//       precio: 0.6,
//       imagen: 'fresas.jpg'
//   }

//   ];

  let carrito = [];
  const divisa = '$';
  const DOMitems = document.querySelector('#items');
  const DOMcarrito = document.querySelector('#carrito');
  const DOMtotal = document.querySelector('#total');
  const DOMbotonVaciar = document.querySelector('#boton-vaciar');

  // Funciones

  /**
  * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
  */
  function renderizarProductos() {
      baseDeDatos.forEach((info) => {
          // Estructura
          const miNodo = document.createElement('div');
          miNodo.classList.add('card', 'col-sm-4');
          // Body
          const miNodoCardBody = document.createElement('div');
          miNodoCardBody.classList.add('card-body');
          // Titulo
          const miNodoTitle = document.createElement('h5');
          miNodoTitle.classList.add('card-title');
          miNodoTitle.textContent = info.nombre;
          // Imagen
          const miNodoImagen = document.createElement('img');
          miNodoImagen.classList.add('img-fluid');
          miNodoImagen.setAttribute('src', info.imagen);
          // Precio
          const miNodoPrecio = document.createElement('p');
          miNodoPrecio.classList.add('card-text');
          miNodoPrecio.textContent = `${info.precio}${divisa}`;
          // Boton 
          const miNodoBoton = document.createElement('button');
          miNodoBoton.classList.add('btn', 'btn-primary');
          miNodoBoton.textContent = '+';
          miNodoBoton.setAttribute('marcador', info.id);
          miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
          // Insertamos
          miNodoCardBody.appendChild(miNodoImagen);
          miNodoCardBody.appendChild(miNodoTitle);
          miNodoCardBody.appendChild(miNodoPrecio);
          miNodoCardBody.appendChild(miNodoBoton);
          miNodo.appendChild(miNodoCardBody);
          DOMitems.appendChild(miNodo);
      });
  }

  /**
  * Evento para añadir un producto al carrito de la compra
  */
  function anyadirProductoAlCarrito(evento) {
      // Anyadimos el Nodo a nuestro carrito
      carrito.push(evento.target.getAttribute('marcador'))
      // Actualizamos el carrito 
      renderizarCarrito();

  }

  /**
  * Dibuja todos los productos guardados en el carrito
  */
  function renderizarCarrito() {
      // Vaciamos todo el html
      DOMcarrito.textContent = '';
      // Quitamos los duplicados
      const carritoSinDuplicados = [...new Set(carrito)];
      // Generamos los Nodos a partir de carrito
      carritoSinDuplicados.forEach((item) => {
          // Obtenemos el item que necesitamos de la variable base de datos
          const miItem = baseDeDatos.filter((itemBaseDatos) => {
              // ¿Coincide las id? Solo puede existir un caso
              return itemBaseDatos.id === parseInt(item);
          });
          // Cuenta el número de veces que se repite el producto
          const numeroUnidadesItem = carrito.reduce((total, itemId) => {
              // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
              return itemId === item ? total += 1 : total;
          }, 0);
          // Creamos el nodo del item del carrito
          const miNodo = document.createElement('li');
          miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
          miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
          // Boton de borrar
          const miBoton = document.createElement('button');
          miBoton.classList.add('btn', 'btn-danger', 'mx-5');
          miBoton.textContent = 'X';
          miBoton.style.marginLeft = '1rem';
          miBoton.dataset.item = item;
          miBoton.addEventListener('click', borrarItemCarrito);
          // Mezclamos nodos
          miNodo.appendChild(miBoton);
          DOMcarrito.appendChild(miNodo);
      });
     // Renderizamos el precio total en el HTML
     DOMtotal.textContent = calcularTotal();
  }

  /**
  * Evento para borrar un elemento del carrito
  */
  function borrarItemCarrito(evento) {
      // Obtenemos el producto ID que hay en el boton pulsado
      const id = evento.target.dataset.item;
      // Borramos todos los productos
      carrito = carrito.filter((carritoId) => {
          return carritoId !== id;
      });
      // volvemos a renderizar
      renderizarCarrito();
  }

  /**
   * Calcula el precio total teniendo en cuenta los productos repetidos
   */
  function calcularTotal() {
      // Recorremos el array del carrito 
      return carrito.reduce((total, item) => {
          // De cada elemento obtenemos su precio
          const miItem = baseDeDatos.filter((itemBaseDatos) => {
              return itemBaseDatos.id === parseInt(item);
          });
          // Los sumamos al total
          return total + miItem[0].precio;
      }, 0).toFixed(2);
  }

  /**
  * Varia el carrito y vuelve a dibujarlo
  */
  function vaciarCarrito() {
      // Limpiamos los productos guardados
      carrito = [];
      // Renderizamos los cambios
      renderizarCarrito();
  }

  // Eventos
  DOMbotonVaciar.addEventListener('click', vaciarCarrito);

  // Inicio
  renderizarProductos();
  renderizarCarrito();
});



















// const { User } = require("../../models/modelUsuario")

// function load () {
//     setNavBarToken()
//   }
//   const cards = document.getElementById('cards')
//   const templateCard = document.getElementById('template-card').content
//   const items = document.getElementById('items')
//   const footer = document.getElementById('footer')
//   const templateFooter = document.getElementById('template-footer').content
//   const templateCarrito = document.getElementById('template-carrito').content
//   const fragment = document.createDocumentFragment()
//   let carrito = {}
  
  
//   document.addEventListener('DOMContentLoaded', ()=>{
//     fetchData()
//     if(localStorage.getItem('carrito')){
//       carrito = JSON.parse(localStorage.getItem('carrito'))
//       pintarCarrito()
//     }
//   }
//   )
  
//   cards.addEventListener('click', e =>{
//     addCarrito(e)
//   })
  
//   items.addEventListener('click', e=>{
//     btnAccion(e)
//   })
  
//   const fetchData = async()=>{
//     try{
//       const res = await fetch('productos.json')
//       const data = await res.json()
//       pintarCard(data)
  
//     }catch(error){
//       console.log(error)
//     }
//   }
  
//   const pintarCard = data => {
//     data.forEach(item => {
//       templateCard.querySelector('h5').textContent = item.nombre
//       templateCard.querySelector('p').textContent = item.precio
//       templateCard.querySelector('img').setAttribute('src', item.imagen)
//       templateCard.querySelector('.btn-dark').dataset.id = item.id
//       const clone = templateCard.cloneNode(true)
//       fragment.appendChild(clone)
//     })
//     cards.appendChild(fragment)
//   }
  
//   const addCarrito = e =>{
//     //console.log(e.target)
//     //console.log(e.target.classList.contains('btn-dark'))
//     if(e.target.classList.contains('btn-dark')){
//       setCarrito(e.target.parentElement)
//     }
  
//   e.stopPropagation()
//   }
  
  
  
//   const setCarrito = item => {
//     //console.log(objeto)
//     const producto = {
//       nombre: item.querySelector('h5').textContent,
//       precio: item.querySelector('p').textContent,
//       id: item.querySelector('.btn-dark').dataset.id,
//       cantidad: 1
//     }
  
//     if(carrito.hasOwnProperty(producto.id)){
//       producto.cantidad = carrito[producto.id].cantidad + 1
//     }
  
//     carrito[producto.id] = { ...producto}
//     pintarCarrito()
//   }
  
//   const pintarCarrito = ()=> {
    
//     items.innerHTML = ''
//     Object.values(carrito).forEach(producto => {
//       templateCarrito.querySelector('th').textContent = producto.id
//       templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre
//       templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
//       templateCarrito.querySelector('.btn-info').dataset.id = producto.id
//       templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
//       templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
//       const clone = templateCarrito.cloneNode(true)
//       fragment.appendChild(clone)
//     })
  
//     items.appendChild(fragment)
  
//     pintarFooter()
  
//     localStorage.setItem('carrito', JSON.stringify(carrito))
  
//   }
  
//   const pintarFooter = () => {
//       footer.innerHTML = ''
//       if(Object.keys(carrito).length === 0){
//         footer.innerHTML = `
//         <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
//         `
//         return
//       }
  
//       const nCantidad = Object.values(carrito).reduce((acc, {cantidad})=> acc + cantidad, 0)
//       const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)
      
//       templateFooter.querySelectorAll('td')[0].textContent = nCantidad
//       templateFooter.querySelector('span').textContent = nPrecio
    
//       const clone = templateFooter.cloneNode(true)
//       fragment.appendChild(clone)
//       footer.appendChild(fragment)
    
//       const btnVaciar = document.getElementById('vaciar-carrito')
//       btnVaciar.addEventListener('click', ()=>{
//         carrito = {}
//         pintarCarrito()
//       })
//     }
  
  
//   const btnAccion = e =>{
    
//     if(e.target.classList.contains('btn-info')){
      
//       const producto = carrito[e.target.dataset.id]
//       producto.cantidad++
  
//       carrito[e.target.dataset.id] = {...producto}
//       pintarCarrito()
//     }
  
//     if(e.target.classList.contains('btn-danger')){
//       const producto = carrito[e.target.dataset.id]
//       producto.cantidad--
//       if(producto.cantidad ===0){
//         delete carrito[e.target.dataset.id]
//       }
//       pintarCarrito()
  
//     }
  
//     e.stopPropagation()
//   }
