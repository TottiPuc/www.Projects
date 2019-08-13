// declaracion de variables de inicio
var idUsuario = 3846;
var nombreUsuario = "Christian Arcos";
iniciarSesion();

//Declaración de variables de funciones

var saldoCuenta = 10000;
var limiteExtraccion = 3000;
var contador =0;

// variables de servicios
var Agua = 350;
var Telefono = 425;
var Luz = 210;
var Internet = 570;

// variables de cuenta amiga
var cuentas_amiga = [1234567,7654321]



// funciones auxiliares

//funcion para depostar dinero
function sumarDiner (valorDepositado) {
    if (valorDepositado <1000){ // verificar depositos positivos mayores a 1000
        alert("solo se aceptan depositos mayores a $ 1000"); 
        return 0; }
    else {
    saldoCuenta += valorDepositado; // al valor de la cuenta se le suma el valor depositado
    return saldoCuenta;}
}

// funcion para el retiro de dinero
function restarDinero (valorExtraido) {
    var dinero = multiplos(valorExtraido); // verificación  billetes de 100
    var positivos = positivo(valorExtraido); // verificación valores positivos
    
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


//······································· funciones auxiliares de verificación ·······································

function positivo(valorExtraido) { // función que verifica numeros positivos
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

function limite(valorExtraido) { // función que verifica si el limite extraido no supero el saldode la cuenta
    if (valorExtraido <= saldoCuenta) {
       return 1; 
    }
    else {
        return 0;
    }
}

function verificar(saldo) {
    if (saldoCuenta >= saldo && saldo > 0) {
        saldoCuenta -= saldo;  // al valor de la cuenta se le resta el valor extraido
        return saldoCuenta;
    }
    else {
        alert("fondos insuficientes para realizar esta operacion.");
        return 0;
    }
}

//·······················Funciones Principales···········································

function cambiarLimiteDeExtraccion() {
    var limite = parseInt(prompt("Digite el nuevo limite de extracción"));
    if (!isNaN(limite)){
        limiteExtraccion = limite;
        alert("su nuevo limite de extracción es: $" + limiteExtraccion);
        actualizarLimiteEnPantalla();}
    else{
        alert("digite una cantidad correcta")
    }
}

function extraerDinero() {
    var extraer = parseInt(prompt("Digite la cantidad a extraer"));
    var saldoAnterior = saldoCuenta;
    var saldoActual = restarDinero(extraer);
    alert("Saldo anterior: $" + saldoAnterior + "\n" + "Saldo actual: $" + saldoActual);
    actualizarSaldoEnPantalla();
}

function depositarDinero() {
    var deposito = parseInt(prompt("digite el valor a depositar"));
    if (!isNaN(deposito)){
        var saldoAnterior = saldoCuenta;
        var saldoActual = sumarDiner(deposito);
        while (saldoActual===0) {   //verificar que siempre se deposite cantidades mayores a 1000
            deposito = parseInt(prompt("digite el valor a depositar"));
            saldoActual = sumarDiner(deposito);
        }
        alert("El valor depositado es: $" + deposito + "\n" + "saldo anterior: $" + saldoAnterior + "\n" + "saldo Actual: $" + saldoActual)
        actualizarSaldoEnPantalla();
    }
    else{
        alert("digite una cantidad correcta")
    }
}

function pagarServicio() {
    var opcion = parseInt(prompt("Ingresar el numero correspondiente con el servicio que desa pagar: \n 1. Luz \n 2. Agua \n 3. Telefono \n 4. Internet \n 0. para salir" ))
    switch (opcion) {
        case 1:
           var op = parseInt(prompt("el valor a pagar del servicio de luz es: $ " + Luz + "\n presione \n 1. si desea realizar el pago \n 0. si quieres regresar al menu principal"));
            if (op === 1) {
                var pago = verificar(Luz);
                if (pago != 0) {
                    alert("transaccion exitosa, has pagado el servicio de Luz. \n Dinero descontado $ " + Luz + "\n saldo Actual $ " + pago)
                    actualizarSaldoEnPantalla();
                       
                }
            }
            else {
                alert("regresar al menu principal")
            }
            break;
        case 2:
            var op = parseInt(prompt("el valor a pagar del servicio de Agua es: $ " + Agua + "\n presione \n 1. si desea realizar el pago \n 0. si quieres regresar al menu principal"));
            if (op === 1) {
                var pago = verificar(Agua);
                if (pago != 0) {
                    alert("transaccion exitosa, has pagado el servicio de Agua. \n Dinero descontado $ " + Agua + "\n saldo Actual $ " + pago)
                    actualizarSaldoEnPantalla();  
                }
            }
            else {
                alert("regresar al menu principal")
            }
            break;
        case 3:
            var op = parseInt(prompt("el valor a pagar del servicio de telefono es: $ " + Telefono + "\n presione \n 1. si desea realizar el pago \n 0. si quieres regresar al menu principal"));
            if (op === 1) {
                var pago = verificar(Telefono);
                if (pago != 0) {
                    alert("transaccion exitosa, has pagado el servicio de Telefono. \n Dinero descontado $ " + Telefono + "\n saldo Actual $ " + pago)
                    actualizarSaldoEnPantalla();  
                }
            }
            else {
                alert("regresar al menu principal")
            }
            break;
        case 4:
            var op = parseInt(prompt("el valor a pagar del servicio de Internet es: $ " + Internet + "\n presione \n 1. si desea realizar el pago \n 0. si quieres regresar al menu principal"));
            if (op === 1) {
                var pago = verificar(Internet);
                if (pago != 0) {
                    alert("transaccion exitosa, has pagado el servicio de Internet. \n Dinero descontado $ " + Internet + "\n saldo Actual $ " + pago)
                    actualizarSaldoEnPantalla();   
                }
            }
            else {
                alert("regresar al menu principal")
            }
            break;
        default:
            alert("operacion invalida")
            break;
    }

}

function transferirDinero() {
        var monto = parseInt(prompt("Ingrese el valor a transferir"));
        var cuenta = parseInt(prompt("Ingresar el numero de la cuenta de destino"));
        if (!isNaN(monto) && !isNaN(cuenta)){
            for (i in cuentas_amiga) {
                contador ++;
                if (cuenta == cuentas_amiga[i]) {
                    contador --;
                    var transfer = verificar(monto);
                    break;
                }
            }
            if (contador != cuentas_amiga.length && transfer !=0) {
                alert("Se han transferido : $ " + monto + "\n Cuenta destino: " + cuenta + "\n su nuevo saldo es $ " + transfer);
                actualizarSaldoEnPantalla();
                contador = 0;
            }
            else{
                alert("la cuenta " + cuenta + " no esta registrada en las cuentas amigas, o su saldo no es suficiente, intente nuevamente");
                contador=0;
            }
        }        
        else{
            alert("Digite una cantidad de dinero y numero de cuenta correcta")
        }
        

        
}

function iniciarSesion() {
    var id = parseInt(prompt("Digite su clave numerica"));
    if (!isNaN(id)) {
      
         if (id === idUsuario) {
            alert("Bienvenido " + nombreUsuario + " ya puedes comenzar a realizar operaciones")
            //Ejecución de las funciones que actualizan los valores de las variables en el HTML.
            window.onload = function() {
                cargarNombreEnPantalla();
                actualizarSaldoEnPantalla();
                actualizarLimiteEnPantalla();
            }
        }
        else{
            alert("Clave incorrecta")
        }

        }
    else{
        alert("No digito nada aplicacion cerrada")
    }
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