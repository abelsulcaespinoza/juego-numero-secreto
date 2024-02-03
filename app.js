//Variables globales
let numeroMaximo = 10;
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximoDeIntentos = 3;

// Funcion modificar texto de un elemento HTML
function asignarTextoElemento(elemento, texto) {
  //Variable que almacena el elemento HTML
  let elementoHTML = document.querySelector(elemento);
  //Asignar el texto al elemento HTML
  elementoHTML.innerHTML = texto;
  //Retornar
  return;
}

//Funcion para establecer las condiciones iniciales
condicionesIniciales();

//Funcion para establecer las condiciones iniciales
function condicionesIniciales() {
  asignarTextoElemento("h1", "Juego: Número Secreto");
  asignarTextoElemento("p", `Indica un número del 1 al ${numeroMaximo}`);
  numeroSecreto = generarNumeroSecreto();
  intentos = 1;
}

//Funcion para verificar el intento del usuario
function verificarIntento() {
  //Obtener el numero del usuario en formato numerico
  let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);

  //Verificar si el numero del usuario es igual al numero secreto
  if (numeroDeUsuario === numeroSecreto) {
    asignarTextoElemento(
      "p",
      `¡Felicidades! ¡Has adivinado el número secreto! ¡Lo lograste en ${intentos} ${
        intentos === 1 ? "intento" : "intentos"
      }!`
    );
    // Habilitar el boton de reiniciar
    document.querySelector("#reiniciar").removeAttribute("disabled");
  }
  //Verificar si el numero del usuario es mayor o menor al numero secreto
  else {
    if (numeroDeUsuario > numeroSecreto) {
      asignarTextoElemento("p", "El número secreto es menor");
    } else {
      asignarTextoElemento("p", "El número secreto es mayor");
    }
    //Incrementar el numero de intentos
    intentos++;

    //Verificar si el numero de intentos es igual al numero maximo de intentos
    if (intentos > numeroMaximoDeIntentos) {
      asignarTextoElemento(
        "p",
        `¡Lo siento! ¡Has agotado tus ${numeroMaximoDeIntentos} intentos!`
      );
      // Habilitar el boton de reiniciar
      document.querySelector("#reiniciar").removeAttribute("disabled");
      document.querySelector("#intentar").setAttribute("disabled", "true");
    }

    //Limpiar la caja de texto y colocar el foco en la casilla
    limpiarCaja();
  }
  return;
}

//Funcion para limpiar la caja de texto
function limpiarCaja() {
  //Limpiar la caja de texto
  document.querySelector("#valorUsuario").value = "";
  //Colocar el foco en la caja de texto
  document.querySelector("#valorUsuario").focus();
}

//Funcion para generar un numero aleatorio
function generarNumeroSecreto() {
  //Generar un numero aleatorio entre 1 y 10
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

  if (listaNumerosSorteados.length == numeroMaximo) {
    asignarTextoElemento("p", "No hay más números disponibles");
  } else {
    if (listaNumerosSorteados.includes(numeroGenerado)) {
      return generarNumeroSecreto();
    } else {
      listaNumerosSorteados.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}

//Funcion para reiniciar el juego
function reiniciarJuego() {
  //limpar caja
  limpiarCaja();
  //mensaje de intervalo de numeros
  //Generar numero aleatorio
  //Inicializar numero de intentos
  condicionesIniciales();
  //Desabilitar boton de nuevo juego
  document.querySelector("#reiniciar").setAttribute("disabled", "true");
  document.querySelector("#intentar").removeAttribute("disabled");
}
