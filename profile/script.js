// Write your script here
var userArray = [];

if(!localStorage.getItem('userArray')) {
    var link = document.createElement('a');
    link.href = "../login/index.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
} else if(JSON.parse(localStorage.getItem('userArray')).find((user) => { return user.accessToken})) {
    userArray = JSON.parse(localStorage.getItem('userArray'))
    const currUser = userArray.findIndex((user) => { return user.accessToken });
    const logout = document.getElementById('logout-btn');
    const fname = document.getElementById('first-name');
    const lname = document.getElementById('last-name');
    const oldPassword = document.getElementById('old-password');
    const newPassword = document.getElementById('new-password');
    const newPasswordCheck = document.getElementById('new-password-check');
    const nameForm = document.getElementById('name-update');
    const passwordForm = document.getElementById('password-update');

    logout.addEventListener('click', () => {
        delete userArray[currUser].accessToken;
        localStorage.setItem('userArray',JSON.stringify(userArray));
        var link = document.createElement('a');
        link.href = "../index.html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if(newPassword.value !== newPasswordCheck.value) {
            var msg = document.createElement('sub');
            msg.innerText = "Passwords don't match!";
            document.querySelector('#password-update > h1').appendChild(msg);
            newPasswordCheck.focus();
            setTimeout(()=>{document.querySelector('#password-update > h1').removeChild(msg);},4000);
        } else if(newPassword.value.length < 6) {
            var msg = document.createElement('sub');
            msg.innerText = "Password too short!";
            document.querySelector('#password-update > h1').appendChild(msg);
            newPassword.focus();
            setTimeout(()=>{document.querySelector('#password-update > h1').removeChild(msg);},4000);
        } else if(oldPassword.value !== userArray[currUser].password) {
            var msg = document.createElement('sub');
            msg.innerText = "Wrong password!";
            document.querySelector('#password-update > h1').appendChild(msg);
            oldPassword.focus();
            setTimeout(()=>{document.querySelector('#password-update > h1').removeChild(msg);},4000);
        } else {
            userArray[currUser].password = newPassword.value;
            localStorage.setItem('userArray',JSON.stringify(userArray));
            var msg = document.createElement('sub');
            msg.setAttribute('class','green');
            msg.innerText = "Password updated successfully!";
            document.querySelector('#password-update > h1').appendChild(msg);
            setTimeout(()=>{document.querySelector('#password-update > h1').removeChild(msg);},4000);
            newPassword.value = "";
            newPasswordCheck.value = "";
            oldPassword.value = "";
        }
    });

    nameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        userArray[currUser].fname = fname.value;
        userArray[currUser].lname = lname.value;
        localStorage.setItem('userArray',JSON.stringify(userArray));
        var msg = document.createElement('sub');
        msg.setAttribute('class','green');
        msg.innerText = "Name updated successfully!";
        document.querySelector('#name-update > h1').appendChild(msg);
        setTimeout(()=>{document.querySelector('#name-update > h1').removeChild(msg);},4000);
        fname.value = "";
        lname.value = "";
    });
} else {
    var link = document.createElement('a');
    link.href = "../login/index.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
