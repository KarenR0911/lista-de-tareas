const Tarea= require('./tarea');
const { v4: uuidv4}= require('uuid');
class Tareas {
    _listado= {};


    get listadoArr(){


        const listado= [];
        
        Object.keys(this._listado).forEach(key =>{
            const tarea= this._listado[key];
            listado.push(tarea);
        })
        return listado;
    }


    constructor() {
        this._listado={};
    }

    borrarTarea(id ="") {
        if(this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas=[])
   {

        tareas.forEach(tarea => {
        this._listado[tarea.id]=tarea;


    });
   } 

   listadoCompleto ()
   {

    console.log('\n');
    this.listadoArr.forEach( (tarea, i) =>{
        let idx= `${i+1}`.green;
        const {desc, completadoEn} = tarea;
        const estado= (completadoEn)
        ? 'Completado'.green
        : 'Pendiente'.red;
        console.log(`${idx}. ${desc} :: ${estado}`)


    })
   }

   listadotrue(completadas=true)
   {

    let contador=0;
    console.log('\n');
    this.listadoArr.forEach( (tarea) =>{
        const {desc, completadoEn} = tarea;
        const estado= (completadoEn)
        ? 'Completado'.green
        : 'Pendiente'.red;
        if (completadas) {
            if(completadoEn) {
                contador += 1;
                console.log(`${(contador + ".").green} ${desc} :: ${completadoEn.green}`);
            }
        } else {
            if (!completadoEn) {
                contador += 1;
                console.log(`${(contador + ".").red} ${desc} :: ${estado.red}`);
            }
        }
    });
   }

    crearTarea(desc='') {
        const tarea= new Tarea(desc);
        this._listado[tarea.id] =tarea;

    }


    tooglecompletadas(ids=[] ) {
        ids.forEach(id => {

            const tarea= this._listado[id];
            if(!tarea.completadoEn) {

                tarea.completadoEn= new Date().toISOString()

            }
        });

        this.listadoArr.forEach(tarea => {

            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn= null;
               
            }
        })

    }

}

module.exports= Tareas