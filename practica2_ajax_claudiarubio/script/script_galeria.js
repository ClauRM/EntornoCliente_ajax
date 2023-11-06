//VARIABLES GLOBALES
var boton = document.getElementById("boton"); //boton de carga

//NOTA, los datos url, nombre y descripcion deben estar en el mismo orden en ambos ficheros
var urlJSON = "http://localhost/dashboard/AJAX/practica2_ajax_claudiarubio/datos/coches.json";
var typeJSON = "application/json"; //MimeType

var urlXML = "http://localhost/dashboard/AJAX/practica2_ajax_claudiarubio/datos/coches.xml";
var typeXML = "text/xml"; //MimeType

/**
 * Cuando se cargue la pagina, leer los datos del fichero json con las url de las imagenes
 */
$(document).ready(function () {
    console.log("leyendo Json...");
    leerFichero(urlJSON, typeJSON);
});

/**
 * Cuando se pulse sobre el botón carga las imagenes. Después de cargarlas, oculta el botón
 */
boton.addEventListener('click', function () {
    //alert(arrayURL); //para pruebas

    //si el array de url contiene datos, llamamos al metodo mostrarImagenes
    if (arrayURL.length != 0) {
        mostrarImagenes(arrayURL);
    } else {
        alert("Ha ocurrido un error, no se han cargado datos de las imagenes");
    }

    $("#boton").hide(); //despues de clicar y cargar las imagenes, ocultar el boton
});

/**
 * Función que muestra las imágenes de la galeria
 * @param {*} array Dato array que contiene urls de las imágenes leídas del fichero Json
 */
function mostrarImagenes(array) {
    try {
        //for para recorrer todas las url y pintar tantas imagenes como urls haya
        for (let j = 0; j < array.length; j++) {
            //crear nueva imagen//
            var imagen = new Image(); //crear etiqueta img
            imagen.src = array[j]; //aniadir url de la posicion i a la propiedad src de la imagen
            imagen.alt = j; //aniadir la propiedad alt con 
            $('#contenedor').append(imagen); //aniadimos la imagen al contenedor
        }
        verImagenFull(); // cuando se carguen las imagenes, llamamos a la funcion verImagenFull 

    } catch (error) {
        console.error("Ha ocurrido un error en el método mostrarImagenes(): " + error);
    }
};

/**
 * Función que muestra la imagen seleccionada en primer plano y sus propiedades
 */
function verImagenFull() {
    try {
        //leer los datos del xml
        console.log("leyendo xml...");
        leerFichero(urlXML, typeXML);

        //listener sobre las etiquetas img para ampliar la vista y mostrar sus propiedades
        $("#contenedor img").click(function () {
            //variables
            var ruta;
            var posicion = 0;
            var localizado = false;

            ruta = $(this).attr('src'); //almaceno en una variable la ruta de la imagen sobre la que se ha pinchado

            //obtener la posicion i de la ruta en el arrayURL
            do {
                if (ruta == arrayURL[posicion]) {  //si la ruta de la imagen grande es igual a la ruta que recorre el array en ese momento
                    localizado = true; //localizado es true
                } else {
                    posicion++; //sino, subimos una posicion
                }
            } while (!localizado && posicion < arrayURL.length); //permanecerá en el bucle mientras no sea localizado 
            //y mientras que la posicion sea menor que la longitd de array recorrido

            $("#imgFull").attr('src', ruta); //accedemos al div imgFull y le ponemos el src que hemos creado en la variable ruta
            $("#previa").show(); //para mostrar el div porque lo tenemos oculto por defecto en el css

            //llamamos a otra función para mostrar el nombre y la descripción
            mostrarTexto(posicion, arrayNombres, arrayDescripciones);
        });

        //cuando se haga click en la imagen en primer plano, ésta se oculta y borra los datos del html
        $("#imgFull").click(function () {
            $("#previa").hide(); //cuando se haga click sobre el div de la vista previa, ocultar
            //borrar la informacion de la imagen anterior
            $('#nombre').empty();
            $('#descripcion').empty();
        });

    } catch (error) {
        console.error("Ha ocurrido un error en el método verImagenFull(): " + error);
    }
}

/**
 * Función que muestra el nombre y la descripcion de la imagen seleccionada
 * @param {*} i Dato int con la posición de la imagen dentro del array urls
 * @param {*} arrayNom Dato array con los nombres de las imágenes
 * @param {*} arrayDes Dato array con las descripciones de las imágenes
 */
function mostrarTexto(i, arrayNom, arrayDes) {
    try {
        $('#nombre').append(arrayNom[i]); //aniadimos el nombre a la etiqueta titulo
        //$("#nombre").append("prueba")

        $('#descripcion').append(arrayDes[i]) //aniadimos la descripcion a la etiqueta parrafo

    } catch (error) {
        console.error("Ha ocurrido un error en el método mostrarTexto(): " + error);
    }
};