

const catalogo = document.getElementById("catalogo"); //obtengo la zona donde voy a mostrar los vehiculos predefinidos

//creo una funcion que retorne el contenido de fetch para luego poder filtrar
const filtradoVehiculos = async() => {
    const resultado = await fetch('./json/vehiculos.json'); 
    const vehiculos = await resultado.json();
    return vehiculos;
}

//CONSULTAMOS EL ARCHIVO JSON INTERNO PARA LUEGO MOSTRAR LOS VALORES DEL ARRAY DE OBJETOS 
fetch('./json/vehiculos.json') //consulto mi json creado
.then(response => response.json())
.then(vehiculos => { 
    vehiculos.forEach((vehiculo,id) => { //recorro el array de objetos del .json
        //los muestro en el HTML
        catalogo.innerHTML +=`
        <div class="card cardsMostradas" id="patente_${id}" style="width: 18rem; margin:3px;">
        <center>
        <div class="card-body">
            <img src="./catalogo/${vehiculo.img}" class="img-catalogo" alt="foto-del-auto">
            <h5 class="card-title" style="color:black">${vehiculo.marca}</h5>
            <p class="card-text" style="color:black">${vehiculo.modelo}</p>
        </div>
        </center>
        <div class="card-body">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Año: ${vehiculo.anio}</li>
                <li class="list-group-item">Km: ${vehiculo.km}</li>
                <li style="color:green; font-size:20px; "  class="list-group-item">Precio: U$D ${vehiculo.precio}</li>
            </ul>
        </div>
    </div>
        `
    });

})

        //definimos el input de busqueda pra filtrar los elementos
        const buscador = document.getElementById("buscador")
        
        //mediante el buscador, creamos un evento para realizar el filtrado
        //coloco input ya que mediante va ingresando letras, se va haciendo el filtro
        buscador.addEventListener('input', ()=>{
            
            let busqueda = buscador.value //let ya que el valor de la busqueda va alterandose
            
            filtradoVehiculos().then(vehiculos=>{
                //limpio el html para luego darle espacio al filtro
                catalogo.innerHTML=""
                //guardo en una constante el filtro que se hizo
                const marcasFiltradas = vehiculos.filter(vehiculo => vehiculo.marca.includes(busqueda)) 

                //recorro el filtro que se realizo para luego proceder a mostrarlo en el html
                marcasFiltradas.forEach((vehiculo,id)=>{
                    catalogo.innerHTML +=`
                <div class="card cardsMostradas" id="patente_${id}" style="width: 18rem; margin:3px;">
                <center>
                <div class="card-body">
                    <img src="./catalogo/${vehiculo.img}" class="img-catalogo" alt="foto-del-auto">
                    <h5 class="card-title" style="color:black">${vehiculo.marca}</h5>
                    <p class="card-text" style="color:black">${vehiculo.modelo}</p>
                </div>
                </center>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Año: ${vehiculo.anio}</li>
                        <li class="list-group-item">Km: ${vehiculo.km}</li>
                        <li style="color:green; font-size:20px; "  class="list-group-item">Precio: U$D ${vehiculo.precio}</li>
                    </ul>
                </div>
            </div>
                `
                } )
            }) 
        
        })