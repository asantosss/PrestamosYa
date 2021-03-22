//cargo toda la web primero 

$(document).ready(function () {

    console.log("todo cargado");

    //tomo datos para Session Storage

    var datoplata = $("#plata");

    var datoplata2 = datoplata.change(tomarDatoPlata);

    var datocuota = $("#opciones");

    var datocuota2 = datocuota.change(tomarDatoPlata);



    // guardo datos en Session Storage
    function tomarDatoPlata() {
        sessionStorage.clear();
        sessionStorage.setItem("Monto", datoplata.val());
        sessionStorage.setItem("Cuotas", datocuota.val());
        sessionStorage.removeItem('key',true);

    }
    // los leo para tomar sus valores
    var plata = sessionStorage.getItem("Monto");
    var cuota = sessionStorage.getItem("Cuotas");



    // Json declarado para modificar el monto y cuota segun vaya ingresando el usuario
    var json = '{"monto":"xxx", "cuota" :"yyy"}';
    // reemplazo los valores xxx e yyy del json con los que me da el usuario
    var cambiojson = json.replace("xxx", plata).replace("yyy", cuota);



    // function para detectar el cambio del checkbox

    var edad = document.getElementById("edad").addEventListener("change", function () {
        if (this.checked) {
            console.log("cambió")
        }


    })
    // fin funcion 


    // condicional para dar el ok a todo , aprovechando los required de html solo me queda saber 
    // si son distintos a nada , porque en caso que no complete el required del html interviene para
    // que sea "obligatorio" accionar sobre los campos 



    if (plata >100001) {

        alert("solo podemos prestarte hasta $100.000")
    }
    if (edad == this.checked && plata != null && plata <100001 && cuota != null) {
        var invisible = $("#boton");
        var visible = $("#modalon");
        var interes_cuota = 3.75;
        var interes_intermedio = (cuota * interes_cuota);
        var interes = plata * interes_intermedio / 100;
        //funcion para volver el foco a la zona de donde deberia seguir el proceso
        function focus() {
            var foco = document.getElementById("modalon");

            foco.focus();


        }

        //arreglo

        var plata2=plata;

        //aca mmostramos la informacion con el calculo hecho , interes y demas. 

        $("#montofinal").text("Obtendrias $" + (plata));
        $("#cuotasfinal").text("en " + cuota + " cuotas" + " de  $" + ((plata+++interes) / cuota).toFixed(2));
        // aca convierto los botones, saco el simular y pongo el solicitar para que siga el proceso. 
        $(invisible).css({
            "display": "none"
        });
        $(visible).css({
            "display": "inline-block"
        });
        //llamo a focus porque aca estariamos con el prestamo en desarrollo aun. 
        focus();

        //datos de modal 
        //guardo todos los estados 0 de los inputs para cuando cambien , saber. 
        var apellido = $("#apellido");
        var nombre = $("#nombre");
        var dni = $("#dni");
        var mail = $("#mail");
        var direccion = $("#direccion");
        var telefono = $("#telefono");
        var afip = $("#afip");
        var cbu = $("#cbu");
        //hago un JSON para almacenar como string en un futuro la información final 
        var jsonmodal = {
            "plata":"xxxx",
            "cuotas":"yyyy",
            "apellido": 1111,
            "nombre": 2222,
            "dni": 3333,
            "mail": 4444,
            "direccion": 5555,
            "telefono": 6666,
            "afip": 7777,
            "cbu": 8888,
        }


        // con esto detecto el cambio de todos los inputs del form del modal 
        $(apellido) && $(nombre) && $(dni) && $(mail) && $(direccion) && $(telefono) && $(afip) && $(cbu).change(datosmodal);

        //funcion que guarda todos los datos en session , es la info que nos queda disponible para mandarla a un backend si hubiera.
        

        function datosmodal() {
           
            var converjsonmodal = JSON.stringify(jsonmodal);
            var json2 = converjsonmodal.replace(1111, $(apellido).val())
                .replace(2222, $(nombre).val())
                .replace(3333, $(dni).val())
                    .replace(4444, $(mail).val())
                        .replace(5555, $(direccion).val())
                            .replace(6666, $(telefono).val())
                                .replace(7777, $(afip).val())
                                    .replace(8888, $(cbu).val())
                                    .replace("xxxx",plata2)
                                    .replace("yyyy",cuota);
            localStorage.setItem("datos solicitante" ,json2);

            console.log(json2);

        };

        function print(){

            print();
        }








        //esto seria para limpiar el programa cuando el cliente vuelve a poner el mouse sobre monto , reinicia todo.

        $("#plata").click(function () {

            sessionStorage.clear();
            localStorage.clear();
            location.reload();


        });



    }
})


//Ajax local para mostrar costo financiero total con un boton.


document.querySelector("#ajax").addEventListener("click", datos);

function datos() {
    console.log("ajax on");
    const archivo = new XMLHttpRequest();

    archivo.open('GET', 'cft.json', true);

    archivo.send();

    archivo.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var datos = JSON.parse(this.responseText);
            let res = document.querySelector("#res");
            for (let item of datos) {

                // console.log(item.nombre);
                res.innerHTML = (item.costo);
                res.innerHTML = (item.porcentaje)
            }




        }
    }



}