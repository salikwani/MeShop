var userArray = [];
if(localStorage.getItem('userArray')) {
    userArray = JSON.parse(localStorage.getItem('userArray'));
}

const form = document.getElementById('login-form');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    var currUser;
    if(userArray.find((user) => { return user.email === email.value && user.password === password.value })) {
        currUser = userArray.findIndex((user) => { return user.email === email.value && user.password === password.value });
        userArray.forEach((e) => {if(e.accessToken) {delete e.accessToken}});
        userArray[currUser].accessToken = generateToken();
        localStorage.setItem('userArray',JSON.stringify(userArray));
        var link = document.createElement('a');
        link.href = "../shop/index.html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        var msg = document.createElement('sub');
        msg.innerText = "The email address or password you entered is invalid!";
        document.querySelector('form > h1').appendChild(msg);
        setTimeout(()=>{document.querySelector('form > h1').removeChild(msg);},4000);
    }
});

function generateToken() {
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234abcdefghijklmnopqrstuvwxyz56789";
    var res = "";
    var length = characters.length;
    for(var i=0;i<16;i++) {
        res += characters.charAt(Math.floor(Math.random()*length));
    }
    return res;
}
