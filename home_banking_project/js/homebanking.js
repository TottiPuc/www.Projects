//Declaración de variables

var nombreUsuario = prompt("Digite su nombre y apellido")
var saldoCuenta = 10000;
var limiteExtraccion = 3000;
var extraer;

// variables de servicios
var agua = 350;
var telefono = 425;
var luz = 210;
var internet = 570;


//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}

// funciones auxiliares

function sumarDiner (valorDepositado) {
    if (valorDepositado <1000){ // verificar depositos positivos mayores a 1000
        alert("solo se aceptan depositos mayores a $ 1000"); 
        return 0; }
    else {
    saldoCuenta += valorDepositado; // al valor de la cuenta se le suma el valor depositado
    return saldoCuenta;}
}


function restarDinero (valorExtraido) {
    var dinero = multiplos(valorExtraido);
    var positivos = positivo(valorExtraido);
    
    while (dinero == 0 || positivos == 0) {
        alert ("el valor solicitado para extraccion debe ser multiplo de 100 mayor a $0 y no supera el limite de extracción de $" + limiteExtraccion);
        valorExtraido = parseInt(prompt("Digite la cantidad a extraer"));
        dinero = multiplos(valorExtraido);  
        positivos = positivo(valorExtraido);
    }

    var totalExtraido = limite(valorExtraido);
    while (totalExtraido == 0) {
        alert ("fondos insuficientes, su saldo actual es: $" + saldoCuenta )
        valorExtraido = parseInt(prompt("Digite una cantidad dentro de su saldo que es: $" + saldoCuenta));
        var totalExtraido = limite(valorExtraido);
    }
    
    if (totalExtraido == 1) {
        alert ("el valor solicitado para extraccion es : $" + valorExtraido)
        saldoCuenta -= valorExtraido;  // al valor de la cuenta se le resta el valor extraido
        return saldoCuenta;
    }

    
}



function positivo(valorExtraido) {
    if (valorExtraido > 0 && valorExtraido <= limiteExtraccion) {
        return 1;
        }
    else {
        return 0;
        }
}


function multiplos(valorExtraido) { // funcion que verifica solo retiro de billetes de 100
    var multiplo = valorExtraido % 100;
    if (multiplo != 0) {
        return 0;
    } 
}

function limite(valorExtraido) {
    if (valorExtraido < saldoCuenta) {
       return 1; 
    }
    else {
        return 0;
    }
}


//Funciones Principales
function cambiarLimiteDeExtraccion() {
    var limite = parseInt(prompt("Digite el nuevo limite de extracción"));
    limiteExtraccion = limite;
    alert("su nuevo limite de extracción es: $" + limiteExtraccion);
    actualizarLimiteEnPantalla();
    

}

function extraerDinero() {
    extraer = parseInt(prompt("Digite la cantidad a extraer"));
    var saldoAnterior = saldoCuenta;
    var saldoActual = restarDinero(extraer);
    alert("El valor extraido es: $" + extraer + "\n" + "Saldo anterior: $" + saldoAnterior + "\n" + "Saldo actual: $" + saldoActual);
    actualizarSaldoEnPantalla();

}

function depositarDinero() {
    var deposito = parseInt(prompt("digite el valor a depositar"));
    var saldoAnterior = saldoCuenta;
    var saldoActual = sumarDiner(deposito);
    while (saldoActual===0) {   //verificar que siempre se deposite cantidades mayores a 1000
        deposito = parseInt(prompt("digite el valor a depositar"));
        saldoActual = sumarDiner(deposito);
    }
    alert("El valor depositado es: $" + deposito + "\n" + "saldo anterior: $" + saldoAnterior + "\n" + "saldo Actual: $" + saldoActual)
    actualizarSaldoEnPantalla();

}

function pagarServicio() {
    var opcion = parseInt(prompt("Ingresar el numero correspondiente con el servicio que desa pagar: \n 1. Luz \n 2. Agua \n 3. Telefono \n 4. Internet \n 0. para salir" ))
    switch (opcion) {
        case 1:
            alert("entro uno")
            break;
        case 2:
            alert("entro dos")
            break;
        case 3:
            alert("entro trws")
            break;
        case 4:
            alert("entro cuatro")
            break;
        default:
            alert("escoja una opcion adecuada")
            break;
    }

}

function transferirDinero() {

}

function iniciarSesion() {

}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}