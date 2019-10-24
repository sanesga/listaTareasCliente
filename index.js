//string donde se acumulan los elementos
var list = new String();

//input donde escribimos el elemento
var inputText = document.getElementById("box");

//lista donde se imprimen los elementos
var divLista = document.getElementById("lista");

var arrayElementos = new Array();
var divErrores = document.getElementById("errores");

//id de cada elemento
var id = 0;

//RECUPERAMOS LOS DATOS DE LOCALSTORAGE (recupera un JSON, hacemos parse)
var array = localStorage.getItem("datos");

//verificamos que hay datos e imprimimos
if (array != null) {
  arrayElementos = JSON.parse(array);
  imprimir();
}

//al hacer click en agregar
function iniciar() {
  divErrores.innerHTML = "";

  //creamos objeto
  var elemento = new Object();

  //obtenemos el nombre
  var text = inputText.value;

  if (!text == "") {
    var name = text.trim();

    //agregamos atributos
    elemento.name = name;
    elemento.id = id;
    id++;

    //agregamos al array
    agregar(elemento);
    imprimir();
  } else {
    divErrores.innerHTML = "No has introducido ningún elemento";
  }
}

function agregar(elemento) {
  arrayElementos.push(elemento);
}

//imprimimos un string con el icono, el id y el nombre del objeto
function imprimir() {
  for (var e of arrayElementos) {
    list +=
      "<li class='far fa-trash-alt' id=" +
      e.id +
      " onclick='eliminarElemento(id)'></li> " +
      e.name +
      "</br></br>";
  }
  //imprimimos la lista en el div
  divLista.innerHTML = list;

  //limpiamos la lista
  list = "";

  //limpiamos el input
  inputText.value = "";
}

function eliminarElemento(id) {
  for (var i = 0; i < arrayElementos.length; i++) {
    if (arrayElementos[i].id == id) {
      //borramos 1 elemento en la posición i
      arrayElementos.splice(i, 1);
    }
  }
  imprimir();
}

function eliminarTodo() {
  //borramos la lista
  divLista.innerHTML = "";

  //limpiamos el array
  arrayElementos = [];
}

//GUARDAMOS LOS DATOS EN LOCAL STORAGE AL CERRAR LA PESTAÑA DEL NAVEGADOR (body onbeforeunload)
function guardarDatos() {
  //comprobamos si el navegador lo soporta
  if (typeof Storage !== "undefined") {
    if (arrayElementos == []) { //si el array que vamos a guardar está vacío, borramos el localStorage.
      localStorage.clear();
    } else {
      localStorage.setItem("datos", JSON.stringify(arrayElementos)); //pasamos el array a JSON
    }
  } else {
    divErrores(
      "Este navegador no tiene soporte para almacenamiento web. Inténtelo en otro."
    );
  }
}
