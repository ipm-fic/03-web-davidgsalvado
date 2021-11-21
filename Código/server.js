//import 'auxFunctions.js';

const password = document.querySelector("#password-formpost");
const checkbox = document.querySelector("#checkbox-formpost");
const passwordSpan = document.querySelector("#span-password");
const userSpan = document.querySelector("#span-usuario");

var nameUser;
var surname;
var email;
var phone;
var uuid;

checkbox.addEventListener('click', function(){
    if (password.type == "password") {
        password.type = "text";
      } else {
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

function getData(response){
  nameUser = response["name"];
  surname = response["surname"];
  email = response["email"];
  phone = response["phone"];
  uuid = response["uuid"];
}

document.querySelector('form#formpost').addEventListener('submit', (event) => {

  var login = document.querySelector("#username-formpost").value;
  var password = document.querySelector("#password-formpost").value;
  
  if(isEmpty(login)){
    userSpan.innerHTML = "Introduce un nombre de usuario";
    if(isEmpty(password)){
        passwordSpan.innerHTML = "Introduce una contraseña";
    }else{
      passwordSpan.innerHTML = "&nbsp;";
      //checkPassword(password);
    }
    event.preventDefault(); 
  }else{
    userSpan.innerHTML = "&nbsp;";
    if(!isEmpty(password)){   
      passwordSpan.innerHTML = "&nbsp;";
      //checkPassword(password); 
    }else{
        passwordSpan.innerHTML = "Introduce una contraseña";
    }
    event.preventDefault();
  }

  if(userSpan.innerHTML === "&nbsp;" && passwordSpan.innerHTML === "&nbsp;"){ // si los campos no están vacíos
    var data = {
      'username': login, 
      'password': password
    };
    
    fetch("http://localhost:8080/api/rest/login",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'myadminsecretkey'
      },
      body: JSON.stringify(data)
    })
    .then(handleErrors)
    .then(response =>{
      document.querySelector("p#login-error").innerHTML = "&nbsp;";
      getData(response["users"][0]);
      sessionStorage.setItem('name', nameUser);
      sessionStorage.setItem('surname', surname);
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('phone', phone);
      sessionStorage.setItem('username', login);
      sessionStorage.setItem('uuid', uuid);
      document.querySelector('form#formpost').submit();
    })
    .catch(error => document.querySelector("p#login-error").innerHTML = error.message);
  }

});