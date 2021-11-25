import * as lib from './auxFunctions.js';

const registroForm = document.querySelector("form#registropost");
const password = document.querySelector("#password-registro");

document.querySelector("#checkbox-registro").addEventListener('click', function(){
    if(password.type === "password"){
        password.type = "text";
    }else if (password.type === "text"){
        password.type = "password";
    }
});

  function onlyDigits(s) {
    for (let i = s.length - 1; i >= 0; i--) {
      const d = s.charCodeAt(i);
      if (d < 48 || d > 57) return false
    }
    return true
  }

function checkPhone(phone){
    if (phone.trim().length != 9){
        document.querySelector("#span-telefono").innerHTML = "Introduce un teléfono válido (9 dígitos)";
    }else if (!onlyDigits(phone.trim())){
        document.querySelector("#span-telefono").innerHTML = "Introduce un teléfono válido que solo contenga dígitos"
    }else{
        document.querySelector("#span-telefono").innerHTML = "&nbsp";
    }
}

function onlyLetters(str){
    for (let i = str.length - 1; i >=0; i--){
        var d = str.charCodeAt(i);
        if(d < 65 || (d > 90 && d < 97) || d > 122) return false;
    }
    return true;
}

function checkNameSurname(nombre, nameOrSurname){    
    if (nombre.trim().length < 3){
        document.querySelector("#span-"+ nameOrSurname).innerHTML = "Introduce un " + nameOrSurname + " de al menos 3 letras";
    }else if(!onlyLetters(nombre.trim())){
        document.querySelector("#span-"+ nameOrSurname).innerHTML = "Introduce un " + nameOrSurname +" con solo letras";
    }else{
        document.querySelector("#span-"+ nameOrSurname).innerHTML = "&nbsp;";
    }
}

function checkForm(){
    var fields = ["#nombre-registro", "#apellido-registro", "#email-registro", "#telefono-registro", "#usuario-registro", "#password-registro"];
    var spanFields = ["#span-nombre", "#span-apellido", "#span-email", "#span-telefono", "#span-usuario", "#span-password"];
    var validFields = 0;
    for (var i = 0; i < 6; i++){
        if (lib.isEmpty(document.querySelector(fields[i]).value)){
            document.querySelector(spanFields[i]).innerHTML = "Introduce un " + spanFields[i].split("-")[1];
        }else{
            if(fields[i] === "#password-registro"){
                lib.checkPassword(document.querySelector(fields[i]).value);
                if(document.querySelector(spanFields[i]).innerHTML === "&nbsp;"){
                    ++validFields;
                }
            }else if(fields[i] === "#telefono-registro"){
                checkPhone(document.querySelector(fields[i]).value);
                if(document.querySelector(spanFields[i]).innerHTML === "&nbsp;"){
                    ++validFields;
                }
            }else if(fields[i] === "#nombre-registro" || fields[i] === "#apellido-registro"){
                checkNameSurname(document.querySelector(fields[i]).value, fields[i].split("-")[0].split("#")[1]);
                if(document.querySelector(spanFields[i]).innerHTML === "&nbsp;"){
                    ++validFields;
                }
            }else{
                document.querySelector(spanFields[i]).innerHTML = "&nbsp;";
                ++validFields;
            }
        }
    }
    if (validFields != 6) return false;
    else return true;
}

function getVacunado(){
    if(document.querySelector("#vacunado-registro-si").checked){
        return "true";
    }else return "false";
}

registroForm.addEventListener('submit', (event) => {
    var nombre = document.querySelector("#nombre-registro").value;
    var surname = document.querySelector("#apellido-registro").value;
    var email = document.querySelector("#email-registro").value;
    var phone = document.querySelector("#telefono-registro").value;
    var username = document.querySelector("#usuario-registro").value;
    var password = document.querySelector("#password-registro").value;
    var vacunado = getVacunado();

    if(!checkForm()){
        event.preventDefault();
    }
    else{
        var data = {
            'username': username.trim(),
            'password': password.trim(),
            'name': nombre.trim(),
            'surname': surname.trim(),
            'phone': phone.trim(),
            'email': email.trim(),
            'is_vaccinated': vacunado
        };
        fetch("http://localhost:8080/api/rest/user",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-hasura-admin-secret': 'myadminsecretkey'
            },
            body: JSON.stringify(data),
        })
        .catch(error => {
            document.querySelector("p#registro-error").innerHTML = "No se puede conectar con el servidor";
        });
    }
});
