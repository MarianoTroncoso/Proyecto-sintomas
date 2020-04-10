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
        objectstore.createIndex('mascota', 'mascota', {unique: false});
        objectstore.createIndex('cliente', 'mascota', {unique: false});
        objectstore.createIndex('telefono', 'mascota', {unique: false});
        objectstore.createIndex('fecha', 'mascota', {unique: false});
        objectstore.createIndex('hora', 'mascota', {unique: false});
        objectstore.createIndex('sintomas', 'mascota', {unique: false}); 

        // console.log('db creada y ready')
    }
    // cuando el formulario se envia 
    form.addEventListener('submit', agregarDatos);

    function agregarDatos(e){
        e.preventDefault(); 
        const nuevaCita = {
            mascota: nombreMascota.value,
            cliente: nombreCliente.value,
            telefono: telefono.value,
            fecha: fecha.value,
            hora: hora.value,
            sintomas: sintomas.value
        };
        // console.log(nuevaCita);

        // en indexedDB se usan las transacciones
        // pasamos el nombre de la base de datos
        // y el modo ReadOnly & ReadWrite
        let transaction = DB.transaction(['citas'], 'readwrite');
        let objectstore = transaction.objectStore('citas');
        // console.log(objectstore)

        let peticion = objectstore.add(nuevaCita);

        // si fue correcta
        peticion.onsuccess = () => {
            form.reset();
        };

        transaction.oncomplete = () => {
            console.log('cita agregada');
        };

        transaction.onerror = () => {
            console.log('hubo un error');
        }
    }

})