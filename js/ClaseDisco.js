const nombreInput = document.querySelector("#nombre");
const autorInput = document.querySelector("#autor");
const precioInput = document.querySelector("#precio");
const anioInput = document.querySelector("#anio");
// Secciones
const nombreseccion = document.querySelector("#inputNombre");
const autorseccion = document.querySelector("#inputAutor");
const precioseccion = document.querySelector("#inputPrecio");
const anioseccion = document.querySelector("#inputAnio");

// Buscar y ordenar
const buscar = document.querySelector("#buscar");
const orden = document.querySelector("#orden");
const limpiar = document.querySelector("#limpiar");
// UI
const formularioDisco = document.querySelector("#nueva-disco");
const contenedorDiscos = document.querySelector("#discos");
var id = 0;

class Disco {
  constructor(id, nombre, autor, precio, anio, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.autor = autor;
    this.precio = precio;
    this.anio = anio;
    this.imagen = imagen;
  }
}

class Playlist {
  constructor() {
    this.discos = []; // constructor vacio que inicia un array vacio
  }
  //metodo para agregar un contacto a nuestra Playlist (a this.lista)

  agregar(disco) {
    this.discos.push(disco);
    console.log(this.discos);
  }
  // metodo para buscar un nombre en nuestra Playlist, recorre la lista de contactos uno por uno y compara con el nombre recibido
  buscar(nombre) {
    var listaaux = this.discos;
    for (let i = 0; i < listaaux.length; i++) {
      if (nombre === listaaux[i].nombre) {
        return listaaux[i]; //en caso de encontrarse el nombre, regresamos el contacto completo
      }
    }
    return null; //en caso de encontrar regresamos este string
  }
  eliminarDisco(id) {
    var listaaux = this.discos;
    for (let i = 0; i < listaaux.length; i++) {
      if (id === listaaux[i].id) {
        console.log(id);
        this.discos.splice(i, 1);
        return this.discos; //en caso de encontrarse el nombre, regresamos el contacto completo
      }
    }
    return `EL disco no se encuentra en existencia`; //en caso de encontrar regresamos este string
  }
  BurbujaObjeto({ discos }, campo) {
    console.log(discos);
    let longitud = discos.length;

    let operaciones = 0;
    for (let i = 0; i < discos.length; i++) {
      console.log(i);
      for (let j = 0; j < longitud - 1; j++) {
        console.log(j);
        console.log(
          `Estos son los elementos que se estan comparando elemento j ${
            discos[j]
          } y elemento j+1 ${discos[j + 1]}`
        );
        operaciones++;
        if (discos[j][campo] > discos[j + 1][campo]) {
          cambiar(j, j + 1, discos);
        }
      }
      console.log(`En la iteracion ${i}, el discos esta asi ${discos}`);
      console.log(discos);
      longitud--;
    }
    return discos;
  }
}

class Ui {
  imprimirAlerta(mensaje, tipo) {
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert", "d-block", "col-12");

    // Agregar clase en base al tipo de error
    if (tipo == "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }
    divMensaje.textContent = mensaje;
    // Agregar al DOM
    if (!document.querySelector(".alert")) {
      document
        .querySelector("#contenido")
        .insertBefore(divMensaje, document.querySelector(".agregar-disco"));

      // Quitar alerta despues de 5 segundos
      setTimeout(() => {
        divMensaje.remove();
      }, 5000);
    }
  }
  imprimirCampos(campo,mensaje) {
    const pMensaje = document.createElement("p");
    pMensaje.classList.add("my-0", "text-danger");
    pMensaje.textContent = mensaje;
    // console.log(nombreseccion.lastElementChild.nodeName);

    
    switch (campo) {
      case "nombre":
        if (nombreseccion.lastElementChild.nodeName == "INPUT") {
          nombreseccion.appendChild(pMensaje);
          nombreInput.classList.add("border", "border-danger");
        }
        break;
      case "autor":
        if (autorseccion.lastElementChild.nodeName == "INPUT") {
          autorseccion.appendChild(pMensaje);
          autorInput.classList.add("border", "border-danger");
        }
        break;
      case "precio":
        if (precioseccion.lastElementChild.nodeName == "INPUT") {
          precioseccion.appendChild(pMensaje);
          precioInput.classList.add("border", "border-danger");
        }else if (nombreseccion.lastElementChild.nodeName == "P") {
            nombreseccion.lastElementChild.textContent = mensaje;
        }
        break;
      case "anio":
        if (anioseccion.lastElementChild.nodeName == "INPUT") {
          anioseccion.appendChild(pMensaje);
          anioInput.classList.add("border", "border-danger");
        }else if (nombreseccion.lastElementChild.nodeName == "P") {
            nombreseccion.lastElementChild.textContent = mensaje;
        }
        break;
      default:
        break;
    }
  }
  limpiarCampos(campo) {
    console.log(!nombreseccion.lastElementChild.nodeName == "INPUT");
    switch (campo) {
      case "nombre":
        if (nombreseccion.lastElementChild.nodeName == "P") {
          nombreseccion.removeChild(nombreseccion.lastElementChild);
          nombreInput.classList.remove("border", "border-danger");
        }
        break;
      case "autor":
        if (autorseccion.lastElementChild.nodeName == "P") {
          autorseccion.removeChild(autorseccion.lastElementChild);
          autorInput.classList.remove("border", "border-danger");
        }
        break;
      case "precio":
        if (precioseccion.lastElementChild.nodeName == "P") {
          precioseccion.removeChild(precioseccion.lastElementChild);
          precioInput.classList.remove("border", "border-danger");
        }
        break;
      case "anio":
        if (anioseccion.lastElementChild.nodeName == "P") {
          anioseccion.removeChild(anioseccion.lastElementChild);
          anioInput.classList.remove("border", "border-danger");
        }
        break;
      default:
        break;
    }
  }
  imprimirDiscos({ discos }) {
    if (discos[0] != null) {
      this.limpiarHTML();

      discos.forEach((disco) => {
        const { nombre, autor, precio, anio, id, imagen } = disco;
        const divPrincipal = document.createElement("div");
        divPrincipal.classList.add("row", "g-0", "my-2");
        divPrincipal.dataset.id = id;

        const divDisco = document.createElement("div");
        divDisco.classList.add("disco", "col-7", "ps-4");

        const divDisco2 = document.createElement("div");
        divDisco2.classList.add("disco", "col-5");

        // Scripting de los elementos de la cita
        const imagenDisco = document.createElement("img");
        imagenDisco.classList.add("img-fluid", "rounded-start");
        imagenDisco.src = imagen;

        const nombreParrafo = document.createElement("h2");
        nombreParrafo.classList.add("card-title", "fw-bold", "text-break");
        nombreParrafo.textContent = nombre;

        const autorParrafo = document.createElement("p");
        autorParrafo.innerHTML = `<span class="fw-bold text-break">Autor: </span>${autor}`;

        const precioParrafo = document.createElement("p");
        precioParrafo.innerHTML = `<span class="fw-bold text-break">Precio:$ </span>${precio}`;

        const anioParrafo = document.createElement("p");
        anioParrafo.innerHTML = `<span class="fw-bold text-break">Año: </span>${anio}`;

        //   Boton para eliminar este disco
        const btnElminar = document.createElement("button");
        btnElminar.classList.add("btn", "btn-danger", "me-2");
        btnElminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>`;

        btnElminar.onclick = () => eliminarDisc(id);

        //   Agregar los parrafos al divCita
        divDisco2.appendChild(imagenDisco);
        divDisco.appendChild(nombreParrafo);
        divDisco.appendChild(autorParrafo);
        divDisco.appendChild(precioParrafo);
        divDisco.appendChild(anioParrafo);
        divDisco.appendChild(btnElminar);

        // Agregar las citas al HTML
        divPrincipal.appendChild(divDisco2);
        divPrincipal.appendChild(divDisco);
        contenedorDiscos.appendChild(divPrincipal);
      });
    } else {
      this.limpiarHTML();
      const ErrorMensajeParrafo = document.createElement("h3");
      ErrorMensajeParrafo.classList.add("card-title", "fw-bold", "text-break");
      ErrorMensajeParrafo.textContent =
        "El disco no se encuentra en existencia";
      contenedorDiscos.appendChild(ErrorMensajeParrafo);
    }
  }
  limpiarHTML() {
    while (contenedorDiscos.firstChild) {
      contenedorDiscos.removeChild(contenedorDiscos.firstChild);
    }
  }
}
const ui = new Ui();
// const disco = new Disco();
const listadiscos = new Playlist();

// Registrar eventos
eventListener();

function eventListener() {
  nombreInput.addEventListener("input", datosDisco);
  autorInput.addEventListener("input", datosDisco);
  precioInput.addEventListener("input", datosDisco);
  anioInput.addEventListener("input", datosDisco);
  formularioDisco.addEventListener("submit", nuevoDisco);
  buscar.addEventListener("keypress", buscarArtista);
  limpiar.addEventListener("click", limpiarBuscador);
  orden.addEventListener("change", OrdenarDiscos);
}

const discoObj = {
  nombre: "",
  autor: "",
  precio: "",
  anio: "",
};

function datosDisco(e) {
  if (e.target.name == "precio" || e.target.name == "anio") {
    discoObj[e.target.name] = parseInt(e.target.value);
  } else {
    discoObj[e.target.name] = e.target.value;
  }

  console.log(discoObj);
}

// Valida y agrega un nuevo disco a la clase disco y a la playlist
function nuevoDisco(e) {
  e.preventDefault();
  // Extraer informacion del objeto de cita
  const { nombre, autor, precio, anio } = discoObj;

  console.log(discoObj);

  for (const campo in discoObj) {
    if (discoObj[campo] == "") {
      ui.imprimirCampos(campo,"Este campo es obligatorio.");
      // ui.imprimirAlerta('Campos requeridos','error');
    }
    if (!revisarNumeros(discoObj[precio])) {
        ui.imprimirCampos(campo,"Este campo debe ser numerico.");
    }else if(isNaN(discoObj[precio]) ){
        ui.imprimirCampos(campo,"Este campo es obligatorio.");
    }
    if (!revisarNumeros(discoObj[anio])) {
        ui.imprimirCampos(campo,"Este campo debe ser numerico.");
    }else if(isNaN(discoObj[anio]) ){
        ui.imprimirCampos(campo,"Este campo es obligatorio.");
    }
    if(!discoObj[campo]=='') {
      ui.limpiarCampos(campo);
    }
    
  }
  if (nombre === "" || autor === "" || precio === "" || anio === "" || isNaN(precio) || isNaN(anio)) {
    ui.imprimirAlerta("Campos requeridos", "error");
    return;
  }

  // Generar id unico
  discoObj.id = id++;
  let imagen = `https://picsum.photos/id/${id + 26}/200/200`;

  const disco = new Disco(id, nombre, autor, precio, anio, imagen);
  listadiscos.agregar(disco);
  console.log(disco);
  ui.imprimirAlerta("El disco fue agregado correctamente");
  //   Reiniciar objeto
  reiniciarObjeto();

  // Reinicia el formulario
  formularioDisco.reset();

  //   Mostrar el Html con el disco
  ui.imprimirDiscos(listadiscos);
}
function cambiar(indiceA, indiceB, arreglo) {
  const temp = arreglo[indiceA];
  arreglo[indiceA] = arreglo[indiceB];
  arreglo[indiceB] = temp;
  return arreglo;
}
function reiniciarObjeto() {
  discoObj.nombre = "";
  discoObj.autor = "";
  discoObj.precio = "";
  discoObj.anio = "";
  discoObj.imagen = "";
}

function eliminarDisc(id) {
  listadiscos.eliminarDisco(id);

  ui.imprimirAlerta("El disco se elimino correctamente");

  ui.imprimirDiscos(listadiscos);
}

function buscarArtista(e) {
  if (e.key === "Enter") {
    let resultadoBuscar = listadiscos.buscar(e.target.value);
    console.log(listadiscos.buscar(e.target.value));
    const listadiscostem = new Playlist();
    listadiscostem.agregar(resultadoBuscar);

    ui.imprimirDiscos(listadiscostem);
  }
}

function revisarNumeros(elemento) {
    // Allow A-Z, a-z, 0-9 and underscore. Min 1 char.
    var re = /^[0-9]+$/;
    return re.test(elemento);
}
function limpiarBuscador() {
  ui.imprimirDiscos(listadiscos);
}
function OrdenarDiscos(e) {
  console.log(listadiscos);
  console.log(listadiscos.BurbujaObjeto(listadiscos, e.target.value));
  let resultadoOrden = listadiscos.BurbujaObjeto(listadiscos, e.target.value);
  const listadiscostem1 = new Playlist();
  for (let i = 0; i < resultadoOrden.length; i++) {
    listadiscostem1.agregar(resultadoOrden[i]);
  }
  console.log(listadiscostem1);
  ui.imprimirDiscos(listadiscostem1);
}
