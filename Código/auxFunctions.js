export function isEmpty(str){
    return !str.trim().length;
  }

function handleErrors(response) {
    alert(response.status);
    if (response.status == 500) {
        throw Error('No se pudo conectar con el servidor');
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
  
export function checkPassword(password){
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