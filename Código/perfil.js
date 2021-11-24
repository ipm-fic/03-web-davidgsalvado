import "./VanillaQR.min.js";

const logout = document.querySelector("#logout-button");

logout.addEventListener('click', (event) => {
    location.href = "index.html";
});

window.onload = function(){
    document.querySelector("#perfil-nombre").innerHTML = sessionStorage.getItem("name");
    document.querySelector("#perfil-apellido").innerHTML = sessionStorage.getItem("surname");
    document.querySelector("#perfil-email").innerHTML = "<b>Email</b>: " + sessionStorage.getItem("email");
    document.querySelector("#perfil-telefono").innerHTML = "<b>Teléfono</b>: " + sessionStorage.getItem("phone");
    document.querySelector("#perfil-login").innerHTML = "<b>Nombre de usuario</b>: " + sessionStorage.getItem("username");
    document.querySelector("#perfil-vacunado").innerHTML = "<b>Vacunad@</b>: " + sessionStorage.getItem("is_vaccinated");
    createQr();
    getEvents();
}

function createQr(){
    var qrcode = new VanillaQR({
        url: sessionStorage.getItem("name") + ", " + sessionStorage.getItem("surname") + ", " + sessionStorage.getItem("uuid")
    });
    document.querySelector("#logout").appendChild(qrcode.domElement);
}

function getEvents(){
    fetch('http://localhost:8080/api/rest/user_access_log/' + sessionStorage.getItem("uuid")+"?offset=0&limit=5",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': 'myadminsecretkey'
        }
    }).then(response =>{
        if(response.ok){
            return response.json();
        }
    }).then(responseJSON => {
        if(responseJSON["access_log"].length === 0){
            document.querySelector("#perfil-errores").innerHTML = "Este usuario no ha visitado ningún evento";
        }else{
            var filasNombre = document.querySelectorAll(".nombre");
            var filasFecha = document.querySelectorAll(".fecha");
            var filasHora = document.querySelectorAll(".hora");
            for(var i = 0; i < responseJSON["access_log"].length; i++){
                var aux = responseJSON["access_log"][i]["timestamp"].toString();
                var fecha = aux.split("T")[0].split("-")[2] + "-"+aux.split("T")[0].split("-")[1] + "-"+aux.split("T")[0].split("-")[0];
                var hora = aux.split("T")[1].split(".")[0].split("+")[0];
                filasNombre[i].innerHTML = responseJSON["access_log"][i]["facility"]["name"];
                filasFecha[i].innerHTML = fecha;
                filasHora[i].innerHTML = hora;
            }
        }
    })
    .catch(error =>{ 
        document.querySelector("p#perfil-errores").innerHTML = "No se puede conectar con el servidor"});
}