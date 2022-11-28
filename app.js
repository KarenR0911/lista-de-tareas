//const { mostrarmenu, pausa } = require('./helpers/mensajes');
require('colors');
const { leerdb } = require('./helpers/guardar');
const { guardardb } = require('./helpers/guardar');
const { inquirerMenu, pausa, leerInput, menuBorrar, confirmar, checklistmostrar
} = require('./helpers/inquirer');
//const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');


/*1.Se realiza el main como una funcion para usar el async y el await
2. Se descargan las dependencias del programa(Inquirer, colors, uuid...)
3. Se crea el package json.
4. Se crea las carpetas de models (para las tareas) y helpers (donde se resguardaran las funciones que ayuden al manejo del programa)
5. Se crea el inquirer y se exportan las funciones hacia la app.js
6. Se crea el do-while para la repeticion del programa 'hasta que'
7. Se crea la constante 'tareas' para usar la funcion Tareas, de los helpers.
8. Se crea la variable opt que se usara en el inquirerMenu para seleccionar entre las opciones
9. Se crea el switch para que segun la opcion seleccionada se ejecute una funcion especifica (Estará dentro del do-while).
10. Se crea e importa la funcion pausa, que se ejecutará con el await (dentro del do-while, pero fuera del switch).
11. Se ejectuta la funcion 'main'.
*/ 


const main = async() => {
let opt='';
const tareas= new Tareas();
  
const tareasdb= leerdb();

if(tareasdb){
tareas.cargarTareasFromArray(tareasdb);
}



    do {
      opt= await inquirerMenu();

      switch (opt) {
        case '1':
          //Crear Tareas
          const desc= await leerInput('Descripción:');
          tareas.crearTarea(desc);
        break;
        case '2':
          //Listar todas las tareas
          //console.log(tareas.listadoArr);
          tareas.listadoCompleto();
        break;
        case '3':
          tareas.listadotrue(false);
           break;
        case '4':
          tareas.listadotrue(true);
           break;
           case '5':
            const ids= await checklistmostrar(tareas.listadoArr);
            tareas.tooglecompletadas(ids);

            break;
        case '6':

          const id= await menuBorrar(tareas.listadoArr);

          if (id !== '0'){
            const okey= await confirmar('¿Estás seguro?');
  
            if (okey) {
              tareas.borrarTarea(id);
              console.log('\n Tarea eliminada.'.cyan);
            }
          }
           break;
           
      }
      guardardb(tareas.listadoArr);


     // console.log({opt});
      //const tareas= new Tareas();
      //const tarea= new Tarea('comer');
      //console.log(tareas);

      await pausa();
    

    } while(opt !== '0');


}

main();
