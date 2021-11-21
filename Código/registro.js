const registroForm = document.querySelector("form#registropost");
const passwordSpan = document.querySelector("#span-password");
const password = document.querySelector("#password-registro");

document.querySelector("#checkbox-registro").addEventListener('click', function(){
    if(password.type === "password"){
        password.type = "text";
    }else if (password.type === "text"){
        password.type = "password";
    }
});

function isEmpty(str){
    return !str.trim().length;
  }
  
  function handleErrors(response) {
    if (response.status == 401) {
        throw Error('La contraseña o el usuario introducidos son incorrectos');
    }
    return response.json();
  }
  
  function hasLowerCase(str) {
      return str.toUpperCase() != str;
  }
  
  function hasCamelCase(str) {
      return str.toLowerCase() != str;
  }
  
  function hasNumbers(str){
      const regex = /\d/;
      return regex.test(str);
  }
  
  function checkPassword(password){
      if (password.trim().length < 8){
          passwordSpan.innerHTML = "Introduce una contraseña con al menos 8 caracteres";
      }else if(!hasLowerCase(password)){
          passwordSpan.innerHTML = "La contraseña debe tener al menos una minúscula";
      }else if(!hasCamelCase(password)){
          passwordSpan.innerHTML = "La contraseña debe tener al menos una mayúscula";
      }else if(!hasNumbers(password)){
          passwordSpan.innerHTML = "La contraseña debe contener al menos un número";
      }else{
          passwordSpan.innerHTML = "&nbsp;";
      }
  }

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
    }else if (!onlyDigits(phone)){
        document.querySelector("#span-telefono").innerHTML = "Introduce un teléfono válido que solo contenga dígitos"
    }else{
        document.querySelector("#span-telefono").innerHTML = "&nbsp";
    }
}

function checkForm(){
    var fields = ["#nombre-registro", "#apellido-registro", "#email-registro", "#telefono-registro", "#usuario-registro", "#password-registro"];
    var spanFields = ["#span-nombre", "#span-apellido", "#span-email", "#span-telefono", "#span-usuario", "#span-password"];
    var validFields = 0;
    for (i = 0; i < 6; i++){
        if (isEmpty(document.querySelector(fields[i]).value)){
            document.querySelector(spanFields[i]).innerHTML = "Introduce un " + spanFields[i].split("-")[1];
        }else{
            if(fields[i] === "#password-registro"){
                checkPassword(document.querySelector(fields[i]).value);
                if(document.querySelector(spanFields[i]).innerHTML === "&nbsp;"){
                    ++validFields;
                }
            }else if(fields[i] === "#telefono-registro"){
                checkPhone(document.querySelector(fields[i]).value);
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

registroForm.addEventListener('submit', (event) => {
    var login = document.querySelector("#nombre-registro").value;
    var surname = document.querySelector("#apellido-registro").value;
    var email = document.querySelector("#email-registro").value;
    var phone = document.querySelector("#telefono-registro").value;
    var username = document.querySelector("#usuario-registro").value;
    var password = document.querySelector("#password-registro").value;

    if(!checkForm()){
        event.preventDefault();
    }
});

