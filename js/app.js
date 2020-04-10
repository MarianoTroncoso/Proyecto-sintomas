let DB;

// selectores de la interfaz
const form = document.querySelector('form'), 
    nombreMascota = document.querySelector('#mascota'),
    nombreCliente = document.querySelector('#cliente'),
    telefono = document.querySelector('#telefono'),
    fecha = document.querySelector('#fecha'),
    hora = document.querySelector('#hora'),
    sintomas = document.querySelector('#sintomas'),
    citas = document.querySelector('#citas'),
    headingAdministra = document.querySelector('#administra');

// esperar por el DOM ready 
document.addEventListener('DOMContentLoaded', () => {
    // crear la base de datos
    // forma parte de la ventana global
    // los parametros son el nombre y la version 
    let crearDB = window.indexedDB.open('citas', 1);
    // NO debemos poner las versiones del tipo 1.1 1.2
    // debido a que lo redondea a 1 
    // siempre usar numeros enteros

    // si hay un error enviarlo a la consola
    crearDB.onerror = function(){
        console.log('Hubo un error');
    }

    // si todos esta bien muestra en consola y asigna la bd
    crearDB.onsuccess = function(){
        // console.log('todo listo');

        // asignar a la base de datos 
        DB = crearDB.result;
        // console.log(DB);
    }

    // este metodo solo corre una vez
    // ideal para crear el esquema de la bd
    crearDB.onupgradeneeded = function(e){
        // console.log('solo una vez');
        // en este metodo definimos todos los campos

        // el evento es la misma base de datos
        let db = e.target.result;
        // aqui obtenemos la instancia de la db
        console.log(db);

        // definir objectstore, tome 2 parametros
        // nombre de la db y las opciones
        // keyPath es la indice de la base de datos
        let objectstore = db.createObjectStore('citas', {keyPath: 'key', 
        autoIncrement: true});

        // crear los indices y campos de la base de datos:
        // 3 parametros: nombre, keypath y opciones 
        // Indice para mascota 
        objectstore.createIndex('mascota', 'mascota', {unique: false} ) 

    }

})