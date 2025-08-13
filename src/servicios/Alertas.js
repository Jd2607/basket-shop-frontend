import Swal from 'sweetalert2';

export function alertaCheck(titulo, mensaje, reiniciar){
    Swal.fire({
    title: titulo,
    text: mensaje,
    icon: 'success',
    confirmButtonText: 'Aceptar'
    });

    if (reiniciar) {
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }
}


export function alertaError(titulo, mensaje){
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}


export function alertaInfo(mensaje) {
    Swal.fire({
        text: mensaje,
        icon: 'info',
        confirmButtonText: 'Aceptar'
    });
}


export function alertaDespedida(){
  Swal.fire({
    title: `¡Hasta luego! 👋`,
    text: 'Has cerrado sesión correctamente.',
    icon: 'info'
  });
};



export function alertaBienvenida(){
  Swal.fire({
    title: `¡Bienvenido! 🎉`,
    text: 'Has iniciado sesión correctamente.',
    icon: 'success'
  });
};