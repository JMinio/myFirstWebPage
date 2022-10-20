//Defino mi array
let car_collection = []

//armo el objeto para luego armar las cards de los autos y la info necesaria.
class Cars {
    constructor(marca,modelo,color,anio){
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
        this.anio = anio;
    }
}

//definimos el localStorage
if(localStorage.getItem('car_collection')){
    //SI SE ENCUENTRA, LO QUEREMOS COMO OBJETO, NO COMO TEXTO JSON
    car_collection = JSON.parse(localStorage.getItem('car_collection'))
    
}else{
    //SI NO LO ENCUENTRA, LO CREA PASANDOLO A TEXTO JSON
    localStorage.setItem('car_collection',JSON.stringify(car_collection))
}

const menu = document.getElementById("id_form") //obtenemos la informacion del menu de sugerencia de creacion del vehiculo

const mostrarModelos = document.getElementById("mostrarModelos") //Boton que muestra los autos sugeridos

const concesionaria = document.getElementById("concesionaria") //Seccion donde se mostrara a los autos sugeridos

menu.addEventListener("submit",(event)=> { //es Submit porque el forulario tiene un boton type="submit"

    event.preventDefault();
    
    //guardo las caracteristicas ingresadas
    const datMenu = new FormData(event.target)

    //se crea un nuevo objeto (un nuevo auto) con las caracteristicas ingresadas
    const auto = new Cars( datMenu.get("marca"),datMenu.get("modelo"),datMenu.get("color"),datMenu.get("anio"))

    //Dicho auto, es ingresado al car_collection (array)
    car_collection.push(auto)

    localStorage.setItem('car_collection',JSON.stringify(car_collection))//actualizar el localStorage para que los cambios sean almacenados

    menu.reset()//reseteamos el menu de informacion

})


/*--------------------------ACCION DE MOSTRAR LOS ELEMENTOS EN EL DOM--------------------------*/ 
mostrarModelos.addEventListener('click',()=>{
    const Collection = JSON.parse(localStorage.getItem('car_collection'))
    
    //resetear el forEach para que se sume solo el que se agrega, y no muestre todos
    concesionaria.innerHTML = ""

    Collection.forEach( (auto, identificacion) => {
        concesionaria.innerHTML += `
        <div class="card cardsMostradas" id="patente_${identificacion}" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title"> Marca: ${auto.marca}</h5>
                <p class="card-text"> Modelo: ${auto.modelo}</p>
            </div>

            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Color: ${auto.color}</li>
                    <li class="list-group-item">Año: ${auto.anio}</li>
                </ul>
            </div>

            <div class="card-body">
                <center>
                <button type="button" class="btn btn-outline-warning">Eliminar</button></div>
                </center>
            </div>
        </div>
        `
    })

/*--------------------------ELIMINACION DE TARJETA--------------------------*/

    Collection.forEach((auto, identificacion) =>{
        //consulto las tarjetas de los autos
        const tarjeta = document.getElementById(`patente_${identificacion}`)

        //selecciono el boton "ELIMINAR" de la tarjeta 
        tarjeta.children[2].children[0].addEventListener("click",()=>{    
                    
        //Confirmacion de eliminacion de la sugerencia creada
        Swal.fire({
            title: '¿Desea eliminar la sugerencia?',
            text: "Una vez eliminada, no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar'
            
          }).then((result) => {
            if (result.isConfirmed) {
                tarjeta.remove(); //Elimino del DOM

                localStorage.getItem('car_collection') //Consulto el localStorage
                let nuevoArray = car_collection.slice(identificacion, 1) //Elimino del array
                localStorage.setItem('personajes', JSON.stringify(nuevoArray))//guardo el localStorage actualizado
                console.log(`${auto.user} - fue eliminado`)

              
                Swal.fire(
                'Finalizado!',
                'Sugerencia borrada!',
                'success'
                        )
            }
          })
        })
    
    }) 
})
