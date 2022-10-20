//Obtenemos los botones del HTML
const formulario = document.getElementById("formulario")

//Agregamos eventos al hacer click en Enviar del formulario
formulario.addEventListener("submit",(event)=>{
    event.preventDefault(); //establecemos que no funcione por default.

    Swal.fire(
        'Consulta enviada!',
        'Revisa tu casilla de correo!',
        'success'
        )
        
    formulario.reset(); //Reseteamos el formulario para su proximo uso.
})


//AGREGAR API DE EMAILJS


   
