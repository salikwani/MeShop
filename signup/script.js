const form = document.getElementById('signup-form');
const fname = document.getElementById('first-name');
const lname = document.getElementById('last-name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordCheck = document.getElementById('password-check');

var userArray = [];
if(localStorage.getItem('userArray')) {
    userArray = JSON.parse(localStorage.getItem('userArray'));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(password.value !== passwordCheck.value) {
        var msg = document.createElement('sub');
        msg.innerText = "Passwords don't match!";
        document.querySelector('form > h1').appendChild(msg);
        passwordCheck.focus();
        setTimeout(()=>{document.querySelector('form > h1').removeChild(msg);},4000);
    } else if(password.value.length < 6) {
        var msg = document.createElement('sub');
        msg.innerText = "Password too short!";
        document.querySelector('form > h1').appendChild(msg);
        password.focus();
        setTimeout(()=>{document.querySelector('form > h1').removeChild(msg);},4000);
    } else if(userArray.find((user)=> {return user.email === email.value})) {
        var msg = document.createElement('sub');
        msg.innerText = "Account already exists!";
        document.querySelector('form > h1').appendChild(msg);
        email.focus();
        setTimeout(()=>{document.querySelector('form > h1').removeChild(msg);},4000);
    } else {
        var user = {
            fname: fname.value,
            lname: lname.value,
            email: email.value,
            password: password.value,
        }
        userArray.push(user);
        localStorage.setItem('userArray',JSON.stringify(userArray));
        var link = document.createElement('a');
        link.href = "../login/index.html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});