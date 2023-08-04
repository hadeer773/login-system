
// ------------------> global variable <------------------
var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');
// ------------------> Regex variable <------------------

// ------------------> say welcome <------------------
var username = localStorage.getItem('sessionUsername')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username;
}

var signUpArray = []
if (localStorage.getItem('users') == null) {
    signUpArray = []
} else {
    signUpArray = JSON.parse(localStorage.getItem('users'))
}





// ------------------> check input empty or not <------------------
function isEmpty() {

    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false
    } else {
        return true
    }
}





// ------------------> email is exist or not <------------------
function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false
        }
    }
}





function signUp() {
    if (isEmpty() == false) {
        document.getElementById('exit').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    if(validationEmail()==true){
        if(validationName()==true){
            if(validationPassword()==true){
        var signUp = {
            name: signupName.value,
            email: signupEmail.value,
            password: signupPassword.value,
        }
        if (signUpArray.length == 0) {
            signUpArray.push(signUp)
            localStorage.setItem('users', JSON.stringify(signUpArray))
            document.getElementById('exit').innerHTML = '<span class="text-success m-3">Success</span>'
            return true
        }
        if (isEmailExist() == false) {
            document.getElementById('exit').innerHTML = '<span class="text-danger m-3">email already exists</span>'
    
        } else {
            signUpArray.push(signUp)
            localStorage.setItem('users', JSON.stringify(signUpArray))
            document.getElementById('exit').innerHTML = '<span class="text-success m-3">Success</span>'
    
        }
            }
    }
    
    }

}

    // ------------------> store data <------------------





// ------------------> login section <------------------


// ------------------> input empty or not <------------------
function isLoginEmpty() {

    if (signinPassword.value == "" || signinEmail.value == "") {
        return false
    } else {
        return true
    }
}

function login() {
    if (isLoginEmpty() == false) {
        document.getElementById('incorrect').innerHTML = `<span class="text-danger m-3">All inputs is required</span>`
        return false
    }
    var password = signinPassword.value
    var email = signinEmail.value
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('sessionUsername', signUpArray[i].name)
            if (baseURL == '/') {
                location.replace('https://' + location.hostname + '/login.html')

            } else {
                location.replace(baseURL + '/login.html')

            }
        } else {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }

}
// ------------------> logout from login <------------------
function logout() {
    localStorage.removeItem('sessionUsername')
}
// ------------------> get url<------------------
var pathparts = location.pathname.split('/');
var baseURL = ''
for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i]
}
console.log(baseURL);
// ------------------> validation<------------------
function validationName(){
    var regexName=/^[a-zA-Z]{4,20}[0-9]+$/;
    var messageName=document.getElementById('nameHint');
    var text=signupName.value;
    // is vaild
    if (regexName.test(text)==true){
        signupName.classList.add('is-valid');
        signupName.classList.remove('is-invalid');
        messageName.classList.add('d-none')
        return true;
    }else{
        signupName.classList.add('is-invalid');
        signupName.classList.remove('is-valid');
        messageName.classList.remove('d-none');
        return false;
    }
}

function validationEmail(){
    var regexEmail=/^[A-z0-9]{4,8}[A-z0-9]{4,8}@gmail\.com$/;
    var messageName=document.getElementById("emailHint");
    var text=signupEmail.value;
// if vaild
    if (regexEmail.test(text)==true){
        signupEmail.classList.add('is-valid');
        signupEmail.classList.remove('is-invalid');
        messageName.classList.add('d-none');
        return true;
}else{ // if not vaild   
    signupEmail.classList.add('is-invalid');
    signupEmail.classList.remove('is-valid');
    messageName.classList.remove('d-none');
    return false;

}
}

function validationPassword(){
var messageName=document.getElementById('passwordHint');
var regexPassword=/^[A-Za-z-0-9]{8,32}$/;
var text=signupPassword.value;
// if vaild
if (regexPassword.test(text)==true){
    signupPassword.classList.add('is-valid');
    signupPassword.classList.remove('is-invalid');
    messageName.classList.add('d-none');
    return true;
}else{ // if not vaild   
signupPassword.classList.add('is-invalid');
signupPassword.classList.remove('is-valid');
messageName.classList.remove('d-none');
return false;

}
}




