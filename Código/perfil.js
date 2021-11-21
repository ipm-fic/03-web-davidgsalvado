//import * as qr from 'https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js';

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
    createQr();
}

function createQr(){
    var qrcode = new QRCode(document.querySelector("#perfil-qr"),{
        text: sessionStorage.getItem("name") + ", " + sessionStorage.getItem("surname") + ", " + sessionStorage.getItem("uuid"),
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
    var dataUrl = document.querySelector("#perfil-qr").toDataUrl();
}