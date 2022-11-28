require('colors');
const mostrarmenu = () => {
    return new Promise((resolve) => {
    console.clear();
    console.log('==============================================================='.cyan);
    console.log('Bienvenido al realizador de tareas. Seleccione una opción      '.white);
    console.log('===============================================================\n'.cyan);
    console.log(`${' 1.'.cyan} Crear una tarea.`);
    console.log(`${' 2.'.cyan} Listar tareas.`);
    console.log(`${' 3.'.cyan} Listar tareas pendientes.`);
    console.log(`${' 4.'.cyan} Listar tareas completadas.`);
    console.log(`${' 5.'.cyan} Marcar tareas como completadas.`);
    console.log(`${' 6.'.cyan} Eliminar tarea.`);
    console.log(`${' 0.'.cyan} Salir. \n`); 
    const readline = require('readline').createInterface({
        input: process.stdin,
        output:process.stdout
    });
    readline.question('Seleccione una opción:  ', (opt) => {
        readline.close();
        resolve(opt);
    })
    })
}
    const pausa = () => {
        return new Promise((resolve) => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output:process.stdout
    });
    readline.question(`\nPresione ${'ENTER'.cyan} para continuar.\n`, (opt) => {
        readline.close();
        resolve();
    });
        });
    }
module.exports={
    mostrarmenu,
    pausa
}